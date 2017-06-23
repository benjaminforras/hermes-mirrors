import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {Release} from "./release";
import {ReleaseService} from "./_services/release.service";
import {PaginationInstance} from "ngx-pagination";

@Component({
  selector: 'my-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReleasesComponent implements OnInit {
  releases: Release[];

  public paginationConfig: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 6,
    currentPage: 1
  };

  constructor(private router: Router,
              private releaseService: ReleaseService) {
  }

  getReleases(): void {
    this.releases = this.releaseService.getReleasesArray();
  }

  ngOnInit(): void {
    this.getReleases();
  }

  gotoDetail(release: Release): void {
    this.router.navigate(['/detail', release.id]);
  }
}
