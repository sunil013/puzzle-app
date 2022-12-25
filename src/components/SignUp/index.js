import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiTwotonePhone } from "react-icons/ai";
import { HiMail } from "react-icons/hi";
import { MdVpnKey } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import "./index.css";

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState();
  const [mail, setMail] = useState("");
  const [error, showError] = useState(false);
  const navigate = useNavigate();
  const [showPass, changeShow] = useState(false);
  const [password, setPassword] = useState("");
  const onChangeName = (event) => setName(event.target.value);
  const onChangePhone = (event) => setPhone(event.target.value);
  const onChangeMail = (event) => setMail(event.target.value);
  const onChangePassword = (event) => setPassword(event.target.value);
  const onChangeShow = () => changeShow((prevVal) => !prevVal);
  const onSignInSuccess = () => {
    navigate("/");
    showError(true);
  };
  const onChangeImage = (e) => {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  const onClickSignUp = (event) => {
    event.preventDefault();
    let loginDetails = { email: mail, password: password };
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(mail)) {
      if (
        name !== "" &&
        mail !== "" &&
        password !== "" &&
        phone !== "" &&
        file !== undefined
      ) {
        localStorage.setItem("loginToken", JSON.stringify(loginDetails));
        onSignInSuccess();
      } else {
        showError(true);
      }
    } else {
      showError(true);
    }
  };
  return (
    <div className="sign-page">
      <div className="signup-container">
        <img
          src="https://applian.com/img/login.svg"
          alt="password"
          className="password-image"
        />
        <div className="card-container">
          <form className="form-signup-section" onSubmit={onClickSignUp}>
            <h1 className="sign-up-heading">Create your account</h1>
            <img
              src={
                file === undefined
                  ? "https://res.cloudinary.com/sunil013/image/upload/v1671887847/PngItem_223968_pjzrgy.png"
                  : file
              }
              className="profile-image"
              alt="avatar"
            />
            <input
              type="file"
              onChange={onChangeImage}
              className="input-img-file"
            />
            <div className="signup-input-box">
              <CgProfile className="signup-icons" />
              <input
                type="text"
                className="signup-user-input"
                value={name}
                onChange={onChangeName}
                placeholder="Name"
              />
            </div>
            <div className="signup-input-box">
              <AiTwotonePhone className="signup-icons" />
              <input
                type="text"
                className="signup-user-input"
                value={phone}
                onChange={onChangePhone}
                placeholder="Phone"
              />
            </div>
            <div className="signup-input-box">
              <HiMail className="signup-icons" />
              <input
                type="email"
                className="signup-user-input"
                value={mail}
                onChange={onChangeMail}
                placeholder="example@gmail.com"
              />
            </div>
            <div className="signup-input-box">
              <MdVpnKey className="signup-icons" />
              <input
                type={showPass ? "text" : "password"}
                className="signup-user-input"
                value={password}
                onChange={onChangePassword}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={onChangeShow}
                className="signup-show-button"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
            <div className="label-box-text">
              <input type="checkbox" id="remember" className="check-box" />
              <label htmlFor="remember" className="signup-label-text">
                I agree to the Terms & Conditions
              </label>
            </div>
            <button className="sign-in-button" type="submit">
              Create my account
            </button>
            {error && (
              <p className="error-message signup-error">*Fill all the Fields</p>
            )}
          </form>
          <p className="sign-in-msg">
            Already have an account?{" "}
            <Link to="/signIn" className="link">
              <span className="sign-forgot">Sign in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
