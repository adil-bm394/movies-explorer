// src/hooks/useRegister.ts
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import localforage from "localforage";
import { login } from "../redux/slices/userSlice";
import registerSchema from "../utils/ValidatioSchema/ValidationSchema";
import { RegisterFormInputs} from "../utils/interface/types";

interface UseRegisterReturn extends UseFormReturn<RegisterFormInputs> {
  onSubmit: (data: RegisterFormInputs) => void;
  registrationError: string | null;
}

const useRegister = (): UseRegisterReturn => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use `registerSchema` for validation and `RegisterFormInputs` for form fields

  
  const methods = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  });

  const { handleSubmit, formState } = methods;
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      // Fetch all users and calculate the new user ID
      const users =
        (await localforage.getItem<RegisterFormInputs[]>("users")) || [];
      const newUserId = (users.length + 1).toString(); // Use length+1 for ID

      // Add the new user with the ID
      const newUser = { ...data, id: newUserId };
      users.push(newUser);

      // Save updated users list to IndexedDB
      await localforage.setItem("users", users);

      // Dispatch login action to Redux store
      dispatch(
        login({
          id: newUserId,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
        })
      );

      // Navigate to the login page
      setRegistrationError(null);
      navigate("/login");
    } catch (error) {
      setRegistrationError("Failed to save data");
    }
  };

  return {
    ...methods,
    handleSubmit,
    onSubmit,
    formState,
    registrationError,
  };
};

export default useRegister;
