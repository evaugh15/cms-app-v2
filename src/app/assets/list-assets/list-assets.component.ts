import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../assets.service';
import { AddAssetComponent } from '../add-asset/add-asset.component';
import { MatButton } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-list-assets',
  templateUrl: './list-assets.component.html',
  styleUrls: ['./list-assets.component.scss']
})
export class ListAssetsComponent implements OnInit {

//declare variable to hold response and make it public to be accessible from components.html 
  public item: any;
  
  //initialize the call using AssetService 
  constructor(private _myService: AssetsService) { }
  ngOnInit() {
      this.getItems();
  }
  //method called OnInit
  getItems() {
      console.log(this.item)
      this._myService.getItems().subscribe(
        data => { this.item = data},
          //read data and assign to public variable assets
          err => console.error(err),
          () => console.log('finished loading')
      );
  }

  onDelete(itemId: string) {
    this._myService.deleteItem(itemId);
}

}
