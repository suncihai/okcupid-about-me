import React from 'react';
import Label from './Label';
import _ from 'lodash';

require("../style/input.scss");

export default function Input({ label, children, value, className, onChange, onBlur, error, ...rest }) {
  return (
    <div className={className}>
      {label && <Label className="light-gray-s" block mb>{label}</Label>}
      <input 
        type="text" 
        {...rest}
        onBlur={onBlur} 
        onChange={onChange}
        value={value}
        className={_.compact([className, 'input', error && 'error']).join(' ')} 
      />
      {error && <Label>{error}</Label>}
    </div>
  );
}
