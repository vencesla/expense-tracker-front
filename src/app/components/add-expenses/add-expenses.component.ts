import { Component, OnInit } from '@angular/core';
import {Expense} from "../../models/expense";
import {ExpenseService} from "../../services/expense.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.css']
})
export class AddExpensesComponent implements OnInit {

  expense: Expense = new Expense();
  constructor(private _expenseService: ExpenseService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has("id");
    if(isIdPresent){
      const id = +this._activatedRoute.snapshot.paramMap.get('id');
      this._expenseService.getExpense(id).subscribe(
        data => this.expense = data
     )
    }
  }

  saveExpense(){
    this._expenseService.saveExpense(this.expense).subscribe(
      data => {
        console.log('response', data);
        this._router.navigateByUrl("/expenses");
      }
    )
  }

  deleteExpense(id: number){
    this._expenseService.deleteExpense(id).subscribe(
      data=>{
        console.log('deleted response :', data);
        this._router.navigateByUrl("/expenses");
      }
    )
  }

}
