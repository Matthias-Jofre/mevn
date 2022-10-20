<template>
  <ul class="list-group">
    <li
      v-for="(task, index) in tasks"
      style="cursor: pointer"
      :key="index"
      @click="$router.push(`/task/${task._id}`)"
      class="list-group-item list-group-item-action"
    >
      {{ index + 1 }}.
      {{ task.title }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { getTasks } from "@/services/TaskService";
import { Task } from "@/interfaces/Task";

export default defineComponent({
  data() {
    return {
      tasks: [] as Task[],
    };
  },
  methods: {
    async loadTask() {
      const res = await getTasks();
      this.tasks = res.data;
    },
  },
  mounted() {
    this.loadTask();
  },
});
</script>