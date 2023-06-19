import { shallowMount, type VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import EditListItem from './EditListItem.vue';
import { ListItem } from '../models/list-item';

describe('EditListItem', () => {
  const listItemToUpdate = new ListItem(1, 'A list item');
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(EditListItem, { props: { item: listItemToUpdate } });
  });

  it('renders the input and button components', () => {
    expect(wrapper.find('[data-test="list-item-title-input"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="list-item-update-button"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="list-item-cancel-update-button"]').exists()).toBe(true);
  });

  it('emits an `update` event with the data of the item to be updated', async () => {
    const updatedListItemTitle = 'An updated list item title';

    await wrapper.get('[data-test="list-item-title-input"]').setValue(updatedListItemTitle);
    await wrapper.get('[data-test="list-item-update-button"]').trigger('click');

    const emittedEvent = wrapper.emitted();

    expect(emittedEvent).toHaveProperty('update');
    expect(emittedEvent.update[0]).toEqual([
      { id: listItemToUpdate.id, title: updatedListItemTitle },
    ]);
  });

  it('clears the input after the button is clicked', async () => {
    const listItemInputElement = wrapper.get<HTMLInputElement>(
      '[data-test="list-item-title-input"]'
    );

    await listItemInputElement.setValue('A new title');
    await wrapper.get('[data-test="list-item-update-button"]').trigger('click');

    expect(listItemInputElement.element.value).toBe('');
  });

  it('emits a `cancel` event when the cancel button is clicked', async () => {
    await wrapper.get('[data-test="list-item-cancel-update-button"]').trigger('click');

    const emittedEvent = wrapper.emitted();

    expect(emittedEvent).toHaveProperty('cancel');
  });
});
