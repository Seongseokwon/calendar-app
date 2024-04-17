import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../modules/modal";
import { createSchedule } from "../../modules/schedule";
import { createDaySchedule } from "../../modules/calendar";

interface CreateScheduleProps {
  selectedDate: string;
}

const CreateSchedule = ({ selectedDate }: CreateScheduleProps) => {
  const dispatch = useDispatch();

  const [scheduleInfo, setScheduleInfo] = useState({
    date: selectedDate,
    title: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    setScheduleInfo({ ...scheduleInfo, [name]: value });
  };
  const handleScheduleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { date, title } = scheduleInfo;
    dispatch(createSchedule({ date: new Date(date), title }));
    dispatch(createDaySchedule({ date: new Date(date), title }));
    dispatch(closeModal());
  };
  return (
    <>
      <form onSubmit={handleScheduleSubmit} className="create-schedule-form">
        <div className="create-schedule-form__form-item">
          <label htmlFor="date">날짜</label>
          <input
            type="date"
            name="date"
            id="date"
            value={scheduleInfo.date}
            onChange={onChange}
          />
        </div>
        <div className="create-schedule-form__form-item">
          <label htmlFor="title">일정</label>
          <input
            type="text"
            name="title"
            value={scheduleInfo.title}
            onChange={onChange}
          />
        </div>

        <section className="create-schedule-form__btn-group">
          <button
            className="btn"
            type="button"
            onClick={() => dispatch(closeModal())}
          >
            닫기
          </button>
          <button className="btn primary" type="submit">
            등록
          </button>
        </section>
      </form>
    </>
  );
};

export default CreateSchedule;
