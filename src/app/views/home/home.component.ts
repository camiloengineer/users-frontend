import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SessionService } from 'src/app/core/services/session.service';

import { UsersService } from 'src/app/core/services/users.service';
import { IUser } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: IUser[] = [];
  loading: boolean = false;

  constructor(
    private usersService: UsersService,
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void {
    Promise.resolve(this.loadUsers());
  }

  async loadUsers(){
    this.loading = true;
    this.usersService.getCustomers().subscribe(data => {

      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(this.sessionService.token);
  
      const dniUser = Number( decodedToken.certserialnumber );

      const activeUser = data.user.find(user => user.dni === dniUser);
      const restUsers = data.user.filter(user => user.dni !== dniUser)

      this.users.unshift( activeUser! );
      this.users.push(...restUsers);

      this.loading = false;
    }, err => {
      this.loading = false;
      console.error(err)
    });

  }

}
