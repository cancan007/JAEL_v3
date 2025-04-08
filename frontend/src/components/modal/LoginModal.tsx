import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseDisclosureProps,
} from "@chakra-ui/react";

interface LoginModalProps {
  loginInfo: any;
  errors: any;
  setForFormik: (any: any) => void;
  onSubmit: () => void;
  disclosure: UseDisclosureProps;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  errors,
  loginInfo,
  setForFormik,
  onSubmit,
  disclosure,
}) => {
  const { isOpen, onClose } = disclosure;

  return (
    <Modal
      isOpen={isOpen ? isOpen : false}
      onClose={onClose ? onClose : () => {}}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login to your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired={true} isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={loginInfo.email}
              onChange={(e) =>
                setForFormik((pre: any) => ({ ...pre, email: e.target.value }))
              }
            />
            {!errors.email ? (
              <></> /*(
              <FormHelperText>
                Enter the email you'd like to receive the newsletter on.
              </FormHelperText>
            )*/
            ) : (
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired={true} isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={loginInfo.password}
              onChange={(e) =>
                setForFormik((pre: any) => ({
                  ...pre,
                  password: e.target.value,
                }))
              }
            />
            {errors.password && (
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => onSubmit()}>
            Login
          </Button>
          <Button onClick={onClose ? () => onClose() : () => {}}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
