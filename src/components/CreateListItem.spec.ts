import { shallowMount, type VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect } from 'vitest';
import CreateListItem from './CreateListItem.vue';
import { it } from 'vitest';

describe('CreateListItem', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(CreateListItem);
  });

  it('renders the input and button components', () => {
    expect(wrapper.find('[data-test="list-item-title-input"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="create-new-list-item-button"]').exists()).toBe(true);
  });

  it('emits a `create` event with the item title of the to-be-created item', async () => {
    const newListItemTitle = 'A list item title';

    await wrapper.get('[data-test="list-item-title-input"]').setValue(newListItemTitle);
    await wrapper.get('[data-test="create-new-list-item-button"]').trigger('click');

    const emittedEvent = wrapper.emitted();

    expect(emittedEvent).toHaveProperty('create');
  });

  it('clears the input after the button is clicked', async () => {
    const newListItemTitle = 'A list item title';
    const inputElement = wrapper.get<HTMLInputElement>('[data-test="list-item-title-input"]');

    await inputElement.setValue(newListItemTitle);
    await wrapper.get('[data-test="create-new-list-item-button"]').trigger('click');

    expect(inputElement.element.value).toBe('');
  });
});
