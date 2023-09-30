import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/data/repository/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    console.log(
        '%cUsuarios predeterminados: SuperAdmin-SuperAdmin   admin-admin   seller-seller',
        'color: white; background-color: #007BFF; padding: 5px; border-radius: 5px; font-weight: bold;'
      );
        }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      if (this.authService.login(email, password)) {
        console.log(`Successfully logged in with ${email}`)
      }
    }
  }
}
