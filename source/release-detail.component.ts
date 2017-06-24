import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";

import {Release} from "./release";
import {ReleaseService} from "./_services/release.service";
import {MdDialog, MdSnackBar} from "@angular/material";
import {ShareDialogComponent} from "./release-detail-share.component";

@Component({
  selector: 'my-release-detail',
  templateUrl: './release-detail.component.html',
  styleUrls: ['./release-detail.component.css']
})
export class ReleaseDetailComponent implements OnInit {
  @Input() release: Release;

  constructor(private releaseService: ReleaseService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar,
              private dialog: MdDialog) {
  }

  openShareDialog() {
    this.dialog.open(ShareDialogComponent, {
      data: this.release,
    });
  }

  openDownloadStartSoon() {
    this.snackBar.open('Download will start soon!', '', {
      duration: 2000
    });
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.release = this.releaseService.getRelease(id);
        if (this.release === undefined) {
          this.router.navigate(["/index"]);
          this.snackBar.open('Release was not found!', '', {
            duration: 5000
          });
        }
      } else {
        this.router.navigate(["/index"]);
      }
    });
  }
}
