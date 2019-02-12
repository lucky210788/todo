import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private cookieService: CookieService
  ) {}

  public loginFormGroup: FormGroup = this.fb.group({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required, Validators.minLength(9)])
  });

  ngOnInit() {
    if (this.authService.isLogin()) {
      this.router.navigate(['']);
    }
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.loginFormGroup.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  onSubmit() {
    this.authService.login(this.loginFormGroup.value).subscribe((data) => {
      if (data) {
        this.cookieService.set('token', data['token']);
        this.router.navigate(['']);
      }
    }, error => {
      console.log(error);
    });
  }
}
