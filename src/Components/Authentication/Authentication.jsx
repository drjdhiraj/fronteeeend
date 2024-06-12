import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import AuthModel from "./AuthModel";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { loginWithGoogleAction } from "../../Store/Auth/Action";

const Authentication = () => {
  const [authModelOpen, setAuthModelOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuthModelClose = () => {
    setAuthModelOpen(false);
    navigate("/");
  };

  const handleAuthModelOpen = (path) => {
    setAuthModelOpen(true);
    navigate(path);
  };

  useEffect(() => {
    if (location.pathname === "/signin" || location.pathname === "/signup") {
      setAuthModelOpen(true);
    }
  }, [location.pathname]);

  const loginWithGoole = (res) => {
    console.log("res : ", res);
    dispatch(loginWithGoogleAction(res));
    // return
  };

  return (
    <div className="">
      {" "}
      <Grid className="overflow-y-hidden" container>
        <Grid className="hidden lg:block" item lg={7}>
          <img
            className="w-full h-screen duration-300  hover:-hue-rotate-30 "
            src="https://cdn.pixabay.com/photo/2015/06/23/23/14/laptop-819285_1280.jpg"
            alt=""
          />

          {/* 
        <img className=" w-[50rem] absolute -top-5" src="https://cdn.pixabay.com/photo/2021/03/02/12/04/TechnoBlog-6062249_640.png" alt="" /> */}
        </Grid>
        <Grid className="px-10" item lg={5} xs={12}>
          <div className="py-10">
            <img
              className="w-16 duration-300 hover:text-lime-500"
              // src="https://pbs.twimg.com/media/F1iAD_iaYAAu7I3?format=jpg&name=small"
              alt=""
            />
          </div>

          <h1 className="font-bold duration-300 hover:text-red-600 hover:rotate-3  text-7xl">Techno Blogs</h1>

          <h1 className="font-bold duration-300 hover:text-red-700 text-3xl py-16">Join TechnoBlog Today</h1>

          <div className="w-[60%]">
            <div className="w-full">
              {/* <button 
            className="w-full flex justify-center items-center border border-gray-400 py-2 px-7 rounded-full bg-white shadow-md text-gray-600">
              <img
                src="https://www.google.com/images/hpp/ic_wahlberg_product_core_48.png8.png"
                alt="Google Logo"
                className="h-6 w-6 mr-2"
              />
              Sign Up with Google
            </button> */}
              <GoogleLogin
                width={330}
                onSuccess={loginWithGoole}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
<div>
  <p className="text-sm mt-2 duration-300 hover:text-cyan-700-700 ">
    By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
  </p>
  <p className="pt-10 duration-300 hover:text-blue-700 ">Enjoy an effortless Signin-Signup experience.</p>
  <p className=" duration-300 hover:text-blue-700">No need to remember another username or password. Use your Google account for quick and easy access.</p>
</div>
<div className="duration-300 hover:text-blue-700 mt-10">
</div>

              {/* <Button
                onClick={() => handleAuthModelOpen("/signin")}
                sx={{
                  width: "100%",
                  borderRadius: "29px",
                  py: "7px",
                }}
                variant="outlined"
                size="large"
              >
                Signin
              </Button> */}
            </div>
          </div>
        </Grid>
      </Grid>
      <AuthModel isOpen={authModelOpen} handleClose={handleAuthModelClose} />
    </div>
  );
};

export default Authentication;
