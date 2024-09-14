import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  private todos: Todo[] = [];

  constructor() {}

  getTodos() {
    this.todosSubject.next(this.todos);
  }

  addTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false
    };
    this.todos.push(newTodo);
    this.todosSubject.next(this.todos);
  }

  toggleComplete(id: number) {
    const todo = this.todos.find(item => item.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.todosSubject.next(this.todos);
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(item => item.id !== id);
    this.todosSubject.next(this.todos);
  }
}