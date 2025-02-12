import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {
  private _newUserEventEmmiter: EventEmitter<User> = new EventEmitter();
  private _idUserEventEmitter: EventEmitter<number> = new EventEmitter();
  private _findUserByIdEventEmitter = new EventEmitter();
  private _selectUserEventEmitter = new EventEmitter();


  constructor() { }

  get newUserEventEmmiter(): EventEmitter<User>{
    return this._newUserEventEmmiter;
  }

  get idUserEventEmitter(): EventEmitter<number>{
    return this._idUserEventEmitter;
  }

  get findUserByIdEventEmitter(){
    return this._findUserByIdEventEmitter;
  }

  get selectUserEventEmitter(){
    return this._selectUserEventEmitter;
  }
}
