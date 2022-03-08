import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import bg from "../Assets/signup.png";
import SigninService from "../Services/Signin";

const Signin = () => {
  const { control, handleSubmit } = useForm();
  const [signinError, setSigninError] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    let value = await SigninService(data.emailAddress, data.password);
    if (value === "Login successfully") {
      navigate("/admin/", { replace: true });
    } else {
      setSigninError(value);
    }
  };

  return (
    <Grid
      container
      sx={{
        backgroundColor: "grey",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${bg})`,
      }}
    >
      <Grid
        container
        item
        xs={10}
        sm={8}
        md={6}
        lg={4}
        sx={{
          height: "50%",
          backgroundColor: "white",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <Grid item>
          <Typography
            sx={{
              color: "rgb(33,150,243)",
              fontFamily: "Inter",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Sign in to Foodernity
          </Typography>
        </Grid>
        <Grid item>
          <Typography>{signinError}</Typography>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="emailAddress"
              control={control}
              defaultValue="foodernityph@gmail.com"
              rules={{ required: "Email required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  type="email"
                  variant="outlined"
                  id="emailAddress"
                  label="Email Address"
                  autoComplete="email"
                  margin="normal"
                  fullWidth
                  required
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error && error.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue="capstoneproject"
              rules={{ required: "Password required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  type="password"
                  variant="outlined"
                  id="password"
                  label="Password"
                  margin="normal"
                  fullWidth
                  required
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error && error.message}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Sign in
            </Button>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signin;
