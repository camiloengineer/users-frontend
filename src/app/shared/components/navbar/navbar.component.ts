import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import { nameRoutes } from '../../types/nameRoutes.type';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SessionService } from 'src/app/core/services/session.service';
import { storage } from '../../types/storage.type';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  collapse: boolean = true;
  logout: boolean = false;
  nameRoutes = nameRoutes;
  dni: number = 0;
  name: string = '';


  constructor(
    private router: Router,
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.sessionService.token);

    this.dni = Number( decodedToken.certserialnumber );
    this.name =  decodedToken.unique_name.toString() ;
  }

  endSession(){
    this.sessionService.endSession()
  }

}
