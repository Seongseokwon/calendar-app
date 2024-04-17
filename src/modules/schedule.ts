import { Schedule } from "./../types/calendar.type";

const CREATE_SCHEDULE = "calendar/CREATE_SCHEDULE" as const;
const DELETE_SCHEDULE = "calendar/DELETE_SCHEDULE" as const;

export const createSchedule = (schedule: Schedule) => ({
  type: CREATE_SCHEDULE,
  schedule,
});

export const deleteSchedule = (schedule: Schedule) => ({
  type: DELETE_SCHEDULE,
  schedule,
});
type SchedulState = {
  schedule: Schedule[];
};

const initialState = {
  schedule: [],
};

type ScheduleAction =
  | ReturnType<typeof createSchedule>
  | ReturnType<typeof deleteSchedule>;

export default function schedule(
  state: SchedulState = initialState,
  action: ScheduleAction
): SchedulState {
  switch (action.type) {
    case CREATE_SCHEDULE: {
      return {
        ...state,
        schedule: [...state.schedule, action.schedule],
      };
    }
    case DELETE_SCHEDULE: {
      const targetMonth = action.schedule.date.getMonth() + 1;
      const targetDate = action.schedule.date.getDate();
      return {
        ...state,
        schedule: state.schedule.filter(
          (sc) =>
            sc.date.getMonth() + 1 === targetMonth &&
            sc.date.getDate() === targetDate &&
            sc.title !== action.schedule.title
        ),
      };
    }
    default:
      return state;
  }
}
