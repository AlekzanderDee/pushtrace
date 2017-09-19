import styled from 'styled-components';
import Button from './button';


const PrimaryButton = styled(Button)`
color: ${(props) => props.theme.baseBackgroundColor};
background-color: ${(props) => props.theme.primaryColor};
border: 1px solid transparent;
transition: all 300ms ease-in;

&:hover {
  color: ${(props) => props.theme.primaryColor};
  background-color: ${(props) => props.theme.baseBackgroundColor};
  border: 1px solid ${(props) => props.theme.primaryColor};
}
`;

export default PrimaryButton;
