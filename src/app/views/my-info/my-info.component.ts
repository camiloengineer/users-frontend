import { Component, OnInit } from '@angular/core';
import { nameRoutes } from 'src/app/shared/types/nameRoutes.type';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.scss']
})
export class MyInfoComponent implements OnInit {

  nameRoutes = nameRoutes;
  
  constructor() { }

  ngOnInit(): void {
  }

}
