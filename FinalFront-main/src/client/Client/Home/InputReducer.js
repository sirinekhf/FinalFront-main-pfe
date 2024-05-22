import { ACTIONS } from "./actions";
const options = {
  tableCss: "ui fixed red table",
  sortable: true,
  pageable: true,
  cellCss: "cellCss",
  pageSize: 5,
  pagerCss: "pager",
  hiddenCols: ["id", "ProductCode", "DateScanned"],
  searchable: true,
  searchInputCss: "searchInputCss",
  dateCols: [{ DateScanned: "en-GB" }],
  dateOptions: {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  },
};
const initialState = {
  options: options,
  minVal: 1,
  maxVal: 1250,
  currentMinVal: 1,
  currentMaxVal: 1250,
};
export const InputReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATEA:
      state.currentMinVal = parseInt(action.payload.value);
      if (state.currentMinVal > state.currentMaxVal) {
        state.currentMaxVal = parseInt(action.payload.value);
      }
      return { ...state };
    case ACTIONS.UPDATEB:
      state.currentMaxVal = parseInt(action.payload.value);
      state.options.searchable = false;
      if (state.currentMinVal > state.currentMaxVal) {
        state.currentMinVal = parseInt(action.payload.value);
      }
      return { ...state };
    case ACTIONS.UPDATE_INITIAL:
      return { ...state, ...initialState };
    default:
      return state;
  }
};
