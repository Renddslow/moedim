# Moedim

> A light-weight, localizable and customizable, styled React calendar component.

<img width="250" alt="image" src="https://user-images.githubusercontent.com/12091479/189707811-b1461c9a-2d20-4389-bd25-2e84321b9442.png">


## Getting Started

```shell
npm i -s moedim

yarn add moedim
```

If your project doesn't already have [styled-components](https://styled-components.com/) installed, make sure you install that too. You'll need it.

## Usage

```jsx
import React, { useState } from 'react';
import Calendar from 'moedim';

const App = () => (
  const [value, setValue] = useState(new Date())

  <Calendar value={value} onChange={(d) => setValue(d)} />
)
```

## API

The Calendar component takes only three props:

- `value` - The currently selected date. This must be a `Date` object.
- `onChange` - A callback function that will be called when the user selects a new date. The callback will be passed a `Date` object.
- `locale` - The locale to use for the calendar. Locale will drive everything displayed, from the order of weekdays, to what weekdays are called. Defaults to `en-US`.

### Styling

Moedim uses [styled-components](https://styled-components.com/) for styling. The main wrapping container (which has a border and some padding) is the target of the `classNames` prop which will allow you to wrap the component with styled-components.

One color is exposed as a CSS variable called `--moedim-primary` which is set on the container and can therefore be overridden through styled-components. The default value of `--moedim-primary` is `#1a73e8` and colors the border of focused dates and the background of selected dates.

```jsx
const StyledCalendar = styled(Calendar)`
  --moedim-primary: #f00;
`;
```

All font families are set to `inherit` so while you can override them directly by wrapping the styled component, most situations should find the Calendar component adopting your application's font family.
