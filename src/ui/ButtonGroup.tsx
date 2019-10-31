import React from "react";

import "./ButtonGroup.css";

function ButtonGroup({ children }: Props) {
  return <div className="button-group">{children}</div>;
}

type Props = {
  children: React.ReactNode;
};

export default ButtonGroup;
