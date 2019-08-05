import React, { useState } from "react";
import OTPInput from "./lib";

function App() {
  const [OTP, setOTP] = useState("");
  return (
    <OTPInput value={OTP} onChange={setOTP} shouldAutoFocus numInputs={4} />
  );
}

export default App;
