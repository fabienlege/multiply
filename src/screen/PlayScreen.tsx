/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { Button } from '../Components/Button';
import { Timer } from '../Components/Timer';
import { useAppContext } from '../context/AppContext'


export const PlayScreen = React.memo(() => {
  const {turn, finishTurn} = useAppContext();
  const {selectedTable, selectedFactor, options} = turn!;

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent:'space-between', height:'100%', width:'100%'}}>
      <Timer />
      <div>
        <h1>{selectedFactor}×{selectedTable}</h1>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', padding:'0.5rem'}}>
        {options.map((option) => (<Button key={option} style={{width: '100%', height: '6rem', fontSize: '2rem'}} onClick={() => finishTurn(option)}>{option}</Button>))}
      </div>
    </div>
    )
});