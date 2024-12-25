import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) { }
  ngOnInit(): void {
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd),
    // ).subscribe(() => {
    //   const childRoute = this.getChild(this.activatedRoute);
    //   childRoute.data.subscribe((data: { title: string; }) => {
    //     this.titleService.setTitle(data.title)
    //   });
    // });

  }

  // getChild(activatedRoute: ActivatedRoute): any {
  //   if (activatedRoute.firstChild) {
  //     return this.getChild(activatedRoute.firstChild);
  //   }
  //   else {
  //     return activatedRoute.firstChild;
  //   }
  // }
}
