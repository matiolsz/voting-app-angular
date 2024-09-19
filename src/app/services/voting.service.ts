import { Injectable } from '@angular/core';
import { Candidate } from '../entities/candidate';
import { Voter } from '../entities/voter';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  private candidatesUrl = 'http://localhost:8080/api/candidates';
  private votersUrl = 'http://localhost:8080/api/voters';

  private candidatesSubject = new BehaviorSubject<Candidate[]>([]);
  candidates$ = this.candidatesSubject.asObservable();
  
  private votersSubject = new BehaviorSubject<Voter[]>([]);
  voters$ = this.votersSubject.asObservable();

  constructor(private http: HttpClient) { } 

  getCandidates(): Observable<any[]> {
    this.http.get<Candidate[]>(this.candidatesUrl).subscribe(
      candidates => this.candidatesSubject.next(candidates),
      error => console.error('Error fetching candidates:', error)
    );
    return this.candidates$;
  }

  getVoters(): Observable<any[]> {
    this.http.get<Voter[]>(this.votersUrl).subscribe(
      voters => this.votersSubject.next(voters),
      error => console.error(error)
    );
    return this.voters$;
  }

  updateVotingInformation(voterName: string, candidateName: string) {
    this.updateVoter(voterName).subscribe(
      () => this.updateCandidates(candidateName),

      error => console.error('Error updating votes:', error)
    );
  }

  addVoter(voterName: string): Observable<Voter> {
    return new Observable(observer => {
      this.http.post<Voter>(`${this.votersUrl}`, {name: voterName}).subscribe(
        (newVoter) => {
          const currentVoters = this.votersSubject.value;
          this.votersSubject.next([...currentVoters, newVoter]);
          observer.next(newVoter);
          observer.complete();
        },
        (error) => {
          console.error('Error adding voter:', error);
          observer.error(error);
        }
      );
    });
  }

  updateVoter(voterName: string): Observable<Voter> {
    return new Observable(observer => {
      this.http.put<Voter>(`${this.votersUrl}/${encodeURIComponent(voterName)}/voter`, {}).subscribe(
        (updatedVoter) => {
          const currentVoters = this.votersSubject.value;
          const updatedVoters = currentVoters.map(voter => 
            voter.name === updatedVoter.name ? { ...voter, voted: true } : voter
          );
          this.votersSubject.next(updatedVoters);
          observer.next(updatedVoter);
          observer.complete();
        },
        (error) => {
          console.error('Error adding voter:', error);
          observer.error(error);
        }
      );
    });
  }

  private updateCandidates(candidateName: string) {
    this.updateCandidateVotes(candidateName).subscribe(
      (updatedCandidate) => {
        const currentCandidates = this.candidatesSubject.value;
          const updatedCandidates = currentCandidates.map(c => 
            c.name === updatedCandidate.name ? updatedCandidate : c
          );
          this.candidatesSubject.next(updatedCandidates);
      },
      (error) => console.error('Error updating candidates:', error)
    );
  }

  private updateCandidateVotes(candidateName: string): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.candidatesUrl}/${encodeURIComponent(candidateName)}/vote`, {});
  }

  addCandidate(candidateName: string) : Observable<Candidate>{
    return new Observable(observer => {
      this.http.post<Candidate>(`${this.candidatesUrl}`, {name: candidateName, collectedVotes: 0}).subscribe(
        (newCandidate) => {
          const currentCandidates = this.candidatesSubject.value;
          this.candidatesSubject.next([...currentCandidates, newCandidate]);
          observer.next(newCandidate);
          observer.complete();
        },
        (error) => {
          console.error('Error adding candidate:', error);
          observer.error(error);
        }
      );
    });
  }

}