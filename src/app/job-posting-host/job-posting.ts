import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class JobPosting {
  public jobPostingForm = new FormGroup({
    skill: new FormControl(null),
    noOfPeople: new FormControl(null),
    wagePerPerson: new FormControl(null),
    date: new FormControl(null),
    fromTime: new FormControl(null),
    toTime: new FormControl(null),
    contact: new FormGroup({
      name: new FormControl(''),
      phone: new FormControl(''),
      address: new FormControl(''),
      landmark: new FormControl(''),
      city: new FormControl(null),
    }),
  });
}
