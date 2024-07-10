

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportTransactionsComponent } from './components/import-transactions-component/import-transactions-component.component';
import { JournalStatementComponent } from './components/journal-statement-component/journal-statement-component.component';
import { BalanceSheetComponent } from './components/balance-sheet-component/balance-sheet-component.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
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
