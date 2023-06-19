import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import ListItem from '../ListItem.vue';
import { ListItem as Item } from '../../models/list-item';

describe('ListItem', () => {
  it('renders properly', () => {
    const item = new Item(1, 'Hello, item!');
    const wrapper = mount(ListItem, { props: { item } });
    expect(wrapper.text()).toContain(item.title);
  });
});
