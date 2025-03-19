import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit 
{
  
  users: User[] = [];

  constructor(private service: UserService, private sharingData: SharingDataService, private router:Router){
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
    this.addUser();
    this.deleteUser();
    this.findUserById();
  }

  findUserById(){
    this.sharingData.findUserByIdEventEmitter.subscribe(id => {
      const user = this.users.find(user => user.id == id);
      this.sharingData.selectUserEventEmitter.emit(user);
    })
  }

  addUser() {
    this.sharingData.newUserEventEmmiter.subscribe(user => {
      if(user.id){
        this.service.update(user).subscribe(
          { next: (userUpdated) => {
              this.users = this.users.map(usuario => (usuario.id == user.id) ? {... userUpdated} : usuario);
              this.router.navigate(['/users'], {state:{users: this.users}});
              Swal.fire({
                title: "Exito!",
                text: "Se a actualizado el usuario correctamente!",
                icon: "success"
              });
            },
            error: (err) => {
              //console.log(err.error);
              if(err.status == 400){
                this.sharingData.errrosUserFormEventEmitter.emit(err.error);
              }
            }
          }
        )
      }
      else{
        this.service.create(user).subscribe({
          next: userNew => {
            this.users = [... this.users, { ... userNew } ];
            this.router.navigate(['/users'], {state:{users: this.users}});
            Swal.fire({
              title: "Exito!",
              text: "Se a agregado el usuario correctamente!",
              icon: "success"
            });
          },
          error: (err) => {
            //console.log(err.error);
            if(err.status == 400){
              this.sharingData.errrosUserFormEventEmitter.emit(err.error);
            }
          }})
      }
    });
  }

  deleteUser(){
      this.sharingData.idUserEventEmitter.subscribe(id => {
        this.service.delete(id).subscribe(() => {
            this.users = this.users.filter(user => user.id != id);
            this.router.navigate(['/users/create'], {skipLocationChange:true}).then(() => {
            this.router.navigate(['/users'], {state:{users: this.users}});
          });
        });
        
        Swal.fire({
          title: "Exito!",
          text: "Se a eliminado el usuario correctamente!",
          icon: "success"
        });

      });
  }

}
