import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ListAssetsComponent } from './list-assets/list-assets.component';
import { ViewAssetComponent } from './view-asset/view-asset.component';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { EditAssetComponent } from './edit-asset/edit-asset.component';
import { DeleteAssetComponent } from './delete-asset/delete-asset.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ListAssetsComponent,
    ViewAssetComponent,
    AddAssetComponent,
    EditAssetComponent,
    DeleteAssetComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    AppRoutingModule
  ],
  exports: [
    ListAssetsComponent,
    ViewAssetComponent,
    AddAssetComponent,
    EditAssetComponent,
    DeleteAssetComponent
  ]
})
export class AssetsModule { }
