import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  user: User;
  
  constructor( private sharingData:SharingDataService, private route: ActivatedRoute){
    this.user = new User();
    
  }
  ngOnInit(): void {
    this.sharingData.selectUserEventEmitter.subscribe(user => {
      this.user = user;
    })

   this.route.paramMap.subscribe(params => {
    const id:number =  parseInt(params.get('id') || '0');
    if(id > 0){
      this.sharingData.findUserByIdEventEmitter.emit(id);
    }
   });
   
  }

  onSubmit(userForm: NgForm) : void{
    if(userForm.valid){
      this.sharingData.newUserEventEmmiter.emit(this.user);
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
  
}
