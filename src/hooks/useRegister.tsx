import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import localforage from 'localforage';
import { login } from '../redux/slices/userSlice';
import registerSchema from '../utils/ValidatioSchema/ValidationSchema';
import { RegisterFormInputs } from '../utils/interface/types';


interface UseRegisterReturn extends UseFormReturn<RegisterFormInputs> {
  onSubmit: (data: RegisterFormInputs) => void;
  registrationError: string | null;
}

const useRegister = (): UseRegisterReturn => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  });

  const { handleSubmit, formState } = methods;
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const users = await localforage.getItem<RegisterFormInputs[]>('users') || [];
      if (users.some(user => user.email === data.email)) {
        setRegistrationError("Email is already registered");
        return;
      }
      users.push(data);
    
      await localforage.setItem('users', users);

      // May be  it not neded Dispatch login action to Redux
      //dispatch(login({ name: data.name, email: data.email, phone: data.phone }));
      setRegistrationError(null);
      navigate('/login');
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
