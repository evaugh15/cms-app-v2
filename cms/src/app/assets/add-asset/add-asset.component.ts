import { Component, Input, OnInit } from '@angular/core';
import { AssetsService } from '../../assets.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent implements OnInit {

  @Input() itemName: string;
  @Input() itemModel: string;
  @Input() itemDes: string;
  @Input() itemSerial: string;
  @Input() itemCost: string;
  @Input() itemQty: string;

  public mode = 'Add'; //default mode
  private id: any; //asset ID
  private asset: any;

  constructor(private _myService: AssetsService, 
    private router: Router, 
    public route: ActivatedRoute) { }

    ngOnInit(): void {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('_id')) {
          this.mode = 'Edit'; /*request had a parameter _id */
          this.id = paramMap.get('_id');
  
          //request asset info based on the id
        this._myService.getItem(this.id).subscribe(
            data => {
              //read data and assign to private variable asset
              this.asset = data;
              //populate the name, model, desc, serial, cost, qty
              //notice that this is done through the two-way bindings
              this.itemName = this.asset.itemName;
              this.itemModel = this.asset.itemModel;
              this.itemDes = this.asset.itemDes;
              this.itemSerial = this.asset.itemSerial;
              this.itemCost = this.asset.itemCost;
              this.itemQty = this.asset.itemQty;
            },
            err => console.error(err),
            () => console.log('finished loading')
          );
        }
        else {
          this.mode = 'Add';
          this.id = null;
        }
      });
  
    }
  
  
    onSubmit() {
      console.log("You submitted: " + this.itemName + " " + this.itemModel + " " + this.itemDes + " " + this.itemSerial
        + " " + this.itemCost + " " + this.itemQty);
  
      if (this.mode == 'Add')
        this._myService.addItem(this.itemName ,this.itemModel, this.itemDes, this.itemSerial, this.itemCost,
        this.itemQty);
  
      if (this.mode == 'Edit')
        this._myService.updateItem(this.id, this.itemName, this.itemModel, this.itemDes, this.itemSerial, this.itemCost,
          this.itemQty);
      this.router.navigate(['/list-assets']);
    }
  
  
  }