import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import { SessionService } from 'src/app/core/services/session.service';
import { UsersService } from 'src/app/core/services/users.service';
import { IUser } from 'src/app/shared/models/user.model';
import { nameRoutes } from 'src/app/shared/types/nameRoutes.type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  
  loading: boolean = false;
  user: IUser = {};
  nameRoutes = nameRoutes;
  validDate: boolean = false;
  dni: number = 0;
  dniUser: number = 0;
  deleted: boolean = false;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private sessionService: SessionService,
    private router: Router,
    ) {
   }

  ngOnInit(): void {
    Promise.resolve(this.loadCustomer());
    this.loading = true;
    
  }

  async loadCustomer(){
    this.loading = true;
    this.dni = Number(this.activatedRoute.snapshot.paramMap.get('dni'));

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.sessionService.token);

    this.dniUser = Number( decodedToken.certserialnumber );

    this.usersService.getCustomer(Number(this.dni)).subscribe(data => {
      this.user = data.user;
      var start = new Date(this.user?.birthdate!);
      this.validDate = start.getFullYear() > 1;
      this.loading = false;
    }, err => {
      this.loading = false;
      console.error(err)
    });
  }

  deleteUser() {
    try {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(this.sessionService.token);
  
      const dniActiveUser = Number( decodedToken.certserialnumber );
      let textAlertDelete = '';
      if( dniActiveUser !== this.dni ) textAlertDelete  = `Confirma para eliminar a ${this.user.name}`;
      else textAlertDelete = `Confirma para eliminar tus datos`

      Swal.fire({
        title: '¿Estás seguro?',
        icon: 'warning',
        text: textAlertDelete,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `Confirmar`,
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: "btn btn-danger"
        }
      }).then(resp => {

        if (resp.value) {

          Swal.fire({
            title: 'Espere',
            text: 'Guardando información',
            icon: 'info',
            allowOutsideClick: false
          });
          Swal.showLoading();

          this.usersService.deleteCustomers(this.dni).subscribe();
          this.deleted = true;

          Swal.fire({
            title: `${this.user.name}`,
            text: 'Se eliminó correctamente',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success"
            }
          });
          if( dniActiveUser === this.dni ){
            this.sessionService.endSession()
          }
        }

      });
    }
    catch {
      this.router.navigate(['/' + nameRoutes.home ])
    }
  }

}
