import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { HiMail } from "react-icons/hi";
import { MdVpnKey } from "react-icons/md";
import "./index.css";

const SignIn = () => {
  const [mail, setMail] = useState("");
  const [showPass, changeShow] = useState(false);
  const [password, setPassword] = useState("");
  const [showError, setErrorMsg] = useState(false);
  const navigate = useNavigate();
  const onChangeShow = () => changeShow((prevVal) => !prevVal);
  const onChangeMail = (event) => setMail(event.target.value);
  const onChangePassword = (event) => setPassword(event.target.value);
  const onSubmitSuccess = () => {
    navigate("/");
  };
  const onClickSignIn = (event) => {
    event.preventDefault();
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(mail)) {
      const emailVal = localStorage.getItem("loginToken");
      if (emailVal !== null) {
        const updatedData = JSON.parse(emailVal);
        if (updatedData.email === mail && updatedData.password === password) {
          onSubmitSuccess();
          setErrorMsg(false);
        } else {
          setErrorMsg(true);
        }
      } else {
        setErrorMsg(true);
      }
    } else {
      setErrorMsg(true);
    }
  };
  return (
    <div className="sign-page">
      <form className="form" onSubmit={onClickSignIn}>
        <h1 className="sign-in-heading">Sign in</h1>
        <p className="login-message">Login to manage your account</p>
        <div className="input-box">
          <input
            type="email"
            className="user-input"
            value={mail}
            onChange={onChangeMail}
            placeholder="Email"
          />
          <HiMail className="icons" />
        </div>
        <div className="input-box">
          <input
            type={showPass ? "text" : "password"}
            className="user-input"
            value={password}
            onChange={onChangePassword}
            placeholder="Password"
          />
          <MdVpnKey className="icons" />
          <button type="button" onClick={onChangeShow} className="show-button">
            {showPass ? "Hide" : "Show"}
          </button>
        </div>
        <button className="sign-in-button" type="submit">
          Login
        </button>
        {showError && (
          <p className="error-message">*Invalid Login Credentials</p>
        )}
        <p className="sign-up-msg">
          Don't have an account?{" "}
          <Link to="/signUp" className="link">
            <span className="sign-forgot">Sign up</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
