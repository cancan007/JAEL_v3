import { Box } from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";
import { DragableWordTab } from "../DragableWordTab";

interface DroppableAreaProps {
  children1: Array<any>;
  children2: Array<any>;
}

export const DroppableArea: React.FC<DroppableAreaProps> = ({
  children1,
  children2,
}) => {
  return (
    <Droppable droppableId="droppable" direction="horizontal">
      {(provided, snapshot) => (
        <Box display={"flex"} flexDir={"column"} ref={provided.innerRef}>
          <Box
            display={"flex"}
            flexDir={"row"}
            alignItems={"center"}
            gap={"8px"}
            borderTop={"1.5px solid #5D5353"}
            borderBottom={"1.5px solid #5D5353"}
            px={"16px"}
            w={"100vw"}
            minH={"68px"}
            maxW={"600px"}
          >
            {children1?.map((v, i) => {
              return (
                <DragableWordTab
                  key={i}
                  index={i}
                  id={v.id}
                  word={v.data.word}
                  hidden={v.data.hidden}
                />
              );
            })}
          </Box>
          <Box
            display={"flex"}
            flexDir={"row"}
            alignItems={"center"}
            gap={"8px"}
            borderBottom={"1.5px solid #5D5353"}
            px={"16px"}
            w={"100vw"}
            minH={"64px"}
            maxW={"600px"}
          >
            {children2?.map((v, i) => {
              return (
                <DragableWordTab
                  key={i}
                  index={i}
                  id={v.id}
                  word={v.data.word}
                  hidden={v.data.hidden}
                />
              );
            })}
          </Box>
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};
