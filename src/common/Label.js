import React from 'react';
import _ from 'lodash';
require("../style/label.scss")

export default function Label({
  children,
  className,
  inline,
  bold,
  block,
  mb,
  ml,
  mr,
}) {
  return (
    <span
      className={_.compact([
        className, 
        'label', 
        inline && 'inline', 
        bold && 'bold', 
        block && 'block',
        mb && 'mb',
        ml && 'ml',
        mr && 'mr'
      ])
        .join(' ')}
    >
      {children}
    </span>
  );
}
