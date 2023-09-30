import { Component } from '@angular/core';
import { AuthService } from './data/repository/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inventory-Front';

  constructor(private authService: AuthService) {}
  get selectedRole(): string {
    return this.authService.getSelectedRole();
  }
}
