import {APP_INITIALIZER, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";

import {MarkdownModule} from "angular2-markdown";
import {ClipboardModule} from "ng2-clipboard";

import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {IndexComponent} from "./dashboard.component";
import {ReleasesComponent} from "./releases.component";
import {ReleaseDetailComponent} from "./release-detail.component";
import {ShareDialogComponent} from "./release-detail-share.component";
import {ReleaseSearchComponent} from "./release-search.component";
import {ReleaseService} from "./_services/release.service";
import {FaqComponent} from "./faq.component";
import {NgxPaginationModule} from "ngx-pagination";
import {FaqService} from "./_services/faq.service";

export function releasesServiceFactory(releaseService: ReleaseService): Function {
  return () => releaseService.loadReleases();
}

export function faqServiceFactory(faqService: FaqService): Function {
  return () => faqService.loadFaqs();
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    MarkdownModule.forRoot(),
    ClipboardModule,
    NgxPaginationModule
  ],
  declarations: [
    AppComponent,
    IndexComponent,
    ReleaseSearchComponent,
    ReleasesComponent,
    ReleaseDetailComponent,
    FaqComponent,
    ShareDialogComponent
  ],
  providers: [ReleaseService,
    {
      provide: APP_INITIALIZER,
      useFactory: releasesServiceFactory,
      deps: [ReleaseService],
      multi: true
    },
    FaqService,
    {
      provide: APP_INITIALIZER,
      useFactory: faqServiceFactory,
      deps: [FaqService],
      multi: true
    }],
  entryComponents: [ShareDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
