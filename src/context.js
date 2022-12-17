
import {useContext, useReducer } from 'react';
import React from 'react';
import { reducer } from './reducer';
// children, horror, philosophy, politics, crime, movie


const AppContext = React.createContext();
let initialState = {
  data: [],
  cart: [],
  page: '1',
  records : 0,
  pages : 0,
  searchValue: '',
  isNavOpen: false,
  isLoading: false
}

function AppProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  return (
    <AppContext.Provider value={{
        ...state,
        dispatch
    }}>
      {children}
    </AppContext.Provider>
  );

  
}
function useGlobalProvider(){
    return useContext(AppContext)
}
export {AppProvider, useGlobalProvider};