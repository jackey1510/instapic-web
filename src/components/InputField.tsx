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
} from "@chakra-ui/react";
import { useField } from "formik";
import _ from "lodash";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    label: string;
    textarea?: boolean;
    password?: boolean;
  };

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  password,
  size = _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  let InputOrTextArea: ComponentWithAs<ElementType<any>, any> = Input;
  if (textarea) {
    InputOrTextArea = Textarea;
  }

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {!password ? <InputOrTextArea
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      /> : <InputGroup>
          <Input
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
        </InputGroup>}


      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
export default InputField;
