import { Injectable, signal, computed } from '@angular/core';
import { TransactionModel } from '../Models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private _transactions = signal<TransactionModel[]>([]);
  transactions = this._transactions.asReadonly();

  balance = computed(() =>
    this.transactions()
      .reduce((acc, t) => acc + t.amount, 0)
  );

  income = computed(() =>
    this.transactions()
      .filter(t => t.amount > 0)
      .reduce((acc, t) => acc + t.amount, 0)
  );

  expense = computed(() =>
    this.transactions()
      .filter(t => t.amount < 0)
      .reduce((acc, t) => acc + t.amount, 0)
  );

  add(transaction:TransactionModel){
    this._transactions.update(list => [...list,transaction])
  }

  remove(id:number){
    this._transactions.update(list =>
      list.filter(t=>t.id!==id)
    );
  }
  
}
