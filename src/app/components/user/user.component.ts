import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';

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
  
  
  constructor(private service:UserService, private router: Router, private sharingData:SharingDataService, private route:ActivatedRoute){ 
    if(this.router.getCurrentNavigation()?.extras.state){
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
    }
  }

  ngOnInit(): void {
    if(this.users == undefined || this.users == null || this.users.length == 0){
      console.log('consutlafindall');
      //this.service.findAll().subscribe(users => this.users = users);
      this.route.paramMap.subscribe(params => {
        const page = parseInt(params.get('page') || '0' );
        console.log(page);
        this.service.findAllPageable(page).subscribe(pageable => {
          this.users = pageable.content as User[];
          this.paginator = pageable;
          this.sharingData.pageUsersEventEmitter.emit({users:this.users, paginator: this.paginator});
        });
      })
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
    this.router.navigate(['users/edit', user.id]);
  }

}

