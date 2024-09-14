import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoService } from './services/todo.service';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AddTodoComponent, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.todos$.subscribe((todos) => {
      this.todos = todos;
    });
    this.todoService.getTodos();
  }

  addNewItem(title: string) {
    this.todoService.addTodo(title);
  }

  toggleComplete(id: number) {
    this.todoService.toggleComplete(id);
  }

  deleteItem(id: number) {
    this.todoService.deleteTodo(id);
  }
}
