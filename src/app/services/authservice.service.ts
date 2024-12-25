import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

const httpOptions = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
 
  public currentUserSubject!: BehaviorSubject<User>;
  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem("CURRENT_USER")||'{}'));
    if (this.currentUserSubject.value == null) {
      this.router.navigate(['/login']);
    }
  }

  login(form: any) {
    console.log(form);
    return this.http.post<User>(`${environment.apiUrl}/api/signin/login`, form, httpOptions).pipe(map(user => {
      console.log(user)
      if (user && user.jwttoken) {
        sessionStorage.setItem("CURRENT_USER", JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return user;
    }));
  }

  logout(): Observable<any> {
    this.http.post<any>(`${environment.apiUrl}/api/signin/logout`, null)
      .subscribe(result => {
        if (result) {
          sessionStorage.removeItem('CURRENT_USER');
          this.currentUserSubject.next(new User);
          sessionStorage.clear();
          localStorage.removeItem('data');
          this.router.navigate(['/login']);
        }
        return of(result);
      });
    return of(true);
  }

  signUp(form: any) {
    console.log("service    "+form);
    return this.http.post<User>(`${environment.apiUrl}/api/signup/create`, form, httpOptions);
  }

  forgotPassword(email: any) {
    let par = new HttpParams();
    par = par.append('email', email);
    console.log(par)
    return this.http.get(`${environment.apiUrl}/api/signin/forget`, { params: par });
  }

  public getUserRole(){
   return this.currentUserValue.roles[0];
  }

  public getUrl() {
    return `${environment.apiUrl}`;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
}
