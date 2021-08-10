import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Input,
  Box,
} from "@chakra-ui/react";
import _ from "lodash";
import { AttachmentIcon } from "@chakra-ui/icons";
import { InputHTMLAttributes } from "react";
import { useField } from "formik";

type FileInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  setInputFile: (value: File) => void
};

const FileInput: React.FC<FileInputProps> = ({
  label,
  children,
  setInputFile,
  ...props
}) => {

  const [field, { error }] = useField(props);
  return (
    <Box data-testid='fileInput'>
      <FormControl isInvalid={!!error} isRequired>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<AttachmentIcon />} />
          <Input
            data-testid='fileSelect'
            type="file"
            accept={"image/*"}
            onChange={(event) => {
              return setInputFile(event.target.files![0]);
            }}
            placeholder={"Choose an image"}
            alignContent="center"
          // style={{ display: "none" }}
          ></Input>
        </InputGroup>
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </Box>
  );
};

export default FileInput;
