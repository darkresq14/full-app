import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form!: FormGroup;
  isLoggingIn = false;
  isRecoveringPassword = false;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.isLoggingIn = true;

    this.authenticationService.signIn({
      email: this.form.value.email,
      password: this.form.value.password
    }).subscribe({
      next: () => this.router.navigate(['home']),
      error: error => {
        this.isLoggingIn = false;
        alert(error.message);
      }
    });
  }

  register() {
    this.isLoggingIn = false;

    this.authenticationService.register({
      email: this.form.value.email,
      password: this.form.value.password
    }).subscribe({
      next: () => this.router.navigate(['home']),
      error: error => {
        alert(error.message);
      }
    });
  }
}