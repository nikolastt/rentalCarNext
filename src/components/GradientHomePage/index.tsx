import React from "react";

// export const Gradient = styled.div`
//   width: 110px;
//   height: 100px;
//   background-image: linear-gradient(to top, #0f0f0f 0%, #ee7116 100%);
//   position: absolute;
//   top: -5%;
//   left: 50%;
//   border-radius: 50%;
//   z-index: -1;
//   filter: brightness(130%);
// `;

const GradientHomePage: React.FC = () => {
  return (
    <div className="w-[110px] h-[110px] bg-gradient-to-t from-[#0f0f0f] to-[#ee7116] rounded-full brightness-125 shadow-gradient-home shadow-[#ee7116]"></div>
  );
};

export default GradientHomePage;
