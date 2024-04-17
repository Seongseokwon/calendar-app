import { ReactNode } from "react";

interface CalendarWrapProps {
  children: ReactNode;
}
const CalendarWrap = ({ children }: CalendarWrapProps) => {
  return <div className="calendar">{children}</div>;
};

export default CalendarWrap;
