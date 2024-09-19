import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterAddPopupComponent } from './voter-add-popup.component';

describe('VoterAddPopupComponent', () => {
  let component: VoterAddPopupComponent;
  let fixture: ComponentFixture<VoterAddPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoterAddPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoterAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
