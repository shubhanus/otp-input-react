# react-otp-input

A fully customizable, one-time password input component for the web built with React functional component.

![NPM](https://img.shields.io/npm/l/otp-input-react?style=flat-square)
[![npm](https://img.shields.io/npm/v/otp-input-react?style=flat-square)](https://badge.fury.io/js/otp-input-react)

![GIPHY](https://media.giphy.com/media/9JiszPVOX5FuPfJm39/giphy.gif)

![GIPHY](https://media.giphy.com/media/da1TEJz9E7xbk5VSsU/giphy.gif)

### [Working Demo](https://shubhanus.github.io/otp-input-react/)

## Installation

To install the latest stable version:

```
npm install --save otp-input-react
```

Basic usage:

```javascript
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
```

## API

<table>
  <tr>
    <th>Name<br></th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
    <th>Description</th>
    <th>Status</th>
  </tr>
  <tr>
    <td>OTPLength</td>
    <td>number</td>
    <td>false</td>
    <td>4</td>
    <td>Number of input boxes.</td>
    <td>Working</td>
  </tr>
  <tr>
    <td>onChange</td>
    <td>function</td>
    <td><strong>true</strong></td>
    <td>-</td>
    <td>Returns OTP code typed in inputs.</td>
    <td>Working</td>
  </tr>
  <tr>
    <td>value</td>
    <td>string / number</td>
    <td><strong>true</strong></td>
    <td>''</td>
    <td>The value of the otp passed into the component.</td>
    <td>Working</td>
  </tr>      
  <tr>
    <td>disabled</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Disables all the inputs.</td>
    <td>Working</td>
  </tr>    
  <tr>
    <td>autoFocus</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Auto focuses input on inital page load.</td>
    <td>Working</td>
  </tr>
  <tr>
    <td>otpType</td>
    <td>Enum: any|number </td>
    <td>false</td>
    <td>any</td>
    <td>any - allows any value. number - allow only numbers.</td>
    <td>Working</td>
  </tr>
  <tr>
    <td>secure</td>
    <td>Boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Change input type to password.</td>
    <td>Working</td>
  </tr>  
  <tr>
    <td>inputClass</td>
    <td>String</td>
    <td>-</td>
    <td>-</td>
    <td>Add class to input tag.</td>
    <td>TODO</td>
  </tr>  
  <tr>
    <td>rootClass</td>
    <td>String</td>
    <td>-</td>
    <td>-</td>
    <td>Add class to Root Div.</td>
    <td>TODO</td>
  </tr>  
</table>
