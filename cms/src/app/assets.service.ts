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
addItem(itemName: string, itemModel: string, itemDes: String, itemSerial: string, itemCost: string, itemQty: string) 
    {
    this.http.post('http://localhost:8000/devices',{ itemName, itemModel, itemDes, itemSerial, itemCost, itemQty })
        .subscribe((responseData) => {
            console.log(responseData);
        }); 
    }

    updateItem(itemId: string, itemName: string, itemModel: string, itemDes: String, itemSerial: string, itemCost: string, itemQty: string) 
    {
        //request path http://localhost:8000/assets/5xbd456xx 
        //asset information will be send as HTTP body parameters 
       this.http.put("http://localhost:8000/devices/" + 
       itemId, { itemName, itemModel, itemDes, itemSerial, itemCost, itemQty })
        .subscribe(() => {
            console.log('Updated: ' + itemId);
        });
    }

    //Uses http.get() to request data based on student id 
    getItem(itemId: string) {
        return this.http.get('http://localhost:8000/devices/'+ itemId);
    }

    deleteItem(itemId: string) {
        this.http.delete("http://localhost:8000/devices/" + itemId)
            .subscribe(() => {
                console.log('Deleted: ' + itemId);
            });
        location.reload();
    }
         
}