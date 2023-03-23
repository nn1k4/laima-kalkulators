import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [display, setDisplay] = useState('0');
  const [lastKey, setLastKey] =  useState('');
  const [lastOperator, setLastOperator] =  useState('');
  //const [evalStr, setEvalStr] = useState('');

  // useEffect(() => {
    
  //    // setEvalStr (display);

  // },[display]);

const isOperator = (str) => {
  if ((/[\+\-\/\*]/.test(str))) {
      return true
  } else {
    return false
  }
}

const  displayEval = () => {
  let savedOperators = "";
  let newDisplay = "";
  const tmp = display.replace(/ /g,''); // Remove ALL white spaces from text
  const arr =  [...tmp];
  arr.map((x, i) => {


    if (isOperator(x) && isOperator(arr[i-1]) ) {
     
          // if operator operator
       
            savedOperators += arr[i-1] ; // save deleted operaror
            
            newDisplay = newDisplay.replace(/.$/,x) 
            
      
    } else {
          // if numbers or 1 operator
      

          if (!(isOperator(x)) && (arr[i-1] === "-") ) {

            // if last operator === "-"

            savedOperators +=  [...newDisplay][[...newDisplay].length-1]
            newDisplay = newDisplay.replace(/.$/,savedOperators.slice(-2)) // resore last 2 operators
            savedOperators = "";

          } 

         
      newDisplay += x;
      
    }

    })
  
    console.log (newDisplay);
    setDisplay(eval(newDisplay).toString());
  }

  const handleNumber = (event) => {
    
   
    let firstElementLastItem = '';
    let lengthLastElement = '';
    

    const number = event.target.textContent;
    const array = display.split(' ');
    const lastElement =  array[array.length - 1]
    
    
    firstElementLastItem = [...lastElement][0] ? [...lastElement][0] : ' ';
    lengthLastElement = [...lastElement].length;        
 
    if (display === '0') {
      
      setDisplay(number);
    } else {

        // check for the presence of two zeros in a row.

         if (!(firstElementLastItem === number && number == 0 &&  lengthLastElement == 1 )) {
             
              //check last operator for equality
 
              if (lastKey === '=') {
                setDisplay(number);
              } else {
                setDisplay(display + number);
              }
                
         }
        
      // --
    }
    setLastKey(number);
  }

  const getlastElement = () => {

    const array = display.split(' ');
    return array[array.length - 1] 

  }

  const handleOperator = (event) => {
    const operator = event.target.textContent;

    const lastElement = getlastElement();
    
    //if (parseInt(lastElement) || parseInt(lastElement) == 0 ){
     
     
        setDisplay(display + ' ' + operator + ' ');
        setLastKey(operator);
        setLastOperator(operator);
      
    //}
    

  }

  const handleEqual = (event) => {
 
    const lastElement = getlastElement();
    
    
    if (parseInt(lastElement) || parseInt(lastElement) == 0 ){


          displayEval();  
     
          setLastKey('=');
      
    }
  }

  const handleDecimal = () => {

    const lastElement = getlastElement();
    
    if (!lastElement.includes('.') && (parseInt(lastElement) || parseInt(lastElement) == 0)){
      setDisplay(display + '.');
      setLastKey('.');
    }
  }

  const handleClear = () => {
    setDisplay('0');
    setLastKey('AC');
  }

  return (
    <div className="App">
      
      <div className="calculator">
        <div id="display" className="row">
          {display}
        </div>
        <div id="clear" className="row" onClick={handleClear}>
          AC
         </div>
        <div id="seven" onClick={handleNumber}>7</div>
        <div id="eight" onClick={handleNumber}>8</div>
        <div id="nine" onClick={handleNumber}>9</div>
        <div id="multiply" onClick={handleOperator}>*</div>
        <div id="four" onClick={handleNumber}>4</div>
        <div id="five" onClick={handleNumber}>5</div>
        <div id="six" onClick={handleNumber}>6</div>
        <div id="divide" onClick={handleOperator}>/</div>
        <div id="one" onClick={handleNumber}>1</div>
        <div id="two" onClick={handleNumber}>2</div>
        <div id="three" onClick={handleNumber}>3</div>
        <div id="add" onClick={handleOperator}>+</div>
        <div id="zero" onClick={handleNumber}>0</div>
        <div id="decimal" onClick={handleDecimal}>.</div>
        <div id="equals" onClick={handleEqual}>=</div>
        <div id="subtract" onClick={handleOperator}>-</div>
      </div>
    </div>
  );
}

export default App;
