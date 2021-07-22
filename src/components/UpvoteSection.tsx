import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import React from "react";

interface UpvoteSectionProps {
  post: any
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {

  //   const [upvoteColor, setUpvoteColor] = useState<"grey" | "green">("grey");
  //   const [downvoteColor, setDownvoteColor] = useState<"grey" | "red">("grey");

  return (
    <Box pr={2}>
      <IconButton
        aria-label="upvote"
        icon={<ArrowUpIcon size="24px" />}
        colorScheme={post.voteStatus === 1 ? "green" : undefined}
        onClick={() => {

        }}
        isLoading={false}
      ></IconButton>
      <Text textAlign="center">{post.points}</Text>
      <IconButton
        aria-label="downvote"
        icon={<ArrowDownIcon size="24px" />}
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        onClick={() => {

          //   setDownvoteColor("red");
        }}
        isLoading={false}
      ></IconButton>
    </Box>
  );
};
