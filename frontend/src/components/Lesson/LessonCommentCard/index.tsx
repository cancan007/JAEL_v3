import { Box, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo } from "react";
import getElapsedDateTime from "../../../utils/getElapsedDateTime";
import { BsFillTrashFill } from "react-icons/bs";
import { useAppSelector } from "../../../hooks/useGeneral";
import { UserRole } from "../../../types/types";

interface LessonCommentCardProps {
  comment: LessonComment;
  isSender: boolean;
  onDelete: (id: string) => void;
}

export const LessonCommentCard: React.FC<LessonCommentCardProps> = ({
  comment,
  isSender,
  onDelete,
}) => {
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();
  const formedCreatedDateTime = useMemo(() => {
    return getElapsedDateTime(comment.createdAt);
  }, [comment.createdAt]);
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      alignItems={"flex-start"}
      gap={"4px"}
      ml={isSender ? "100px" : "0px"}
      mr={isSender ? "0px" : "100px"}
    >
      <Box display={"flex"} flexDir={"row"} alignItems={"center"} gap={"8px"}>
        <Text
          fontSize={"12px"}
          cursor={"pointer"}
          _hover={{ color: "blue" }}
          onClick={() => router.push(`/account/${comment.writer._id}`)}
        >
          {comment.writer.username}
        </Text>
        <Text fontSize={"12px"} color={"#B9B9B9"}>
          {formedCreatedDateTime}
        </Text>
        {(auth?.role === UserRole.Author ||
          comment.writer._id === auth?._id) && (
          <Icon
            as={BsFillTrashFill}
            boxSize={"16px"}
            color={"red.500"}
            p={0}
            m={0}
            cursor={"pointer"}
            _hover={{ opacity: 0.5 }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(comment._id);
            }}
          />
        )}
      </Box>
      <Box p={"8px"} bg={"#93FFAA"} rounded={"8px"}>
        <Text fontSize={"16px"} textAlign={"start"} whiteSpace="pre-wrap">
          {comment.content}
        </Text>
      </Box>
    </Box>
  );
};
