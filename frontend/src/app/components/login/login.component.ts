import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup
  constructor(private formBuilder:FormBuilder, private authService:AuthService) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required , Validators.email]],
      password: [null, [Validators.required , Validators.minLength(8)]],
    })
   }

  loginUser(email,password){
    this.authService.login(email, password).subscribe(res=>{
      console.log(res)
    })
  }

  ngOnInit() {
    
  }
 

}
