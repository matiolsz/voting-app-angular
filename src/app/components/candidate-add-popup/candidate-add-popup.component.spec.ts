import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateAddPopupComponent } from './candidate-add-popup.component';

describe('CandidateAddPopupComponent', () => {
  let component: CandidateAddPopupComponent;
  let fixture: ComponentFixture<CandidateAddPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateAddPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
