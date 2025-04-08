import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

interface HeaderProps {
  styles?: BoxProps;
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ styles, children }) => {
  return (
    <Box
      display={"flex"}
      flexDir={"row"}
      alignItems={"center"}
      justifyContent={"flex-end"}
      bg={"#FB8C6A"}
      w={"100vw"}
      h={"64px"}
      pr={"24px"}
      gap={"16px"}
      {...styles}
    >
      {children}
    </Box>
  );
};

export default Header;
