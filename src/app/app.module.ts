import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VotingFormComponent } from './voting-form/voting-form.component';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { VotersListComponent } from './components/voters-list/voters-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CandidateAddPopupComponent } from './components/candidate-add-popup/candidate-add-popup.component';
import { VoterAddPopupComponent } from './voter-add-popup/voter-add-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    VotingFormComponent,
    CandidatesListComponent,
    VotersListComponent,
    CandidateAddPopupComponent,
    VoterAddPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule, 
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
