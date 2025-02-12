import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html'
})
export class UserComponent {
  users: User[] = [];
  title: string = 'Users list';
  
  
  constructor(private service:UserService, private router: Router, private sharingData:SharingDataService){
    if(this.router.getCurrentNavigation()?.extras.state){
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    }
    else{
      this.service.findAll().subscribe(users => this.users = users)
    }
    
  }

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
        this.sharingData.idUserEventEmitter.emit(id);
      }
    });    
  }

  onEditUser(user: User){
    this.router.navigate(['users/edit', user.id], {state: {user}});
  }

}

