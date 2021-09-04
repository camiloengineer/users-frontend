import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { Router, } from "@angular/router";
import { SessionService } from '../../core/services/session.service';
import { DNIValidator } from 'src/app/shared/validators/dni.validator';
import { UsersService } from 'src/app/core/services/users.service';
import { IAuthenticateRequest } from 'src/app/shared/models/authenticate.model';
import { nameRoutes } from 'src/app/shared/types/nameRoutes.type';
import { DniToNumberPipe } from 'src/app/shared/pipes/dni-to-number.pipe'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  userPasswordIncorrect: boolean = false;
  buttonUI = {
    loading: false,
    enabled: true
  };
  nameRoutes = nameRoutes;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private usersService: UsersService,
    private dniToNumberPipe: DniToNumberPipe
  ) {
    this.loginForm = this.createFormGroup();
  }

  ngOnInit(): void {

  }

  createFormGroup() {
    return new FormGroup({
      textDNI: new FormControl("", [Validators.required, Validators.minLength(2), DNIValidator]),
      textPassword: new FormControl("", [Validators.required]),
    })
  }

  async onSubmitForm() {
   if (this.loginForm.valid) {
      this.buttonUI.loading = true;

      let authenticateRequest: IAuthenticateRequest = {
        dni: this.dniToNumberPipe.transform(this.loginForm.get('textDNI')?.value),
        password: this.loginForm.get('textPassword')?.value.toString()
      }

      this.usersService.postAuthenticate(authenticateRequest).subscribe(data => {
        this.sessionService.token = data.token;
        this.router.navigate([nameRoutes.home]);
      }, err => {
        console.error(err);
        this.userPasswordIncorrect = true;
        this.buttonUI.loading = false;
      });
   }
  }
}
