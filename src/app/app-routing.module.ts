import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListExpensesComponent} from "./components/list-expenses/list-expenses.component";
import {AddExpensesComponent} from "./components/add-expenses/add-expenses.component";

const routes: Routes = [
  {path: 'expenses', component: ListExpensesComponent},
  {path: 'addexpense', component: AddExpensesComponent},
  {path: 'editexpense/:id', component: AddExpensesComponent},
  {path: '', redirectTo: '/expenses', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
