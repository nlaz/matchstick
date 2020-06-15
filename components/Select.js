import React from "react";
import cx from "classnames";

const Select = ({ className, children, placeholder, ...props }) => (
  <select
    className={cx("select", className)}
    defaultValue={placeholder}
    placeholder={placeholder}
    {...props}
  >
    {children}
  </select>
);

const Option = ({ active, children, className, value }) => (
  <option className={cx("option", { active: active }, className)} value={value}>
    {children}
  </option>
);

Select.Option = Option;

export default Select;
