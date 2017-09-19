import React from 'react';
import styled from 'styled-components';

import Checkbox from '../../../../components/Checkbox/checkbox';
import DurationInput from './durationInput';


const Filter = styled.div`
`;

const InputsGroup = styled.div`
display: flex;
flex-wrap: wrap;
`;

const DurationFilter = (props) => {
  const onChangeMin = (newMin) => {
    props.setDurationFilter(newMin, props.filter.max);
  };

  const onChangeMax = (newMax) => {
    props.setDurationFilter(props.filter.min, newMax);
  };

  return (
    <Filter>
      <Checkbox label="Duration" onClick={props.toggleDurationFilter} checked={props.filter.enabled} />
      <InputsGroup>
        <DurationInput label="min (μs)" value={props.filter.min} onChange={onChangeMin} disabled={!props.filter.enabled} />
        <DurationInput label="max (μs)" value={props.filter.max} onChange={onChangeMax} disabled={!props.filter.enabled} />
      </InputsGroup>
    </Filter>
  );
};

DurationFilter.propTypes = {
  filter: React.PropTypes.object.isRequired,
  setDurationFilter: React.PropTypes.func.isRequired,
  toggleDurationFilter: React.PropTypes.func.isRequired,
};

export default DurationFilter;
