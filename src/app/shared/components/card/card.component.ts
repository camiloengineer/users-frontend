import { Component, Input, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SessionService } from 'src/app/core/services/session.service';
import { IUser } from '../../models/user.model';
import { Router } from "@angular/router";
import { nameRoutes } from '../../types/nameRoutes.type';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() user!: IUser;
  @Input() showButton!: boolean;
  nameRoutes = nameRoutes;
  img: string = '';
  dni: number = 0;
  
  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.sessionService.token);

    this.dni = Number( decodedToken.certserialnumber );
    
    this.img = `/assets/img/${ this.user?.avatar } + '.png`
  }

}
