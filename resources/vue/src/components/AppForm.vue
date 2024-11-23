<script setup lang="ts">
  import type { FormContext } from "vee-validate";
  import { Button } from "@/components/ui/button";

  interface AppFormProps {
    form: FormContext<any>;
    loading?: boolean;
  }

  interface AppFormEmits {
    (event: "submit"): Promise<void>;
    (event: "cancel"): void;
  }

  const props = defineProps<AppFormProps>();
  const emit = defineEmits<AppFormEmits>();
  const slots = defineSlots<{
    default: object;
    actions?: object;
  }>();

  function onSubmit() {
    emit("submit");
  }

  function onCancel() {
    emit("cancel");
  }
</script>

<template>
  <form @submit.prevent="onSubmit">
    <slot />
    <div v-if="!slots.actions" class="fixed inset-x-0 bottom-0 flex w-full flex-1 items-center justify-between border-t bg-white p-4 dark:bg-[#121212] lg:sticky">
      <Button variant="destructive" secondary @click="onCancel">
        {{ $t('button.cancel') }}
      </Button>
      <Button
        :disabled="!props.form.meta.value.dirty"
        :loading="loading"
        variant="main"
        type="submit"
      >
        {{ $t('button.submit') }}
      </Button>
    </div>
    <slot name="actions" />
  </form>
</template>
