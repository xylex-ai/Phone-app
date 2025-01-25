import React from "react";

const XylexLogo = ({ size }) => {
  const XylexLogoWhite = "https://storage.googleapis.com/xylex_images/xylexai_logo_new_white.png";
  
  // Nastavení velikosti loga
  let height, width;
  if (size === "small") {
    height = "20px";
    width = "105px";
  } else if (size === "medium") {
    height = "30px";
    width = "157.5px";
  } else if (size === "large") {
    height = "60px";
    width = "315px";
  } else if (size === "xl") {
    height = "80px";
    width = "420px";
  } else {
    height = "40px";
    width = "210px";
  }

  return (
    <div>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        height={height}
        width={width}
        viewBox="0 0 3113.000000 415.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,415.000000) scale(0.100000,-0.100000)"
          fill="#FFFFFF" // Fixní barva (bílá na tmavém pozadí)
          stroke="none"
          className="h-6 w-auto"
        >
          <path d="M22140 4129 c-85 -34 -221 -190 -299 -341 ... další data ... z" />
        </g>
      </svg>
    </div>
  );
};

export default XylexLogo;
