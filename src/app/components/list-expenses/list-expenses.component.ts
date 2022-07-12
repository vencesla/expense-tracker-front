import { Component, OnInit } from '@angular/core';
import {ExpenseService} from "../../services/expense.service";
import {Expense} from "../../models/expense";

@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.component.html',
  styleUrls: ['./list-expenses.component.css']
})
export class ListExpensesComponent implements OnInit {

  expenses: Expense[] = [];

  filters = {
    keyword: '',
    sortBy: 'Name'
  }
  constructor(private _expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.listExpenses();
  }

  deleteExpense(id: number){
    this._expenseService.deleteExpense(id).subscribe(
      data => {
        console.log('deleted response :', data);
        this.listExpenses();
      }
    )
  }

  listExpenses(){
    this._expenseService.getExpenses().subscribe(
      data => {
        this.expenses = this.filterExpenses(data)
      }
    )
  }

  filterExpenses(expenses: Expense[]){
    return expenses.filter((e) => {
     return e.expense.toLowerCase().includes(this.filters.keyword.toLowerCase());
   }).sort((a,b) => {
     if(this.filters.sortBy === 'Name'){
       return a.expense.toLowerCase() < b.expense.toLowerCase() ? -1: 1;
     }else if (this.filters.sortBy === 'Amount'){
       return  a.amount > b.amount ? -1: 1;
     }
     return null;
    })
  }

}
