<script setup lang="ts">
  import type { ButtonHTMLAttributes } from "vue";
  import { Icon } from "@/components/ui/icon";
  import Spinner from "@/components/ui/Spinner.vue";
  import { cn } from "@/lib/utils";
  import { icons } from "lucide-vue-next";
  import { Primitive, type PrimitiveProps } from "radix-vue";
  import { computed } from "vue";
  import { type ButtonVariants, buttonVariants, IconSize } from ".";

  export interface ButtonProps extends PrimitiveProps, /* @vue-ignore */ ButtonHTMLAttributes {
    as?: keyof HTMLElementTagNameMap;
    asChild?: boolean;
    loading?: boolean;
    loadingText?: string;
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    icon?: keyof typeof icons;
    iconPosition?: ButtonVariants["iconPosition"];
    class?: string;
    label?: string;
  }

  const props = withDefaults(defineProps<ButtonProps>(), {
    as: "button",
    asChild: false,
    loading: false,
    iconPosition: "default",
    label: "Button",
  });
  defineSlots<{
    default: (props: object) => any;
  }>();

  const shouldHideText = computed(() => props.iconPosition === "default" && props.icon);
</script>

<template>
  <Primitive
    :class="cn(buttonVariants({ variant, size, icon: loading ? 'Album' : icon, iconPosition: loading ? 'prefix' : iconPosition }), props.class)"
    :as="as"
    :as-child="asChild"
  >
    <Icon v-if="icon && iconPosition === 'prefix' && !loading" :name="icon as keyof typeof icons" :size="IconSize({ size })" />
    <template v-if="!loading && !shouldHideText">
      <slot name="default">
        {{ label }}
      </slot>
    </template>
    <Icon v-if="icon && iconPosition === 'suffix' && !loading" :name="icon as keyof typeof icons" :size="IconSize({ size })" />
    <Icon v-if="icon && iconPosition === 'default' && !loading" :name="icon as keyof typeof icons" :size="IconSize({ size })" />
    <template v-if="loading">
      <Spinner :size="IconSize({ size })" />
      <span v-if="loadingText">{{ loadingText }}</span>
      <template v-else>
        <slot name="default">
          {{ label }}
        </slot>
      </template>
    </template>
  </Primitive>
</template>
