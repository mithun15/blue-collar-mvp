export enum Role {
  Worker = 'worker',
  Employer = 'employer',
  Admin = 'admin',
}

export interface User {
  fullName?: string;
  email?: string;
  mobile: string;
  skill?: string;
  role?: Role;
}
