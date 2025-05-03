import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { load, remove } from '../../store/users/users.actions';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  users: User[] = [];
  paginator: any = {};
  title: string = 'Users list';
  loading: boolean = true;

  constructor(
    private store: Store<{users: any}>,
    private router: Router, 
    private authService:AuthService,
    private route:ActivatedRoute)
    {
      this.store.select('users').subscribe(state => {
          this.users = state.users;
          this.paginator = state.paginator;
          this.loading = state.loading;
      });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.store.dispatch(load({ page:  parseInt(params.get('page') || '0' )})));
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
          this.store.dispatch(remove({id}));
      }
    });    
  }

  onEditUser(user: User){
    this.router.navigate(['users/edit', user.id]);
  }

  get admin(){
    return this.authService.isAdmin();
  }

}

