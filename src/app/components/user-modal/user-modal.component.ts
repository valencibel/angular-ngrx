import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/store/app.states';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AddUserAction, UpdateUserAction } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  user = new User('', '');
  show: boolean;

  constructor(private store: Store<AppState>, public dialogRef: MatDialogRef<UserModalComponent>,
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
