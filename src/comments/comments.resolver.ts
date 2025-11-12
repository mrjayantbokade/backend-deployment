import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

interface Comment {
  id: number;
  postId: number;
  text: string;
  author: string;
}

@Resolver('Comment')
export class CommentsResolver {
  private comments: Comment[] = [
    { id: 1, postId: 1, text: 'Great post!', author: 'Alice' },
    { id: 2, postId: 1, text: 'Thanks for sharing', author: 'Bob' },
    { id: 3, postId: 2, text: 'I agree!', author: 'Charlie' },
  ];

  @Query('comments')
  getComments(@Args('postId') postId?: number): Comment[] {
    if (postId) {
      return this.comments.filter((c) => c.postId === postId);
    }
    return this.comments;
  }

  @Mutation('addComment')
  addComment(
    @Args('postId') postId: number,
    @Args('text') text: string,
    @Args('author') author: string,
  ): Comment {
    const newComment: Comment = {
      id: this.comments.length + 1,
      postId,
      text,
      author,
    };
    this.comments.push(newComment);
    return newComment;
  }
}
