const redux = require("redux");
// create store
const createStore = redux.createStore;
const combineReducer = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

// action types
const BUY_BOOK = "BUY_BOOK";
const ADD_BOOK = "ADD_BOOK";
const ADD_PEN = "ADD_PEN";
const BUY_PEN = "BUY_PEN";

// initial state
const intialBookState = {
  numberOfBooks: 10,
  Date: "05/09/2020",
};

const intialPenState = {
  numberOfPens: 10,
  Date: "05/09/2020",
};

// actions
function buyBook() {
  return {
    type: BUY_BOOK,
    qty: 2,
  };
}

function addBooks() {
  return {
    type: ADD_BOOK,
    qty: 10,
  };
}

function buyPen() {
  return {
    type: BUY_PEN,
    qty: 1,
  };
}

function addPen() {
  return {
    type: ADD_PEN,
    qty: 10,
  };
}

// reducer
const bookReducer = (state = intialBookState, action) => {
  switch (action.type) {
    case "BUY_BOOK":
      return {
        ...state,
        numberOfBooks: state.numberOfBooks - action.qty,
      };
    case "ADD_BOOK":
      return {
        ...state,
        numberOfBooks: state.numberOfBooks + action.qty,
      };
    default:
      return state;
  }
};

const penReducer = (state = intialPenState, action) => {
  switch (action.type) {
    case "BUY_PEN":
      return {
        ...state,
        numberOfPens: state.numberOfPens - action.qty,
      };
    case "ADD_PEN":
      return {
        ...state,
        numberOfPens: state.numberOfPens + action.qty,
      };
    default:
      return state;
  }
};

const reducer = combineReducer({
  book: bookReducer,
  penReducer: penReducer,
});

const logger = (store) => {
  return (next) => {
    return (action) => {
      const result = next(action);
      console.log("logger middleware", result);
      return result;
    };
  };
};

// create store variable
const store = createStore(reducer, applyMiddleware(logger));
console.log("Inital state", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("Updated State", store.getState());
});

store.dispatch(buyBook());
store.dispatch(addBooks());
store.dispatch(buyPen());
store.dispatch(addPen());
//unsubscribe();
