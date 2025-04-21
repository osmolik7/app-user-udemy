import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(private authSerivce:AuthService, private router:Router){  }

  get login(){
    return this.authSerivce.user;
  }
  get admin(){
    return this.authSerivce.isAdmin();
  }

  handlerLogout(){
    this.authSerivce.logout();
    this.router.navigate(['/login']);

  }

}
