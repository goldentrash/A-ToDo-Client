import { useState, useCallback, useContext, useMemo } from "react";
import { ToastAndroid } from "react-native";
import { UserContext } from "../context";
import {
  useApi,
  type RequestOption,
  type RseponseHandler,
  type ErrorHandler,
} from "../hook";
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
  const signInReqOpt = useMemo<RequestOption>(
    () => ({
      path: `/users/${id}/token`,
      method: "POST",
      body: { password },
    }),
    [id, password]
  );
  const signInResHandler = useCallback<RseponseHandler>(
    ({ token }) => setUser({ id, state: "rest", token, todoList: [] }), // setUser로 진입하면 나오지 않는다 원인이 뭘까?
    [id, setUser]
  );
  const signInErrHandler = useCallback<ErrorHandler>((err) => {
    if (err.message === "User Absent") return setIdErrMsg("Wrong User ID");
    if (err.message === "Password Invalid")
      return setPasswordErrMsg("Wrong Password");

    ToastAndroid.show("Fail to Sign In, please retry again", ToastAndroid.LONG);
  }, []);
  const signInReq = useApi(signInReqOpt, signInResHandler, signInErrHandler);
  const signIn = useCallback(() => {
    setIdErrMsg("");
    setPasswordErrMsg("");

    if (!id) return setIdErrMsg("ID Required");
    if (!password) return setPasswordErrMsg("password Required");

    signInReq();
  }, [id, password, signInReq]);

  const signUpReqOpt = useMemo<RequestOption>(
    () => ({
      path: `/users`,
      method: "POST",
      body: { id, password },
    }),
    [id, password]
  );
  const signUpResHandler = useCallback<RseponseHandler>(
    (_res) => closeModal(),
    [closeModal]
  );
  const signUpErrHandler = useCallback<ErrorHandler>((err) => {
    if (err.message === "User ID Duplicated")
      return setIdErrMsg("Duplicated User ID");

    ToastAndroid.show("Fail to Sign Up, please retry again", ToastAndroid.LONG);
  }, []);
  const signUpReq = useApi(signUpReqOpt, signUpResHandler, signUpErrHandler);
  const signUp = useCallback(() => {
    setIdErrMsg("");
    setPasswordErrMsg("");

    if (!id) return setIdErrMsg("ID Required");
    if (!password) return setPasswordErrMsg("password Required");

    signUpReq();
  }, [id, password, signUpReq]);

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
