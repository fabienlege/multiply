/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
import { Reducer, createContext, useContext, useReducer, useRef } from "react";
import { ScreenIndex } from "../Components/AppScreen"
import { availableTables } from '../constants/tables';
import { ITurn } from './game.utils';


export interface IAppState {
  screen: ScreenIndex;
  tables: Set<keyof typeof availableTables>;
  timer: number;
  turn: ITurn | null;
  score: number;
  bestScore: number;
  response: number;
}

const defaultAppState: IAppState = {
  screen: 'home',
  tables: new Set<keyof typeof availableTables>(),
  timer: 0,
  turn: null,
  score: 0,
  bestScore: 0,
  response: 0,
}
;

export interface IAppContext extends IAppState {
  setScreen: (screen: ScreenIndex) => void;
  enableTable: (table: keyof typeof availableTables) => void;
  disableTable: (table: keyof typeof availableTables) => void;
  timerTick: () => void;
  timerStart: () => void;
  timerReset: () => void;
  startTurn: (turn:ITurn) => void;
  finishTurn: (response: number|null) => void;
  newParty: (turn:ITurn) => void;
}

const defaultAppContext: IAppContext = {...defaultAppState, setScreen: () => {}, enableTable: () => {}, disableTable: () => {}, timerTick: () => {}, timerStart: () => {}, timerReset: () => {}, startTurn: () => {}, finishTurn: () => {}, newParty: () => {}};

export const AppContext = createContext<IAppContext>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

type AppReducerAction = 
  |{
    type: 'SET_SCREEN';
    payload: ScreenIndex;
  }
  |{
    type: 'ENABLE_TABLE';
    payload: keyof typeof availableTables;
  }
  |{
    type: 'DISABLE_TABLE'; 
    payload: keyof typeof availableTables;
  }
  |{
    type: 'TIMER_TICK';
  }
  |{
    type: 'TIMER_RESET';
  }
  |{
    type: 'SET_TURN';
    payload: ITurn;
  }
  |{
    type: 'FINISH_TURN';
    payload: {
      response: number|null;
    }
  }
  |{
    type: 'RESET_SCORE';
  }

const AppReducer = (state: IAppState, action: AppReducerAction): IAppState => {
  switch (action.type) {
    case 'SET_SCREEN':
      return {...state, screen: action.payload};
    case 'ENABLE_TABLE':
      const tables = new Set<keyof typeof availableTables>([...state.tables, action.payload]);
      console.log(tables);
      //localStorage.setItem('tables', JSON.stringify([...tables]));
      return {...state, tables};
      case 'DISABLE_TABLE':
        const tables2 = new Set<keyof typeof availableTables>([...state.tables]);
        console.log(tables2);
      tables2.delete(action.payload);
      //localStorage.setItem('tables', JSON.stringify([...tables2]));
      return {...state, tables: tables2};
    case 'TIMER_RESET':
      return {...state, timer: 0};
    case 'TIMER_TICK':
      return {...state, timer: state.timer + 1};
    case 'SET_TURN': 
      return {...state, turn: action.payload};
    case  'FINISH_TURN':
      if(state.turn?.result === action.payload.response){
        const score = state.score + 1;
        let bestScore = state.bestScore;
        if(score > state.bestScore){
          bestScore = score;
        }
        return {...state, score: state.score + 1, screen: 'win', bestScore}
      }
      return {...state, screen: 'lose'};
    case 'RESET_SCORE':
      return {...state, score: 0};
    default:
      return state;
  }
};

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [context, dispatch] = useReducer<Reducer<IAppState, AppReducerAction>>(AppReducer, defaultAppState);
  const timerInterval = useRef<number | null>(null);

  const setScreen = (screen: ScreenIndex) => {
    dispatch({type: 'SET_SCREEN', payload: screen});
  }

  const enableTable = (table: keyof typeof availableTables) => {
    dispatch({type: 'ENABLE_TABLE', payload: table});
  }

  const disableTable = (table: keyof typeof availableTables) => {
    dispatch({type: 'DISABLE_TABLE', payload: table});
  }

  const finishTurn = (response: number|null) => {
    timerReset();
    dispatch({type: 'FINISH_TURN', payload: {response}});
  }

  const timerTick = () => {
    dispatch({type: 'TIMER_TICK'});
  }

  const timerStart = () => {
    timerInterval.current = setInterval(timerTick, 1000);
  }
  
  const timerReset = () => {
    clearInterval(timerInterval.current!);
    dispatch({type: 'TIMER_RESET'});
  }

  const startTurn = (turn: ITurn) => {
    dispatch({type: 'SET_TURN', payload: turn});
    timerStart();
    setScreen('play');
  }

  const newParty = (turn: ITurn) => {
    dispatch({type: 'SET_TURN', payload: turn});
    dispatch({type: 'RESET_SCORE'});
    timerReset();
    setScreen('play');
  }

  return (
    <AppContext.Provider value={{...context, setScreen, enableTable, disableTable, timerTick, timerReset, timerStart, startTurn, finishTurn, newParty}}>
      {children}
    </AppContext.Provider>
  );
};
