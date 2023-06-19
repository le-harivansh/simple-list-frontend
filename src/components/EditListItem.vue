<script setup lang="ts">
import { ref } from 'vue';
import { ListItem } from '../models/list-item';

const props = defineProps<{ item: ListItem }>();
const emit = defineEmits<{
  (event: 'update', item: ListItem): void;
  (event: 'cancel'): void;
}>();

const itemTitle = ref(props.item.title);

function updateListItem() {
  if (itemTitle.value === '') {
    return;
  }

  emit('update', {
    id: props.item.id,
    title: itemTitle.value,
  });

  itemTitle.value = '';
}

function cancelEdit() {
  emit('cancel');
}
</script>

<template>
  <div class="flex">
    <input
      class="p-1 grow border-2 rounded-md focus:border-cyan-400 focus:outline-none"
      type="text"
      v-model="itemTitle"
      data-test="list-item-title-input"
      @keyup.enter="updateListItem"
    />
    <button
      class="px-2 text-blue-400 hover:text-blue-600"
      @click="updateListItem"
      data-test="list-item-update-button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    </button>
    <button
      class="px-2 text-yellow-400 hover:text-yellow-600"
      @click="cancelEdit"
      data-test="list-item-cancel-update-button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
