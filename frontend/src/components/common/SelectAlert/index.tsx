import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from "@chakra-ui/react";

interface SelectAlertProps {
  status: "info" | "warning" | "success" | "error" | "loading" | undefined;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const SelectAlert: React.FC<SelectAlertProps> = ({
  status,
  title,
  description,
  children,
}) => {
  return (
    <Alert
      status={status}
      position={"fixed"}
      top={window.innerHeight - 100}
      display={"flex"}
      flexDir={"row"}
      justifyContent={"space-between"}
      w={"fit-content"}
      gap={"12px"}
    >
      <Box display={"flex"} flexDir={"row"}>
        <AlertIcon />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description && description}</AlertDescription>
      </Box>
      <Box display={"flex"} flexDir={"row"} gap={"8px"}>
        {children}
      </Box>
    </Alert>
  );
};
export default SelectAlert;
