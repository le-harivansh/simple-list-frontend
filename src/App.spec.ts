import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { ListItem as Item } from './models/list-item';
import ListItem from './components/ListItem.vue';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils';
import App from './App.vue';
import CreateListItem from './components/CreateListItem.vue';
import EditListItem from './components/EditListItem.vue';
import { nextTick } from 'vue';

describe('App', () => {
  const items: Item[] = [new Item(1, 'One'), new Item(2, 'Two'), new Item(3, 'Three')];

  const server = setupServer(
    rest.get('/items', (_, response, context) =>
      response(context.status(200), context.json(items))
    ),
    rest.post('/item', async (request, response, context) => {
      const { title } = await request.json<{ title: string }>();

      return response(context.status(201), context.json(new Item(1, title)));
    }),
    rest.put('/item', async (request, response, context) => {
      const item = await request.json<Item>();

      return response(context.status(200), context.json(item));
    }),
    rest.delete('/item/:id', (_, response, context) => response(context.status(204)))
  );

  let wrapper: VueWrapper;

  beforeAll(() => {
    server.listen();
  });

  beforeEach(async () => {
    wrapper = mount(App);

    await flushPromises();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('loads all the items from the server', () => {
    items.forEach((item) =>
      expect(wrapper.get('[data-test="list-items"]').text()).toContain(item.title)
    );
  });

  it('displays only the CreateListItem component in "normal" mode', () => {
    expect(wrapper.findComponent(CreateListItem).exists()).toBe(true);
  });

  it('creates a new item when the `create` event is received on the CreateListItem component', async () => {
    const newItemTitle = '-- A new item title --';
    wrapper.getComponent(CreateListItem).vm.$emit('create', newItemTitle);

    await flushPromises();

    expect(wrapper.get('[data-test="list-items"]').text()).toContain(newItemTitle);
  });

  it('goes into "edit" mode when the `edit` event is received by the ListItem component', async () => {
    const itemToEdit = items[2];

    wrapper
      .getComponent<typeof ListItem>(`[data-test=list-item-${itemToEdit.id}`)
      .vm.$emit('edit', itemToEdit.id);

    await flushPromises();

    // the `edit` component should be visible
    expect(wrapper.findComponent(EditListItem).exists()).toBe(true);
    // the `create` component shoud not be visible
    expect(wrapper.findComponent(CreateListItem).exists()).toBe(false);
  });

  it('updates an existing item when the `update` event is received on the CreateListItem component', async () => {
    const { id: idOfItemToUpdate, title: oldItemTitle } = items[0];
    const updatedItemTitle = 'This is a new title';

    wrapper
      .getComponent<typeof ListItem>(`[data-test=list-item-${idOfItemToUpdate}`)
      .vm.$emit('edit', idOfItemToUpdate);

    await nextTick();

    wrapper
      .getComponent(EditListItem)
      .vm.$emit('update', new Item(idOfItemToUpdate, updatedItemTitle));

    await flushPromises();

    expect(wrapper.get('[data-test="list-items"]').text()).toContain(updatedItemTitle);
    expect(wrapper.get('[data-test="list-items"]').text()).not.toContain(oldItemTitle);
  });

  it('deletes an item when the `delete` event is received on the ListItem component', async () => {
    const { id: idOfItemToDelete, title: titleOfItemToDelete } = items[0];

    wrapper
      .getComponent<typeof ListItem>(`[data-test=list-item-${idOfItemToDelete}`)
      .vm.$emit('delete', idOfItemToDelete);

    await flushPromises();

    expect(wrapper.get('[data-test="list-items"]').text()).not.toContain(titleOfItemToDelete);
  });
});
