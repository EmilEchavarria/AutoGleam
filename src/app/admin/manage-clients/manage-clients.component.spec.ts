import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClientsComponent } from './manage-clients.component';

describe('ManageClientsComponent', () => {
  let component: ManageClientsComponent;
  let fixture: ComponentFixture<ManageClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageClientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
