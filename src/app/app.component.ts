import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isHandset$: Observable<boolean>;
  isSidenavOpen: boolean = false;
  sidenavMode: MatDrawerMode = 'side';

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver
      .observe([
        Breakpoints.Handset,
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge])
      .pipe(
        map((result) => result.matches), // Emits `true` if it's a handset
        shareReplay() // Ensures observable sharing across subscriptions
      );
  }

  ngOnInit(): void {
    this.isHandset$.subscribe((isHeadSet: boolean) => {
      this.sidenavMode = isHeadSet ? 'over' : 'side';
      
      if(!isHeadSet){
        this.isSidenavOpen = true;
      }
    });
  }
  toggleSidenav() {
    this.sidenav.toggle();
  }

  toggleSidenav2() {
    console.log('desktop')
    // this.sidenav.toggle();
  }
}
