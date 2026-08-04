import React from "react";
import AuthForm from "../features/auth/AuthForm";

const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4">
      <AuthForm />
    </div>
  );
};

export default AuthPage;
