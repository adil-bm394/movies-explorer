// src/hooks/useLogin.ts
import { useState } from "react";
import { useForm } from "react-hook-form";
import localforage from "localforage";
import { RegisterFormInputs } from "../utils/interface/types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/userSlice";

interface LoginFormInputs {
  email: string;
  password: string;
}

const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>();
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const users =
        (await localforage.getItem<RegisterFormInputs[]>("users")) || [];

      // Find the user by email and password
      const user = users.find(
        (user) => user.email === data.email && user.password === data.password
      );

      if (user) {
        setLoginError(null);
        dispatch(
          login({
            id: user.id, // Correctly using the `id` field
            name: user.name,
            email: user.email,
            phone: user.phone,
          })
        );

        // Navigate to the home page
        navigate("/");
      } else {
        setLoginError("Invalid email or password");
      }
    } catch (err) {
      setLoginError("An error occurred during login");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    loginError,
  };
};

export default useLogin;
