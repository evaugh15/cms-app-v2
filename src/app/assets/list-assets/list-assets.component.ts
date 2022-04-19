import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../assets.service';


@Component({
  selector: 'app-list-assets',
  templateUrl: './list-assets.component.html',
  styleUrls: ['./list-assets.component.scss']
})
export class ListAssetsComponent implements OnInit {

//declare variable to hold response and make it public to be accessible from components.html 
  public items: any;
  
  //initialize the call using AssetService 
  constructor(private _myService: AssetsService) { }
  ngOnInit() {
      this.getItems();
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
