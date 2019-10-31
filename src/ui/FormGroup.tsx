import React from "react";

import "./FormGroup.css";

function FormGroup({ title, children }: Props) {
  return (
    <div className="form-group">
      <div className="form-group__title">{title}</div>
      {children}
    </div>
  );
}

type Props = {
  title: string;
  children: React.ReactNode;
};

export default FormGroup;
