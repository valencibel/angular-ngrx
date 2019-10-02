import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/app.reducers';
import { AddUserAction, UpdateUserAction } from '../user.actions';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user = new User('', '');
  show: boolean;

  constructor(private store: Store<AppState>, public dialogRef: MatDialogRef<SignUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id?: number, email?: string, password?: string, typeOperation?: string}) { }

  ngOnInit() {
    console.log(this.data);
    this.data.typeOperation == 'show' ? this.show = true : this.show = false;
    console.log(this.show);
  }

  onSubmit(): void {
    if(this.data.typeOperation == 'create'){
      console.log('add');
      const action = new AddUserAction(this.data.email, this.data.password);
      this.store.dispatch(action);
      this.close();
    } else if(this.data.typeOperation == 'update') {
      console.log('update');
      const action = new UpdateUserAction(this.data.id, this.data.email, this.data.password);
      this.store.dispatch(action);
      this.close();
    } 
  }

  close(): void {
    this.dialogRef.close();
  }

}
