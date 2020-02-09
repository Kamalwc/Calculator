import React from 'react';
import logo from './logo.svg';
import './App.css';
import BigInt from 'big-integer';

function App() {
  return (
    <Parent/>
  );
}
//change
class Parent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      password:"",
      length:5,
      symbols1:false,
      symbols2:false,
      symbols3:false,
      symbols4:false,
      numbers:false,
      lowercaseLetters:false,
      uppercaseLetters:false
    }
  }

  setPassword = (password) =>{
    this.setState({
      password:password
    })
  }
  
  handler = (len,sym1,sym2,sym3,sym4, num,lowcse,uppcse)=>{
    this.setState({
      length:len,
      symbols1:sym1,
      symbols2:sym2,
      symbols3:sym3,
      symbols4:sym4,
      numbers:num,
      lowercaseLetters:lowcse,
      uppercaseLetters:uppcse
    });
  }

  strength = () =>{
    let strength,length,checkSym1,checkSym2,checkSym3,checkSym4,checkNum,checkLowcse,checkUppcse;
    // CALL THIS METHOD IN INPUT ONCHANGE SO A NEW CALCULATION IS TRIGGERED EVERYTIME.
    document.getElementById("symbols1").checked ? checkSym1 = 14 : checkSym1 = 0;
    document.getElementById("symbols2").checked ? checkSym2 = 6 : checkSym2 = 0;
    document.getElementById("symbols3").checked ? checkSym3 = 5 : checkSym3 = 0;
    document.getElementById("symbols4").checked ? checkSym4 = 3 : checkSym4 = 0;
    document.getElementById("numbers").checked ? checkNum = 9 : checkNum = 0 ;
    document.getElementById("lowercase").checked ? checkLowcse = 25 : checkLowcse = 0 ;
    document.getElementById("uppercase").checked ? checkUppcse = 25 : checkUppcse = 0 ;
    // let complexity = Math.pow((checkSym1 + checkSym2 + checkSym3 + checkSym4 + checkNum + checkLowcse + checkUppcse), this.state.length);
    let complexity = Math.pow((3), this.state.length);
    // console.log(typeof this.state.length)

    console.log(BigInt(complexity)); //import BIG INT into project so the huge nubmer can display
  }

  printState = ()=>{
    console.log(this.state.password)
  }
  render(){
    return(
      <div id="parent">
          <Display password={this.state.password} length={this.state.length} strength={this.strength}/>
          <Input symbols={this.state.symbols} set={this.handler} strength={this.strength}/>
          <Generate 
            password={this.state.password}  
            length={this.state.length}  
            symbols1={this.state.symbols1}
            symbols2={this.state.symbols2}
            symbols3={this.state.symbols3}
            symbols4={this.state.symbols4}
            numbers={this.state.numbers}
            lowercaseLetters={this.state.lowercaseLetters}
            uppercaseLetters={this.state.uppercaseLetters}
            setPass={this.setPassword}
          />
      </div>
    );
  }
}

class Display extends React.Component{
  
  render(){
    
    // calculate password strength and apply to width bar 
    //     The 'randomness' of a password is simple to calculate: complexity ^ length, where ^ is exponentiation. 
    //     As you might know, changing the exponent (the length) makes the number much larger than changing the base (complexity).

    // For example, a random password using 6 characters, consisting of a-z, A-Z, and 0-9, has a complexity of 62 (26 + 26 + 10) and a 
    // length of 6, making 62^6= ~56 billion possible passwords. It is well-known that 6 characters is very insecure for most purposes,
    //  even when randomly generated.
    
    // let style = {
    //   width:
    // };
    return(
      <div id="display">
          <p id="password">{this.props.password}</p>
          <div id="strength" ></div>
      </div>
    );
  }
}

class Input extends React.Component{
  checked = () =>{

    let length = document.getElementById("length").value,
        checkSym1 = document.getElementById("symbols1").checked,
        checkSym2 = document.getElementById("symbols2").checked,
        checkSym3 = document.getElementById("symbols3").checked,
        checkSym4 = document.getElementById("symbols4").checked,
        checkNum =  document.getElementById("numbers").checked,
        checkLowcse=  document.getElementById("lowercase").checked,
        checkUppcse = document.getElementById("uppercase").checked;
    this.props.set(length,checkSym1,checkSym2,checkSym3,checkSym4,checkNum,checkLowcse,checkUppcse);
  } 

  checkNstrength = () =>{
    this.checked();
    this.props.strength();
  }
  render(){
    return(
      <div id="input">
        <div id="inputLeft">
          <label id="passwordLength">Password Length</label>
          <input 
            name="length" 
            id="length" 
            type="text" 
            size="5" 
            /* ALSO CALL THE STRENGTH METHOD TO TRIGGER A NEW CALCULATION */
            onChange={()=> this.checkNstrength()}/><br/>
          <input 
            name="symbols" 
            type="checkbox" 
            id="symbols1"
            onChange={()=> this.checkNstrength()}
            />
          <label className="checkbox">Include Type1 Symbols</label><br/>
          <input 
            name="symbols" 
            type="checkbox" 
            id="symbols2"
            onChange={()=> this.checkNstrength()}
            />
          <label className="checkbox">Include Type2 Symbols</label><br/>
          <input 
            name="symbols" 
            type="checkbox" 
            id="symbols3"
            onChange={()=> this.checkNstrength()}
            />
          <label className="checkbox">Include Type3 Symbols</label><br/>
          <input 
            name="symbols" 
            type="checkbox" 
            id="symbols4"
            onChange={()=> this.checkNstrength()}
            />
          <label className="checkbox">Include Type4 Symbols</label><br/>
          <input 
            name="numbers" 
            id="numbers" 
            type="checkbox"
            onChange={()=> this.checkNstrength()}/>
          <label className="checkbox">Include Numbers</label><br/>
          <input 
            name="lowercase" 
            id="lowercase" 
            type="checkbox"
            onChange={()=> this.checkNstrength()}/>
          <label className="checkbox">Include lowercase letters</label><br/>
          <input 
            name="uppercase" 
            id="uppercase"
            type="checkbox"
            onChange={()=> this.checkNstrength()}/>
          <label className="checkbox">Include uppercase</label><br/>
        </div>
        <div id="inputRight"> 
          <h1>Test</h1>
          <button id="generate" onClick={()=>this.checkNstrength()}></button>
        </div>
      </div>
    );
  }
}

class Generate extends React.Component{

  filter = () =>{
    let bag = [
      {
        interval:"33-47", //14
        checked:this.props.symbols1
      },
      {
        interval:"58-64",//6
        checked:this.props.symbols2
      },
      {
        interval:"91-96",//5
        checked:this.props.symbols3
      },
      {
        interval:"123-126",//3
        checked:this.props.symbols4
      },
      {
        interval:"48-57",//9
        checked:this.props.numbers
      },
      {
        interval:"65-90",//25
        checked:this.props.uppercaseLetters
      },
      {
        interval:"97-122",//25
        checked:this.props.lowercaseLetters
      }
    ];
    let filteredBag = bag.filter(x=>{
       return x.checked == true;
    });
    return filteredBag;
  };

  generatePassword = () =>{
        let fbag = this.filter();
        let min,max,intervalArray,bagPick,randomChar,char;
        let randmax, length = this.props.length;
          let password=[];
          console.log(length)
          for(let i = 0; i<length; i++){
              randmax = fbag.length -1;
              bagPick = Math.floor((Math.random() *  (randmax - 0 + 1) + 0));
              intervalArray = fbag[bagPick].interval.split("-");
              min = parseInt(intervalArray[0]);
              max = parseInt(intervalArray[1]);
              
              randomChar = Math.floor(Math.random() * (max - min + 1) + min);
              char = String.fromCharCode(randomChar);
              
              // console.log('char');
              password.push(char)
          };
        this.props.setPass(password);
  };
  render(){
    return(
      <div>
        <button id="generate" onClick={()=>this.generatePassword()}></button>
      </div>
    )
  }
}


export default App;
// const str = [];
// let rsym,randomsymb,min,ch,max,maxf,intervalArray,bagPick;
// let randmax;

// let random = [ // an array filtered out all the false properties
//   {
//     interval:"48-57",
//     checked:true // this.props.symbol
//   },
//   {
//     interval:"65-90",
//     checked: true
//   }
// ];

// //create filter method that passes filterd array


// // generation method
// let password=[];
// for(let i = 0; i<6; i++){
//         randmax = random.length -1;
//     bagPick = Math.floor((Math.random() *  (randmax - 0 + 1) + 0));
//     intervalArray = random[bagPick].interval.split("-");
//     min = parseInt(intervalArray[0]);
//     max = parseInt(intervalArray[1]);
    
//     randomChar = Math.floor(Math.random() * (max - min + 1) + min);
//     char = String.fromCharCode(randomChar);
    
//     password.push(char)
    
// }




// 33-47 symbols 
// 58-64
// 123- 126

// 48-57 numbers

// 65-90 uppercase 
// 97-122 lowercase

