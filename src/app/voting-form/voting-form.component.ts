import { Component } from '@angular/core';
import { VoterFormData } from '../entities/voter-form-data';
import { VotingService } from '../services/voting.service';
import { Voter } from '../entities/voter';

@Component({
  selector: 'app-voting-form',
  templateUrl: './voting-form.component.html',
  styleUrl: './voting-form.component.css'
})
export class VotingFormComponent {

  model = new VoterFormData("", "");

  submitted = false;

  candidates!: any[];
  voters!: any[];

  constructor(private votingService: VotingService){}

  ngOnInit(){
    this.votingService.getCandidates().subscribe(
      data => this.candidates = data,
      error => console.error(error),
      () => console.log('Candidates loaded.')
    );

    this.votingService.getVoters().subscribe(
      data => this.voters = data,
      error => console.error(error),
      () => console.log('Voters loaded.')
    )
  }

  getUnvotedVoters(): Voter[] {
    return this.voters.filter(voter => !voter.voted);
  }

  onSubmit(){
    this.votingService.updateVotingInformation(this.model.voterName,this.model.candidateName)
    this.submitted = true;
  }

  displayForm(){
    this.submitted = false;
  }

}
