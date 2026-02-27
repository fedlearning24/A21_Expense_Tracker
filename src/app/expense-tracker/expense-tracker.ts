import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../Service/transaction-service';
import { TransactionModel } from '../Models/transaction.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-tracker',
  imports: [FormsModule, CommonModule],
  templateUrl: './expense-tracker.html',
  styleUrl: './expense-tracker.css',
})
export class ExpenseTracker {

  text = '';
  amount = 0;

  public service = inject(TransactionService);

  addTransaction() {
    if(!this.text || this.amount === 0 ) return;
    const transaction : TransactionModel = {
      id : Date.now(),
      text : this.text,
      amount:this.amount
    }
    this.service.add(transaction);
    this.text = '';
    this.amount = 0;
  }

  removeTransaction(id:number){
    this.service.remove(id);
  }


}
