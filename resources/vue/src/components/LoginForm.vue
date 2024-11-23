<script setup lang="ts">
  import type { AxiosError } from "axios";
  import { FormField } from "@/components/ui/form";
  import { loadLanguageAsync } from "@/i18n";
  import AuthService from "@/service/public/auth-service";
  import { toTypedSchema } from "@vee-validate/zod";
  import { useForm } from "vee-validate";
  import * as z from "zod";

  const { setToken } = useUserStore();
  const router = useRouter();

  const zodSchema = z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
    });

  type FormValues = z.infer<typeof zodSchema>;
  const formSchema = toTypedSchema(zodSchema);
  const form = useForm({
    validationSchema: formSchema,
  });

  const loading = ref(false);

  async function onSubmit(values: FormValues) {
    loading.value = true;
    try {
      const { data } = await AuthService.login(values);
      setToken(data.access_token);
      router.push("/");
    } catch (error: any) {
      const { errors } = error.response.data;
      form.setErrors(errors);
    }
    loading.value = false;
  }

  const handleFormSubmit = form.handleSubmit(onSubmit);
</script>

<template>
  <AppForm :form="form" :loading="loading" @submit="handleFormSubmit">
    <div class="flex flex-col gap-2">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>{{ $t("label.email") }}</FormLabel>
          <FormControl>
            <Input type="text" placeholder="example@gmail.com" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>{{ $t("label.password") }}</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <template #actions>
      <Button class="w-full mt-6" :loading="loading" :disabled="loading || !form.meta.value.valid">
        {{ $t('button.login') }}
      </Button>
    </template>
  </AppForm>
</template>
