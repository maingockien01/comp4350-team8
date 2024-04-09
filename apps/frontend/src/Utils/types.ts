export type WeeklyEvent = {
  id: number;
  name: string;
  startTime: Date;
  endTime: Date;
  location: string;
};

export type WeeklySchedule = {
  [key: string]: WeeklyEvent[];
};

export type Course = {
  id: number;
  courseName: string;
  time: string;
  location: string;
};
