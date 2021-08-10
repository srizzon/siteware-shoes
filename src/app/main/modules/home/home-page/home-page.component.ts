import { Component, OnInit } from '@angular/core';
import { UserLoginModel } from '@models/outros/user-login.model';
import { UserControllerService } from '@services/outros/user-controller.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  user: UserLoginModel;

  constructor(
    private userService: UserControllerService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUserLogged();
  }
}
