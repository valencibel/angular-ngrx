import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  user = new User('','');

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit(): void {
    console.log(this.user);
    this.router.navigateByUrl('/home');
  }


}
