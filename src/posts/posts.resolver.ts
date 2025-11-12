import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

@Resolver('Post')
export class PostsResolver {
  private posts: Post[] = [
    {
      id: 1,
      title: 'First Post',
      content: 'This is my first post',
      author: 'John',
    },
    {
      id: 2,
      title: 'Second Post',
      content: 'GraphQL is awesome',
      author: 'Jane',
    },
  ];

  @Query('posts')
  getPosts(): Post[] {
    return this.posts;
  }

  @Query('post')
  getPost(@Args('id') id: number): Post {
    const posts = this.posts.find((post) => post.id === id);
    if(!posts){
      throw new Error('No posts found for this post');
    };

    return posts;
  }

  @Mutation('createPost')
  createPost(
    @Args('title') title: string,
    @Args('content') content: string,
    @Args('author') author: string,
  ): Post {
    const newPost: Post = {
      id: this.posts.length + 1,
      title,
      content,
      author,
    };
    this.posts.push(newPost);
    return newPost;
  }

  @Mutation('deletePost')
  deletePost(@Args('id') id: number): boolean {
    const index = this.posts.findIndex((post) => post.id === id);
    if (index > -1) {
      this.posts.splice(index, 1);
      return true;
    }
    return false;
  }
}
