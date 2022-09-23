import React from "react";
import Image from "next/image";

interface IIconInformationProps {
  SrcImg: string;
  Title: string;
  Description: string;
  className?: string;
}

const IconInformation: React.FC<IIconInformationProps> = ({
  SrcImg,
  Title,
  Description,
  className,
}) => {
  return (
    <div
      className={`flex w-[250px] h-[200px] justify-center flex-col items-center ${className} `}
    >
      <div className="border-[1px] border-solid border-info w-[55px] h-[55px] rounded-full flex justify-center items-center  ">
        <div className="relative w-[35px] h-[35px] flex items-center justify-center">
          <Image src={SrcImg} alt="icon" layout="fill" />
        </div>
      </div>
      <h5 className="mt-3">{Title}</h5>
      <p className="text-center">{Description}</p>
    </div>
  );
};

export default IconInformation;
