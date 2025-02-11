import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from "./user/user.component";
import { UserFormComponent } from './user-form/user-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserComponent, UserFormComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit {
  title: string = 'Users list';
  users: User[] = [];
  user!: User;
  open: boolean = false;

  constructor(private service: UserService){
    this.user = new User();
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
  }

  addUser(user:User):void {
    if(user.id){
      this.users = this.users.map(usuario => (usuario.id == user.id) ? {... user} : usuario);
      Swal.fire({
        title: "Exito!",
        text: "Se a actualizado el usuario correctamente!",
        icon: "success"
      });
    }
    else{
      this.users = [... this.users, {... user, id:this.users.length+1}];
      Swal.fire({
        title: "Exito!",
        text: "Se a agregado el usuario correctamente!",
        icon: "success"
      });
    }
    this.user = new User();
    this.setOpen();
  }

  deleteUser(id: number){
    this.users = this.users.filter(user => user.id != id);
    Swal.fire({
      title: "Exito!",
      text: "Se a eliminado el usuario correctamente!",
      icon: "success"
    });
  }

  editUser(userRow: User){
    this.user = {... userRow};
    this.open = true;
  }

  setOpen(){
    this.open = !this.open;
  }

}
