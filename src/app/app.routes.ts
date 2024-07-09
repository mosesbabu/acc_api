

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportTransactionsComponent } from './import-transactions-component/import-transactions-component.component';
import { JournalStatementComponent } from './journal-statement-component/journal-statement-component.component';
import { BalanceSheetComponent } from './balance-sheet-component/balance-sheet-component.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },  
  { path: '', redirectTo: '/import-transactions', pathMatch: 'full' },
  { path: 'import-transactions', component: ImportTransactionsComponent },
  { path: 'journal-statement', component: JournalStatementComponent },
  { path: 'balance-sheet', component: BalanceSheetComponent },
  { path: '**', redirectTo: '/login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
