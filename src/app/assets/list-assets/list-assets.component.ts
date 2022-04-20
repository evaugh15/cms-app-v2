import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../assets.service';
import { SimplerequestService } from '../../simplerequest.service'; 
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-list-assets',
  templateUrl: './list-assets.component.html',
  styleUrls: ['./list-assets.component.scss']
})
export class ListAssetsComponent implements OnInit {

//declare variable to hold response and make it public to be accessible from components.html 
  public items: any;
  
  assetsRequest = [];
  //initialize the call using AssetService 
  constructor(private _myService: AssetsService, private _simpleRequestService:SimplerequestService, private _router: Router) { }
  ngOnInit() {
      this.getItems();
      this._simpleRequestService.getAssets().subscribe(
        res => this.assetsRequest = res,
        err => {
          if(err instanceof HttpErrorResponse) {
            if(err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }
  //method called OnInit
  getItems() {
      console.log(this.items)
      this._myService.getItems().subscribe(
        data => { this.items = data},
          //read data and assign to public variable assets
          err => console.error(err),
          () => console.log('finished loading')
      );
  }

  onDelete(itemId: string) {
    this._myService.deleteItem(itemId);
}

}
