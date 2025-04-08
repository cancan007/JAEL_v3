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
  Text,
  Select,
  Box,
} from "@chakra-ui/react";
import { Gender } from "../../types/types";

import Calendar from "react-calendar";

interface CreateNewUserModalProps {
  userInfo: any;
  errors: any;
  setForFormik: (any: any) => void;
  onSubmit: () => void;
  disclosure: UseDisclosureProps;
  onOpenForLogin: () => void;
}

export const CreateNewUserModal: React.FC<CreateNewUserModalProps> = ({
  errors,
  userInfo,
  setForFormik,
  onSubmit,
  disclosure,
  onOpenForLogin,
}) => {
  const { isOpen, onClose } = disclosure;

  return (
    <Modal
      isOpen={isOpen ? isOpen : false}
      onClose={onClose ? onClose : () => {}}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired={true} isInvalid={errors.username}>
            <FormLabel>username</FormLabel>
            <Input
              type="text"
              value={userInfo.username}
              onChange={(e) =>
                setForFormik((pre: any) => ({
                  ...pre,
                  username: e.target.value,
                }))
              }
            />
            {errors.username && (
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired={true} isInvalid={errors.firstName}>
            <FormLabel>first name</FormLabel>
            <Input
              type="text"
              value={userInfo.firstName}
              onChange={(e) =>
                setForFormik((pre: any) => ({
                  ...pre,
                  firstName: e.target.value,
                }))
              }
            />
            {errors.firstName && (
              <FormErrorMessage>{errors.firstName}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired={true} isInvalid={errors.lastName}>
            <FormLabel>last name</FormLabel>
            <Input
              type="text"
              value={userInfo.lastName}
              onChange={(e) =>
                setForFormik((pre: any) => ({
                  ...pre,
                  lastName: e.target.value,
                }))
              }
            />
            {errors.lastName && (
              <FormErrorMessage>{errors.lastName}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired={true} isInvalid={errors.gender}>
            <FormLabel>gender</FormLabel>
            <Select
              placeholder="Select gender"
              value={userInfo.gender}
              onChange={(e) =>
                setForFormik((pre: any) => ({
                  ...pre,
                  gender: e.target.value,
                }))
              }
            >
              {Object.values(Gender).map((g, index) => (
                <option key={index} value={g}>
                  {g}
                </option>
              ))}
            </Select>
            {errors.gender && (
              <FormErrorMessage>{errors.gender}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired={true} isInvalid={errors.birthDate}>
            <FormLabel>date of birth</FormLabel>

            {/*<Calendar
              value={userInfo.birthDate}
              onChange={(e: any) =>
                setForFormik((pre: any) => ({
                  ...pre,
                  birthDate: e,
                }))
              }
              locale={"en"}
              calendarType={"Arabic"}
            />*/}
            <Input
              value={userInfo.birthDate}
              placeholder="Select Date"
              size="md"
              type="date"
              onChange={(e) =>
                setForFormik((pre: any) => ({
                  ...pre,
                  birthDate: new Date(e.target.value),
                }))
              }
            />
            {errors.birthDate && (
              <FormErrorMessage>{errors.birthDate}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired={true} isInvalid={errors.email}>
            <FormLabel>email</FormLabel>
            <Input
              type="text"
              value={userInfo.email}
              onChange={(e) =>
                setForFormik((pre: any) => ({
                  ...pre,
                  email: e.target.value,
                }))
              }
            />
            {errors.email && (
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired={true} isInvalid={errors.password}>
            <FormLabel>password</FormLabel>
            <Input
              type="password"
              value={userInfo.password}
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
          <FormControl
            isRequired={true}
            isInvalid={errors.confirmationPassword}
          >
            <FormLabel>password confirmation</FormLabel>
            <Input
              type="password"
              value={userInfo.confirmationPassword}
              onChange={(e) =>
                setForFormik((pre: any) => ({
                  ...pre,
                  confirmationPassword: e.target.value,
                }))
              }
            />
            {errors.confirmationPassword && (
              <FormErrorMessage>{errors.confirmationPassword}</FormErrorMessage>
            )}
          </FormControl>
          <Text
            onClick={() => {
              onClose && onClose();
              onOpenForLogin();
            }}
            fontSize={"14px"}
            className="cursor-pointer text-blue-300 hover:text-blue-500"
          >
            You already have account? Then login from here
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => onSubmit()}>
            Register
          </Button>
          <Button onClick={onClose ? () => onClose() : () => {}}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
