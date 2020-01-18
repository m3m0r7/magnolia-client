import {UPDATE_PAGE_TITLE} from "@actions/Types";

const mainTitle = document.title;

const initialState = {
  title: mainTitle,
};

export const PageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_PAGE_TITLE:
      if (action.title !== mainTitle) {
        document.title = action.title + " | " + mainTitle
      }
      return {
        ...state,
        title: document.title,
      };
  }
  return state;
};
