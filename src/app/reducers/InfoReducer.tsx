import {
  ADD_FAVORITE,
  RESOLVE_FAVORITE
} from "@actions/Types";

const initialState = {
  favorite_count: 0,
};

export const InfoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favorite_count: state.favorite_count + 1,
      };
    case RESOLVE_FAVORITE:
      return {
        ...state,
        favorite_count: 0,
      };
  }
  return state;
};
