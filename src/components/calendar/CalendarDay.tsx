import { useDispatch, useSelector } from "react-redux";
import { Schedule, ShowDay } from "../../types/calendar.type";
import { RootState } from "../../modules";
import { openModal } from "../../modules/modal";
import CreateSchedule from "../modal/CreateSchedule";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import DeleteSchedule from "../modal/DeleteSchedule";
import ShowMoreSchedule from "../modal/ShowMoreSchedule";

interface CalendarDayProps {
  day: ShowDay;
}

const CalendarDay = ({ day }: CalendarDayProps) => {
  const {
    shownMonth: { year, month },
    currentDate,
  } = useSelector((state: RootState) => state.calendar);
  const dispatch = useDispatch();

  const dayClassNames = `calendar__main__content__week__day ${day.timePeriod}`;
  const showMoreSchedule = () => {
    dispatch(
      openModal(
        "일정",
        <ShowMoreSchedule
          schedules={day.schedule ?? []}
          restDay={day.rest ?? []}
        />
      )
    );
  };
  const handleCreateSchedule = () => {
    const timePeriodObj = {
      past: -1,
      present: 0,
      future: 1,
    };
    let selectedYear = year;
    let selectedMonth = month + timePeriodObj[day.timePeriod];
    if (selectedMonth === 0) {
      selectedYear--;
      selectedMonth = 12;
    } else if (selectedMonth === 13) {
      selectedYear++;
      selectedMonth = 1;
    }
    dispatch(
      openModal(
        "일정 등록",
        <CreateSchedule
          selectedDate={`${selectedYear}-${selectedMonth
            .toString()
            .padStart(2, "0")}-${day.date.toString().padStart(2, "0")}`}
        />
      )
    );
  };

  const handleDeleteSchedule = (schedule: Schedule) => {
    dispatch(openModal("일정 삭제", <DeleteSchedule schedule={schedule} />));
  };
  return (
    <div className={dayClassNames}>
      <div
        className="calendar__main__content__week__day__title"
        role="presentation"
        onClick={handleCreateSchedule}
      >
        {day.date === 1
          ? day.timePeriod === "present"
            ? `${month}월 `
            : `${month + 1}월 `
          : ""}
        <span
          className={
            currentDate.getMonth() + 1 === month &&
            day.date === currentDate.getDate()
              ? "today"
              : ""
          }
        >
          {day.date}
        </span>
        <span>일</span>
      </div>

      {day.rest && day.rest.length > 0
        ? day.rest.map((r, i) => (
            <div
              className="calendar__main__content__week__day__item rest"
              key={i}
            >
              {r.dateName.includes("대체공휴일") ? "대체공휴일" : r.dateName}
            </div>
          ))
        : ""}
      {day.schedule && day.schedule.length > 0
        ? day.schedule.map((s, i) => (
            <div
              className="calendar__main__content__week__day__item schedule"
              key={i}
            >
              {s.title}
              <button type="button" onClick={() => handleDeleteSchedule(s)}>
                <FaRegTrashAlt />
              </button>
            </div>
          ))
        : ""}
      {(day.schedule ?? []).length + (day.rest ?? []).length > 5 ? (
        <button className="show-more-btn" onClick={showMoreSchedule}>
          <FaPlus />
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default CalendarDay;
