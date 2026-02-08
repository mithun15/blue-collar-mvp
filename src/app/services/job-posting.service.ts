import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JobPostingModel } from '../job-posting/job-posting.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JobPostingService {
  private _http = inject(HttpClient);

  public createJobPosting(job: JobPostingModel) {
    return this._http.post('http://localhost:3000/employer/jobposting', job);
  }

  public getAllJobPostings() {
    return this._http.get('http://localhost:3000/employer/jobposting').pipe(
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
    return this._http.delete(`http://localhost:3000/employer/jobposting/${id}`);
  }
}
