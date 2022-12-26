import { Component, OnInit, Input } from '@angular/core';
import { BreadCrumbEntity } from 'src/app/models/breadcrumb.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-breadcrum',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {

  routeSubscription: Subscription;
  breadcrumbs: BreadCrumbEntity[];
  title: string;
  @Input() showTitle = true;
  constructor(
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeSubscription = this.activeRoute.data.subscribe(data => {
      if (data && data.breadcrumbs) {
        this.breadcrumbs = data.breadcrumbs;
        if (data.breadcrumbs && data.breadcrumbs.length > 1) {
          this.title = data.breadcrumbs[data.breadcrumbs.length - 1].Label;
        }
      }
    })
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
