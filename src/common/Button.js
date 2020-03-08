import React from 'react';
import Label from './Label';
import _ from 'lodash';
require("../style/button.scss")

export default function Button({
  children,
  className = 'submit',
  disabled,
  ...rest
}) {
  return (
    <div
      className={_.compact([className, 'button', disabled && 'disabled']).join(' ')}
      {...rest}
    >
      <Label className="white-s">
        {children}
      </Label>
    </div>
  );
}
