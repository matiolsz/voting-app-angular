import { Component } from '@angular/core';
import { VotingService } from '../../services/voting.service';
import { Candidate } from '../../entities/candidate';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrl: './candidates-list.component.css'
})
export class CandidatesListComponent {

  candidates: Candidate[] = [];
  private candidatesSubscription!: Subscription;
  showPopup: boolean = false;

  constructor(private votingService: VotingService){}

  ngOnInit(){
    this.candidatesSubscription = this.votingService.candidates$.subscribe(
      candidates => this.candidates = candidates,
      error => console.error('Error in candidates subscription:', error)
    );
    this.votingService.getCandidates();
  }

  ngOnDestroy() {
    if (this.candidatesSubscription) {
      this.candidatesSubscription.unsubscribe();
    }
  }

  openAddCandidatePopup(): void {
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }

  addCandidate(candidateName: string) {
    if (candidateName && candidateName.trim()) {
      this.votingService.addCandidate(candidateName.trim()).subscribe(
        () => {
          console.log('Candidate added successfully.');
          this.closePopup();
        },
        (error: any) => console.error('Error adding candidate:', error)
      );
    } else {
      console.error('Invalid candidate name');
    }
  }

}
