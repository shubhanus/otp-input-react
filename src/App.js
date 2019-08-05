import React, { useState } from "react";
import OTPInput from "./lib";

function App() {
  const [OTP, setOTP] = useState("");
  return (
    <OTPInput
      value={OTP}
      onChange={setOTP}
      autoFocus
      OTPLength={4}
      otpType="number"
      disabled={false}
      secure
    />
  );
}

export default App;
