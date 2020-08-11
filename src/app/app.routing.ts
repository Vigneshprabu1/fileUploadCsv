import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserTableComponent } from './user-table/user-table.component';


const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'user' },
  {
    path: '',
    loadChildren: () => import('./user-table/user-table.module').then(m => m.UserTableModule)
  },
  // {path: '', component: UserTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
