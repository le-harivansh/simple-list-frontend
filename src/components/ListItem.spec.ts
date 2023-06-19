import { describe, it, expect, beforeEach } from 'vitest';

import { VueWrapper, shallowMount } from '@vue/test-utils';
import ListItem from './ListItem.vue';
import { ListItem as Item } from '../models/list-item';

describe('ListItem', () => {
  const item = new Item(1, 'Hello, item!');
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ListItem, { props: { item } });
  });

  it('renders properly', () => {
    expect(wrapper.text()).toContain(item.title);
  });

  it('emits the `edit` event with the item-id from its props', async () => {
    await wrapper.get('[data-test="list-item-edit-button"]').trigger('click');

    const emittedEvent = wrapper.emitted();

    expect(emittedEvent).toHaveProperty('edit');
    expect(emittedEvent.edit[0]).toEqual([item.id]);
  });

  it('emits the `delete` event with the item-id from its props', () => {
    wrapper.get('[data-test="list-item-delete-button"]').trigger('click');

    const emittedEvent = wrapper.emitted();

    expect(emittedEvent).toHaveProperty('delete');
    expect(emittedEvent.delete[0]).toEqual([item.id]);
  });
});
