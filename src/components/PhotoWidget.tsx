import { Box, Flex, Text, useColorMode, useDisclosure } from "@chakra-ui/react";
import { IKImage } from "imagekitio-react";
import React from "react";
import { PostDto } from "../dto/response/post.dto";
import { widgetBgColor } from "../utils/colorScheme";
import PhotoModal from "./PhotoModal";

interface PhotoWidgetProps {
  post: PostDto;
  height: string;
  width: string;
}

const PhotoWidget: React.FC<PhotoWidgetProps> = ({ post, height, width }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="stretch"
        shadow="lg"
        borderRadius="25px"
        bgColor={widgetBgColor[colorMode]}
        onClick={onOpen}
      >
        <Box m={4}>
          <Text mb={2} fontSize="xl">
            {post.username}
          </Text>
          <IKImage
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL}
            path={post.fileName}
            transformation={[
              {
                height: height,
                width: width,
              },
            ]}
          ></IKImage>
        </Box>
      </Flex>
      <PhotoModal isOpen={isOpen} onClose={onClose} post={post}>
        <IKImage
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL}
          path={post.fileName}
        ></IKImage>
      </PhotoModal>
    </>
  );
};

export default PhotoWidget;
