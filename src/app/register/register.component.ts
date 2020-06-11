import { Component, OnInit } from '@angular/core';
import { SignUpInfo } from '../auth/signup-info';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  lstRole: string[] = [];
  // role1: string;
  // role2: string;
  role: string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    // if (this.role1 != null) {
    //   this.lstRole.push(this.form.role1);
    // }
    // if (this.role2 != null) {
    //   this.lstRole.push(this.form.role2);
    // }
    this.lstRole = [this.form.role];
    console.log(this.form);
    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password,
      this.lstRole
    );
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    )
  }

}
