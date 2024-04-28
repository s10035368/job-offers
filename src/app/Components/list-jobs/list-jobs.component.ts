import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { JobService } from '../../job.services';
import { Router } from '@angular/router';


export interface JobContent {
  id: number,
  companyName: string,
  title: string,
  companyLogo: string,
  reference: string,
  isSelectedFavorite: boolean
}

@Component({
  selector: 'app-list-job',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'list-jobs.component.html',
  styleUrl: 'list-jobs.component.css'
})
export class ListedJobComponent implements OnInit {
  http = inject(HttpClient)
  isSelected: boolean = false;
  jobList: JobContent[] = [];

  constructor(private jobservice: JobService, private router: Router) { }

  /*
    Code for checking chosen jobs available, if not then retrieveJobList method is used to get the job list
  */

  ngOnInit(): void {
    if (this.jobservice.chosenJobArr.length != 0) 
    {
      this.jobList = this.jobservice.ListIdenticalJobs;
    } 
    else 
    {
      this.retrieveJobList();
    }
  }

  /*
    Method is for getting list of jobs from JobService using collectData method. It subscribes to Observable
    and assigns data received to jobList property
  */

  retrieveJobList() {
    this.jobservice.collectData().subscribe(data => {
      this.jobList = data;
      this.jobservice.ListIdenticalJobs = this.jobList;
    })
  }
  /*
    Method toggles selection state of job item on list and calls JobChoice for selection handling.
  */

  PreferSelect(job: JobContent) {
    const item = this.jobList.filter(x => x.id === job.id);
    if (item[0].isSelectedFavorite) 
       {
        item[0].isSelectedFavorite = false;
       }
     else 
     {
      item[0].isSelectedFavorite = true;
     }
    this.JobChoice(job);
  }
  /*
    Method is for selection of jobs and checks if star toggle button has been selected or not and updates
    chosenJobarr and matchingarr arrays in JobService
  */
  JobChoice(job: JobContent) {
    if (this.jobservice.chosenJobArr.length == 0) 
    {
      this.jobservice.chosenJobArr.push(job);
      this.jobservice.matchingArr = this.jobservice.chosenJobArr;
    }
    else {
      for (let i = 0; i < this.jobservice.chosenJobArr.length; i++) {
        if (this.jobservice.chosenJobArr.find(x => x.id == job.id) == undefined) 
          {
          this.jobservice.matchingArr.push(job);
          break;
          }
        else {
          this.jobservice.matchingArr.forEach((item, index) => {
            if (item.id == job.id) {
              this.jobservice.matchingArr.splice(index, 1);
            }
          });
          break;
        }
      }
      this.jobservice.favoriteJob = this.jobservice.chosenJobArr;
    }
  }
/*
this JobDetail method is needed to show the details when job is clicked
*/

  jobDetail(selectedJob: JobContent) {
    this.jobservice.ChosenJob = selectedJob;
    this.router.navigate(['/jobDetails']);
  }

}

