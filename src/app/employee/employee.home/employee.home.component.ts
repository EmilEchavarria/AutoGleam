import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee.home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './employee.home.component.html',
  styleUrl: './employee.home.component.css'
})
export default class EmployeeHomeComponent {

}
