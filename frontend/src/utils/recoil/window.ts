import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export type WindowStateType = {
  width?: number;
  height?: number;
};

export type UseWindowMutatorsType = {
  updateWindow: (key: string, num: number) => void;
};

export const windowState = atom<WindowStateType>({
  key: "window",
  default: {
    width: undefined,
    height: undefined,
  },
});

export const useWindowState = (): WindowStateType => {
  return useRecoilValue(windowState);
};

export const useWindowMutators = (): UseWindowMutatorsType => {
  const setState = useSetRecoilState(windowState);
  const updateWindow = useCallback(
    (key: string, num: number) => {
      setState({ [key]: num });
    },
    [setState]
  );
  return { updateWindow };
};
