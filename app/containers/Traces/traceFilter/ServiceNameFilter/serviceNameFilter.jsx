import React from 'react';
import styled from 'styled-components';

import Select from '../../../../components/selectTypeB';


const Filter = styled.div`
display: flex;
`;

const SelectLabel = styled.span`
margin-right: 10px;
flex-shrink: 0;
`;

const StyledSelect = styled(Select)`
box-shadow: none;
`;

const ServiceNameFilter = (props) => (
  <Filter>
    <SelectLabel>Service name:</SelectLabel>
    <StyledSelect
      value={props.filter.serviceName}
      onChange={(e) => props.setServiceNameFilter(e.target.value)}
      options={props.serviceNames}
    />
  </Filter>
  );

ServiceNameFilter.propTypes = {
  filter: React.PropTypes.object.isRequired,
  serviceNames: React.PropTypes.array.isRequired,
  setServiceNameFilter: React.PropTypes.func.isRequired,
};

export default ServiceNameFilter;
