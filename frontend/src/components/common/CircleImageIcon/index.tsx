import { Box, Image } from "@chakra-ui/react";

interface CircleImageIconProps {
  src: string;
  size: number;
  onClick?: () => void;
  inActive?: boolean;
}
export const CircleImageIcon: React.FC<CircleImageIconProps> = ({
  src,
  size,
  onClick,
  inActive,
}) => {
  return (
    <Box
      onClick={onClick && !inActive ? onClick : () => {}}
      pos={"relative"}
      cursor={!inActive ? "pointer" : ""}
    >
      {inActive && (
        <Box
          pos={"absolute"}
          bg={"rgba(82, 82, 82, 0.8)"}
          rounded={100}
          zIndex={2}
          w={size}
          h={size}
        ></Box>
      )}
      <Image
        alt={"icon"}
        rounded={100}
        objectFit={"cover"}
        src={src}
        w={size}
        h={size}
      />
    </Box>
  );
};
