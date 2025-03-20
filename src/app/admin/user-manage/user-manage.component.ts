import { Component } from '@angular/core';
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";

@Component({
  selector: 'app-user-manage',
  standalone: true,
  imports: [AdminsidebarComponent],
  templateUrl: './user-manage.component.html',
  styleUrl: './user-manage.component.css'
})
export default class UserManageComponent {

}
