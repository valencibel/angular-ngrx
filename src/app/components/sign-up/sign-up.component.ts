import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserAuth } from 'src/app/models/user-auth';
import * as state from 'src/app/store/app.states';
import { SignUp } from 'src/app/store/actions/user.actions';
import { MatDialog } from '@angular/material';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: UserAuth = new UserAuth();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private store: Store<state.AppState>, public dialog: MatDialog) { 
    this.getState = this.store.select(state.selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.errorMessage ? this.openAlert(state.errorMessage) : null;
    });
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new SignUp(payload));
  }

  openAlert(message: string){
    const dialogRef = this.dialog.open(AlertModalComponent, {
      width: '450px',
      data: { message }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('closed');
    });
  }

}
