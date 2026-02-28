import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JobPostingModel } from '../job-posting/job-posting.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JobPostingService {
  private _baseUrl = 'https://blue-collar-api.onrender.com/';
  // private _baseUrl = 'http://localhost:3000/';
  private _http = inject(HttpClient);

  public createJobPosting(job: JobPostingModel) {
    return this._http.post(`${this._baseUrl}employer/jobposting`, job);
  }

  public getAllJobPostings() {
    return this._http.get(`${this._baseUrl}employer/jobposting`).pipe(
      map((res: any) => {
        return res.data.map((job: any) => {
          return {
            id: job._id,
            ...job,
          };
        });
      }),
    );
  }

  public deleteJobPosting(id: string) {
    return this._http.delete(`${this._baseUrl}employer/jobposting/${id}`);
  }
}
