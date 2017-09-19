import styled from 'styled-components';

const Button = styled.button`
display: inline-block;
margin-bottom: 0;
font-weight: normal;
text-align: center;
vertical-align: middle;
touch-action: manipulation;
cursor: pointer;
background-image: none;
border: 1px solid transparent;
white-space: nowrap;
padding: 6px 12px;
font-size: 14px;
line-height: 1.42857143;
border-radius: 4px;
user-select: none;

&:focus {
    outline: none;
}
&:active {
  border: 3px solid red;
}
`;

export default Button;
