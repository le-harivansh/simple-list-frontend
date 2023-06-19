<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import ListItem from './components/ListItem.vue';
import { ListItem as Item } from './models/list-item';
import CreateListItem from './components/CreateListItem.vue';

const listItems: Item[] = reactive([]);

onMounted(async () => {
  const { data: retrievedItems } = await axios.get<Item[]>('/items');

  retrievedItems.forEach((item) => listItems.push(item));
})

async function deleteItemWithId(id: number) {
  await axios.delete(`/item/${id}`);

  listItems.splice(listItems.findIndex(({ id: itemId }) => itemId === id), 1);
}

async function createNewItem(title: string) {
  const { data: newItem } = await axios.post<Item>('/item', { title })

  listItems.push(newItem);
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
            @delete="deleteItemWithId"
          />
        </div>

        <CreateListItem class="pt-4" @create="createNewItem" />
      </main>
    </div>
  </div>
</template>
