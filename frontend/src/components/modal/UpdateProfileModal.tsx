import { Gender } from "../../types/types";

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
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useMemo } from "react";

interface UpdateProfileModalProps {
  userInfo: any;
  errors: any;
  setForFormik: (any: any) => void;
  onSubmit: () => void;
  disclosure: UseDisclosureProps;
}

export const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({
  errors,
  userInfo,
  setForFormik,
  onSubmit,
  disclosure,
}) => {
  const { isOpen, onClose } = disclosure;
  const formattedBirthDate = useMemo(() => {
    if (!userInfo?.birthDate) return "";
    const date = new Date(userInfo.birthDate);
    const res = `${date.getFullYear()}-${
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`
    }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
    return res;
  }, [userInfo?.birthDate]);

  return (
    <Modal
      isOpen={isOpen ? isOpen : false}
      onClose={onClose ? onClose : () => {}}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit your profile</ModalHeader>
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

            <Input
              value={formattedBirthDate}
              placeholder="Select Date"
              size="md"
              type="date"
              onChange={(e) => {
                setForFormik((pre: any) => ({
                  ...pre,
                  birthDate: e.target.value,
                }));
              }}
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
          <FormControl isRequired={true} isInvalid={errors.introduction}>
            <FormLabel>introduction</FormLabel>
            <Textarea
              value={userInfo.introduction}
              onChange={(e) =>
                setForFormik((pre: any) => ({
                  ...pre,
                  introduction: e.target.value,
                }))
              }
            />
            {errors.introduction && (
              <FormErrorMessage>{errors.introduction}</FormErrorMessage>
            )}
          </FormControl>
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
