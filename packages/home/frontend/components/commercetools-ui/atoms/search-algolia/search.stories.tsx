import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Search from '.';

export default {
  title: 'Components/Atoms/Search Algolia',
  component: Search,
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />;

export const Primary = Template.bind({});
Primary.args = { categories: [] };
