// import {
//   Input,
//   FormControl,
//   FormLabel,
//   InputGroup,
//   InputLeftElement,
//   FormErrorMessage,
// } from "@chakra-ui/react";
// import _ from "lodash";
// import { AttachmentIcon } from "@chakra-ui/icons";
// import { InputHTMLAttributes, useRef, useState } from "react";
// import { useField } from "formik";

// type FileInputProps = InputHTMLAttributes<HTMLInputElement> & {
//   label: string;
//   name: string;
//   placeholder: string;
//   acceptedFileTypes: string;
//   isRequired: boolean;
// };

// const FileInput: React.FC<FileInputProps> = ({
//   label,
//   acceptedFileTypes,
//   size = _,
//   placeholder,
//   name,
//   ...props
// }) => {
//   const inputRef = useRef();
//   const [inputFile, setInputFile] = useState();
//   //   const {
//   //     field: { ref, value, ...inputProps },
//   //     meta: { invalid, isTouched, isDirty },
//   //   } = useController({
//   //     name,
//   //     control,
//   //     rules: { required: isRequired },
//   //   });
//   const [field, { error }] = useField(props);
//   return (
//     <FormControl isInvalid={!!error} isRequired>
//       <FormLabel htmlFor="writeUpFile">{label}</FormLabel>
//       <InputGroup>
//         <InputLeftElement pointerEvents="none" children={<AttachmentIcon />} />
//         <input
//           type="file"
//           accept={acceptedFileTypes}
//           name={name}
//           ref={(inputFile) => (setInputFile(inputFile)}
//           {...props}
//           inputRef={ref}
//           style={{ display: "none" }}
//         ></input>
//         <Input
//           placeholder={placeholder || "Your file ..."}
//           onClick={() => inputRef.current.click()}
//           value={value}
//         />
//       </InputGroup>
//       <FormErrorMessage>{error}</FormErrorMessage>
//     </FormControl>
//   );
// };

// export default FileInput;
