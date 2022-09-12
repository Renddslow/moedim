# Moedim

> A small React package for picking a single date from a calendar.

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
