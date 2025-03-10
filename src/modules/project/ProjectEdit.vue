<script lang="ts" setup>
import { Select } from "primevue";
import { Dialog } from "primevue";
import { Button } from "primevue";
import { Message } from "primevue";
import { Textarea } from "primevue";
import { InputText } from "primevue";
import { Form } from "@primevue/forms";
import { Status } from "@core/enums/Status";
import { Priority } from "@core/enums/Priority";
import type { Project } from "@core/models/Project";
import { useProjectStore } from "@core/stores/project/useProjectStore";
import { EditProjectSchema } from "@core/schemas/project/EditProjectSchema";

const props = defineProps<{
  project: Project;
  visible: boolean;
}>();

let record = props.project;
const store = useProjectStore();

const priority = [Priority.High, Priority.Mid, Priority.Low];
const status = [Status.Completed, Status.Pending, Status.Progress];

const onSubmit = (payload: any) => {
  const { name, title, description, status, priority } = payload.values;
  record = { ...record, name, title, description, status, priority };
  store.update(record);
  emit('update:visible');
};

const emit = defineEmits(["update:visible"]);
</script>

<template>
  <Dialog :visible="visible" @update:visible="emit('update:visible', $event)" modal header="Editar proyecto"
    class="w-[800px]">
    <Form v-slot="$form" :resolver="EditProjectSchema" @submit="onSubmit" :initial-values="project"
      class="flex flex-col gap-4">

      <div class="flex gap-6">
        <div class="flex-1">
          <InputText name="name" type="text" placeholder="Nombre" fluid />
          <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">
            {{ $form.name.error.message }}
          </Message>
        </div>

        <div class="flex-1">
          <InputText name="title" type="text" placeholder="Titulo" fluid />
          <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">
            {{ $form.title.error.message }}
          </Message>
        </div>
      </div>

      <div>
        <Textarea name="description" placeholder="Descripción" rows="5" style="resize: none;" fluid />
        <Message v-if="$form.description?.invalid" severity="error" size="small" variant="simple">
          {{ $form.description.error.message }}
        </Message>
      </div>

      <div class="flex gap-6">
        <div class="flex-1">
          <Select name="status" placeholder="Seleccionar Status" :options="status" fluid />
          <Message v-if="$form.status?.invalid" severity="error" size="small" variant="simple">
            {{ $form.status.error.message }}
          </Message>
        </div>

        <div class="flex-1">
          <Select name="priority" placeholder="Seleccionar Prioridad" :options="priority" fluid />
          <Message v-if="$form.priority?.invalid" severity="error" size="small" variant="simple">
            {{ $form.priority.error.message }}
          </Message>
        </div>
      </div>

      <Button type="submit" severity="secondary" label="Guardar" />
    </Form>
  </Dialog>
</template>