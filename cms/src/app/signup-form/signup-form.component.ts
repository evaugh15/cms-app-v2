import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  form: FormGroup = new FormGroup({

    firstName: new FormControl(''),

    lastName: new FormControl(''),

    username: new FormControl (''),

    password: new FormControl(''),

  });

  submit() {

    if (this.form.valid) {

      this.submitEM.emit(this.form.value);

    }

  }

  @Input() error!: string | null;

  @Output() submitEM = new EventEmitter()

  constructor() { }

  ngOnInit(): void {

  }

}
