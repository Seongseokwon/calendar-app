import CalendarWrap from "./CalendarWrap";
import CalendarHeader from "./CalendarHeader";
import CalendarMain from "./CalendarMain";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";
import Modal from "../modal/Modal";

interface CalendarProps {}

const Calendar = ({}: CalendarProps) => {
  const { isOpen } = useSelector((state: RootState) => state.modal);

  return (
    <>
      <CalendarWrap>
        <CalendarHeader />
        <CalendarMain />
      </CalendarWrap>
      {isOpen ? <Modal /> : ""}
    </>
  );
};

export default Calendar;
