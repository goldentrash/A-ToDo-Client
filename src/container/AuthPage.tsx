import { useState, useCallback, useContext } from "react";
import { ToastAndroid } from "react-native";
import { UserContext } from "../context";
import { useApi } from "../hook";
import { SignIn, SignUpModal } from "../view";

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

  const { setUser } = useContext(UserContext);
  const requestSignIn = useApi(
    {
      path: `/users/${id}/token`,
      method: "POST",
      body: { password },
    },
    ({ token }) =>
      setUser({ id, state: "rest", token, todoList: [], doing: null }),
    (err) => {
      if (err.message === "User Absent") return setIdErrMsg("Wrong User ID");
      if (err.message === "Password Invalid")
        return setPasswordErrMsg("Wrong Password");

      ToastAndroid.show(
        "Fail to Sign In, please retry again",
        ToastAndroid.LONG
      );
    }
  );
  const signIn = useCallback(() => {
    setIdErrMsg("");
    setPasswordErrMsg("");

    if (!id) return setIdErrMsg("ID Required");
    if (!password) return setPasswordErrMsg("password Required");

    requestSignIn();
  }, [id, password, requestSignIn]);

  const requestSignUp = useApi(
    {
      path: `/users`,
      method: "POST",
      body: { id, password },
    },
    (_res) => closeModal(),
    (err) => {
      if (err.message === "User ID Duplicated")
        return setIdErrMsg("Duplicated User ID");

      ToastAndroid.show(
        "Fail to Sign Up, please retry again",
        ToastAndroid.LONG
      );
    }
  );
  const signUp = useCallback(() => {
    setIdErrMsg("");
    setPasswordErrMsg("");

    if (!id) return setIdErrMsg("ID Required");
    if (!password) return setPasswordErrMsg("password Required");

    requestSignUp();
  }, [id, password, requestSignUp]);

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
