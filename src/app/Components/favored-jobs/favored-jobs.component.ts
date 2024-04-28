import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../../job.services';
import { HttpClient } from '@angular/common/http';

export interface JobData {
  id: number,
  companyName: string,
  title: string,
  companyLogo: string,
  reference: string,
  isSelectedFavorite: boolean
}

@Component({
  selector: 'app-favorite-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favored-jobs.component.html',
  styleUrl: './favored-jobs.component.css'
})
export class FavoriteJobsComponent  implements OnInit {
  noBestJob: string | undefined;
  isFav: boolean = false;

  constructor(private jobservice: JobService, private router: Router) { }
    favoriteJobList: JobData[] = [];
  
  /*
    this method is for checking for favorite jobs after initializing component and checks list of
    favorite jobs.
  */

  ngOnInit(): void {
    if (this.jobservice.favoriteJob.length !== 0) 
    {
      this.isFav = true;
      this.favoriteJobList = this.jobservice.favoriteJob;
    } 
    else 
    {
      this.isFav = false;
      this.noBestJob = 'No favorite job is chosen! '
    }
  }

  /*
    this JobDetail method is needed to show the details when job is clicked
  */
  jobDetail(chosenJob: JobData) {
   this.jobservice.ChosenJob = chosenJob;
   this.router.navigate(['/jobDetails']);
  }
}
