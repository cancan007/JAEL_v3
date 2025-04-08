import { useRouter } from "next/router";
import { useEffect } from "react";
import { authStore } from "src/store/auth/authStore";
import { useAuthStore } from "src/store/auth/useAuthStore";

interface AuthCheckProviderProps {
  children: React.ReactNode;
}
const AuthCheckProvider: React.FC<AuthCheckProviderProps> = ({ children }) => {
  //router
  const router = useRouter();
  const { isAuthed } = authStore.getState();
  const { refetch: refetchCheckAuth } = useAuthStore.useQueryCheckAuth();
  // const auth = useAppSelector((state) => state.auth);
  // const toast = useToast();
  // const dispatch = useAppDispatch();
  // const { mutate: autoLogin } = useAPIPostAutoLogin({
  //   onSuccess: (data) => {
  //     autoLoadAuth(dispatch, data);
  //   },
  //   onError: (err) => {
  //     /*toast({
  //       description: err.response.data.message,
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });*/
  //     router.replace("/");
  //   },
  // });

  //Cookieのチェック（これをいろいろ認証タイプにより変更）
  let token;
  //signedInがtrueじゃなければ/loginへ

  useEffect(() => {
    // token = Cookies.get("userToken");
    //token = localStorage.getItem("userToken");
    if (!isAuthed) router.replace("/");
    refetchCheckAuth();
  }, [isAuthed, refetchCheckAuth, router.route]);

  return <>{children}</>;
};

export default AuthCheckProvider;
