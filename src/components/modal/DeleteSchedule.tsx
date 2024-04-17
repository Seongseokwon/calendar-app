import { useDispatch } from "react-redux";
import { Schedule } from "../../types/calendar.type";
import { closeModal } from "../../modules/modal";
import { deleteDaySchedule } from "../../modules/calendar";
import { deleteSchedule } from "../../modules/schedule";

interface DeleteScheduleProps {
  schedule: Schedule;
}

const DeleteSchedule = ({ schedule }: DeleteScheduleProps) => {
  const dispatch = useDispatch();

  const handleDeleteSchedule = () => {
    dispatch(deleteDaySchedule(schedule));
    dispatch(deleteSchedule(schedule));
    dispatch(closeModal());
  };
  return (
    <main className="schedule-delete-modal">
      <h3 className="schedule-delete-modal__title">
        일정을 삭제하시겠습니까 ?
      </h3>
      <section className="schedule-delete-modal__btn-group">
        <button
          className="btn"
          type="button"
          onClick={() => dispatch(closeModal())}
        >
          취소
        </button>
        <button
          className="btn warning"
          type="button"
          onClick={handleDeleteSchedule}
        >
          확인
        </button>
      </section>
    </main>
  );
};

export default DeleteSchedule;
