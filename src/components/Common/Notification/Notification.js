import React from "react";
import { Alert, Button } from "react-bootstrap";

export const Notification = ({ show, type, description }) => {
  const [open, setOpen] = React.useState(() => show);
  return (
    <Alert
      show={open}
      variant={type}
      dismissible
      onClose={() => setOpen(false)}
    >
      <div className="d-flex justify-content-between">
        <p className="mb-0">{description}</p>
      </div>
    </Alert>
  );
};
