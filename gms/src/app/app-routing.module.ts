import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./shared/auth.guard";
import {PostGrievanceComponent} from "./post-grievance/post-grievance.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {AllUsersComponent} from "./all-users/all-users.component";
import {ApprovalRequestComponent} from "./approval-request/approval-request.component";
import {AccountComponent} from "./account/account.component";
import {MyGrievanceComponent} from "./my-grievance/my-grievance.component";
import {UserGuard} from "./shared/user.guard";
import {AdminGuard} from "./shared/admin.guard";
import {ErrorComponent} from "./error/error.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'post-grievance', component: PostGrievanceComponent, canActivate: [AuthGuard, UserGuard]},
  {path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'users', component: AllUsersComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'user-approval-request', component: ApprovalRequestComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'my-grievances', component: MyGrievanceComponent, canActivate: [AuthGuard, UserGuard]},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
