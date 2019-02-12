import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registrationFormGroup: FormGroup = this.fb.group({
    Name: ['', [Validators.required]],
    Surname: ['', [Validators.required]],
    Email: ['', [Validators.required, Validators.email]],
    Phone: ['', [Validators.pattern('^[0-9]*$')]],
    Password: ['', [Validators.required, Validators.minLength(9)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  isControlInvalid(controlName: string): boolean {
    const control = this.registrationFormGroup.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  onSubmit() {
    this.authService.registration(this.registrationFormGroup.value).subscribe((data) => {
      if (data) {
        this.router.navigate(['/login']);
      }
    }, error => {
      console.log(error);
    });
  }
}
