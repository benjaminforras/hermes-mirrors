import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {Release} from "./release";

import "rxjs/add/observable/of";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/switchMap";

import {ReleaseService} from "./_services/release.service";
import {MdSnackBar} from "@angular/material";
import {Observable} from "rxjs/Observable";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'my-release-search',
  templateUrl: './release-search.component.html',
  styleUrls: ['./release-search.component.css']
})
export class ReleaseSearchComponent implements OnInit {
  releases: Observable<Array<Release>>;
  term = new FormControl();

  constructor(private releaseService: ReleaseService,
              private snackBar: MdSnackBar,
              private router: Router) {
  }

  ngOnInit() {
    this.releases = this.term.valueChanges.debounceTime(100).distinctUntilChanged().switchMap(term => this.releaseService.search(term));
  }

  gotoDetail(release: Release): void {
    const link = ['/detail', release.id];
    this.router.navigate(link);
  }
}
