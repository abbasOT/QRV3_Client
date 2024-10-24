import React from "react";
import LogoIcon from "../../../assests/header_logo.png";
import SearchIcon from "@mui/icons-material/Search";
import OKIcon from "../../../assests/ok.png";
import NumPadSmallIcon from "../../../assests/numpad_smal_icon.svg";
import { TextField, IconButton } from "@mui/material";
import "../VisitorScreenCard/screen.css";
import InputAdornment from "@mui/material/InputAdornment";
// import callIcon from "../../../assests/visitor_com__users_screen_icon.png";
import callIcon from "../../../assests/call_icon.png";

import OrIcon from "../../../assests/or.svg";

const InputDivStyle = {
    borderRadius: "20px 0 0 20px",
    width: "180px",
    height: "39px",
    border: "none",
    backgroundColor: "#EBEBEB",
    paddingLeft: "10%",
    marginRight: "-15px",
    marginLeft: "-25px",
};

function NewVisitorScreenCard({
    brightness,
    CommercialData,
    ResidentsData,
    Data,
}) {
    const defaultBackgroundStyle = {
        width: "277px",

        borderRadius: "40px",
        background: "#2A3649",
    };

    const dynamicBackgroundStyle = CommercialData?.wallpaper
        ? {
            ...defaultBackgroundStyle,
            backgroundImage: `url(${CommercialData?.wallpaper})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        }
        : defaultBackgroundStyle;

    const OpacityValue = {
        ...dynamicBackgroundStyle,
    };

    return (
        <div style={OpacityValue}>
            <div
                className="d-grid justify-content-center pt-5"
                style={{
                    backgroundColor: `rgba(42, 54, 73, ${1 - brightness / 100})`,
                    borderRadius: "40px",
                }}
            >
                <div className="mt-1">
                    <img src={LogoIcon} alt="" />
                </div>
                <div className="mt-3" style={{ color: "white" }}>
                    <h6> Welcome to</h6>{" "}
                    <h3>
                        {CommercialData?.WelcomMessage
                            ? CommercialData?.WelcomMessage
                            : "QR DoorMan"}
                    </h3>
                </div>
                {/*  */}

                <div
                    className=""
                // onClick={handleShowUsers}
                >
                    <img src={callIcon} alt="" width={"300px"} />
                </div>
                <div style={{ marginTop: "-2rem", }}>
                    <img src={OrIcon} alt="" width={"260px"} />
                </div>

                <div
                    className="mt-3 mb-3"
                    style={{ color: "white", fontSize: "13px", fontFamily: "Inter", padding: "0rem 1rem" }}
                >
                    <span style={{ fontWeight: "700" }}>Enter the PIN </span>
                    <span style={{ fontWeight: "400" }}>
                        if you know it and press{" "}
                    </span>{" "}
                    <span style={{ fontWeight: "700" }}> OK</span>{" "}
                    <span style={{ fontWeight: "400" }}> to open the Gate. </span>
                </div>
                <div className="mb-3" style={{ marginLeft: "1rem", }}>
                    <img style={{ position: "relative" }} src={NumPadSmallIcon} alt="" />
                    <input type="text" style={InputDivStyle} placeholder="Enter PIN" />
                    <img src={OKIcon} alt="" />
                </div>
            </div>
        </div>
    );
}

export default NewVisitorScreenCard;
