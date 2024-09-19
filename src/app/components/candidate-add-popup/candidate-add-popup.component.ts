import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-candidate-add-popup',
  templateUrl: './candidate-add-popup.component.html',
  styleUrl: './candidate-add-popup.component.css'
})
export class CandidateAddPopupComponent {
  @Output() addNewCandidate = new EventEmitter<string>();
  @Output() closePopup = new EventEmitter<void>();

  candidateName: string = '';

  addCandidate() {
    if (this.candidateName.trim()) {
      this.addNewCandidate.emit(this.candidateName.trim());
      this.candidateName = '';
    }
  }

  close() {
    this.closePopup.emit();
  }
}
