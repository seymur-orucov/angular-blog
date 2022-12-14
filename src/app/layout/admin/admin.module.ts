import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";
import {AdminComponent} from './admin.component';
import {LoginComponent} from '../../pages/admin/login/login.component';
import {DashboardComponent} from '../../pages/admin/dashboard/dashboard.component';
import {CreateComponent} from '../../pages/admin/create/create.component';
import {EditComponent} from '../../pages/admin/edit/edit.component';
import {AuthService} from "../../services/auth.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    DashboardComponent,
    CreateComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginComponent},
          {path: 'dashboard', component: DashboardComponent},
          {path: 'create', component: CreateComponent},
          {path: 'posts/:id/edit', component: EditComponent},
        ],
      },
    ],
      ),
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AdminModule {
}
