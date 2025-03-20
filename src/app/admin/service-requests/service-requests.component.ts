import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalServiceRequestService } from '../../services/service-request.service';
import { AdminsidebarComponent } from '../adminsidebar/adminsidebar.component';

@Component({
  selector: 'app-service-requests',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,AdminsidebarComponent],
  templateUrl: './service-requests.component.html',
  styleUrls: ['./service-requests.component.css']
})
export default class ServiceRequestsComponent implements OnInit {
  serviceRequests: any[] = [];

  constructor(private localServiceRequestService: LocalServiceRequestService) {}

  ngOnInit(): void {
    this.localServiceRequestService.serviceRequests$.subscribe((requests: any[]) => {
      this.serviceRequests = requests;
    });
  }
}
