import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  configUrl = 'https://lectorium.herokuapp.com';

  constructor(
    private router: Router,
    public http: HttpClient,
    private cookieService: CookieService) {}

  login(body): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${this.configUrl}/api/login`, body, httpOptions);
  }

  public logout(): void {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }

  public isLogin() {
    if (this.cookieService.get('token')) {
      return true;
    }
    return false;
  }

  public registration(body): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(`${this.configUrl}/api/registration`, body, httpOptions);
  }
}
