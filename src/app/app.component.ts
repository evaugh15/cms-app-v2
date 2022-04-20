import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CMS APPLICATION';

  constructor(private matDialog: MatDialog, public _authenticationService: AuthenticationService) {

  }

  onOpenDialog(){
    this.matDialog.open(DialogComponent);
  }
}
