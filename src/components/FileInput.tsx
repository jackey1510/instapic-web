import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import _ from "lodash";
import { AttachmentIcon } from "@chakra-ui/icons";
import { InputHTMLAttributes } from "react";
import { useField } from "formik";

type FileInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

const FileInput: React.FC<FileInputProps> = ({
  label,
  children,
  ...props
}) => {

  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error} isRequired>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<AttachmentIcon />} />
        {children}
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default FileInput;
