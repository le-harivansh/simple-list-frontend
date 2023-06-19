<script setup lang="ts">
import type { ListItem } from '../models/list-item';

defineProps<{ item: ListItem }>();
defineEmits<{ ( event: 'delete', id: number ): void }>()
</script>

<template>
  <div class="p-1 flex border-2 border-cyan-400 rounded-md">
    <p class="flex-1">{{ item.title }}</p>

    <button @click="$emit('delete', item.id)">Delete</button>
  </div>
</template>
