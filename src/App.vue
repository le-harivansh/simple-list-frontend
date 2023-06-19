<script setup lang="ts">
import { reactive } from 'vue';
import ListItem from './components/ListItem.vue';
import { ListItem as Item } from './models/list-item';

const listItems: Item[] = reactive([
  new Item(1, 'Item no. 1'),
  new Item(2, 'Item no. 2'),
  new Item(3, 'Item no. 3'),
  new Item(4, 'Item no. 4'),
  new Item(5, 'Item no. 5'),
]);

function deleteItemWithId(id: number) {
  console.log(`deleting item: ${id}`);
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
