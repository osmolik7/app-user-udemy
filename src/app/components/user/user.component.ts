import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent {
  @Input() users: User[] = [];
  @Output() userIdEventEmitter: EventEmitter<number> = new EventEmitter();
  @Output() userEventEmitter: EventEmitter<User> = new EventEmitter();

  onRemoveUser(id: number): void {
    Swal.fire({
      title: "Estas seguro?",
      text: "No seras capaz de revertir este proceso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado!",
          text: "El usuario a sido eliminado.",
          icon: "success"
        });
        this.userIdEventEmitter.emit(id);
      }
    });    
  }

  onEditUser(user: User){
    this.userEventEmitter.emit(user);
  }

}

