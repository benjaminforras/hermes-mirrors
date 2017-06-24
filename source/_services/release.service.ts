import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import "rxjs/add/operator/toPromise";

import {Release} from "../release";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ReleaseService {
  private releasesUrl = 'https://api.github.com/repos/TryHardDood/hermes-mirrors/releases';  // URL to web api
  public releases: Array<Release> = [];

  constructor(private http: Http) {
  }

  loadReleases(): Promise<any> {
    this.releases = null;
    return this.http.get(this.releasesUrl).toPromise().then((response) => {
      this.releases = (response.json() as Release[]);
      return this.releases;
    }).catch(this.handleError);
  }

  getReleasesArray(): Array<Release> {
    return this.releases;
  }

  getRelease(id: number): Release {
    return this.releases.find(release => release.id === id);
  }

  search(term: string) {
    return Observable.of(Object.assign([], this.getReleasesArray()).filter(
      item => {
        if (item.name.toLowerCase().search(term.toLowerCase()) !== -1
          || item.tag_name.toLowerCase().search(term.toLowerCase()) !== -1
          || item.id.toString().search(term.toLowerCase()) !== -1) {
          return true;
        }
      }
    ));
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
