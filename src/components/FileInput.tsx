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
  placeholder: string;
  acceptedFileTypes: string;
};

const FileInput: React.FC<FileInputProps> = ({
  label,
  acceptedFileTypes,
  size = _,
  placeholder,
  children,
  ...props
}) => {
  // const inputRef = useRef<HTMLInputElement>(null);
  // const [inputFile, setInputFile] = useState<File>();
  //   const {
  //     field: { ref, value, ...inputProps },
  //     meta: { invalid, isTouched, isDirty },
  //   } = useController({
  //     name,
  //     control,
  //     rules: { required: isRequired },
  //   });

  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error} isRequired>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<AttachmentIcon />} />
        {/* <input
                    type="file"
                    accept={acceptedFileTypes}
                    // ref={(inputFile) => { if (inputFile) setInputFile(inputFile) }}
                    // id={field.name}
                    // name={field.name}
                    ref={inputRef}
                    onChange={event => { return setInputFile(event.target.files![0]); }}
                    {...props}
                    style={{ display: "none" }}
                ></input>
                <Input
                    placeholder={placeholder || "Your file ..."}
                    onClick={() => inputRef.current!.click()}
                    name={field.name}
                    id={field.name}
                    value={inputFile?.name}
                /> */}
        {children}
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default FileInput;
