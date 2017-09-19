import React from 'react';
import styled from 'styled-components';
import TimeRangeButton from './timeRangeButton';


const Filter = styled.div`
display: flex;
align-items: center;
`;

const FilterLabel = styled.span`
margin-right: 10px;
flex-shrink: 0;
`;

const FilterOptions = styled.div`
display: flex;
flex-wrap: wrap;
`;


const TimeRangeFilter = (props) => (
  <Filter>
    <FilterLabel>Time range:</FilterLabel>
    <FilterOptions>
      <TimeRangeButton active={props.filter.range === 10} onClick={(e) => { e.preventDefault(); props.timerangeTypeSwitcher(10); }}>10min</TimeRangeButton>
      <TimeRangeButton active={props.filter.range === 30} onClick={(e) => { e.preventDefault(); props.timerangeTypeSwitcher(30); }}>30min</TimeRangeButton>
      <TimeRangeButton active={props.filter.range === 60} onClick={(e) => { e.preventDefault(); props.timerangeTypeSwitcher(60); }}>1hr</TimeRangeButton>
      <TimeRangeButton active={props.filter.range === -1} onClick={(e) => { e.preventDefault(); props.timerangeTypeSwitcher(-1); }}>Custom</TimeRangeButton>
    </FilterOptions>
  </Filter>
  );

TimeRangeFilter.propTypes = {
  filter: React.PropTypes.object.isRequired,
  timerangeTypeSwitcher: React.PropTypes.func.isRequired,
};

export default TimeRangeFilter;
