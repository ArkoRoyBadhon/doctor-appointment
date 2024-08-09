export interface IPatient {
  _id?: string;
  name: string;
  age: number | string;
  gender: string;
  phone: string;
  email: string;
  userId?: string;
}

export interface IAvailability {
  day: string;
  startTime: string;
  endTime: string;
  maxPatient: number;
}

export interface IDoctor {
  _id: string;
  name: string;
  specialization: string;
  phone: string;
  email: string;
  availability: IAvailability[];
  userId?: string;
}
