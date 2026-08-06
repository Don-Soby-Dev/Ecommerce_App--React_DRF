import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./authThunks";
import { apiRegisterUser } from "./authAPI";
import { validateEmail, validatePassword } from "../../utils/validation";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const validate = () => {
    const errors = {};

    if (!isLogin && !formData.username.trim()) {
      errors.username = "Username cannot be empty.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email cannot be empty.";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      errors.password = "Password cannot be empty.";
    } else if (!isLogin && !validatePassword(formData.password)) {
      errors.password =
        "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character with no spaces.";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError("");
    setSuccessMessage("");
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", email: "", password: "" });
    setFormErrors({});
    setApiError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccessMessage("");

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (isLogin) {
      try {
        const resultAction = await dispatch(
          loginUser({ email: formData.email, password: formData.password }),
        );

        if (loginUser.fulfilled.match(resultAction)) {
          navigate("/");
          return;
        }

        const payload =
          resultAction.payload ||
          resultAction.error?.message ||
          resultAction.error?.name;

        console.log("login failed", payload);

        if (typeof payload === "string") {
          setApiError(payload);
        } else if (payload && typeof payload === "object") {
          if (payload.detail) setApiError(payload.detail);
          else if (payload.non_field_errors)
            setApiError(payload.non_field_errors.join(" "));
          else setApiError("Login failed. Please check your credentials.");
        } else {
          setApiError("Login failed. Please check your credentials.");
        }
      } catch (err) {
        setApiError("An unexpected error occurred during login.");
      }
    } else {
      try {
        await apiRegisterUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        setSuccessMessage(
          "Registration successful! Please sign in to continue.",
        );
        setIsLogin(true);
        setFormData({ username: "", email: "", password: "" });
      } catch (err) {
        if (err.response && err.response.data) {
          const data = err.response.data;
          if (typeof data === "object") {
            const fieldErrors = {};
            let generalErr = "";
            Object.keys(data).forEach((key) => {
              const val = Array.isArray(data[key])
                ? data[key].join(" ")
                : data[key];
              if (key === "username" || key === "email" || key === "password") {
                fieldErrors[key] = val;
              } else {
                generalErr += `${val} `;
              }
            });
            if (Object.keys(fieldErrors).length > 0) {
              setFormErrors(fieldErrors);
            }
            if (generalErr) {
              setApiError(generalErr.trim());
            }
          } else {
            setApiError("Registration failed. Please try again.");
          }
        } else {
          setApiError("Network error. Please try again later.");
        }
      }
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 transition-all duration-300">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          {isLogin
            ? "Enter your credentials to access your account"
            : "Sign up to start shopping with us today"}
        </p>
      </div>

      {apiError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm animate-fade-in">
          {apiError}
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm animate-fade-in">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="johndoe"
              className={`w-full px-4 py-3 rounded-xl border ${
                formErrors.username
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
              } bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all duration-200`}
            />
            {formErrors.username && (
              <p className="mt-1 text-xs text-red-600 font-medium">
                {formErrors.username}
              </p>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={`w-full px-4 py-3 rounded-xl border ${
              formErrors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
            } bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all duration-200`}
          />
          {formErrors.email && (
            <p className="mt-1 text-xs text-red-600 font-medium">
              {formErrors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className={`w-full px-4 py-3 rounded-xl border ${
              formErrors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
            } bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all duration-200`}
          />
          {formErrors.password && (
            <p className="mt-1 text-xs text-red-600 font-medium">
              {formErrors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3.5 px-4 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
        >
          {status === "loading" ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </span>
          ) : isLogin ? (
            "Sign In"
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={toggleMode}
            className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-all"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
