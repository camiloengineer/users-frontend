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
import { IUser } from 'src/app/shared/models/user.model';
import { nameRoutes } from 'src/app/shared/types/nameRoutes.type';
import { DniToNumberPipe } from 'src/app/shared/pipes/dni-to-number.pipe'
import { IAuthenticateRequest } from 'src/app/shared/models/authenticate.model';
import { avatar } from 'src/app/shared/types/avatar.type';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;
  userPasswordIncorrect: boolean = false;
  buttonUI = {
    loading: false,
    enabled: true
  };
  nameRoutes = nameRoutes;

  avatars: string[] = [
    avatar.aquaman,
    avatar.batman,
    avatar.daredevil,
    avatar.hulk,
    avatar.linterna,
    avatar.spiderman,
    avatar.wolverine
  ];

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private usersService: UsersService,
    private dniToNumberPipe: DniToNumberPipe
  ) {
    this.registerForm = this.createFormGroup();
  }

  ngOnInit(): void {

  }

  createFormGroup() {
    return new FormGroup({
      textDNI: new FormControl("", [Validators.required, Validators.minLength(2), DNIValidator]),
      textName: new FormControl("", [Validators.required, Validators.minLength(5)]),
      textEmail: new FormControl("", [Validators.required, Validators.email]),
      textPassword: new FormControl("", [Validators.required, Validators.minLength(6)]),
    })
  }

  async onSubmitForm() {
   if (this.registerForm.valid) {
      this.buttonUI.loading = true;

      var randomNumber = Math.floor(Math.random() * this.avatars.length);
      let user: IUser = {
          dni: this.dniToNumberPipe.transform(this.registerForm.get('textDNI')?.value),
          password: this.registerForm.get('textPassword')?.value.toString(),
          email: this.registerForm.get('textEmail')?.value.toString(),
          name: this.registerForm.get('textName')?.value.toString(),
          avatar: this.avatars[randomNumber],
          active: true
      }

      debugger;

      this.usersService.postCreateCustomer(user).subscribe(data => {
        let authenticateRequest: IAuthenticateRequest = {
          dni: user.dni!,
          password: user.password!
        }

        this.usersService.postAuthenticate(authenticateRequest).subscribe(data => {
          this.sessionService.token = data.token;
          this.router.navigate([nameRoutes.home]);
        }, err => {
          console.error(err)
          this.buttonUI.loading = false;
        });
      }, err => {
        console.error(err)
        this.userPasswordIncorrect = true;
        this.buttonUI.loading = false;
      });
   }
  }

}
