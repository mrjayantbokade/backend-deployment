import { Controller, Get, Post, Body, Param } from '@nestjs/common';

interface User {
  id: number;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  @Get()
  findAll(): User[] {
    return this.users;
  }

  @Get(':id')
  findOne(@Param('id') id: string): User {
    const user = this.users.find((user) => user.id === parseInt(id));
    if(!user){
      throw new Error('User not found');
    }
    return user;
  }

  @Post()
  create(@Body() user: Omit<User, 'id'>): User {
    const newUser = { id: this.users.length + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }
}
