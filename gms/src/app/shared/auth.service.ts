import { Injectable } from '@angular/core';
import {LocalStorageUtil} from "../../localStorageUtil";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn() {
    return !!LocalStorageUtil.getStorage().token;
  }

  isAdmin() {
    return LocalStorageUtil.getStorage().is_admin;
  }

  isUser() {
    return !LocalStorageUtil.getStorage().is_admin;
  }

}
