import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private reportsSource = new BehaviorSubject<any[]>([]); // This will hold and emit the report data
  reports$ = this.reportsSource.asObservable(); // Observable to subscribe to for report updates

  constructor() {
    // Al iniciar, cargamos los reportes guardados en localStorage (si existen)
    const savedReports = localStorage.getItem('emailHistory');
    if (savedReports) {
      try {
        this.reportsSource.next(JSON.parse(savedReports));
      } catch (e) {
        console.error('Error al cargar los reportes:', e);
      }
    }
  }

  // Adds a new report to the reports list
  addReport(report: any) {
    const currentReports = this.reportsSource.value;
    currentReports.push(report);  // Add the new report to the list
    this.reportsSource.next(currentReports);  // Emit the updated reports list to subscribers
    localStorage.setItem('emailHistory', JSON.stringify(currentReports));  // Save to localStorage
  }

  // Optionally, you could reload the reports again (useful if needed)
  loadReports(): void {
    const savedReports = localStorage.getItem('emailHistory');
    if (savedReports) {
      try {
        this.reportsSource.next(JSON.parse(savedReports));
      } catch (e) {
        console.error('Error al parsear los correos guardados:', e);
      }
    }
  }
}
