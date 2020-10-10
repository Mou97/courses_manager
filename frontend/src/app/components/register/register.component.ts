import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup
  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router) {
    this.registerForm = this.formBuilder.group({
      name :[null, [Validators.required , Validators.minLength(3)]],
      email: [null, [Validators.required , Validators.email]],
      password: [null,[ Validators.required , Validators.minLength(8)]],
    })
   }

  registerUser(name,email, password){
  this.authService.register(name,email, password).subscribe(res=>{
    console.log(res);
    
    if (res.success){
      this.router.navigate(['/login'])
    }
  })
  }
  ngOnInit(): void {
  }

}
