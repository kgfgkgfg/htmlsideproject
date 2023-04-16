import React from 'react'
import Square from './square'
import { useState } from 'react';
export default function Board() {
   const [game,setgame]=useState(true);
   const [o,seto]=useState(true)
   const [squares, setSquares] = useState(Array(9).fill(null));
   const [status,setstatus] =useState("next player:"+'X')
   ////
   function check(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
   function change(i){
    if(!game){
        return;
        
    }
    if(squares[i]!=null)return
    const nextsquare=squares.slice()
    nextsquare[i]=(o?'O':'X')
    if(check(nextsquare)==null)setstatus("next player:"+(o?'X':'O'))
    else {
        setstatus("winner:"+(!o?'X':'O'))
        setgame(false)
    }
    setSquares(nextsquare)
    seto(!o)
   }
  return (
    <>
    <div className="status">{status}</div>
    <div className="board-row">
      <Square value={squares[0] }x={()=>change(0)}/>
      <Square value={squares[1]}x={()=>change(1)}/>
      <Square value={squares[2]}x={()=>change(2)}/>
    </div>
    <div className="board-row">
      <Square value={squares[3]}x={()=>change(3)}/>
      <Square value={squares[4]}x={()=>change(4)}/>
      <Square value={squares[5]}x={()=>change(5)}/>
    </div>
    <div className="board-row">
      <Square value={squares[6]}x={()=>change(6)}/>
      <Square value={squares[7]}x={()=>change(7)}/>
      <Square value={squares[8]}x={()=>change(8)} />
    </div>
    </>
  )
}
