import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/service/User';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  "signupForm": FormGroup;
  "authSource": string;
  "error": string;
  "exist": boolean;
  "isAdmin": boolean;
  request = false;
  'user': User;
  presentDate = new Date();

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() : void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3),
      Validators.maxLength(20), Validators.pattern('^[a-zA-Z]*')]],
      lastName: ['', [Validators.required, Validators.minLength(1),
      Validators.maxLength(20), Validators.pattern('^[a-zA-Z]*')]],
      emailId: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'), Validators.email]],
      age: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      dateOfBirth : ['', [Validators.required, Validators.pattern('^[0-9]*')]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9+]*')]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
      confirmPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]]
    },
    );

  }
  addRoleUser() {
    this.isAdmin = false;
    // this.userAuthService.setRoleId(2);
  }
  addRoleAdmin() {
    this.isAdmin = true;
    // this.userAuthService.setRoleId(1);
  }
  onSignup(signupForm: any) {
    console.log("In submit")
    console.log(this.signupForm.value);
    this.userService.addUser(this.signupForm.value).subscribe({
      next: (response) => {
        console.log(response);
        console.log(this.signupForm.value);
        this.request = true;
        if(response == "User Already Exists") {
          this.exist = true;
          setTimeout(() => {
            this.exist = false;
          }, 2000);
        }
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log("User Already Exist. Directly go to Login")
        this.exist = true;
        this.error = error.error.errorMessage;
      }
    });

  }
  isExist() {
    return this.exist;
  }

  get age() {
    return this.signupForm.get('age');
  }
  get phoneNumber() {
    return this.signupForm.get('phoneNumber');
  }
  get emailId() {
    return this.signupForm.get('emailId');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get firstName() {
    return this.signupForm.get('firstName');
  }
  get lastName() {
    return this.signupForm.get('lastName');
  }
  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
  get dateOfBirth() {
    return this.signupForm.get('dateOfBirth');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

}
