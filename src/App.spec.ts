import { describe, it } from 'vitest';

describe('App', () => {
  it('loads all the items from the server');
  it('displays only the CreateListItem component in "normal" mode');
  it('creates a new item when the `create` event is received on the CreateListItem component');
  it('goes into "edit" mode when the `edit` event is received by the ListItem component');
  it('displays only the EditListItem component in "edit" mode');
  it(
    'updates an existing item when the `update` event is received on the CreateListItem component'
  );
  it('deletes an item when the `delete` event is received on the ListItem component');
});
