import { createStore } from "redux";

/**
 * MaskMap Action Type
 */

const SET_MAP = "setMap";
const SET_STORE_LIST = "setStoreList";
const ADD_MARKER = "addMarker";

const setMap = (map) => {
  return {
    type: SET_MAP,
    map: map
  }
};


const setStoreList = (storeList) => {
  return {
    type: SET_STORE_LIST,
    storeList: storeList
  };
};

const addMarker = (marker, overlay) => {
  return {
    type: ADD_MARKER,
    marker: marker,
    overlay: overlay
  }
};



const reducer = (state = {
  maskMap: {
    map: null,
    storeList: [],
    oldMarker: [],
    oldOverlay: []
  }
}, action) => {
  console.log(action);
  switch (action.type) {

    case SET_MAP:
      return {
        ...state,
        maskMap: {
          ...state.maskMap,
          map: action.map
        }
      };

    case SET_STORE_LIST:
      return {
        ...state,
        maskMap: {
          ...state.maskMap,
          storeList: action.storeList
        }
      };

    case ADD_MARKER:
      console.log("adding... :",action);
      return {
        ...state,
        maskMap: {
          ...state.maskMap,
          oldMarker: action.marker,
          oldOverlay: action.overlay
        }
      };

    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreators = {
  setStoreList,
  setMap,
  addMarker
};

export default store;