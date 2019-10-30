import React from "react";
import cn from "classnames";

import "./Button.css";

function Button({
  className,
  selected,
  ...props
}: Props & React.ComponentProps<"button">) {
  return (
    <button
      className={cn("btn", className, { "btn--selected": selected })}
      {...props}
    />
  );
}

Button.defaultProps = {
  selected: false
};

type Props = {
  className?: string;
  selected?: boolean;
};

export default Button;
