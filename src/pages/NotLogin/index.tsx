import { signIn } from "next-auth/react";
import React from "react";

import { FcGoogle } from "react-icons/fc";
import ResponsiveAppBar from "../../components/AppBar";

const NotLogin: React.FC = () => {
  return (
    <>
      <ResponsiveAppBar />

      <div className="h-[calc(100vh-79px)] flex items-center px-6">
        <div className="w-full h-1/2 rounded-lg border border-primary-500 bg-gradient-to-br from-[#101010] to-primary-500/10 shadow-lg p-3 cursor-pointer">
          <div className="flex flex-col items-center">
            <h2 className="mt-24 text-3xl uppercase font-bold tracking-wider">
              Login
            </h2>

            <button
              onClick={() =>
                signIn("google", {
                  callbackUrl: `${window.location.origin}/Booking`,
                })
              }
              className="mt-12 w-1/2 flex justify-center px-6 py-2 border border-primary-500 rounded-lg hover:scale-105 duration-200"
            >
              <FcGoogle size={35} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotLogin;
