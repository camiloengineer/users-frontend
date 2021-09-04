
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NoLoginGuard } from './core/guards/no-login.guard';
import { nameRoutes } from './shared/types/nameRoutes.type';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { RegisterComponent } from './views/register/register.component';
import { DetailComponent } from './views/detail/detail.component';
import { MyInfoComponent } from './views/my-info/my-info.component';
import { CreateUserComponent } from './views/create-user/create-user.component';
import { EditUserComponent } from './views/edit-user/edit-user.component';

const routes: Routes = [
  { path: nameRoutes.home, component: HomeComponent, canActivate: [AuthGuard] },
  { path: nameRoutes.login, component: LoginComponent,  canActivate: [NoLoginGuard] },
  { path: nameRoutes.register, component: RegisterComponent, canActivate: [NoLoginGuard] },
  { path: `${ nameRoutes.myInfo }/:dni`, component: MyInfoComponent, canActivate: [AuthGuard] },
  { path: `${ nameRoutes.detail }/:dni` , component: DetailComponent, canActivate: [AuthGuard] },
  { path: nameRoutes.createUser , component: CreateUserComponent, canActivate: [AuthGuard] },
  { path: `${ nameRoutes.editUser }/:dni` , component: EditUserComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: nameRoutes.home, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
