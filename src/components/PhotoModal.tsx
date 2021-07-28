import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { PostDto } from "../dto/response/post.dto";
import { mainColor } from "../utils/colorScheme";

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: PostDto;
}

const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  onClose,
  post,
  children,
}) => {
  const { colorMode } = useColorMode();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={mainColor[colorMode]}>{post.username}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter justifyContent="left">
          <Text color={mainColor[colorMode]}>{post.text}</Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PhotoModal;
