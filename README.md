# otp-input-react

A fully customizable, one-time password input component for the web built with React functional component.

![NPM](https://img.shields.io/npm/l/otp-input-react?style=flat-square)
[![npm](https://img.shields.io/npm/v/otp-input-react?style=flat-square)](https://badge.fury.io/js/otp-input-react)

[![GIPHY](https://media.giphy.com/media/kbbmyfMT282BIPe8Yq/giphy.gif)](https://shubhanus.github.io/otp-input-react/)

### [Working Demo](https://shubhanus.github.io/otp-input-react/)

## Installation

```
npm install --save otp-input-react
```

## Usage:

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
    <td>Enum: any|number|alpha|alphanumeric </td>
    <td>false</td>
    <td>any</td>
    <td>`any` - allows any value. `number` - allow only numbers. alpha - allows only `a-zA-Z`. alphanumeric - allows `0-9a-zA-z`</td>
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
    <td>inputClassName</td>
    <td>String</td>
    <td>-</td>
    <td>-</td>
    <td>Class for root element.</td>
    <td>Working</td>
  </tr>
  <tr>
    <td>className</td>
    <td>String</td>
    <td>-</td>
    <td>-</td>
    <td>Class for root element.</td>
    <td>Working</td>
  </tr>
  <tr>
    <td>inputStyles</td>
    <td>Object</td>
    <td>-</td>
    <td>-</td>
    <td>Styles for input element.</td>
    <td>Working</td>
  </tr>
  <tr>
    <td>style</td>
    <td>Object</td>
    <td>-</td>
    <td>-</td>
    <td>Styles for root element.</td>
    <td>Working</td>
  </tr>
</table>

### Contributing

Feel Free to contributing or feture request

1. Fork it ( https://github.com/shubhanus/otp-input-react/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new pull request.
