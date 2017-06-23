import {Component} from "@angular/core";
import {Router} from "@angular/router";

import {Release} from "./release";

import "rxjs/add/observable/of";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/switchMap";

import {ReleaseService} from "./_services/release.service";

@Component({
  selector: 'my-release-search',
  templateUrl: './release-search.component.html',
  styleUrls: ['./release-search.component.css']
})
export class ReleaseSearchComponent {
  releases: Array<Release>;

  constructor(private releaseService: ReleaseService,
              private router: Router) {
  }

  filterItem(value) {
    if (!value) {
      this.releases = null;
      return false;
    }
    this.releases = Object.assign([], this.releaseService.getReleasesArray()).filter(
      item => {
        if (item.name.toLowerCase().search(value.toLowerCase()) !== -1 || item.tag_name.toLowerCase().search(value.toLowerCase()) !== -1 || item.id.toString().search(value.toLowerCase()) !== -1) {
          return true;
        }
      }
    )
  }

  gotoDetail(release: Release): void {
    const link = ['/detail', release.id];
    this.router.navigate(link);
  }
}
