import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { JobService } from '../../job.services';
import { Router } from '@angular/router';


export interface JobData {
  id: number,
  companyName: string,
  title: string,
  companyLogo: string,
  reference: string,
  isSelectedFavorite: boolean
}

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'list-jobs.component.html',
  styleUrl: 'list-jobs.component.css'
})
export class AllJobListComponent implements OnInit {
  http = inject(HttpClient)
  jobList: JobData[] = [];
  isSelected: boolean = false;

  constructor(private jobservice: JobService, private router: Router) { }

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

  retrieveJobList() {
    this.jobservice.collectData().subscribe(data => {
      this.jobList = data;
      this.jobservice.ListIdenticalJobs = this.jobList;
    })
  }

  PreferSelect(job: JobData) {
    const item = this.jobList.filter(x => x.id === job.id);
    if (item[0].isSelectedFavorite) 
       {
        item[0].isSelectedFavorite = false;
       }
     else 
     {
      item[0].isSelectedFavorite = true;
     }
    this.onJobSelect(job);
  }

  onJobSelect(job: JobData) {
    if (this.jobservice.chosenJobArr.length == 0) 
    {
      this.jobservice.chosenJobArr.push(job);
      this.jobservice.matchingArray = this.jobservice.chosenJobArr;
      this.jobservice.favoriteJob = this.jobservice.chosenJobArr;
    }
    else {
      for (let i = 0; i < this.jobservice.chosenJobArr.length; i++) {
        if (this.jobservice.chosenJobArr.find(x => x.id == job.id) == undefined) 
          {
          this.jobservice.matchingArray.push(job);
          break;
          } 
        else {
          this.jobservice.matchingArray.forEach((item, index) => {
            if (item.id == job.id) {
              this.jobservice.matchingArray.splice(index, 1);
            }
          });
          break;
        }
      }
      this.jobservice.chosenJobArr = this.jobservice.matchingArray;
      this.jobservice.favoriteJob = this.jobservice.chosenJobArr;
    }
  }


  jobDetail(selectedJob: JobData) {
    this.jobservice.ChosenJob = selectedJob;
    this.router.navigate(['/jobDetails']);
  }

}

