export interface JobPostingModel {
  id: string;
  noOfPeople: number;
  skill: string;
  wagePerPerson: number;
  date: string;
  fromTime: string;
  toTime: string;
  contact: {
    name: string;
    phone: string;
    address: string;
    landmark: string;
    city: string;
  };
}
