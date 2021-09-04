import { Component, OnInit } from '@angular/core';
import { nameRoutes } from 'src/app/shared/types/nameRoutes.type';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  nameRoutes = nameRoutes;
  
  constructor() { }

  ngOnInit(): void {
  }

}
