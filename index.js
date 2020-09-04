const redux = require("redux");
// create store
const createStore = redux.createStore;

// action types
const BUY_BOOK = "BUY_BOOK";
const ADD_BOOK = "ADD_BOOK";

// initial state
const intialState = {
  numberOfBooks: 10,
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

// reducer
const Reducer = (state = intialState, action) => {
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

// create store variable
const store = createStore(Reducer);
console.log("Inital state", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("Updated State", store.getState());
});

store.dispatch(buyBook());
store.dispatch(addBooks());
store.dispatch(buyBook());
store.dispatch(buyBook());
unsubscribe();
