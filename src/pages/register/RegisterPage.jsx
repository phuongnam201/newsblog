import React from "react";
import MainLayout from "../../components/MainLayout";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const sumbitHandler = () => {};

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard">
            Sign Up
          </h1>
          <form action="" onSubmit={sumbitHandler}>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="name"
                className="text-[#5a7184] font-semibold block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"
              />
            </div>

            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="email"
                className="text-[#5a7184] font-semibold block"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"
              />
            </div>

            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="password"
                className="text-[#5a7184] font-semibold block"
              >
                Password
              </label>
              <input
                type="text"
                id="password"
                placeholder="Enter your password"
                className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"
              />
            </div>

            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="confirmPassword"
                className="text-[#5a7184] font-semibold block"
              >
                Confirm password
              </label>
              <input
                type="text"
                id="confirmPassword"
                placeholder="Re-enter you password"
                className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"
              />
            </div>
            <input
              type="submit"
              className="text-center text-lg w-full bg-primary text-white hover:opacity-60 mx-auto px-8 py-4 mt-5 rounded-lg font-roboto"
              value="Submit"
            />
            <div className="text-right font-semibold mt-2">
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-primary"
              >
                Forgot password?
              </Link>
            </div>
            <div className="text-center mt-2 font-semibold">
              <span>You have already an account? </span>
              <Link to="/login" className="text-sm text-primary ">
                Login now
              </Link>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default RegisterPage;
