import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    {
    id: 1,
    name:'Alejandro',
    lastname: 'Camacho',
    email: 'camacho044@gmail.com',
    username: 'camachon',
    password: '12245455'
    },
    {
      id: 2,
      name:'Josefa',
      lastname: 'Doe',
      email: 'josefadoe@gmail.com',
      username: 'pepa',
      password: '55555555'
    }
  ];

  constructor() { }

  findAll(): Observable<User[]> {
    return of(this.users);
  }

}
