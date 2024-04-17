export type TimePeriod = "past" | "present" | "future";

export type Schedule = {
  date: Date;
  title: string;
};

export type RestDay = {
  dateKind: string;
  dateName: string;
  isHoliday: "Y" | "N";
  locdate: number;
  seq: number;
};

export type ShowDay = {
  month: number;
  date: number;
  timePeriod: TimePeriod;
  rest?: RestDay[];
  schedule?: Schedule[];
};
export type CalendarState = {
  currentDate: Date;
  shownMonth: {
    year: number;
    month: number;
  };
  showDays: ShowDay[];
};

export type MonthDetailReturnType = {
  firstDay: Date;
  lastDay: Date;
  lastDayOfPrevMonth: Date;
};
