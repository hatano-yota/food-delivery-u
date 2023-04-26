import React, { forwardRef } from "react";
import { Button, ButtonProps } from "reactstrap";

const MyButton = forwardRef<HTMLButtonElement, ButtonProps>(({ onClick, ...rest }, ref) => {
  return (
    <Button {...rest} innerRef={ref} onClick={onClick}>
      {rest.children}
    </Button>
  );
});

export default MyButton;
