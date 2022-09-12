import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Calendar from '../src';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Calendar',
  component: Calendar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    value: { control: 'date' },
    onChange: { action: 'change' },
  },
} as ComponentMeta<typeof Calendar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Calendar> = (args) => <Calendar {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  value: new Date(),
  locale: 'en-US',
};
