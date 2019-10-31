import React from "react";
import cn from "classnames";

import "./Button.css";

function Button({
  className,
  selected,
  fullWidth,
  ...props
}: Props & React.ComponentProps<"button">) {
  return (
    <button
      className={cn("btn", className, {
        "btn--selected": selected,
        "btn--full-width": fullWidth
      })}
      {...props}
    />
  );
}

Button.defaultProps = {
  selected: false,
  fullWidth: false
};

type Props = {
  className?: string;
  selected?: boolean;
  fullWidth?: boolean;
};

export default Button;
