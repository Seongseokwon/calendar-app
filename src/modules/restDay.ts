import { RestDay } from "../types/calendar.type";

const REGISTER_REST_DAY = "restDay/REGISTER_REST_DAY";

export const registerRestDay = ({
  date,
  restDay,
}: {
  date: string;
  restDay?: RestDay | RestDay[];
}) => ({
  type: REGISTER_REST_DAY,
  date,
  restDay,
});

type RestDayState = {
  restDay: Record<string, any>;
};
const initialState: RestDayState = {
  restDay: {},
};

type RestDayAction = ReturnType<typeof registerRestDay>;

export default function restDay(state = initialState, action: RestDayAction) {
  switch (action.type) {
    case REGISTER_REST_DAY: {
      const updateRestDay: Record<string, any> = { ...state.restDay };
      updateRestDay[action.date] = action.restDay;
      return {
        ...state,
        restDay: updateRestDay,
      };
    }
    default: {
      return state;
    }
  }
}
