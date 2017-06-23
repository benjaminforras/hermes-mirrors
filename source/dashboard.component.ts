import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {Release} from "./release";
import {ReleaseService} from "./_services/release.service";

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class IndexComponent implements OnInit {
  public releases: Release[] = [];

  constructor(private router: Router,
              private releaseService: ReleaseService) {
  }

  ngOnInit(): void {
    this.releases = this.releaseService.getReleasesArray().slice(0, 5)
  }

  gotoDetail(release: Release): void {
    const link = ['/detail', release.id];
    this.router.navigate(link);
  }
}
