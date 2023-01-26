import { Fragment, useReducer } from 'react';
import { Start } from "./Components/start.js"
import { Shop } from "./Components/shop.js"
import { Battle } from './Components/battle/battle.js';
import { Victory } from './Components/victory.js';
import { createInitialState, reducers } from './reducer';
import "./battleApp.css"
import { Stack } from '@mui/material';

export const App = () => {
const [state, dispatch] = useReducer(reducers, undefined, createInitialState)

if(state.mode === 'start'){
  return(
      <Stack className='App'>
        <Start dispatch={dispatch}></Start>
      </Stack>
    )
  }
if(state.mode === 'shop'){
  return(
      <Stack className='App'>
        <Shop units={state.units} members={state.members} stage={state.stage} gold={state.gold} dispatch={dispatch}></Shop>
      </Stack>
    )
  }
if(state.mode === 'battle'){
  return(
      <Stack className='App'>
        <Battle state={state} dispatch={dispatch}></Battle>
      </Stack>
    )
  }
if(state.mode === 'victory'){
  return(
      <Stack className='App'>
        <Victory units={state.units} dispatch={dispatch}></Victory>
      </Stack>
    )
  }
}
