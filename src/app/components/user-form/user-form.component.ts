import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  @Input() user: User;
  @Output() openEventEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() userEventEmmiter: EventEmitter<User> = new EventEmitter();
  
  constructor(){
    this.user = new User();
  }

  onSubmit(userForm: NgForm) : void{
    if(userForm.valid){
      this.userEventEmmiter.emit(this.user);
      console.log(this.user);
    }
    userForm.reset();
    userForm.resetForm();
  }
  clear(userForm: NgForm){
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }
  onOpen(){
    this.openEventEmitter.emit();
  }
}
