import DoorMan_Img from "../../../assests/doorman_landing_image.png";
import React, { useEffect, useState } from "react";
import Pass_Icon from "../../../assests/password_icon.svg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../../../App.css";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Address_Icon from "../../../assests/address.svg";
import Name_Icon from "../../../assests/email_id_icon.svg";
import Phone_Icon from "../../../assests/phone_icon.svg";
import EmailIcon from "../../../assests/email_icon.svg";
import HouseBuilding from "../../../assests/superAdmin/houseBuildingIconSmall.svg"
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Typography } from "@mui/material";
import EmailDialogue from "../../../components/Commercial/EmailDialogue/EmailDialogue";

const btnStyle = {
    width: "390px",
    height: "45px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "white",
    color: "#2A3649",
    fontSize: "16px",
};
const inputTextStyle = {
    fontFamily: "Raleway",
    color: "#FFFFFF",
    fontWeight: "400",
    fontSize: "12px",
}

const hrStyle = {
    // border: 'none',
    margin: "0.7rem 0rem 0.7rem 0rem",
    width: "350px",
    border: "#FFFFFF solid 1px",
};

const inputFieldStyle = {
    ...inputTextStyle,
    border: "none",
    background: "none",
    color: "#FFFFFF",
    '::placeholder': {
        color: 'white' // Placeholder color
    },
    fontSize: "12px",
    width: "300px",
    marginLeft: "30px",
    outline: "none",
};

const forgetStyle = {
    color: "#FFFFFF",
    fontSize: "16px",
    float: "right",
    marginLeft: "auto",
};

const passwordEyeBox = {
    position: 'absolute',
    color: "#FFF",
    top: '65%',
    right: '5%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    opacity: '50%',
    display: 'flex',
    alignItems: 'center',
}

function SignUpCommercial() {


    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const [modalShown, setModalShown] = useState(false);



    const [showEmailDialogue, setShowEmailDialogue] = useState(false);

    const handleEmail = () => {
        setShowEmailDialogue(false);
    };

    const handleEmailDialogueOpen = () => {
        setShowEmailDialogue(true);
    };
    const handleEmailDialogueClose = () => {
        setShowEmailDialogue(false);
    };

    const handleInputClick = (e) => {
        if (!modalShown) {
            // Show the modal
            handleEmailDialogueOpen();
            setModalShown(true);
        } else {
            // Proceed as usual without showing the modal
            e.target.focus();
        }
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            lastName: "",
            email: "",
            phoneNumber: "",

            propertyName: "",
            address: "",
            propertyEmail: "",
            confirmPropertyEmail: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email address").required("Required"),
            phoneNumber: Yup.string()
                .required("Required")
                .matches(/^\d{11}$/, "Must be 11 digits"),


            propertyName: Yup.string().required("Required"),
            address: Yup.string().required("Required"),
            propertyEmail: Yup.string().email("Invalid email address").required("Required"),
            confirmPropertyEmail: Yup.string().required("Required").oneOf([Yup.ref("propertyEmail"), null], "Property Email Must Match"),
            password: Yup.string().required("Required"),
            confirmPassword: Yup.string()
                .required("Required")
                .oneOf([Yup.ref("password"), null], "Passwords must match"),
        }),
        onSubmit: async (values) => {
            try {
                // Make API request using Axios
                const response = await axios.post(
                    "https://ot-technologies.com/commercialAdmin/signup",
                    values
                );

                // Handle the response as needed
                console.log("API Response:", response.data);
                alert("Sign Up Successfull");
                navigate("/login");
                // Add any additional logic or state updates after a successful form submission
            } catch (error) {
                // Handle API request errors
                if (error.response && error.response.data && error.response.data.error) {
                    // Display the error message from the server response
                    alert(`Error: ${error.response.data.error}`);
                } else {
                    // Handle generic errors
                    console.error("API Error:", error.message);
                    alert("An unexpected error occurred. Please try again.");
                }
            }
        }
    });

    const IconStyles = {
        width: "18px",
        height: "20px",
    };

    return (
        <div className="container-fluid" style={{ height: '100vh' }}>
            <div className="row" >
                <div className="col-6 " >
                    <div className="d-grid align-items-center justify-content-center h-100">
                        <div>
                            <img src={DoorMan_Img} alt="" />
                            <p className="mt-3" style={textStyle}>elevating your entry experience...</p>
                        </div>
                        {/* <p className="text-center" style={{ color: "#2A3649" }}>
           name: "",
      lastName: "",
      address: 
          </p> */}
                    </div>
                </div>

                <div
                    className="col-6 "
                    style={{ backgroundColor: "#2A3649", minHeight: "100vh", height: "100%" }}
                >
                    <div
                        className="d-flex align-items-center justify-content-center h-100"
                        style={{ margin: "3rem 0rem 0rem 0rem" }}
                    >

                        <form onSubmit={formik.handleSubmit} style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column", }}>
                            {/* 1 */}
                            <Typography sx={{ textAlign: "center", mb: "2rem", mt: "1rem", fontWeight: 600, fontFamily: "Poppins", color: "#FFF" }}>Management Information</Typography>

                            <div className="d-flex position-relative">
                                <img src={Name_Icon} alt="User Icon" style={iconStyles} />
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Name"
                                    className="white-placeholder"
                                    style={inputFieldStyle}
                                    autoComplete="off"
                                    maxLength={50}
                                    {...formik.getFieldProps("name")}
                                />
                            </div>
                            {formik.touched.name && formik.errors.name ? (
                                <div style={requiredStyle}>{formik.errors.name}</div>
                            ) : null}
                            <hr style={hrStyle}></hr>
                            {/* 2 */}
                            <div className="d-flex position-relative">
                                <img src={Name_Icon} alt="User Icon" style={iconStyles} />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="white-placeholder"
                                    id="lastName"
                                    style={inputFieldStyle}
                                    autoComplete="off"
                                    maxLength={50}
                                    {...formik.getFieldProps("lastName")}
                                />

                            </div>
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <div style={requiredStyle}>{formik.errors.lastName}</div>
                            ) : null}

                            <hr style={hrStyle}></hr>
                            {/* 3 */}
                            <div className="d-flex position-relative">
                                {/* <div style={IconStyles}> */}
                                <img src={EmailIcon} style={iconStyles} alt="User Icon" />
                                {/* </div> */}

                                <input
                                    type="text"
                                    id="email"
                                    placeholder="Email"
                                    style={inputFieldStyle}
                                    className="white-placeholder"
                                    autoComplete="off"
                                    maxLength={50}
                                    {...formik.getFieldProps("email")}
                                />

                            </div>
                            {formik.touched.email && formik.errors.email ? (
                                <div style={requiredStyle}>{formik.errors.email}</div>
                            ) : null}
                            <hr style={hrStyle}></hr>
                            {/* 4 */}
                            {/* Phone Number */}
                            <div className="d-flex position-relative">
                                {/* <div style={IconStyles}> */}
                                <img src={Phone_Icon} style={{ ...iconStyles, width: 15, marginLeft: "0.2rem" }} alt="User Icon" />
                                {/* </div> */}

                                <input
                                    type="text"
                                    id="phoneNumber"
                                    placeholder="Phone number"
                                    style={inputFieldStyle}
                                    autoComplete="off"
                                    maxLength={11}
                                    className="white-placeholder"
                                    {...formik.getFieldProps("phoneNumber")}
                                />

                            </div>
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                <div style={requiredStyle}>{formik.errors.phoneNumber}</div>
                            ) : null}

                            <hr style={hrStyle}></hr>

                            <Typography sx={{ textAlign: "center", mb: "2rem", mt: "4rem", fontWeight: 600, fontFamily: "Poppins", color: "#FFF" }}>Property Information</Typography>
                            {/* 5 */}

                            <div className="d-flex position-relative">
                                <img src={HouseBuilding} alt="User Icon" style={iconStyles} />
                                <input
                                    type="text"
                                    placeholder="Property Name"
                                    className="white-placeholder"
                                    id="propertyName"
                                    style={inputFieldStyle}
                                    autoComplete="off"
                                    maxLength={50}
                                    {...formik.getFieldProps("propertyName")}
                                />

                            </div>
                            {formik.touched.propertyName && formik.errors.propertyName ? (
                                <div style={requiredStyle}>{formik.errors.propertyName}</div>
                            ) : null}

                            <hr style={hrStyle}></hr>

                            <div className="d-flex position-relative">
                                <img src={Address_Icon} style={{ ...iconStyles, width: 15, marginLeft: "0.2rem" }} alt="User Icon" />

                                <input
                                    type="text"
                                    id="address"
                                    placeholder="Address"
                                    style={inputFieldStyle}
                                    className="white-placeholder"
                                    autoComplete="off"
                                    maxLength={50}
                                    {...formik.getFieldProps("address")}
                                />

                            </div>
                            {formik.touched.address && formik.errors.address ? (
                                <div style={requiredStyle}>{formik.errors.address}</div>
                            ) : null}
                            <hr style={hrStyle}></hr>
                            <div className="d-flex position-relative" >
                                <img src={EmailIcon} style={{ ...iconStyles, marginLeft: "0.1rem" }} alt="User Icon" />

                                <input
                                    type="text"
                                    id="propertyEmail"
                                    placeholder="Property Email"
                                    style={inputFieldStyle}
                                    className="white-placeholder"
                                    autoComplete="off"
                                    maxLength={50}
                                    value={formik.values.propertyEmail}
                                    onChange={formik.handleChange}
                                    onClick={handleInputClick}

                                />

                            </div>
                            {formik.touched.propertyEmail && formik.errors.propertyEmail ? (
                                <div style={requiredStyle}>{formik.errors.propertyEmail}</div>
                            ) : null}


                            <hr style={hrStyle}></hr>
                            <div className="d-flex position-relative">
                                <img src={EmailIcon} style={{ ...iconStyles, marginLeft: "0.2rem" }} alt="User Icon" />

                                <input
                                    type="text"
                                    id="confirmPropertyEmail"
                                    placeholder="Confirm Property Email"
                                    style={inputFieldStyle}
                                    className="white-placeholder"
                                    autoComplete="off"
                                    maxLength={50}
                                    {...formik.getFieldProps("confirmPropertyEmail")}
                                />

                            </div>
                            {formik.touched.confirmPropertyEmail && formik.errors.confirmPropertyEmail ? (
                                <div style={requiredStyle}>{formik.errors.confirmPropertyEmail}</div>
                            ) : null}


                            <hr style={hrStyle}></hr>



                            <div className="d-flex " style={{ position: 'relative' }}>
                                <img src={Pass_Icon} alt="User Icon" style={{ ...iconStyles, marginLeft: "0.2rem" }} />

                                <input

                                    type={passwordVisible ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Password"
                                    style={inputFieldStyle}
                                    className="white-placeholder"
                                    autoComplete="off"
                                    maxLength={50}
                                    {...formik.getFieldProps("password")}
                                />
                                <Box
                                    sx={passwordEyeBox}
                                    onClick={togglePasswordVisibility}
                                >
                                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                                </Box>

                            </div>
                            {formik.touched.password &&
                                formik.errors.password ? (
                                <div style={requiredStyle}>
                                    {formik.errors.password}
                                </div>
                            ) : null}

                            <hr style={hrStyle}></hr>
                            <div className="d-flex " style={{ position: 'relative' }}>
                                <img src={Pass_Icon} alt="User Icon" style={{ ...iconStyles, marginLeft: "0.2rem" }} />

                                <input
                                    type={confirmPasswordVisible ? 'text' : 'password'}
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    style={inputFieldStyle}
                                    className="white-placeholder"
                                    autoComplete="off"
                                    maxLength={50}
                                    {...formik.getFieldProps("confirmPassword")}
                                />
                                <Box
                                    sx={passwordEyeBox}
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    {confirmPasswordVisible ? <VisibilityOff /> : <Visibility />}
                                </Box>

                            </div>
                            {formik.touched.confirmPassword &&
                                formik.errors.confirmPassword ? (
                                <div style={requiredStyle}>
                                    {formik.errors.confirmPassword}
                                </div>
                            ) : null}

                            <hr style={hrStyle}></hr>
                            {/* Submit Button */}
                            <button
                                style={btnStyle}
                                type="submit"
                                className="btn btn-primary mt-5"
                            >
                                <b>Create Account</b>
                            </button>

                            {/* Additional Info */}
                            <div className="mt-5" style={{ color: "white" }}>
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    style={{ textDecoration: "none", color: "white" }}
                                >
                                    <b>Log in</b>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {showEmailDialogue && (
                <EmailDialogue
                    handleEmailOpen={handleEmailDialogueOpen}
                    handleEmail={handleEmail}
                    handleEmailClose={handleEmailDialogueClose}
                />
            )}
        </div>
    );
}

export default SignUpCommercial;
const requiredStyle = { display: "flex", alignItems: "center", textAlign: "start", color: "red", fontSize: "0.8rem", marginLeft: "29rem", marginTop: "-1.15rem" }
{
    /* <div className="col-12">
  <img src={DoorMan_Img} alt="" />
  </div>
  <div className="col-12 mt-3 mb-5">
  <div className="text-center">
    Effortless Security Access at Your <br /> Fingertips
  </div>
  </div>
  <div className="col-12 mt-5">
  <button style={btnStyle} type="button" className="btn btn-primary">
    Get Started
  </button>
  </div> */
}

const textStyle = {
    fontFamily: 'var(--font-family-secondary)',
    color: 'var(--primary-color)',
    fontStyle: "italic",
    paddingTop: "1.75rem",

}

const iconStyles = {
    width: 18, position: 'absolute', top: '5%', left: '-3%',
}