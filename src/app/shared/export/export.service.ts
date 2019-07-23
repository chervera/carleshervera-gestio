import { Injectable } from '@angular/core';
import { ExportModule } from './export.module';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { HttpXsrfTokenExtractor } from '@angular/common/http';

@Injectable({
  providedIn: ExportModule
})


export class ExportService {

  readonly EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  readonly EXCEL_EXTENSION = '.xlsx';

  constructor() { }

  prepareToExport(data: any[], columnDefinition: string[]): PreparedToExport {

    const preparedToExport = new PreparedToExport();
    const preparedData = [];
    preparedData.push(columnDefinition);
    data.forEach(element => {
      let preparedRow = [];
      columnDefinition.forEach(column => {
        if (element[column]) {
          preparedRow.push(element[column]);
        }
      });
      preparedData.push(preparedRow);
    });
    preparedToExport.data = preparedData;
    return preparedToExport;
  }

  exportAsExcelFile(dataToExport: PreparedToExport, nameOfTheFile: string) {

    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataToExport.data);

    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, nameOfTheFile);

    XLSX.writeFile(workbook, this.generateFileName(nameOfTheFile));

    /*const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveAsExcelFile(excelBuffer, nameOfTheFile);*/

  }

  private generateFileName(nameOfTheFile: string): string {
    return nameOfTheFile + this.EXCEL_EXTENSION;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + new Date().getTime() + this.EXCEL_EXTENSION);
  }
}

export class PreparedToExport {
  data: any[];
}

