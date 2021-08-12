import React, { InputHTMLAttributes } from "react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import _ from "lodash";
import { useField } from "formik";

type PasswordFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  size = _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <FormControl isInvalid={!!error} data-testid="passwordField">
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup>
        <Input
          data-testid="passwordInput"
          pr="4.5rem"
          type={show ? "text" : "password"}
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      {error ? (
        <FormErrorMessage data-testid="formErrorMessage">
          {error}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
export default PasswordField;
