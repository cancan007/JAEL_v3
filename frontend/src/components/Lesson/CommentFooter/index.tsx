import { Box, Icon, Input, Textarea } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";

interface CommentFooterProps {
  onSend: () => void;
  input: string;
  setInput: (input: string) => void;
}

export const CommentFooter: React.FC<CommentFooterProps> = ({
  onSend,
  input,
  setInput,
}) => {
  return (
    <Box
      display={"flex"}
      flexDir={"row"}
      w={"100%"}
      alignItems={"center"}
      gap={"8px"}
    >
      <Textarea
        placeholder={"Enter your comment"}
        //borderColor={"gray.500"}
        //borderWidth={"1px"}
        outline={"none"}
        flex={1}
        rounded={"12px"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        h={"40px"}
        _focusVisible={{ outline: "none" }}
      />
      <Box
        p={"8px"}
        bg={"#13B8FF"}
        rounded={100}
        cursor={"pointer"}
        onClick={() => onSend()}
      >
        <Icon as={FiSend} boxSize={"24px"} color={"white"} />
      </Box>
    </Box>
  );
};
