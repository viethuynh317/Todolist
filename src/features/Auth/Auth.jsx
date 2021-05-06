import {CircularProgress} from "@material-ui/core";
import React, {Suspense} from "react";
import SignIn from "./SignIn/SignIn";

const Auth = () => (
  <Suspense fallback={<CircularProgress />}>
    <SignIn />
  </Suspense>
);

export default Auth;
