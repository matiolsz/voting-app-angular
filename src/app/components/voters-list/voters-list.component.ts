import { Component } from '@angular/core';
import { VotingService } from '../../services/voting.service';
import { Subscription } from 'rxjs';
import { Voter } from '../../entities/voter';

@Component({
  selector: 'app-voters-list',
  templateUrl: './voters-list.component.html',
  styleUrl: './voters-list.component.css'
})
export class VotersListComponent {

  voters: Voter[] = [];
  private votersSubscription!: Subscription;
  showPopup: boolean = false;

  constructor(private votingService: VotingService){}

  ngOnInit(){
    this.votersSubscription = this.votingService.voters$.subscribe(
      voters => this.voters = voters,
      error => console.error('Error in voters subscription:', error)
    );
    this.votingService.getVoters();
  }

  ngOnDestroy() {
    if (this.votersSubscription) {
      this.votersSubscription.unsubscribe();
    }
  }

  openAddVoterPopup(): void {
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }
  
  addVoter(voterName: string) {
    if (voterName && voterName.trim()) {
      this.votingService.addVoter(voterName.trim()).subscribe(
        () => {
          console.log('Voter added successfully.');
          this.closePopup();
        },
        (error: any) => console.error('Error adding voter:', error)
      );
    } else {
      console.error('Invalid voter name');
    }
  }
}
