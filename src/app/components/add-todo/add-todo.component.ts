import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  newTodo: string = '';

  @Output() addTodo = new EventEmitter<string>();

  onSubmit() {
    if (this.newTodo.trim()) {
      this.addTodo.emit(this.newTodo);
      this.newTodo = '';
    }
  }
}