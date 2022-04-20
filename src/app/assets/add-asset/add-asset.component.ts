import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssetsService } from '../../assets.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent implements OnInit {
  assetForm: FormGroup = new FormGroup({
    itemName: new FormControl(null, [ Validators.required]),
    itemModel: new FormControl(null, [Validators.required]),
    itemDes: new FormControl(null, [ Validators.required]),
    itemSerial: new FormControl(null, [ Validators.required]),
    itemCost: new FormControl(null, [Validators.required]),
    itemQty: new FormControl(null, Validators.required)
  });


  // @Input() itemName: string = "";
  // @Input() itemModel: string = "";
  // @Input() itemDes: string = "";
  // @Input() itemSerial: string = "";
  // @Input() itemCost: string = "";
  // @Input() itemQty: string = "";

  public mode = 'Add'; //default mode
  private id: any; //asset ID
  private asset: any;

// profileForm = this.fb.group({
//   itemName: ['', Validators.required],
//   itemModel: ['', Validators.required],
//   itemDes: [''],
//   itemSerial: [''],
//   itemCost: [''],
//   itemQty: ['']
// })

  constructor(
  private fb: FormBuilder,
  private _myService: AssetsService, 
  private _router: Router, 
  public route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if (paramMap.has('_id')) {
    //     this.mode = 'Edit'; /*request had a parameter _id */
    //     this.id = paramMap.get('_id');

    //     //request asset info based on the id
    //     this._myService.getItem(this.id).subscribe(
    //       data => {
    //         //read data and assign to private variable asset
    //         this.asset = data;
    //         //populate the name, model, desc, serial, cost, qty
    //         //notice that this is done through the two-way bindings
    //         this.itemName = this.asset.itemName;
    //         this.itemModel = this.asset.itemModel;
    //         this.itemDes = this.asset.itemDes;
    //         this.itemSerial = this.asset.itemSerial;
    //         this.itemCost = this.asset.itemCost;
    //         this.itemQty = this.asset.itemQty;
    //       },
    //       err => console.error(err),
    //       () => console.log('finished loading')
    //     );
    //   }
    //   else {
    //     this.mode = 'Add';
    //     this.id = null;
    //   }
    // });

  }


  submitForm() {
    if (!this.assetForm.valid) {
      console.log("INVALID FORM"); return;
    } else {
      this._myService.addedAsset(this.assetForm.value).subscribe(
        res => {
          console.log(res)
          this._router.navigate(['/listassets'])
        },
        err => console.log(err)
      )
      console.log(JSON.stringify(this.assetForm.value))
    }
  }

  // onSubmit() {
  //   console.log("You submitted: " + this.itemName + " " + this.itemModel + " " + this.itemDes + " " + this.itemSerial
  //     + " " + this.itemCost + " " + this.itemQty);

  //   if (this.mode == 'Add')
  //     this._myService.addItem(this.itemName ,this.itemModel, this.itemDes, this.itemSerial, this.itemCost,
  //     this.itemQty);

  //   if (this.mode == 'Edit')
  //     this._myService.updateItem(this.id, this.itemName, this.itemModel, this.itemDes, this.itemSerial, this.itemCost,
  //       this.itemQty);
  //   alert("Asset information saved!")    
  //   this.router.navigate(['/listassets']);
  // } 


}