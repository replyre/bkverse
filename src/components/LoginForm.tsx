import { doSocialLogin } from "../app/actions";
import Image from "next/image";
import React from "react";

const LoginForm = () => {
  return (
    <form
      action={doSocialLogin}
      className="flex items-center justify-center h-screen dark:black flex-col gap-5"
    >
      <p className=" text-4xl">Welcome !!</p>
      <p className=" text-2xl"> SignIn Methods</p>
      <button
        type="submit"
        name="action"
        value={"google"}
        className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
      >
        <Image
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
          width={100}
          height={24}
        />
        <span>SignIn with Google</span>
      </button>
      ----------or----------
      <button
        type="submit"
        name="action"
        value={"github"}
        className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
      >
        <Image
          className="rounded-full"
          src="/github.png"
          loading="lazy"
          alt="github logo"
          width={24}
          height={24}
        />
        <span>SignIn with Github</span>
      </button>
    </form>
  );
};

export default LoginForm;
