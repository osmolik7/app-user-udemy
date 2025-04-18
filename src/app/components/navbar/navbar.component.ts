import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  @Input() users: User[] = [];
  @Input() paginator = {};

  constructor(private authSerivce:AuthService){

  }

  get login(){
    return this.authSerivce.user;
  }



}
