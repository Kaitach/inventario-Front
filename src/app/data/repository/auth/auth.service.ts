import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false;
  private selectedRole!: string;
  private selectedBranchId!: string;
  selectedBranchProducts: any[] = [];
  selectedBranchSales: any[] = [];
  selectedBranchUsers: any[] = [];
  private userData: any = {}; 

  constructor(private router: Router) {}

  login(token: string): void {
    const decodedToken = jwt_decode(token);
    this.userData = decodedToken;

    this.setToken(token);

    this.isLoggedIn = true;
    this.selectedBranchId = this.userData.branchId;
    console.log(this.selectedBranchId);
    this.selectedRole = this.userData.role;
    console.log(this.userData)
    if (this.selectedRole === 'Admin') {
      this.router.navigate(['/user']);
    } else if (this.selectedRole === 'SuperAdmin') {
      this.router.navigate(['/user']);
    } else if (this.selectedRole === 'seller') {
      this.router.navigate(['/product']);
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.removeToken();
  }
  getName(): string {
    return this.userData.name;
  }
  getSelectedRole(): string {
    return this.selectedRole;
  }

  getSelectedBranchId(): string {
    return this.selectedBranchId;
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  setSelectedBranchProducts(products: any[]): void {
    this.selectedBranchProducts = products;
  }

  getSelectedBranchProducts(): any[] {
    return this.selectedBranchProducts;
  }

  getSelectedBranchSales(): any[] {
    return this.selectedBranchSales;
  }

  getSelectedBranchUsers(): any[] {
    return this.selectedBranchUsers;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }
  setBranchInfo(branchId: string, products: any[]): void {
    this.selectedBranchId = branchId;
    this.selectedBranchProducts = products;
  }
}
