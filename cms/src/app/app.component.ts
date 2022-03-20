import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CMS APPLICATION';

  constructor(private matDialog: MatDialog) {

  }

  onOpenDialog(){
    this.matDialog.open(DialogComponent);
  }
}
