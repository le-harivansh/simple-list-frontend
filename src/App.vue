<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import ListItem from './components/ListItem.vue';
import { ListItem as Item } from './models/list-item';

const listItems: Item[] = reactive([]);

onMounted(async () => {
  const { data: retrievedItems } = await axios.get<Item[]>('/items');

  retrievedItems.forEach((item) => listItems.push(item));
})

async function deleteItemWithId(id: number) {
  await axios.delete(`/item/${id}`);

  listItems.splice(listItems.findIndex(({ id: itemId }) => itemId === id), 1);
}
</script>

<template>
  <div class="w-screen h-screen flex justify-center py-8 bg-slate-100">
    <div class="p-2 w-1/3 bg-white shadow-md rounded-xl">
      <header>
        <h1 class="text-red-500 text-3xl font-display text-center">Simple List</h1>
      </header>

      <main class="pt-4 flex flex-col space-y-2">
        <ListItem
          v-for="item in listItems"
          :key="item.id"
          :item="item"
          @delete="deleteItemWithId"
        />
      </main>
    </div>
  </div>
</template>
