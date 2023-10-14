import { useState, useCallback, useContext } from "react";
import { ToastAndroid } from "react-native";
import { UserContext, LoadingContext } from "../../contexts";
import { userService } from "../../services";
import { SignIn } from "../views/SignIn";
import { SignUpModal } from "../views/SignUpModal";

export const AuthPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [idErrMsg, setIdErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = useCallback(() => {
    setId("");
    setPassword("");
    setIdErrMsg("");
    setPasswordErrMsg("");
    setModalVisible(true);
  }, []);
  const closeModal = useCallback(() => {
    setId("");
    setPassword("");
    setIdErrMsg("");
    setPasswordErrMsg("");
    setModalVisible(false);
  }, []);

  const { startLoading, finishLoading } = useContext(LoadingContext);
  const { setUser } = useContext(UserContext);

  const signIn = useCallback(() => {
    setIdErrMsg("");
    setPasswordErrMsg("");

    if (!id) return setIdErrMsg("ID Required");
    if (!password) return setPasswordErrMsg("password Required");

    startLoading();
    userService
      .signIn({ id }, password)
      .then(setUser)
      .catch((err) => {
        if (err.message === "User Absent") return setIdErrMsg("Wrong User ID");
        if (err.message === "Password Invalid")
          return setPasswordErrMsg("Wrong Password");

        ToastAndroid.show(
          "Fail to Sign In, please retry again",
          ToastAndroid.LONG
        );
      })
      .finally(finishLoading);
  }, [id, password, startLoading, finishLoading, setUser]);

  const signUp = useCallback(() => {
    setIdErrMsg("");
    setPasswordErrMsg("");

    if (!id) return setIdErrMsg("ID Required");
    if (!password) return setPasswordErrMsg("password Required");

    startLoading();
    setModalVisible(false);
    userService
      .signUp({ id }, password)
      .then(closeModal)
      .catch((err) => {
        setModalVisible(true);

        if (err.message === "User ID Duplicated")
          return setIdErrMsg("Duplicated User ID");

        ToastAndroid.show(
          "Fail to Sign Up, please retry again",
          ToastAndroid.LONG
        );
      })
      .finally(finishLoading);
  }, [id, password, startLoading, finishLoading, closeModal]);

  return (
    <>
      <SignIn
        onSubmit={signIn}
        openSignUpModal={openModal}
        id={id}
        onUpdateId={setId}
        idErrMsg={idErrMsg}
        password={password}
        onUpdatePassword={setPassword}
        passwordErrMsg={passwordErrMsg}
      />
      <SignUpModal
        visible={modalVisible}
        onSubmit={signUp}
        onCancel={closeModal}
        id={id}
        onUpdateId={setId}
        idErrMsg={idErrMsg}
        password={password}
        onUpdatePassword={setPassword}
        passwordErrMsg={passwordErrMsg}
      />
    </>
  );
};
