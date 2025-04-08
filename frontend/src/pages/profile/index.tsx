import {
  Box,
  Button,
  Container,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import WholeBasicLayout from "../../components/layout/WholeLayout";
import { UpdateProfileModal } from "../../components/modal/UpdateProfileModal";
import { useAppSelector } from "../../hooks/useGeneral";
import { convertSectionToTitle, Gender, UserRole } from "../../types/types";
import { formikErrorMsgFactory } from "../../utils/factory/formikErrorMsgFactory";
import { updateUserInfoSchema } from "../../utils/validation/schema";
import { useWindowSize } from "../../hooks/window/useWindow";

const Profile: React.FC = () => {
  const toast = useToast();
  const auth = useAppSelector((state) => state.auth);
  const { data: user, refetch: refetchGetUser } = useAPIGetUserById(auth?._id);
  const formattedBirthDate = useMemo(() => {
    if (!user?.birthDate) return "";
    const date = new Date(user?.birthDate);
    return `${date.getFullYear()} / ${
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`
    } / ${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
  }, [user?.birthDate]);

  const { mutate: mutateUpdateUser } = useAPIPostUpdateUser({
    onSuccess: () => {
      toast({
        description: "Succeeded to edit your profile.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetchGetUser();
      resetFormForUpdateUser();
      disclosureForEditProfile.onClose();
    },
  });

  const disclosureForEditProfile = useDisclosure();
  const initialUpdateUserValues = user || {
    _id: "",
    role: UserRole.Visitor,
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmationPassword: "",
    gender: Gender.Male,
    birthDate: new Date("2020-05-12T23:50:21.817Z"),
  };
  const {
    values: updateUserInfo,
    setValues: setUpdateUserInfo,
    handleSubmit: handleSubmitForUpdateUser,
    resetForm: resetFormForUpdateUser,
    errors: errorsForUpdateUser,
    validateForm: validateFormForUpdateUser,
  } = useFormik<User>({
    initialValues: initialUpdateUserValues,
    enableReinitialize: true,
    validationSchema: updateUserInfoSchema,
    onSubmit: async () => {
      mutateUpdateUser(updateUserInfo);
    },
  });

  const checkUpdateUserValidationErrors = async () => {
    const errors = await validateFormForUpdateUser();
    const messages = formikErrorMsgFactory(errors);
    if (messages) {
      toast({
        description: messages,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      handleSubmitForUpdateUser();
    }
  };

  const { data: lessonTestResults } = useAPIGetLessonTestResults();

  useEffect(() => {
    if (!disclosureForEditProfile.isOpen) {
      resetFormForUpdateUser();
    }
  }, [disclosureForEditProfile.isOpen]);
  const { width: windowWidth } = useWindowSize();
  const isSmallerThan768 = useMemo(() => {
    return windowWidth <= 768;
  }, [windowWidth]);
  return (
    <WholeBasicLayout
      styles={{
        display: "flex",
        width: "100%",
        flexDir: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
      sideBarIs={!isSmallerThan768}
      headerIs={isSmallerThan768}
    >
      <UpdateProfileModal
        setForFormik={setUpdateUserInfo}
        userInfo={updateUserInfo}
        errors={errorsForUpdateUser}
        disclosure={disclosureForEditProfile}
        onSubmit={checkUpdateUserValidationErrors}
      />
      <Container
        maxW={"768px"}
        mt={"64px"}
        mx={"auto"}
        px={!isSmallerThan768 ? "0px" : "32px"}
        display={"flex"}
        flexDir={"column"}
        gap={"16px"}
        color={"#767676"}
      >
        <Box
          display={"flex"}
          flexDir={"row"}
          justifyContent={"space-between"}
          mt={"48px"}
        >
          <Text fontSize={"24px"} fontWeight={"bold"} color={"#ffffff"}>
            Profile
          </Text>

          <Button
            borderWidth={"1px"}
            borderColor={"#FB8C6A"}
            bg={"white"}
            w={"75px"}
            color={"#FB8C6A"}
            _hover={{ bg: "#FB8C6A", color: "white" }}
            alignSelf={"flex-end"}
            onClick={() => disclosureForEditProfile.onOpen()}
          >
            Edit
          </Button>
        </Box>
        <Box
          display={"flex"}
          flexDir={"row"}
          justifyContent={"space-between"}
          gap={"12px"}
        >
          <Box
            display={"flex"}
            flexDir={"column"}
            alignItems={"flex-start"}
            flex={1}
          >
            <Text fontSize={"16px"} lineHeight={"none"}>
              first name
            </Text>
            <Box
              mt={"4px"}
              w={"100%"}
              rounded={"10px"}
              borderColor={"#BBBBBB"}
              borderWidth={"1px"}
              px={"16px"}
              py={"8px"}
              display={"flex"}
              flexDir={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Text fontSize={"16px"} lineHeight={"none"} color={"#ffffff"}>
                {user?.firstName}
              </Text>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDir={"column"}
            alignItems={"flex-start"}
            flex={1}
          >
            <Text fontSize={"16px"} lineHeight={"none"}>
              last name
            </Text>
            <Box
              mt={"4px"}
              w={"100%"}
              rounded={"10px"}
              borderColor={"#BBBBBB"}
              borderWidth={"1px"}
              px={"16px"}
              py={"8px"}
              display={"flex"}
              flexDir={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Text fontSize={"16px"} lineHeight={"none"} color={"#ffffff"}>
                {user?.lastName}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDir={"row"}
          justifyContent={"flex-start"}
          gap={"12px"}
        >
          <Box display={"flex"} flexDir={"column"} alignItems={"flex-start"}>
            <Text fontSize={"16px"} lineHeight={"none"}>
              gender
            </Text>
            <Box
              mt={"4px"}
              rounded={"10px"}
              borderColor={"#BBBBBB"}
              borderWidth={"1px"}
              px={"16px"}
              py={"8px"}
              display={"flex"}
              flexDir={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Text fontSize={"16px"} lineHeight={"none"} color={"#ffffff"}>
                {user?.gender}
              </Text>
            </Box>
          </Box>
          <Box display={"flex"} flexDir={"column"} alignItems={"flex-start"}>
            <Text fontSize={"16px"} lineHeight={"none"}>
              date of birth
            </Text>
            <Box
              mt={"4px"}
              rounded={"10px"}
              borderColor={"#BBBBBB"}
              borderWidth={"1px"}
              px={"16px"}
              py={"8px"}
              display={"flex"}
              flexDir={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Text fontSize={"16px"} lineHeight={"none"} color={"#ffffff"}>
                {formattedBirthDate}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"flex-start"}
          flex={1}
        >
          <Text fontSize={"16px"} lineHeight={"none"}>
            username
          </Text>
          <Box
            mt={"4px"}
            w={"100%"}
            rounded={"10px"}
            borderColor={"#BBBBBB"}
            borderWidth={"1px"}
            px={"16px"}
            py={"8px"}
            display={"flex"}
            flexDir={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Text fontSize={"16px"} lineHeight={"none"} color={"#ffffff"}>
              {user?.username}
            </Text>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"flex-start"}
          flex={1}
        >
          <Text fontSize={"16px"} lineHeight={"none"}>
            email
          </Text>
          <Box
            mt={"4px"}
            w={"100%"}
            rounded={"10px"}
            borderColor={"#BBBBBB"}
            borderWidth={"1px"}
            px={"16px"}
            py={"8px"}
            display={"flex"}
            flexDir={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Text fontSize={"16px"} lineHeight={"none"} color={"#ffffff"}>
              {user?.email}
            </Text>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"flex-start"}
          flex={1}
        >
          <Text fontSize={"16px"} lineHeight={"none"}>
            introduction
          </Text>
          <Box
            mt={"4px"}
            w={"100%"}
            rounded={"10px"}
            borderColor={"#BBBBBB"}
            borderWidth={"1px"}
            px={"16px"}
            py={"8px"}
            display={"flex"}
            flexDir={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Text
              fontSize={"16px"}
              lineHeight={"150%"}
              color={"#ffffff"}
              w={"100%"}
              whiteSpace={"pre-wrap"}
              minH={"150px"}
            >
              {user?.introduction}
            </Text>
          </Box>
        </Box>
        <Box display={"flex"} flexDir={"column"}>
          <Text fontSize={"24px"} fontWeight={"bold"} color={"#ffffff"}>
            Test Records
          </Text>
          <TableContainer mb={"24px"} maxH={"500px"} overflowY={"auto"}>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Section</Th>
                  <Th>Unit</Th>
                  <Th>Time</Th>
                  <Th isNumeric>Score</Th>
                </Tr>
              </Thead>
              <Tbody>
                {lessonTestResults?.map((t, index) => (
                  <Tr key={index}>
                    <Td>{convertSectionToTitle(t.section)}</Td>
                    <Td>{t.unit}</Td>
                    <Td>{new Date(t.createdAt).toLocaleString("ja-JP")}</Td>
                    <Td isNumeric color={t.score >= 80 ? "green" : "orange"}>
                      {Math.round(t.score)}%
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              {/*<Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
    </Tfoot>*/}
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </WholeBasicLayout>
  );
};

export default Profile;
