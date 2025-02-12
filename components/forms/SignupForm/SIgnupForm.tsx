import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Input,
  Button,
  Form,
} from '@heroui/react';
import { useLoadingContext } from '@/context/Loading';
import { signIn } from 'next-auth/react';
import { useAlertContext } from '@/context/Alert';
import { MsgSeverityEnum } from '@/types/alert';
import { useRouter } from 'next/navigation';

const SignupForm = () => {
  const { setShowLoading } = useLoadingContext()
  const { setAlertMsg } = useAlertContext()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setShowLoading(true)
    signIn("signup", {
      email,
      password,
      // action: authAction,
      redirect: false,
    }).then(async (res) => {
      if (res?.ok) {
        setAlertMsg("Welcome!", { severity: MsgSeverityEnum.SUCCESS });
        router.push("/");
      }
      if(res?.error){
        setAlertMsg(res.error, { severity: MsgSeverityEnum.ERROR });
        // setErrors({ general: res.error })
      }
    })
    .catch((error) => {
      setAlertMsg(error ?? "Something went wrong", {
        severity: MsgSeverityEnum.ERROR,
      });
    })
    .finally(() =>{
      setShowLoading(false);
    });
    // Handle form submission here (e.g., send data to server)
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="username"
        errorMessage={({validationDetails, validationErrors}) => {
          if (validationDetails.typeMismatch) {
            return "Please enter a valid email address";
          }
          return validationErrors;
        }}
        {...register('username', { required: true })}
      />
      <Input
        id="email"
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
      />
      <Input
        id="password"
        type="password"
        {...register('password', { required: true, minLength: 8 })}
      />
      <Input
        id="given_name"
        {...register('given_name', { required: true })}
      />
      <Input
        id="family_name"
        {...register('family_name', { required: true })}
      />
      <Input id="nickname" {...register('nickname')} />
      <Input id="name" {...register('name')} />
      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export default SignupForm;