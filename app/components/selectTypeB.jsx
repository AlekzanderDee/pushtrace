import _ from 'lodash';

import React from 'react';

const Select = (props) => {
  let options;
  if (_.isArray(props.options)) {
    options = props.options.map((option, ind) => <option key={ind} value={option}>{option}</option>);
  } else {
    options = _.keys(props.options).map((val, ind) => <option key={ind} value={val}>{props.options[val]}</option>);
  }

  return (
    <div className="select">
      <select value={props.value} onChange={props.onChange}>
        {options}
      </select>
    </div>
  );
};


export default Select;
