import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

interface ConfirmAlertProps {
  onClose: () => void;
  isOpen: boolean;
  title: string;
  warning: string;
  onConfirm: () => void;
}

export const ConfirmAlert: React.FC<ConfirmAlertProps> = ({
  onClose,
  isOpen,
  title,
  warning,
  onConfirm,
}) => {
  const cancelRef = useRef<any>(null);
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{warning}</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="red"
            ml={3}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Okay
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
