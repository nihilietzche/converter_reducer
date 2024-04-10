import './App.css';
import React, { useReducer } from 'react';
import Block from './block.js';
import reducer from './reducer.js';

function App() {
  const initialState = {toPrice: 1, toCurrency: 'USD', fromCurrency: 'RUB'}
  const [state, dispatch] = useReducer(reducer, initialState)
  const q = '12'
  // const [fromCurrency, setFromCurrency] = React.useState('RUB')
  // const [state.toCurrency, setstate.toCurrency] = React.useState('USD')
  // const [fromPrice, setFromPrice] = React.useState(0)
  // const [toPrice, setToPrice] = React.useState(1)

  const valutes = React.useRef({})

  //valutes = 
  
  //const [valutes, setValutes] = React.useState()
  console.log(valutes)

  React.useEffect(()=>{
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    .then((res)=>res.json())
    .then((json)=>{
      valutes.current = ({
        ...json.Valute,
        RUB: {Value: 1}
      });
      onChangeToPrice(state.toPrice);
    }).catch((err)=>console.log(err));
  }, []);

  

  const onChangeFromPrice = (value, cur) => {
    const price = value / valutes.current[state.toCurrency].Value
    const result = price * valutes.current[cur ?? state.fromCurrency].Value
    dispatch({
      type: 'changeFromPrice',
      fromPrice: value,
      toPrice: result.toFixed(3)
    })
    // setFromPrice(value)
    // setToPrice(result.toFixed(3))
  }
  const onChangeToPrice = (value, cur) => {
    const price = value / valutes.current[state.fromCurrency].Value
    const result = price * valutes.current[cur ?? state.toCurrency].Value
    dispatch({
      type: 'changeToPrice',
      toPrice: value,
      fromPrice: result.toFixed(3)
    })
    // setToPrice(value)
    // setFromPrice(result.toFixed(3))
  }

  const onChangeFromCurrency = (cur) => {
    dispatch({
      type: 'changeFromCurrency',
      fromCurrency: cur,
    });
    onChangeFromPrice(state.fromPrice, cur)
  }

  const onChangeToCurrency = (cur) => {
    dispatch({
      type: 'changeToCurrency',
      toCurrency: cur,
    });
    onChangeToPrice(state.toPrice, cur)
  }
  // use reduce 
  // React.useEffect(() => {
  //   console.log(valutes.current)
  //   console.log(fromPrice, toPrice, fromCurrency, state.toCurrency, valutes.current);
  //   onChangeFromPrice(fromPrice)
  // }, [fromCurrency])

  // React.useEffect(() => {
  //   console.log(toPrice);
  //   onChangeToPrice(toPrice)
  // }, [state.toCurrency])

  console.log('body', state.fromCurrency)
  return (
    <div className="App">
      <div className='wrapper'>
        <Block 
          value ={state.fromPrice}
          currency = {state.fromCurrency}
          onChangeCurrency={onChangeFromCurrency}
          onChangeValue={onChangeFromPrice}
        />
        <Block
          value ={state.toPrice}
          currency = {state.toCurrency}
          onChangeCurrency={onChangeToCurrency}
          onChangeValue={onChangeToPrice}
        />
      </div>
    </div>
  );
}

export default App;
