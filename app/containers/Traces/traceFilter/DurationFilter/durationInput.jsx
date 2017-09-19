import React from 'react';
import { lighten } from 'polished';
import styled from 'styled-components';

import Input from '../../../../components/input';


const FilterInputGoup = styled.div`
display: flex;
align-items: center;
`;

const FilterInputSpan = styled.span`
font-size: 14px;
transition: all 0.2s;
margin: 0 8px;
color: ${(props) => props.disabled ? lighten(0.1, props.theme.secondaryBackgroundColor) : props.theme.secondaryDarkColor};
`;

const FilterInput = styled(Input)`
font-size: 16px;
padding: 0 4px 0 8px;
max-width: 70px;
height: 1.5em;
line-height: .8em;
&:disabled {
  color: ${(props) => lighten(0.2, props.theme.secondaryBackgroundColor)};
}
`;

const DurationFilterInput = (props) => {
  const changeHandler = (e) => {
    e.preventDefault();
    const v = parseInt(e.target.value, 10);
    props.onChange((v >= 0 && v) || 0);
  };

  return (
    <FilterInputGoup>
      <FilterInputSpan disabled={props.disabled}>{props.label}</FilterInputSpan>
      <FilterInput value={props.value} onChange={changeHandler} type="number" disabled={props.disabled} />
    </FilterInputGoup>
  );
};

DurationFilterInput.propTypes = {
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  disabled: React.PropTypes.bool,

  onChange: React.PropTypes.func.isRequired,
};

export default DurationFilterInput;
