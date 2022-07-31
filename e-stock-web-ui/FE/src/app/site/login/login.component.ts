import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoginValid = true;
  "loginForm":FormGroup;
  "authSource": string;
  "error": string;
  "status": boolean;


  constructor(
    private userAuthService: UserService,

    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailId: [
        '',
        [
          Validators.required,
          Validators.email

        ],
      ],
      password: ['', Validators.required],
    });
    this.route.queryParams.subscribe((params: Params) => {
      this.authSource = params['from'];
    });
  }
  onSubmit(loginForm: any) {
    console.log(loginForm.value.emailId);
    console.log(loginForm.value.password);
    this.userAuthService.authenticate(loginForm?.value).subscribe({
      next: (data) => {
        console.log(data);
        if (data.message == 'User Not Found') {
          this.isLoginValid = false
          localStorage.setItem("loggedIn", "no");
          setTimeout(() => {
            this.isLoginValid = true;
          }, 3000);
        } else {
          localStorage.setItem("jwtToken", data.token);
          localStorage.setItem("name", data.emailId[0]);
          localStorage.setItem("loggedIn", "yes");
          this.userAuthService.loggedIn = true;
          this.userAuthService.userToken = data;
          this.status = true;
          setTimeout(() => {
            this.status = false;
          }, 2000);
          this.router.navigate(['/company']);
        }
      },
      error: (error) => {
        this.isLoginValid = false;
        // this.router.navigate([this.userAuthService.redirectUrl]);
        console.log(`hey error ` + JSON.stringify(error));
        if (error.status == 401) {
          this.error = 'Invalid emailId/password';
        }
      },
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  get emailId() {
    return this.loginForm.get('emailId');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
