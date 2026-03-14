export enum Role {
  Worker = 'worker',
  Employer = 'employer',
  Admin = 'admin',
}

export interface User {
  firstName: string;
  lastName?: string;
  email?: string;
  mobile: string;
  skill?: string;
  role?: Role;
  company?: string;
  password?: string;
}
