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

| Name | Type | Required | Default | Description | Status |
| -- | -- | -- | -- | -- | -- |
| OTPLength | number | false | 4 | Number of input boxes. | Working |
| onChange | function | **true** | - | Returns OTP code typed in inputs. | Working |
| value | string / number | **true** | '' | The value of the otp passed into the component. | Working |
| disabled | boolean | false | false | Disables all the inputs. | Working |
| autoFocus | boolean | false | false | Auto focuses input on inital page load. | Working |
| otpType | Enum: (`any\|number\|alpha\|alphanumeric`)  | false | any | (`any`) - allows any value. (`number`) - allow only numbers. alpha - allows only (`a-zA-Z`). alphanumeric - allows (`0-9a-zA-z`) | Working |
| secure | Boolean | false | false | Change input type to password. | Working |
| inputClassName | String | - | - | Class for root element. | Working |
| className | String | - | - | Class for root element. | Working |
| inputStyles | Object | - | - | Styles for input element. | Working |
| style | Object | - | - | Styles for root element. | Working |

### Contributing

Feel Free to contributing or feture request

1. Fork it ( https://github.com/shubhanus/otp-input-react/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new pull request.
