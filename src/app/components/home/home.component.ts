import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { AppState, selectAuthState } from 'src/app/store/app.states';
import * as userActions from 'src/app/store/actions/user.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: any[] = [];
  user = new User('', '');
  displayedColumns: string[] = ['select','email', 'password'];
  selection = new SelectionModel<User>(true, []);

  getState: Observable<any>;
  isAuthenticated: false;
  // user = null;
  errorMessage = null;

  constructor(private router: Router, private store: Store<AppState>, public dialog: MatDialog) {
    this.getState = this.store.select(selectAuthState);
    console.log(this.getState);
   }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.users.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.users.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  ngOnInit() {
    this.store.select('users').subscribe(state => {
      this.users = [...state];
      console.log(this.users);
    });

    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  add(){
    console.log(this.user);
    this.openModal('', this.user.email, this.user.password, 'create');
  }

  show(user: any){
    this.openModal(user.id, user.email, user.password, 'show');
  }

  update(){
    console.log(this.selection.selected);
    const user = this.selection.selected.shift();
    this.openModal(user.id, user.email, user.password, 'update');
  }

  delete(){
    console.log(this.selection.selected);
    const id = this.selection.selected.shift().id;
    const action = new userActions.DeleteUserAction(id);
    this.store.dispatch(action);
  }

  openModal(id: any, email: string, password: string, typeOperation: string){
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '450px',
      data: {id, email, password, typeOperation}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('closed');
    });
  }

  logout(){
    this.store.dispatch(new userActions.LogOut);
  }

}
