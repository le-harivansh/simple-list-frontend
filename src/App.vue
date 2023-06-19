<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted, reactive, ref, type Ref } from 'vue';
import ListItem from './components/ListItem.vue';
import { ListItem as Item } from './models/list-item';
import CreateListItem from './components/CreateListItem.vue';
import EditListItem from './components/EditListItem.vue';

const listItems: Item[] = reactive([]);

const currentlyEditingListItemId: Ref<number | null> = ref(null);
const currentlyEditingListItem = computed(
  () =>
    listItems.find(({ id: itemId }) => itemId === currentlyEditingListItemId.value) ||
    new Item(0, '')
);

onMounted(async () => {
  const { data: retrievedItems } = await axios.get<Item[]>('/items');

  retrievedItems.forEach((item) => listItems.push(item));
});

async function deleteItem(id: number) {
  await axios.delete(`/item/${id}`);

  listItems.splice(
    listItems.findIndex(({ id: itemId }) => itemId === id),
    1
  );
}

async function createNewItem(title: string) {
  const { data: newItem } = await axios.post<Item>('/item', { title });

  listItems.push(newItem);
}

function editItem(id: number) {
  currentlyEditingListItemId.value = id;
}

function cancelEdit() {
  currentlyEditingListItemId.value = null;
}

async function updateListItem(item: Item) {
  const { data: updatedItem } = await axios.put<Item>('/item', item);

  listItems.splice(
    listItems.findIndex(({ id: itemId }) => itemId === updatedItem.id),
    1,
    updatedItem
  );

  currentlyEditingListItemId.value = null;
}
</script>

<template>
  <div class="w-screen h-screen flex justify-center py-8 bg-slate-100">
    <div class="p-2 w-1/3 flex flex-col bg-white shadow-md rounded-xl">
      <h1 class="text-red-500 text-3xl font-display text-center">Simple List</h1>

      <main class="pt-4 grow flex flex-col">
        <div class="grow flex flex-col space-y-2">
          <ListItem
            v-for="item in listItems"
            :key="item.id"
            :item="item"
            @edit="editItem"
            @delete="deleteItem"
          />
        </div>

        <CreateListItem
          v-if="currentlyEditingListItemId === null"
          class="pt-4"
          @create="createNewItem"
        />
        <EditListItem
          v-else
          :item="currentlyEditingListItem"
          class="pt-4"
          @update="updateListItem"
          @cancel="cancelEdit"
        />
      </main>
    </div>
  </div>
</template>
