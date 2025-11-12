import { Controller, Get, Post, Body, Sse } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface MessageEvent {
  data: string | object;
}

@Controller('tasks')
export class TasksController {
  private tasks: Task[] = [
    { id: 1, title: 'Learn NestJS', completed: false },
    { id: 2, title: 'Build API', completed: true },
  ];

  @Get()
  findAll(): Task[] {
    return this.tasks;
  }

  @Post()
  create(@Body() task: Omit<Task, 'id'>): Task {
    const newTask = { id: this.tasks.length + 1, ...task };
    this.tasks.push(newTask);
    return newTask;
  }

  // Server-Sent Events endpoint
  @Sse('events')
  sendEvents(): Observable<MessageEvent> {
    return interval(2000).pipe(
      map((num) => ({
        data: {
          message: 'Task update',
          timestamp: new Date().toISOString(),
          count: num,
          tasks: this.tasks.length,
        },
      })),
    );
  }

  // Another SSE endpoint for progress updates
  @Sse('progress')
  sendProgress(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((num) => ({
        data: {
          progress: (num % 100) + 1,
          status: num % 100 === 99 ? 'completed' : 'in-progress',
        },
      })),
    );
  }
}
