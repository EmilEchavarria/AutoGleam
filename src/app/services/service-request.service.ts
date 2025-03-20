// src/app/services/local-service-request.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalServiceRequestService {
  private serviceRequestsSubject = new BehaviorSubject<any[]>([]);
  serviceRequests$ = this.serviceRequestsSubject.asObservable();

  addServiceRequest(request: any): void {
    const currentRequests = this.serviceRequestsSubject.value;
    this.serviceRequestsSubject.next([...currentRequests, request]);
  }

  getServiceRequests(): any[] {
    return this.serviceRequestsSubject.value;
  }
}
