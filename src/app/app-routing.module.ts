import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Modulo
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';


const routes: Routes = [
  { path: '', redirectTo: '/learn', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent },
];



@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
