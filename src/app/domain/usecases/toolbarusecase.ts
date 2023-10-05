// import { Injectable } from "@angular/core";
// import { BehaviorSubject } from "rxjs";

// @Injectable({
//   providedIn: 'root'
// })
// export class StateUseCase {

//   public currentStatus: boolean = false;
//   public currentStatusEmitter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.currentStatus);


//   defaultLogin() {
//     if(!localStorage.getItem('key')){
//       localStorage.setItem('key', 'false')
//     }
//   }

//   activeLogin(){
    
//     localStorage.setItem('key', 'true');
//     this.currentStatus = !this.currentStatus;
//     this.currentStatusEmitter.next(this.currentStatus);
//   }
// }