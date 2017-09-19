import React from 'react';

const Checkbox = (props) => (
  <span>
    <input
      className="pt-checkbox" type="checkbox" checked={props.checked}
      disabled={props.disabled} onChange={props.onClick}
    />
    <span onClick={props.onClick}>{props.label}</span>
  </span>
);

Checkbox.propTypes = {
  label: React.PropTypes.string.isRequired,
  checked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,

  onClick: React.PropTypes.func.isRequired,
};

export default Checkbox;
