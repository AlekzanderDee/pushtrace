import styled from 'styled-components';

import Button from './button';


const SecondaryButton = styled(Button)`
transition: all 300ms ease-in;
border: 1px solid ${(props) => props.theme.primaryColor};

color: ${(props) => props.theme.primaryColor};
background-color: transparent;

&:hover:enabled {
  color: ${(props) => props.theme.baseBackgroundColor};
  background-color: ${(props) => props.theme.primaryColor};
  border: 1px solid transparent;
}

&:disabled {
  color: ${(props) => props.theme.secondaryBackgroundColor};
  border: 1px solid ${(props) => props.theme.secondaryBackgroundColor};

}
`;

export default SecondaryButton;
