import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { OopsComponent } from './oops/oops.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'oops', component: OopsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
