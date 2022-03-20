import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AssetsService {

    constructor(private http:HttpClient) {}

    // Uses http.get() to load data 
    getItems() {
        return this.http.get('http://localhost:8000/devices');
    }

    //Uses http.post() to post data 
addCapstone(itemName: string, itemModel: string, itemDes: string, itemSerial: string, itemCost: string, itemQty: string) 
    {
    this.http.post('http://localhost:8000/devices',{ itemName, itemModel, itemDes, itemSerial, itemCost, itemQty })
        .subscribe((responseData) => {
            console.log(responseData);
        }); 
    }

    updateCapstone(capstoneId: string, itemName: string, itemModel: string, itemDes: string, itemSerial: string, itemCost: string, itemQty: string) 
    {
        //request path http://localhost:8000/assets/5xbd456xx 
        //asset information will be send as HTTP body parameters 
       this.http.put("http://localhost:8000/devices/" + 
       capstoneId, { itemName, itemModel, itemDes, itemSerial, itemCost, itemQty })
        .subscribe(() => {
            console.log('Updated: ' + capstoneId);
        });
    }

    //Uses http.get() to request data based on student id 
    getCapstone(capstoneId: string) {
        return this.http.get('http://localhost:8000/devices/'+ capstoneId);
    }

    deleteItem(capstoneId: string) {
        this.http.delete("http://localhost:8000/devices/" + capstoneId)
            .subscribe(() => {
                console.log('Deleted: ' + capstoneId);
            });
        location.reload();
    }
  }
