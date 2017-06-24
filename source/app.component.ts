import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ReleaseService} from "./_services/release.service";

@Component({
  selector: 'app-root',
  template: `
    <md-sidenav-container class="sidenav-container">
      <md-sidenav #sidenav style="width: 100%;">
        <md-toolbar color="primary">
          <span>Xiaomi Redmi Note 2 - Mirrors</span>
        </md-toolbar>
        <md-nav-list (click)="sidenav.close()">
          <a md-list-item routerLink="/index" routerLinkActive="active" style="width: 100%;">
            <span style="flex: 1 1 auto;"></span>
            <md-icon>home</md-icon>&nbsp;
            Home
            <span style="flex: 1 1 auto;"></span>
          </a>
          <a md-list-item routerLink="/faq" routerLinkActive="active" style="width: 100%;"
             (click)="sidenav.close()">
            <span style="flex: 1 1 auto;"></span>
            <md-icon>help</md-icon>&nbsp;
            FAQ
            <span style="flex: 1 1 auto;"></span>
          </a>
          <a md-list-item routerLink="/releases" routerLinkActive="active" style="width: 100%;"
             (click)="sidenav.close()">
            <span style="flex: 1 1 auto;"></span>
            <md-icon>storage</md-icon>&nbsp;
            All releases
            <span style="flex: 1 1 auto;"></span>
          </a>
          <a md-list-item [mdMenuTriggerFor]="menu" style="width: 100%;">
            <span style="flex: 1 1 auto;"></span>
            <md-icon>people</md-icon>&nbsp;
            Community
            <span style="flex: 1 1 auto;"></span>
          </a>
        </md-nav-list>
      </md-sidenav>

      <md-toolbar color="primary">
        <span>Xiaomi Redmi Note 2 - Mirrors</span>

        <!-- This fills the remaining space of the current row -->
        <span style="flex: 1 1 auto;"></span>

        <div class="md-button-group" fxLayout="row" fxShow="false" fxShow.gt-sm>
          <button md-button routerLink="/index" routerLinkActive="active">
            <md-icon>home</md-icon>
            Home
          </button>
          <button md-button routerLink="/faq" routerLinkActive="active">
            <md-icon>help</md-icon>
            FAQ
          </button>
          <button md-button routerLink="/releases" routerLinkActive="active">
            <md-icon>storage</md-icon>
            All release
          </button>
          <button md-button [mdMenuTriggerFor]="menu">
            <md-icon>people</md-icon>
            Community
          </button>
        </div>
        <div class="md-button-group" fxHide="false" fxHide.gt-sm (click)="sidenav.toggle()">
          <button md-button>
            <md-icon>menu</md-icon>
          </button>
        </div>

        <md-menu x-position="before" #smallMenu="mdMenu">
          <button md-button routerLink="/index" routerLinkActive="active">
            <md-icon>home</md-icon>
            Home
          </button>
          <button md-button routerLink="/faq" routerLinkActive="active">
            <md-icon>help</md-icon>
            FAQ
          </button>
          <button md-button routerLink="/releases" routerLinkActive="active">
            <md-icon>storage</md-icon>
            All release
          </button>
          <button md-button [mdMenuTriggerFor]="menu">
            <md-icon>people</md-icon>
            Community
          </button>
        </md-menu>

        <md-menu #menu="mdMenu">
          <a md-menu-item
             href="https://forum.xda-developers.com/redmi-note-2/orig-development/6-x-based-roms-nofearnohappy-kernel-t3494631"
             target="_blank" (click)="sidenav.close()">
            <md-icon>rss_feed</md-icon>
            XDA-Thread</a>
          <a md-menu-item href="https://t.me/joinchat/AAAAAEAcYGMW9RpRIW2-XQ" target="_blank" (click)="sidenav.close()">
            <md-icon>chat</md-icon>
            Telegram group</a>
          <a md-menu-item href="https://discord.gg/VWZADHh" target="_blank" (click)="sidenav.close()">
            <md-icon>chat</md-icon>
            Discord chat</a>
        </md-menu>

      </md-toolbar>

      <router-outlet></router-outlet>
      <br/>
    </md-sidenav-container>`,
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private router: Router, private releaseService: ReleaseService) {
  }

  ngOnInit() {

    if (!this.releaseService.releases) {
      this.router.navigate(['error'], {replaceUrl: true});
    }
  }
}
