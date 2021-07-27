import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ElementType,
} from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  ComponentWithAs,
  InputGroup,
  InputRightElement,
  Button,
  Switch,
} from "@chakra-ui/react";
import { useField } from "formik";
import _ from "lodash";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    label: string;
    textarea?: boolean;
    password?: boolean;
    isSwitch?: boolean;
  };

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  password,
  isSwitch,
  size = _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  let InputType: ComponentWithAs<ElementType<any>, any> = Input;
  if (textarea) {
    InputType = Textarea;
  }
  if (isSwitch) {
    InputType = Switch;
  }

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {!password ? (
        <InputType
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
        />
      ) : (
        <InputGroup>
          <Input
            mt={3}
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
      )}

      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
export default InputField;
