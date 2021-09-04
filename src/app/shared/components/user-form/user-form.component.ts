import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray
} from "@angular/forms";
import { ActivatedRoute, Router, } from "@angular/router";
import { DNIValidator } from 'src/app/shared/validators/dni.validator';
import { avatar } from 'src/app/shared/types/avatar.type';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';
import { nameRoutes } from 'src/app/shared/types/nameRoutes.type';
import { DniFormatPipe } from 'src/app/shared/pipes/dni-format.pipe';
import { DatePipe } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SessionService } from 'src/app/core/services/session.service';
import { DniToNumberPipe } from '../../pipes/dni-to-number.pipe';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;
  user: IUser = {};
  success: boolean = false;
  disableSelect = new FormControl(false);
  active: boolean = false;
  setFormActive: boolean = false;
  loading: boolean = false;
  idEdit: string = '';
  textHeader: string = '';
  dni: number = 0;
  validDate: boolean = false;
  nameRoutes = nameRoutes;
  isActiveUser: boolean = false;
  newPassword: string = '';
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
    private usersService: UsersService,
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dniFormatPipe: DniFormatPipe,
    private datePipe: DatePipe,
    private dniToNumberPipe: DniToNumberPipe
  ) {
    this.userForm = this.createFormGroup();
  }

  ngOnInit(): void {
    Promise.resolve(this.getData());
  }

  createFormGroup() {
    return new FormGroup({
      textName: new FormControl("", [Validators.required, Validators.minLength(5)]),
      textDNI: new FormControl("", [Validators.required, Validators.minLength(2), DNIValidator]),
      textBirthDate: new FormControl("", [Validators.required]),
      textEmail: new FormControl("", [Validators.required, Validators.email]),
      textPhone: new FormControl("", [Validators.required, Validators.min(10000000)]),
      textPassword: new FormControl("", [Validators.required, Validators.minLength(6)]),
      selectedAvatar: new FormControl(""),
    })
  }

  async getData() {
    try {
      this.loading = true;
      this.dni = Number(this.activatedRoute.snapshot.paramMap.get('dni'));
      if (this.dni) {

        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(this.sessionService.token);
    
        this.isActiveUser = Number( decodedToken.certserialnumber ) === this.dni;

        if (  this.isActiveUser   )this.textHeader = "Mis Datos"
        else this.textHeader = "Editar Usuario"

        this.usersService.getCustomer(Number(this.dni)).subscribe(data => {
          this.user = data.user;
          var start = new Date(this.user?.birthdate!);
          this.validDate = start.getFullYear() > 1;
          const birthdate = new Date(this.user.birthdate!)
          
          this.userForm.get('textDNI')?.setValue(this.dniFormatPipe.transform(this.user.dni));
          this.userForm.get('textDNI')?.disable();
          this.userForm.get('textName')?.setValue(this.user.name);
          this.userForm.get('textBirthDate')?.setValue( this.validDate ? this.datePipe.transform( birthdate, 'YYYY-MM-dd') : '');
          this.userForm.get('textEmail')?.setValue( this.user.email );
          this.userForm.get('textPhone')?.setValue( this.user.phone );
          this.userForm.get('textPassword')?.setValue( "this is a password" );
          this.userForm.get('selectedAvatar')?.setValue( this.user.avatar );

          this.user.newPassword = this.user.password
          this.active = this.user.active!;
          this.loading = false;
        }, err => {
          this.loading = false;
          console.error(err)
        });
      }
      else {

        var randomNumber = Math.floor(Math.random() * this.avatars.length);
        this.user.avatar = this.avatars[randomNumber];
        this.user.active = true;
        this.textHeader = "Crear usuario"
        this.loading = false;
      }
    }
    catch (err) {
      console.error(err);
      this.router.navigate([ '/' + nameRoutes.home ]);
    }
  }

  changeAvatar(deviceValue: any) {
    this.user.avatar = deviceValue;
  }

  changeName(e: any) {
    this.user.name = this.userForm.controls.textName.value
  }

  changeEmail(e: any) {
    this.user.email = this.userForm.controls.textEmail.value
  }

  changeRut(e: any) {
    if (!this.userForm.get('textDNI')?.errors){
      this.user.dni = this.dniToNumberPipe.transform(this.userForm.controls.textDNI.value)
    }
    else{
      this.user.dni = undefined;
    }
  }

  clearPassword(e: any) {
    if(  this.userForm.get('textPassword')?.pristine){
      this.userForm.get('textPassword')?.setValue("")
    }
  }

  setPassword(e: any) {
    this.newPassword = this.userForm.controls.textPassword.value;
  }

  setActive(){
    this.setFormActive = true;
    this.user.active = !this.user.active;
  }


  async onSaveForm() {
    if (this.userForm.valid) {

      try {
        Swal.fire({
          title: 'Espere',
          text: 'Se está guardando la información',
          icon: 'info',
          allowOutsideClick: false
        });
        Swal.showLoading();

        let user: IUser = {
          guid: this.user.guid,
          name: this.userForm.controls.textName.value,
          dni: this.dniToNumberPipe.transform(this.userForm.controls.textDNI.value),
          email: this.userForm.controls.textEmail.value,
          phone: Number( this.userForm.controls.textPhone.value),
          birthdate: new Date(this.userForm.controls.textBirthDate.value),
          active: this.user.active,
          avatar: this.user.avatar,
          password : this.user.password || this.newPassword,
          newPassword: this.newPassword
        }

        console.log(JSON.stringify(user));

        let request: Observable<any>;

        if (this.dni ) {
          request = this.usersService.postUpdateCustomer(user);
        } else {
          request = this.usersService.postCreateCustomer(user);
        }

        request.subscribe(data => {
          Swal.fire({
            title: `${user.name}`,
            text: 'Se guardó correctamente',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success"
            }
          });
          this.success = true;
        });
      }
      catch (err) {
        console.error(err);
        this.router.navigate([nameRoutes.home]);;
      }
    }
  }

}
