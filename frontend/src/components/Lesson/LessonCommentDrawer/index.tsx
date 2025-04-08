import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAPIGetLessonComments } from "../../../hooks/api/lesson/useAPIGetLessonComments";
import { useAPIPostSaveLessonComment } from "../../../hooks/api/lesson/useAPIPostSaveLessonComment";
import { useAppSelector } from "../../../hooks/useGeneral";
import { CommentFooter } from "../CommentFooter";
import { LessonCommentCard } from "../LessonCommentCard";
import { useAPIPostDeleteLessonComment } from "../../../hooks/api/lesson/useAPIPostDeleteLessonComment";

interface LessonCommentDrawerProps {
  lessonId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LessonCommentDrawer: React.FC<LessonCommentDrawerProps> = ({
  lessonId,
  isOpen,
  onClose,
}) => {
  const auth = useAppSelector((state) => state.auth);
  const [comments, setComments] = useState<LessonComment[]>([]);
  const [input, setInput] = useState<string>("");
  const toast = useToast();
  const { refetch: refetchGetLessonComments } = useAPIGetLessonComments(
    { id: lessonId },
    {
      onSuccess: (data) => {
        setComments(data);
      },
    }
  );

  const { mutate: mutateSendComment } = useAPIPostSaveLessonComment({
    onSuccess: (data) => {
      setInput("");
      setComments((prev) => {
        return [...prev, data];
      });
      toast({
        description: "Succeeded to send new comment.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (err) => {
      toast({
        description: err.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const { mutate: mutateDeleteComment } = useAPIPostDeleteLessonComment({
    onSuccess: (data) => {
      toast({
        description: "Succeeded to delete comment.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setComments((pre) => {
        return pre.filter((p) => p._id !== data._id);
      });
    },
    onError: (err) => {
      toast({
        description: err.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      //finalFocusRef={btnRef}
      size={"sm"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader></DrawerHeader>
        <DrawerBody
          px={"12px"}
          display={"flex"}
          flexDir={"column"}
          alignItems={"flex-start"}
          gap={"8px"}
        >
          {comments.length ? (
            comments.map((c, index) => (
              <Box
                key={index}
                display={"flex"}
                flexDir={"row"}
                w={"100%"}
                justifyContent={
                  auth?._id === c.writer._id ? "flex-end" : "flex-start"
                }
              >
                <LessonCommentCard
                  comment={c}
                  isSender={auth?._id === c.writer._id}
                  onDelete={(id) => mutateDeleteComment({ id })}
                />
              </Box>
            ))
          ) : (
            <Text alignSelf={"center"}>No comments</Text>
          )}
        </DrawerBody>
        <DrawerFooter px={"12px"}>
          <CommentFooter
            input={input}
            setInput={setInput}
            onSend={() => mutateSendComment({ content: input, lessonId })}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
