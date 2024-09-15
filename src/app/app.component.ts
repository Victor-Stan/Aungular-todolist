import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoService } from './services/todo.service';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from '@angular/fire/auth';
import { inject } from '@angular/core';

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
  user: User | null = null;
  private auth = inject(Auth);

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
      if (user) {
        this.todoService.todos$.subscribe((todos) => {
          this.todos = todos;
        });
        this.todoService.getTodos();
      }
    });
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        this.user = result.user;
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
      });
  }

  logout() {
    signOut(this.auth).then(() => {
      this.user = null;
    });
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
