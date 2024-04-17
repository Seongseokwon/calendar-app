import { useDispatch, useSelector } from "react-redux";
import CalendarWeek from "./CalendarWeek";
import { RootState } from "../../modules";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  MonthDetailReturnType,
  RestDay,
  ShowDay,
} from "../../types/calendar.type";
import { generateShowDays } from "../../modules/calendar";
import { registerRestDay } from "../../modules/restDay";

interface CalendarMainProps {}
const WEEK_TITLE = ["일", "월", "화", "수", "목", "금", "토"];

const CalendarMain = ({}: CalendarMainProps) => {
  const [weekFormat, setWeekFormat] = useState<ShowDay[][]>();
  const {
    shownMonth: { year, month },
    showDays,
  } = useSelector((state: RootState) => state.calendar);
  const { restDay } = useSelector((state: RootState) => state.restDay);
  const { schedule } = useSelector((state: RootState) => state.schedule);

  const dispatch = useDispatch();
  const getRestDeInfo = async (days: ShowDay[]) => {
    let prevY = year,
      prevM = month - 1,
      nextY = year,
      nextM = month + 1;

    if (prevM === 1) {
      prevY--;
      prevM = 12;
    } else if (nextM === 13) {
      nextY++;
      nextM = 1;
    }

    try {
      const API_URL = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${
        import.meta.env.VITE_API_KEY
      }`;
      const requestDate = [
        { tiemPeriod: "past", date: [prevY, prevM] },
        { tiemPeriod: "present", date: [year, month] },
        { tiemPeriod: "future", date: [nextY, nextM] },
      ];

      const requestData = requestDate.map(async (req) => {
        const [reqYear, reqMonth] = req.date;
        const key = `${reqYear}-${reqMonth}`;

        if (!restDay[key]) {
          return Promise.resolve({
            key,
            isNewRequest: true,
            request: await axios.get(
              `${API_URL}&solYear=${reqYear}&solMonth=${reqMonth
                .toString()
                .padStart(2, "0")}`
            ),
          });
        } else {
          return Promise.resolve({
            key,
            isNewRequest: false,
            request: restDay[key],
          });
        }
      });
      const promiseAllResponse = await Promise.all([...requestData]);

      promiseAllResponse.forEach((res) => {
        let restDayData: RestDay | RestDay[];
        if (res.isNewRequest) {
          const {
            data: {
              response: {
                body: {
                  items: { item },
                },
              },
            },
          } = res.request as {
            data: {
              response: {
                body: {
                  items: {
                    item: RestDay | RestDay[];
                  };
                };
              };
            };
          };
          if (!item) return;
          restDayData = item;
          dispatch(registerRestDay({ date: res.key, restDay: item }));
        } else {
          restDayData = res.request;
        }

        if (Array.isArray(restDayData!)) {
          restDayData.forEach((reDay) => {
            days = days.map((day) => {
              if (
                day.month ===
                  Number(reDay.locdate.toString().substring(4, 6)) &&
                day.date === Number(reDay.locdate.toString().substring(6, 8))
              ) {
                return {
                  ...day,
                  rest: [...(day.rest ?? []), reDay],
                };
              } else {
                return day;
              }
            });
          });
        } else {
          if (restDayData)
            days = days.map((day) => {
              if (
                day.month ===
                  Number(restDayData.locdate.toString().substring(4, 6)) &&
                day.date ===
                  Number(restDayData.locdate.toString().substring(6, 8))
              ) {
                return {
                  ...day,
                  rest: [{ ...restDayData }],
                };
              } else {
                return day;
              }
            });
        }
      });
      dispatch(generateShowDays(days));
    } catch (err) {
      console.log(err);
    }
  };

  const monthDetail = (): MonthDetailReturnType => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const lastDayOfPrevMonth = new Date(year, month - 1, 0);

    return { firstDay, lastDay, lastDayOfPrevMonth };
  };

  const weekFormatting = (days: ShowDay[]) => {
    const temp: ShowDay[][] = [];

    for (let i = 0; i < 6; i++) {
      const row = days.slice(i * 7, i * 7 + 7);
      temp.push(row);
    }

    setWeekFormat(() => temp);
  };
  const generateMonthCalendarDays = (): ShowDay[] => {
    const { firstDay, lastDay, lastDayOfPrevMonth } = monthDetail();
    const days: ShowDay[] = [];
    console.log(restDay);
    // 이전달 일자 채우기
    for (let i = firstDay.getDay(); i > 0; i--) {
      days.push({
        timePeriod: "past",
        month: month - 1,
        date: lastDayOfPrevMonth.getDate() - i + 1,
        schedule:
          schedule.filter(
            (sc) =>
              sc.date.getMonth() + 1 === month - 1 &&
              sc.date.getDate() === lastDayOfPrevMonth.getDate() - i + 1
          ) ?? [],
      });
    }

    // 현재 달 일자 채우기
    for (let i = 0; i < lastDay.getDate(); i++) {
      days.push({
        timePeriod: "present",
        month,
        date: i + 1,
        schedule:
          schedule.filter(
            (sc) =>
              sc.date.getMonth() + 1 === month && sc.date.getDate() === i + 1
          ) ?? [],
      });
    }

    const daysLen = days.length;
    for (let i = daysLen; i < 42; i++) {
      days.push({
        timePeriod: "future",
        month: month + 1,
        date: i - daysLen + 1,
        schedule:
          schedule.filter(
            (sc) =>
              sc.date.getMonth() + 1 === month + 1 &&
              sc.date.getDate() === i - daysLen + 1
          ) ?? [],
      });
    }

    return days;
  };

  useEffect(() => {
    const generatedMonth = generateMonthCalendarDays();
    getRestDeInfo(generatedMonth);
  }, [month]);

  useEffect(() => {
    weekFormatting(showDays);
  }, [showDays]);

  return (
    <main className="calendar__main">
      <section className="calendar__main__header">
        {WEEK_TITLE.map((title) => (
          <div key={title}>{title}</div>
        ))}
      </section>
      <section className="calendar__main__content">
        {weekFormat?.map((week, i) => (
          <CalendarWeek week={week} key={i} />
        ))}
      </section>
    </main>
  );
};

export default CalendarMain;
