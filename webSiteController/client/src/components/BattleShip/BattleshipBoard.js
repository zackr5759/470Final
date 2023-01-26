import {useEffect, useReducer, useState} from 'react';
import { Plan } from "./plan.js"
import { createInitialState, reducers } from './reducer';
import "./Battleship.css"
import { Stack } from '@mui/material';
import {useChannelStateContext, useChatContext} from "stream-chat-react";
import { set_name, set_enemy, receive_attack } from './actions.js';
import { Battle } from './Battle.js';
import { receive_reset } from './actions.js';

export const BattleshipBoard = (props) => {
    const {player1, player2, firstConnected, setChannel} = props;

    const cookieIDName = document.cookie
        .split('; ')
        .find((row) => row.startsWith('username='))
        ?.split('=')[1];
    const [state, dispatch] = useReducer(reducers, undefined, createInitialState)
    const [player, setPlayer] = useState(null);
    const [player1Name, setPlayer1Name] = useState(null);
    const [player2Name, setPlayer2Name] = useState(null);
    const { channel } = useChannelStateContext();
    const { client } = useChatContext();


    //SetPlayer is the clients player
    //Player1 will be the host of the game
    //Player2 is the one who joined on it
    useEffect(() => {

        if (firstConnected === null){
            setPlayer('player2');
            setPlayer1Name(player2);
            setPlayer2Name(player1); 
        }
        else if (cookieIDName === firstConnected){
            setPlayer('player1');
            setPlayer1Name(player1);
            setPlayer2Name(player2);
        }
    }, [])

    useEffect(() => {
      setTimeout(() => {
        if (firstConnected === null){
          dispatch(set_name(player2Name,player1Name,player1Name))
        }
        else if (cookieIDName === firstConnected){
          dispatch(set_name(player1Name,player2Name,player1Name))
        }
      }, 50)
    }, [player])

    useEffect(() => {
      channel.on((event) => {
          if (event.type === "board" && event.user.id !== client.userID) {
              dispatch(set_enemy(event.board))
              return
          }
          if (event.type === "reset" && event.user.id !== client.userID) {
            dispatch(receive_reset())
            return
          }
          if (event.type === "attack" && event.user.id !== client.userID) {
            dispatch(receive_attack(event.board, event.text, event.win))
            return
          }
      });
    }, [])

    if(state.mode === 'plan' || (state.mode === 'battle' && !state.enemyReady)){
        return(
            <Stack style={{cursor: `url(Ship${state.shipsSet+1}.png), auto`}} className='battleBoard'>
              <Plan state={state} dispatch={dispatch} channel={channel}></Plan>
            </Stack>
          )
      }
    if(state.mode === 'battle' && state.enemyReady){
      return(
          <Stack className='battleBoard'>
            <Battle state={state} dispatch={dispatch} channel={channel}></Battle>
          </Stack>
        )
    }
    }
