import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {
  private notificationSubject = new Subject<string>();
  notification$ = this.notificationSubject.asObservable();

  showNotification(message: string) {
    this.notificationSubject.next(message);
  }
}
