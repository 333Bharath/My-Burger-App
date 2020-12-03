import React,{Component} from 'react';
import  classs from './App.module.css';
import Person from './Person/Person'

 class App extends Component {
 
  state={
    persons:[
      {id:'wgggh',name:"bharath",age:23},
      {id:'dknkn',name:"brony",age:10},
      {id:'fnnjn',name:"reddy",age:23},
    ],
    personToggle:false,
  }

        
        toogleHandler =()=>{
          console.log("toogle is clicked")
          const booli = this.state.personToggle;
          this.setState({
            personToggle:!booli
          })
        }
        
        
        inputHandler =(event,id)=>{
          const personIndex = this.state.persons.findIndex(p=>{
            return p.id===id;
          });
          const person ={
            ...this.state.persons[personIndex]
          }
          
          person.name =event.target.value;
          const persons =[...this.state.persons];
          persons[personIndex] =person;
          
          this.setState({
            persons:persons
          })
        }
        
        deleteHandler=(index)=>{
          console.log("clicked"+index)
          // const personss = this.state.persons.slice();
          const persons =[...this.state.persons]
          persons.splice(index,1);
          this.setState({persons:persons});
        }
        
        render(){

          let persons = null;
          let butnclass =[classs.button]

  if(this.state.personToggle=== true){

    persons=(
    <div>
     {/* <Person name={this.state.persons[0].name} age={this.state.persons[0].age} ></Person>
     <Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.buttonHandler.bind(this,'brony!!')}>he likes freedom</Person>
     <Person name={this.state.persons[2].name} 
     age={this.state.persons[2].age}
     inputHandler={this.inputHandler}
     ></Person> */}
     {this.state.persons.map((person,index)=>
     <Person key={person.name} name={person.name} age={person.age} 
     click={this.deleteHandler.bind(this,index)}
     changed={(event)=> this.inputHandler(event,person.id)}
     />
     )
     }
      {/* <button onClick={this.buttonHandler.bind(this,'Bharath!')}>click to change state</button> */}
     </div>
    )
    // style.backgroundColor ='red';
    // style[':hover']={
    //   backgroundColor:'maroon',
    //   color:'black'
    // }
    butnclass.push(classs.red);
  }

  const classes=[];
  if(this.state.persons.length<=2){
    classes.push(classs.red)
  }
  if(this.state.persons.length<=1){
    classes.push(classs.bold)
  }

    return (
    
      <div className={classs.App}>
     <h1 >Hi!! i am react App</h1>
     <p className={classes.join(' ')}>It's Working</p>
      <button className={butnclass.join(' ')} onClick={this.toogleHandler} >Switch Person</button>
      {persons}
    <h1>i will never cheat on me</h1>
    </div>
   
  );
}
}

export default App;
