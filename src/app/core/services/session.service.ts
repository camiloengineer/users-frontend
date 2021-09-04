import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from 'src/app/shared/models/user.model';
import { storage } from 'src/app/shared/types/storage.type';
import { Router } from "@angular/router";
import { nameRoutes } from 'src/app/shared/types/nameRoutes.type';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  nameRoutes = nameRoutes;

  constructor(
    private router: Router,
  ) { }
  
  activeSession(): boolean {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.token);

    if (!decodedToken) {
      return false
    }

    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);

    const now = new Date();
    if (expirationDate > now) return true;
    else return false;
  }

  public set token(token: string) {
    localStorage.setItem(storage.accessToken, token)
  }

  public get token(): string {
    const result = localStorage.getItem(storage.accessToken) || '';
    return result;
  }

  public endSession(){
    localStorage.removeItem(storage.accessToken);
    this.router.navigate([ `/${ nameRoutes.login }`])
  }
}
