import React from 'react';
import { useState } from 'react';

function Square({value,x}) {
  return (
    <button className="square" onClick={x}>{value}</button>
  )
}
export default Square