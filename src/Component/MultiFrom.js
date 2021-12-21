// import { Box } from "@mui/material";
import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, Divider, TextField, Typography } from "@mui/material";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "./Style.css";

const validationSchema = [
  //validation for step1
  yup.object({
    Name: yup.string().required(),
  }),
  //validation for step2
  yup.object({
    Email: yup.string().required(),
  }),
  //validation for step3
  yup.object({
    Password: yup.string().required(),
  }),
];

// const schema = yup
//   .object({
//     Name: yup.string().required(),
//     Email: yup.string().required(),
//     Password: yup.string().required(),
//   })
//   .required();
const MultiFrom = () => {
  const [step, setStep] = useState(0);
  const [hValue, setHvalue] = useState("");

  const currentValidationSchema = validationSchema[step];
  const methods = useForm({
    shouldUnregister: false,
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
  });
  const {
    handleSubmit,

    trigger,
    register,
    formState: { errors },
    reset,
  } = methods;

  const nextStep = async () => {
    const isStepValid = await trigger();
    if (isStepValid) setStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setHvalue(value);
  };

  const onSubmit = (data) => {
    reset();
    console.log(data);
  };

  const prevStep = () => {
    setStep(step - 1);
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#E5E5E5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          boxShadow: 3,
          width: "60%",
          height: 270,
          bgcolor: "white",
          borderRadius: "5px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            fontSize: "24px",
            color: "#3F4149",
            p: 3,
            display: "flex",
            alignItems: "center",
          }}
        >
          <SettingsIcon /> &nbsp; Register
        </Typography>{" "}
        <Divider />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 0 && (
              <Box>
                <TextField
                  {...register("Name")}
                  helperText={errors.Name?.message}
                  sx={{ width: "90%", m: 3 }}
                  textAlign="center"
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  onChange={handleChange}
                />
                {hValue ? (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mr: 2, mx: 3 }}
                    onClick={nextStep}
                  >
                    Next
                    <ArrowForwardIosIcon />
                  </Button>
                ) : (
                  <Button variant="contained" sx={{ mr: 2, mx: 3 }} disabled>
                    Next
                    <ArrowForwardIosIcon />
                  </Button>
                )}
              </Box>
            )}
            {step === 1 && (
              <Box>
                <TextField
                  type="email"
                  {...register("Email", { required: true })}
                  helperText={errors.Email?.message}
                  sx={{ width: "90%", m: 3 }}
                  textAlign="center"
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                />
                <Box sx={{ px: 3 }}>
                  <Button variant="contained" sx={{ mr: 2 }} onClick={prevStep}>
                    {" "}
                    <ArrowBackIosIcon /> Prev
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mr: 2 }}
                    onClick={nextStep}
                  >
                    {" "}
                    Next
                    <ArrowForwardIosIcon />
                  </Button>
                </Box>
              </Box>
            )}
            {step === 2 && (
              <Box>
                <TextField
                  {...register("Password")}
                  helperText={errors.Password?.message}
                  onChange={handleChange}
                  sx={{ width: "90%", m: 3 }}
                  textAlign="center"
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                />
                <Box sx={{ px: 3 }}>
                  <Button variant="contained" sx={{ mr: 2 }} onClick={prevStep}>
                    {" "}
                    <ArrowBackIosIcon /> Prev
                  </Button>

                  <Button type="submit" variant="contained" sx={{ mr: 2 }}>
                    Submit
                  </Button>
                </Box>
              </Box>
            )}
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default MultiFrom;
