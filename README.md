# devtool-devices

Devices info from [devtools-frontend](https://github.com/ChromeDevTools/devtools-frontend)for mocking, exported from [devtools/frontend/.../EmulatedDevices](https://raw.githubusercontent.com/ChromeDevTools/devtools-frontend/main/front_end/models/emulation/EmulatedDevices.ts).

## Usage

### Installation

```sh
npm i devtools-devices
```

Then

```js
import { devices } from 'devtools-devices'

console.log(devices[0])

// {
//     "order": 10,
//     "show-by-default": true,
//     "title": "iPhone SE",
//     "screen": {
//       "horizontal": {
//         "width": 667,
//         "height": 375
//       },
//       "device-pixel-ratio": 2,
//       "vertical": {
//         "width": 375,
//         "height": 667
//       }
//     },
//     "capabilities": [
//       "touch",
//       "mobile"
//     ],
//     "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
//     "type": "phone"
// }
```

## Thanks

- [devtools-frontend](https://github.com/ChromeDevTools/devtools-frontend)
