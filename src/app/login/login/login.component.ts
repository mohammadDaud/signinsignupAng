import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { first } from 'rxjs';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error!: string;
  submitted = false;
  returnUrl: string = '/';
  loginFailed!: string;
  captchaError: boolean = false;
  display: boolean = false
  questionSatus = null;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthserviceService,
    private logger:NGXLogger
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/dash/home']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.login();
  }
  login() {
    this.authenticationService.login(this.loginForm.value).pipe(first())
    .subscribe(
        data => {
          this.logger.debug("login.ts data  " +data.email);
          if (data) {
            this.router.navigate(['/dash/home']);
        } else {
             this.router.navigate(['/login']);
        }
      },
      error => {
        this.logger.error('error',error)
        this.loginFailed = error.message;
        this.logger.error(error.error.message);
        if(error.error.message)
        {
            this.error = error.error.message
        }
        else{
            this.error = error.error.errorDesc;
        }
      }
    );
  }

  register() {
    this.router.navigate(['/register']);
  }
}
