import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrinkDmComponent } from './drink-dm/drink-dm.component';
import { DrinkListComponent } from './drink-list/drink-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/drink', pathMatch: 'full' },
  { path: 'drink', component: DrinkDmComponent },
  { path: 'drink/:id', component: DrinkDmComponent },
  { path: 'drink/drinklist/:id', component: DrinkListComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule { }
