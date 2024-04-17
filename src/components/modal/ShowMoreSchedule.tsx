import { useDispatch } from "react-redux";
import { RestDay, Schedule } from "../../types/calendar.type";
import { closeModal } from "../../modules/modal";

interface ShowMoreScheduleProps {
  schedules: Schedule[];
  restDay: RestDay[];
}

const ShowMoreSchedule = ({ schedules, restDay }: ShowMoreScheduleProps) => {
  const dispatch = useDispatch();

  return (
    <main className="show-more-modal">
      <section className="show-more-modal__list">
        {restDay.map((day) => (
          <div className="calendar__main__content__week__day__item rest">
            {day.dateName}
          </div>
        ))}
        {schedules.map((schedule) => (
          <div className="calendar__main__content__week__day__item schedule">
            {schedule.title}
          </div>
        ))}
      </section>
      <section className="show-more-modal__btn-section">
        <button onClick={() => dispatch(closeModal())} type="button">
          닫기
        </button>
      </section>
    </main>
  );
};

export default ShowMoreSchedule;
