import styled from 'styled-components';
import Button from '../../../../components/Buttons/button';


const TimeRangeButton = styled(Button)`
margin: 5px;
transition: all 300ms ease-in;

border: 1px solid ${(props) => (props.active === true ? 'transparent' : props.theme.primaryColor)};
color: ${(props) => (props.active === true ? props.theme.baseBackgroundColor : props.theme.primaryColor)};
background-color: ${(props) => (props.active === true ? props.theme.primaryColor : 'transparent')};

&:hover {
  border: 1px solid transparent;
  color: ${(props) => props.theme.baseBackgroundColor};
  background-color: ${(props) => props.theme.primaryColor};
}
`;

export default TimeRangeButton;
