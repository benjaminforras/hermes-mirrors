import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {IndexComponent} from "./dashboard.component";
import {ReleasesComponent} from "./releases.component";
import {ReleaseDetailComponent} from "./release-detail.component";
import {FaqComponent} from "./faq.component";

export const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'index', component: IndexComponent},
  {path: 'detail/:id', component: ReleaseDetailComponent},
  {path: 'releases', component: ReleasesComponent},
  {path: 'faq', component: FaqComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
