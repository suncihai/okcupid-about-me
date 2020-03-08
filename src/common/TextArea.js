import React from 'react';
import _ from 'lodash';

require("../style/textarea.scss");

export default function TextArea({ label, children, value, className, onChange, ...rest }) {
  return (
    <div className={className}>
      <textarea 
        type="text" 
        {...rest}
        onChange={onChange}
        value={value}
        className={_.compact([className, 'textarea']).join(' ')} 
      />
    </div>
  );
}
