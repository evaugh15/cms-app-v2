import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAssetComponent } from './assets/add-asset/add-asset.component';
import { DeleteAssetComponent } from './assets/delete-asset/delete-asset.component';
import { EditAssetComponent } from './assets/edit-asset/edit-asset.component';
import { ListAssetsComponent } from './assets/list-assets/list-assets.component';
import { ViewAssetComponent } from './assets/view-asset/view-asset.component';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { ViewUserComponent } from './users/view-user/view-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }, //home path
  { path: 'login', component: LoginFormComponent}, //login path
  { path: 'signup', component: SignupFormComponent}, //signup path

// paths for User Module
  { path: 'create-user', component: AddUserComponent },
 //{ path: 'view-user/:id', component: ViewUserComponent },
  { path: 'list-users', component: ListUsersComponent },
 //{ path: 'delete-user/:id', component: DeleteUserComponent },
  { path: 'edit-user/:_id', component: AddUserComponent },

// paths for Asset Module
  { path: 'assets', component: AddAssetComponent },
  //{ path: 'viewAsset/:id', component: ViewAssetComponent },
  { path: 'listassets', component: ListAssetsComponent },
  //{ path: 'deleteasset/:id', component: DeleteAssetComponent },
  { path: 'editAssets/:_id', component: AddAssetComponent },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//export const routingComponents = [LoginFormComponent]
