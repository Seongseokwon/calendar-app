import { CalendarState, Schedule, ShowDay } from "../types/calendar.type";

//Actions
const CHANGE_MONTH = "calendar/CHANGE_MONTH" as const;
const MOVE_TODAY_MONTH = "calendar/MOVE_TODAY_MONTH" as const;
const GENERATE_SHOW_DAYS = "calendar/GENERATE_SHOW_DAYS" as const;

const CREATE_DAY_SCHEDULE = "calendar/CREATE_DAY_SCHEDULE" as const;
const DELETE_DAY_SCHEDULE = "calendar/DELETE_DAY_SCHEDULE" as const;

//Action funciton
export const changeMonth = (direction: number) => ({
  type: CHANGE_MONTH,
  direction,
});

export const moveTodayMonth = () => ({
  type: MOVE_TODAY_MONTH,
});

export const generateShowDays = (showDays: ShowDay[]) => ({
  type: GENERATE_SHOW_DAYS,
  showDays,
});

export const createDaySchedule = (schedule: Schedule) => ({
  type: CREATE_DAY_SCHEDULE,
  schedule,
});

export const deleteDaySchedule = (schedule: Schedule) => ({
  type: DELETE_DAY_SCHEDULE,
  schedule,
});

// Initial state

const initialState: CalendarState = {
  currentDate: new Date(),
  shownMonth: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  },
  showDays: [],
};

type CalendarAction =
  | ReturnType<typeof changeMonth>
  | ReturnType<typeof moveTodayMonth>
  | ReturnType<typeof generateShowDays>
  | ReturnType<typeof createDaySchedule>
  | ReturnType<typeof deleteDaySchedule>;

export default function calendar(
  state: CalendarState = initialState,
  action: CalendarAction
): CalendarState {
  switch (action.type) {
    case GENERATE_SHOW_DAYS: {
      return {
        ...state,
        showDays: action.showDays,
      };
    }
    case CHANGE_MONTH: {
      const currentShowYear = state.shownMonth.year;
      const currentShowMonth = state.shownMonth.month - 1;

      const newDate = new Date(
        currentShowYear,
        currentShowMonth + action.direction
      );

      return {
        ...state,
        shownMonth: {
          year: newDate.getFullYear(),
          month: newDate.getMonth() + 1,
        },
      };
    }
    case MOVE_TODAY_MONTH: {
      return {
        ...state,
        shownMonth: {
          year: state.currentDate.getFullYear(),
          month: state.currentDate.getMonth() + 1,
        },
      };
    }

    case CREATE_DAY_SCHEDULE: {
      const updateTargetMonth = action.schedule.date.getMonth() + 1;
      const updateTargetDate = action.schedule.date.getDate();

      const updateShowDays = state.showDays.map((showDay) => {
        if (
          showDay.month === updateTargetMonth &&
          showDay.date === updateTargetDate
        ) {
          const updateSchedule = showDay.schedule ? [...showDay.schedule] : [];
          updateSchedule.push(action.schedule);

          return {
            ...showDay,
            schedule: updateSchedule,
          };
        } else {
          return showDay;
        }
      });
      return {
        ...state,
        showDays: updateShowDays,
      };
    }

    case DELETE_DAY_SCHEDULE: {
      console.log(action.schedule);
      const targetMonth = action.schedule.date.getMonth() + 1;
      const targetDate = action.schedule.date.getDate();

      const updateShowDays = state.showDays.map((showDay) => {
        if (showDay.month === targetMonth && showDay.date === targetDate) {
          const updateSchedule = showDay.schedule!.filter(
            (sc) => sc.title !== action.schedule.title
          );

          return {
            ...showDay,
            schedule: updateSchedule,
          };
        } else {
          return showDay;
        }
      });

      return {
        ...state,
        showDays: updateShowDays,
      };
    }
    default:
      return state;
  }
}
