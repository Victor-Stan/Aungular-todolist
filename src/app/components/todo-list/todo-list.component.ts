import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Output() toggleComplete = new EventEmitter<number>();
  @Output() deleteTodo = new EventEmitter<number>();

  onToggleComplete(id: number) {
    this.toggleComplete.emit(id);
  }

  onDelete(id: number) {
    this.deleteTodo.emit(id);
  }
}