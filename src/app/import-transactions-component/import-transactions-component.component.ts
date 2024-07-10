import { Component } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-transactions-component',
  standalone: true,
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './import-transactions-component.component.html',
  styleUrl: './import-transactions-component.component.css'
})
export class ImportTransactionsComponent {
  file: File | null = null;
  transactions: any[] = [];


  constructor(private apiService: ApiserviceService) { }

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);

    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'array' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data = <any[]>XLSX.utils.sheet_to_json(ws, { header: 1 });

      // Process the data
      const transactions = this.transformData(data);
      this.apiService.importTransactions(transactions);
    };
    reader.readAsArrayBuffer(target.files[0]);
  }

  // Method to transform Excel data into the required JSON format
  private transformData(data: any[]): any[] {
    const transactions = data.slice(1).map(row => ({
      "Journal_Date": row[0],
      "Dr_Account_Name": row[1],
      "Dr_Tran_Type": row[2],
      "Dr_Note": row[3],
      "Amount": row[4],
      "Joural_Type": row[5],
      "Journal_Description": row[6],
      "Cr_Account_Name": row[7],
      "Cr_Tran_Type": row[8],
      "Cr_Note": row[9]
    }));
    return transactions;
  }
  onSubmit() {
    if (this.transactions.length > 0) {
      this.apiService.importTransactions(this.transactions);
    } else {
      alert('Please select a valid Excel file before submitting.');
    }
  }
}
