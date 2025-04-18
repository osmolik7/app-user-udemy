import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  user: User;
  isSubmitting:boolean = false;

  constructor(private sharingData:SharingDataService){
    this.user = new User();
  }

  onSubmit(){
    this.isSubmitting = true;
    if(!this.user.username || !this.user.password){
      Swal.fire(
        'Error de validacion',
        'Username y password requeridos',
        'error'
      );
      this.isSubmitting = false;
    }
    else{
      this.sharingData.handlerLoginEventEmitter.emit({username: this.user.username, password:this.user.password});
      this.isSubmitting = false;
    }
  }


}
