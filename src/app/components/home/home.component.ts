import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/app.reducers';
import { AddUserAction, DeleteUserAction } from '../user.actions';
import { MatDialog } from '@angular/material';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { SelectionModel } from '@angular/cdk/collections';

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

  constructor(private router: Router, private store: Store<AppState>, public dialog: MatDialog) { }

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
    const action = new DeleteUserAction(id);
    this.store.dispatch(action);
  }

  openModal(id: any, email: string, password: string, typeOperation: string){
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '450px',
      data: {id, email, password, typeOperation}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('closed')
    });
  }

  logout(){
    this.router.navigateByUrl('');
  }

}
