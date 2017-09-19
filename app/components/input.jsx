import styled from 'styled-components';

const Input = styled.input`
background-color: ${(props) => props.theme.baseBackgroundColor};
padding: 0 15px 0 8px;
transition: all 0.2s;
border: 1px solid rgba(0, 0, 0, 0.16);
border-radius: 5px;
font-size: 14px;
height: 32px;
width: 248px;
margin: 0 8px;
box-shadow: none;
outline: none;`;

export default Input;
