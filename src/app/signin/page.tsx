"use client";
import { redirect } from "next/navigation";
import React from "react";
import LoginForm from "../../components/LoginForm";

export default function Signin() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
