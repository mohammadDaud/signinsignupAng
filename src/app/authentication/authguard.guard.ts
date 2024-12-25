import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth:AuthserviceService,
    private logger:NGXLogger
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user=this.auth.currentUserValue;
    this.logger.debug(user);
      if (!sessionStorage.getItem('CURRENT_USER')) {
        this.router.navigate(['/login']);
        return false;
      }
      else {
        return true;
      }
  }

}
