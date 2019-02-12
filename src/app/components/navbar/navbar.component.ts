import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isLogin = false;
  public cookieValue = this.authService.isLogin();

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    if (this.cookieValue) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

  logout() {
    this.authService.logout();
    this.isLogin = false;
  }


}
