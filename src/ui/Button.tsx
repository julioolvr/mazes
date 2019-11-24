import React from "react";
import cn from "classnames";

import "./Button.css";

function Button({
  className,
  selected,
  fullWidth,
  disabled,
  ...props
}: Props & React.ComponentProps<"button">) {
  return (
    <button
      className={cn("btn", className, {
        "btn--selected": selected,
        "btn--full-width": fullWidth,
        "btn--disabled": disabled
      })}
      disabled={disabled}
      {...props}
    />
  );
}

Button.defaultProps = {
  selected: false,
  fullWidth: false,
  disabled: false
};

type Props = {
  className?: string;
  selected?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
};

export default Button;
