import { Box, Flex, Text, useColorMode, useDisclosure, Link } from "@chakra-ui/react";
import { IKImage } from "imagekitio-react";
import React from "react";
import { PostDto } from "../dto/response/post.dto";
import { widgetBgColor } from "../utils/colorScheme";
import PhotoModal from "./PhotoModal";
import { isServer } from "../utils/isServer";

interface PhotoWidgetProps {
  post: PostDto;
  height: number;
  width: number;
}

const PhotoWidget: React.FC<PhotoWidgetProps> = ({ post, height, width }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textMargin = isServer() ? 125 : 50
  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="stretch"
        shadow="lg"
        borderRadius="25px"
        bgColor={widgetBgColor[colorMode]}
        onClick={onOpen}
        as={Link}

      >
        <Box my={4} maxW={width}>
          <Text mx={1} mb={2} fontSize="xl">
            {post.username}
          </Text>
          <Box>
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
          <Text width={width - textMargin} mt={2} mx={1} isTruncated>{post.text}</Text>

        </Box>

      </Flex>
      <PhotoModal isOpen={isOpen} onClose={onClose} post={post}>
        <Flex alignItems='stretch' justifyContent='center'>
          <IKImage
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL}
            path={post.fileName}
          ></IKImage>
        </Flex>
      </PhotoModal>
    </>
  );
};

export default PhotoWidget;
