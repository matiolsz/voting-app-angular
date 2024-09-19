import { Component, EventEmitter, Output } from '@angular/core';
import { Voter } from '../entities/voter';
import { VotingService } from '../services/voting.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-voter-add-popup',
  templateUrl: './voter-add-popup.component.html',
  styleUrl: './voter-add-popup.component.css'
})
export class VoterAddPopupComponent {
  @Output() addNewVoter = new EventEmitter<string>();
  @Output() closePopup = new EventEmitter<void>();

  voterName: string = '';

  voterAlreadyExists: boolean = false;

  voters: Voter[] = [];
  private votersSubscription!: Subscription;

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

  addVoter() {
    const trimmedName = this.voterName.trim();
    if (trimmedName) {
      this.voterAlreadyExists = this.voters.some(voter => 
        voter.name.toLowerCase() === trimmedName.toLowerCase()
      );
      
      if (this.voterAlreadyExists) {
        console.error('A voter with this name already exists.');
        this.voterAlreadyExists = true;
      } else {
        this.addNewVoter.emit(trimmedName);
        this.voterName = ''; 
        this.voterAlreadyExists = false;
      }
    } 
  }

  close() {
    this.closePopup.emit();
  }
}
