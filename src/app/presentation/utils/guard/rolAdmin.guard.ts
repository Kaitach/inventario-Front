import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/data/repository/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const userRole = this.authService.getSelectedRole();

    if (userRole === 'admin' || userRole === 'SuperAdmin') {
      return true;
    } else {
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
}
