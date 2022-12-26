import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { LoaderService, LoaderState } from './service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Sanjeevani';
  isActive: boolean = false;
  selectedSubmenu: string;
  selectedMenu: string;
  prevSelectedMenu: string;
  showLoader = false;
  private loaderServiceSubscription: Subscription;

  constructor(private route: Router,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderServiceSubscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
      this.showLoader = state.show;
    });
    this.initialize();
  }
  private initialize() {
    const url = this.route.url;
    if (url) {
      if (url.includes('facilities')) {
        this.selectedMenu = 'facilities';
      }
      else if (url.includes('specialities')) {
        this.selectedMenu = 'specialities';
      }
      else if (url.includes('doctors')) {
        this.selectedMenu = 'doctors';
      }
    }
  }

  navigateToHome() {
    this.route.navigateByUrl('/home');
  }

  navigateToSubmenu(submenuUrl) {
    this.isActive = false;
    this.route.navigateByUrl(submenuUrl);
    if (this.prevSelectedMenu) {
      this.selectedMenu = this.prevSelectedMenu.toString();
    }
  }
  selectMenu(menuName) {
    this.selectedMenu = menuName;
    this.isActive = false;
  }
  showHodeSubMenu(menuName) {
    this.prevSelectedMenu = menuName;
    if (this.selectedSubmenu == menuName) {
      this.selectedSubmenu = '';
    } else {
      this.selectedSubmenu = menuName;
    }
  }

  ngOnDestroy() {
    if (this.loaderServiceSubscription) {
      this.loaderServiceSubscription.unsubscribe();
    }
  }

}

