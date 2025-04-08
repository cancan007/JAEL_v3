import type { NextPage } from "next";
import Head from "next/head";
import WholeBasicLayout from "../components/layout/WholeLayout";
import styles from "../styles/Home.module.css";
import {
  Box,
  Button,
  Text,
  useDisclosure,
  useToast,
  Image,
} from "@chakra-ui/react";
import { LoginModal } from "../components/modal/LoginModal";
import { useFormik } from "formik";
import { createNewUserSchema, loginSchema } from "../utils/validation/schema";
import { formikErrorMsgFactory } from "../utils/factory/formikErrorMsgFactory";
import { CreateNewUserModal } from "../components/modal/CreateNewUserModal";
import { useRouter } from "next/router";
import { Gender } from "../types/types";
import Lottie from "react-lottie";
import zebraAnimeData from "../lotties/first-zebra-anime.json";
import { AuthStoreCmds } from "src/store/auth/authStore";
import { useAuthStore } from "src/store/auth/useAuthStore";
import { motion } from "framer-motion";
import { navVariants, staggerContainer } from "src/utils/animation";

const Home: NextPage = () => {
  const router = useRouter();
  const loginDisclosure = useDisclosure();
  const toast = useToast();
  const { mutate: mutateLogin } = useAuthStore.useMutateSignIn({
    onSuccess: () => {
      toast({
        description: "You succeeded to log in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      resetForm();
      loginDisclosure.onClose();
      router.push("/lessons");
    },
    onError: () => {
      toast({
        description: "Something wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
  const initialLoginValues = {
    email: "",
    password: "",
  };
  const {
    values: loginInfo,
    setValues: setLoginInfo,
    handleSubmit,
    resetForm,
    errors,
    validateForm,
  } = useFormik<AuthStoreCmds.SignInCmd>({
    initialValues: initialLoginValues,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: loginSchema,
    onSubmit: async (v) => {
      mutateLogin(v);
    },
  });

  const checkLoginValidationErrors = async () => {
    const errors = await validateForm();
    const messages = formikErrorMsgFactory(errors);
    if (messages) {
      toast({
        description: messages,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      handleSubmit();
    }
  };
  const { mutate: mutateSignUp } = useAuthStore.useMutateSignUp({
    onSuccess: () => {
      toast({
        description: "You succeeded to create your account, please login!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      resetFormForNewUser();
      disclosureForNewUser.onClose();
      loginDisclosure.onOpen();
    },
    onError: () => {
      toast({
        description: "Something wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
  const disclosureForNewUser = useDisclosure();
  const initialCreateNewUserValues = {
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
    values: newUserInfo,
    setValues: setNewUserInfo,
    handleSubmit: handleSubmitForNewUser,
    resetForm: resetFormForNewUser,
    errors: errorsForNewUser,
    validateForm: validateFormForNewUser,
  } = useFormik<
    Omit<User, "_id" | "fullName" | "role"> & {
      password: string;
      confirmationPassword: string;
    }
  >({
    initialValues: initialCreateNewUserValues,
    enableReinitialize: true,
    validationSchema: createNewUserSchema,
    onSubmit: async (v) => {
      const { password, ...values } = v;
      mutateSignUp({ password, values });
    },
  });

  const checkCreateNewUserValidationErrors = async () => {
    const errors = await validateFormForNewUser();
    const messages = formikErrorMsgFactory(errors);
    if (messages) {
      toast({
        description: messages,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      handleSubmitForNewUser();
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: zebraAnimeData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <WholeBasicLayout
      styles={{
        display: "flex",
        flexDir: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
      sideBarIs={false}
      //onOpenLogin={loginDisclosure.onOpen}
    >
      <LoginModal
        loginInfo={loginInfo}
        errors={errors}
        setForFormik={setLoginInfo}
        onSubmit={checkLoginValidationErrors}
        disclosure={loginDisclosure}
      />
      <CreateNewUserModal
        userInfo={newUserInfo}
        errors={errorsForNewUser}
        setForFormik={setNewUserInfo}
        onSubmit={checkCreateNewUserValidationErrors}
        disclosure={disclosureForNewUser}
        onOpenForLogin={loginDisclosure.onOpen}
      />
      <Box
        display={"flex"}
        flexDir={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        flex={1}
        //w={"1000px"}
      >
        <motion.div
          variants={navVariants}
          initial="hidden"
          whileInView={"show"}
        >
          <Box
            display="flex"
            flexDir={"column"}
            alignItems={"center"}
            position={"relative"}
          >
            <Image
              alt={"title"}
              src={
                "https://res.cloudinary.com/dbfpsigax/image/upload/v1718449492/jael/JAEL_lxmbat.png"
              }
              h={"96px"}
              w={"300px"}
            />
            <Button
              rounded={"16px"}
              bg={"#00A3FF"}
              px={"24px"}
              py={"16px"}
              mt={"24px"}
              fontSize={24}
              color={"white"}
              onClick={() => disclosureForNewUser.onOpen()}
            >
              Get Started
            </Button>

            <Text
              mt={"32px"}
              color={"#939191"}
              _hover={{ color: "#f790df" }}
              cursor={"pointer"}
              onClick={loginDisclosure.onOpen}
              position={"absolute"}
              bottom={"-80px"}
              zIndex={1}
            >
              You already have your account? Please log in from here
            </Text>
          </Box>
        </motion.div>
        <Lottie options={defaultOptions} height={180} width={130} />
      </Box>

      <motion.div
        variants={{ ...staggerContainer }}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.25 }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { delayChildren: 2 } },
          }}
        >
          <Box
            position={"fixed"}
            bottom={"50px"}
            left={"30px"}
            bg={"#9E83EB"}
            filter={"auto"}
            blur={"150px"}
            width={350}
            h={200}
          ></Box>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { delayChildren: 2 } },
          }}
        >
          <Box
            position={"fixed"}
            top={"50px"}
            right={"30px"}
            //opacity={0.5}
            bg={"#BA8EBB"}
            filter={"auto"}
            blur={"150px"}
            width={350}
            h={200}
          ></Box>
        </motion.div>
      </motion.div>
      {/*<Box
        alignItems="center"
        w="full"
        //position="relative"
        position="absolute"
        bottom={"10%"}
        //mx={"auto"}
        overflow="hidden"
        ref={ref}
      >
        <AnimatePresence onExitComplete={() => console.log("aaa")}>
          <motion.div
            // アニメーションの変化終了時点の最終移動差分
            animate={{
              x: itemWidthWithGap,
            }}
            // 初期状態〜Animationまでをどう変化させるかを記述
            transition={{
              repeat: Infinity, //ループさせる
              duration: 5, //　animationを終えるまでの時間(秒)
              ease: "linear", // 変化方法。直線的に変化させている。
            }}
            onUpdate={(latest) => {
              if (latest.x >= itemWidthWithGap) {
                //１マス分動いたら発動する処理
                const newimageBlocks = [...imageBlocks];
                newimageBlocks.unshift(imageBlocks[imageBlocks.length - 1]); //冒頭に末尾の画像を追加
                newimageBlocks.pop(); //末端の画像を消去する
                setImageBlocks(newimageBlocks); //変更した配列を適応
              }
            }}
          >
            <Flex
              gap={6}
              w={`${itemWidthWithGap * imageBlocks.length}px`}
              ml={`-${itemWidth}px`}
            >
              {imageBlocks.map((block, index) => {
                return (
                  <Box
                    key={index}
                    w={`${itemWidth}px`}
                    h={`auto`}
                    position="relative"
                  >
                    {block}
                  </Box>
                );
              })}
            </Flex>
          </motion.div>
            </AnimatePresence>
            </Box>*/}
    </WholeBasicLayout>
  );
};

export default Home;
