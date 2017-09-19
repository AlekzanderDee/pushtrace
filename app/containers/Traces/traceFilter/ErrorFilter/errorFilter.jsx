import React from 'react';
import styled from 'styled-components';

import Checkbox from '../../../../components/Checkbox/checkbox';

const Filter = styled.div`
`;


const ErrorFilter = (props) => {
  const toggleFilter = (e) => {
    e.preventDefault();
    props.toggleErrorFilter();
  };

  return (
    <Filter>
      <Checkbox label="With errors" onClick={toggleFilter} checked={props.filter.enabled} />
    </Filter>
  );
};

ErrorFilter.propTypes = {
  filter: React.PropTypes.object.isRequired,
  toggleErrorFilter: React.PropTypes.func.isRequired,
};

export default ErrorFilter;
