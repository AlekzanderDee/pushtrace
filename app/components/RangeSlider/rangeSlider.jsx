import React from 'react';
import 'rc-slider/assets/index.css';

const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);


export default (props) => (
  <div className="pt-slider fl fl-abs-centered">
    <Range className="" {...props} />
  </div>
);
