import { Box } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";

interface DragableWordTabProps {
  id: string;
  index: number;
  word: string;
  hidden?: boolean;
}

export const DragableWordTab: React.FC<DragableWordTabProps> = ({
  id,
  index,
  word,
  hidden,
}) => {
  return (
    <Draggable key={id} draggableId={id} index={index} isDragDisabled={hidden}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          //zIndex={isDragging ? 10 : 1}
          //transform={CSS.Transform.toString(transform)}
          //transition={transition}
        >
          <Box
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            cursor={snapshot.isDragging ? "grabbing" : "grab"}
            rounded={"14px"}
            border={"3px solid #545454"}
            bg={hidden ? "#545454" : "#201E36"}
            color={hidden ? "#545454" : "white"}
            px={"8px"}
            py={"16px"}
            fontSize={"16"}
          >
            {word}
          </Box>
        </Box>
      )}
    </Draggable>
  );
};
