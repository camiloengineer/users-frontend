import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { LoginComponent } from './views/login/login.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { InputDNIDirective } from './shared/directives/input-dni.directive';
import { HomeComponent } from './views/home/home.component';
import { RegisterComponent } from './views/register/register.component';
import { DniToNumberPipe } from './shared/pipes/dni-to-number.pipe';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { DetailComponent } from './views/detail/detail.component';
import { CardComponent } from './shared/components/card/card.component';
import { LoadingFullComponent } from './shared/components/loading-full/loading-full.component';
import { DniFormatPipe } from './shared/pipes/dni-format.pipe';
import { MyInfoComponent } from './views/my-info/my-info.component';
import { RegExpDirective } from './shared/directives/reg-exp.directive'
import { DatePipe } from '@angular/common';
import { UserFormComponent } from './shared/components/user-form/user-form.component';
import { CreateUserComponent } from './views/create-user/create-user.component';
import { EditUserComponent } from './views/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    SpinnerComponent,
    InputDNIDirective,
    HomeComponent,
    RegisterComponent,
    DniToNumberPipe,
    NavbarComponent,
    DetailComponent,
    CardComponent,
    LoadingFullComponent,
    DniFormatPipe,
    MyInfoComponent,
    RegExpDirective,
    UserFormComponent,
    CreateUserComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    DniToNumberPipe,
    DniFormatPipe,
    DatePipe,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
