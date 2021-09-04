import { Component, OnInit } from '@angular/core';
import { nameRoutes } from 'src/app/shared/types/nameRoutes.type';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  nameRoutes = nameRoutes;
  
  constructor() { }

  ngOnInit(): void {
  }

}
