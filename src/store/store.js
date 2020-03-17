import { createStore } from "redux";

/**
 * DisasterMSG Action Type
 */
const ADD_DISASTER_MSG_DATA = "addDisasterMsgData";
const SET_MSG_SEARCHQUERY = "setMsgSearchQuery";

const addDisasterMsgData = (data) => {
  return {
    type: ADD_DISASTER_MSG_DATA,
    data: data
  }
};

const setMsgSearchQuery = (query) => {
  return {
    type: SET_MSG_SEARCHQUERY,
    searchQuery: query
  };
};

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
  disasterMsg: {
    searchQuery: "",
    data: [],
    pageNo: 1
  },
  maskMap: {
    map: null,
    storeList: [],
    oldMarker: [],
    oldOverlay: []
  }
}, action) => {
  console.log(action);
  switch (action.type) {
    case ADD_DISASTER_MSG_DATA:
      return {
        ...state,
        disasterMsg: {
          ...state.disasterMsg,
          data: state.disasterMsg.data.concat(action.data),
          pageNo: state.disasterMsg.pageNo + 1
        }
      };

    case SET_MSG_SEARCHQUERY:
      return {
        ...state,
        disasterMsg: {
          ...state.disasterMsg,
          searchQuery: action.searchQuery
        }
      };

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
  setMsgSearchQuery,
  addDisasterMsgData,
  setStoreList,
  setMap,
  addMarker
};

export default store;