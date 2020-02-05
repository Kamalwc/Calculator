import React from 'react';
import logo from './logo.svg';
import './App.css';

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
  render(){
    return(
      <div id="parent">
          <Display password={this.state.password}/>
          <Input symbols={this.state.symbols} set={this.handler}/>
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
          />
      </div>
    );
  }
}

class Display extends React.Component{
  
  render(){
    /*
    crunch code here to decide Password strength.
    apply strength to the width of the strength bar DIV
     */
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

    let length = document.getElementById("length").value.length,
        checkSym1 = document.getElementById("symbols1").checked,
        checkSym2 = document.getElementById("symbols2").checked,
        checkSym3 = document.getElementById("symbols3").checked,
        checkSym4 = document.getElementById("symbols4").checked,
        checkNum =  document.getElementById("numbers").checked,
        checkLowcse=  document.getElementById("lowercase").checked,
        checkUppcse = document.getElementById("uppercase").checked;
    this.props.set(length,checkSym1,checkSym2,checkSym3,checkSym4,checkNum,checkLowcse,checkUppcse);
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
            onChange={()=> this.checked()}/><br/>
          <input 
            name="symbols" 
            type="checkbox" 
            id="symbols1"
            onChange={()=> this.checked()}
            />
          <label className="checkbox">Include Type1 Symbols</label><br/>
          <input 
            name="symbols" 
            type="checkbox" 
            id="symbols2"
            onChange={()=> this.checked()}
            />
          <label className="checkbox">Include Type2 Symbols</label><br/>
          <input 
            name="symbols" 
            type="checkbox" 
            id="symbols3"
            onChange={()=> this.checked()}
            />
          <label className="checkbox">Include Type3 Symbols</label><br/>
          <input 
            name="symbols" 
            type="checkbox" 
            id="symbols4"
            onChange={()=> this.checked()}
            />
          <label className="checkbox">Include Type4 Symbols</label><br/>
          <input 
            name="numbers" 
            id="numbers" 
            type="checkbox"
            onChange={()=> this.checked()}/>
          <label className="checkbox">Include Numbers</label><br/>
          <input 
            name="lowercase" 
            id="lowercase" 
            type="checkbox"
            onChange={()=> this.checked()}/>
          <label className="checkbox">Include lowercase letters</label><br/>
          <input 
            name="uppercase" 
            id="uppercase"
            type="checkbox"
            onChange={()=> this.checked()}/>
          <label className="checkbox">Include uppercase</label><br/>
        </div>
        <div id="inputRight"> 
          <h1>Test</h1>
          <button id="generate" onClick={()=>this.checked()}></button>
        </div>
      </div>
    );
  }
}

class Generate extends React.Component{

  filter = () =>{
    let bag = [
      {
        interval:"33-47",
        checked:this.props.symbols1
      },
      {
        interval:"58-64",
        checked:this.props.symbols2
      },
      {
        interval:"91-96",
        checked:this.props.symbols3
      },
      {
        interval:"123-126",
        checked:this.props.symbols4
      },
      {
        interval:"48-57",
        checked:this.props.numbers
      },
      {
        interval:"65-90",
        checked:this.props.uppercaseLetters
      },
      {
        interval:"97-122",
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
        let rsym,randomsymb,min,ch,max,maxf,intervalArray,bagPick,randomChar,random,char;
        let randmax, length = this.props.length;
          let password=[];
          for(let i = 0; i<length; i++){
              randmax = fbag.length -1;
              bagPick = Math.floor((Math.random() *  (randmax - 0 + 1) + 0));
              intervalArray = fbag[bagPick].interval.split("-");
              min = parseInt(intervalArray[0]);
              max = parseInt(intervalArray[1]);
              
              randomChar = Math.floor(Math.random() * (max - min + 1) + min);
              char = String.fromCharCode(randomChar);
              
              password.push(char)
              
          }
          console.log(password);
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

