/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { Button } from '../Components/Button';
import { Timer } from '../Components/Timer';
import { useAppContext } from '../context/AppContext'


export const PlayScreen = React.memo(() => {
  const {turn, finishTurn} = useAppContext();
  const {selectedTable, selectedFactor} = turn!;
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent:'space-between', height:'100%', width:'100%'}}>
      <Timer />
      <div>
        <h1>{selectedFactor}×{selectedTable}</h1>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'center', gap:'1rem'}}>
        <input type="number" style={{flex:1, height:'4rem', fontSize:'2rem'}} autoFocus ref={inputRef} />
        <Button onClick={() => finishTurn(Number(inputRef.current?.value))}>Valider</Button>
      </div>
    </div>
    )
});