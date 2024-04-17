import { ShowDay } from "../../types/calendar.type";
import CalendarDay from "./CalendarDay";

interface CalendarWeekProps {
  week: ShowDay[];
}

const CalendarWeek = ({ week }: CalendarWeekProps) => {
  return (
    <div className="calendar__main__content__week">
      {week.map((day, i) => (
        <CalendarDay key={i} day={day} />
      ))}
    </div>
  );
};

export default CalendarWeek;
