import React, { useLayoutEffect, useState } from "react";

interface WindowSizeProps {
  width: number;
  height: number;
}

export const useWindowSize = (): WindowSizeProps => {
  const [size, setSize] = useState<WindowSizeProps>({
    width: 1000,
    height: 1000,
  });
  useLayoutEffect(() => {
    const updateSize = (): void => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};
