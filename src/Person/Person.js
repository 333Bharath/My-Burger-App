import React from 'react';
import './Person.css';
import styled from 'styled-components';

const StyledDiv = styled.div`
    color:black;
    width: 40%;
    margin: 16px auto;
    border: 1px solid #eee;
    box-shadow:  0 2px 3px #ccc;
    padding: 16px;
    text-align: center;

    @media(min-width:500px) {
        width:450px;
        background-color:grey;
    }
`;

const person =(props)=>{

    return(
        <StyledDiv>
            <p>{props.name} age is {props.age}</p>
            <p>{props.children}</p>
            <button onClick={props.click}>Delete</button>
            <input type="text" onChange={props.changed} value={props.name}/>
        </StyledDiv>

    )

}

export default person;