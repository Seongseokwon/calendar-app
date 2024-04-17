import { useDispatch, useSelector } from "react-redux";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { changeMonth, moveTodayMonth } from "../../modules/calendar";
import { RootState } from "../../modules";

interface CalendarHeaderProps {}

const CalendarHeader = ({}: CalendarHeaderProps) => {
  const dispatch = useDispatch();
  const { year, month } = useSelector(
    (state: RootState) => state.calendar.shownMonth
  );
  return (
    <header className="calendar__header">
      <section className="calendar__header__title">
        <h2>{`${year}년 ${month}월`}</h2>
      </section>
      <section className="calendar__header__btn-group">
        <button
          className="btn"
          type="button"
          onClick={() => dispatch(changeMonth(-1))}
        >
          <MdOutlineArrowBackIos />
        </button>
        <button
          className="btn"
          type="button"
          onClick={() => dispatch(moveTodayMonth())}
        >
          오늘
        </button>
        <button
          className="btn"
          type="button"
          onClick={() => dispatch(changeMonth(1))}
        >
          <MdOutlineArrowForwardIos />
        </button>
      </section>
    </header>
  );
};

export default CalendarHeader;
