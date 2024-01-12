import React, { useState } from "react";

import PassIcon from "../../../assests/password_blue_icon.svg";
import QRCode from "qrcode.react";

const hrStyle = {
  // border: 'none',
  width: "100%",
  border: "#566D90 solid 1px",
};

const iconStyle = {
  marginLeft: "20px",
};

const downloadText = {
  color: "#19A752",
  fontFamily: "Poppins",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "700",
  textDecoration: "underline",
  color: "#2A3649",
  cursor: "pointer",
};

export default function DownloadQRModal({ pcbId, setQRModal }) {
  const downloadQR = () => {
    const canvas = document.getElementById("123456");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `qr-${pcbId}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setQRModal(false);
  };

  return (
    <div>
      <div className="d-flex mt-3 justify-content-center">
        <QRCode
          id="123456"
          value={`https://192.168.18.147:3000/property/${pcbId}`}
          size={100}
          level={"H"}
          includeMargin={true}
        />
      </div>
      <hr style={hrStyle}></hr>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={downloadText}
          onClick={(e) => {
            e.stopPropagation();
            downloadQR();
          }}
        >
          Download QR
        </div>
      </div>
    </div>
  );
}
