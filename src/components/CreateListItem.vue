<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{ (event: 'create', title: string): void }>();

const itemTitle = ref('');

function createNewListItem() {
  if (itemTitle.value === '') {
    return;
  }

  emit('create', itemTitle.value);

  itemTitle.value = '';
}
</script>

<template>
  <div class="flex">
    <input
      class="p-1 grow border-2 rounded-md focus:border-cyan-400 focus:outline-none"
      type="text"
      v-model="itemTitle"
      @keyup.enter="createNewListItem"
    />
    <button
      class="px-2 text-blue-400 hover:text-blue-600 transition-transform duration-300 hover:rotate-90"
      @click="createNewListItem"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
  </div>
</template>
