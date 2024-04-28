import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface JobInput {
  id: number,
  companyName: string,
  title: string,
  companyLogo: string,
  reference: string,
  isSelectedFavorite: boolean
} 

@Injectable({
  providedIn: 'root'
})

export class JobService {
  favoriteJob: JobInput[] = [];
  ChosenJob!: JobInput;
  ListIdenticalJobs: JobInput[] = [];
  chosenJobArr: JobInput[] = [];
  matchingArr : JobInput[] = [];
  
  
  
  constructor(private http: HttpClient) { }


collectData() {
  const address = '/jobs';
  return this.http.get<[]>(address);
}
}
