import {
  ComponentWithAs,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import _ from "lodash";
import React, {
  ElementType,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    label: string;
    textarea?: boolean;
  };

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size = _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  let InputType: ComponentWithAs<ElementType<any>, any> = Input;
  if (textarea) {
    InputType = Textarea;
  }
  return (
    <FormControl isInvalid={!!error} data-testid="inputField">
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputType
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
        data-testid="inputText"
      />
      {error ? (
        <FormErrorMessage data-testid="formErrorMessage">
          {error}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
export default InputField;
