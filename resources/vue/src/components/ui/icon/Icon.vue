<script setup lang="ts">
  import type { AArrowDown } from "lucide-vue-next";
  import tailwindConfig from "@/../../../tailwind.config";
  import { cn } from "@/lib/utils";
  import { icons } from "lucide-vue-next";
  import { computed } from "vue";

  type IconColor = typeof _iconColors[number];

  interface IconProps {
    name: keyof typeof icons;
    color?: IconColor;
    currentColor?: boolean;
    size?: string;
    class?: string;
  }

  const props = withDefaults(defineProps<IconProps>(), {
    currentColor: true,
    size: "4",
  });

  const _iconColors = Object.keys(tailwindConfig.theme.extend.textColor)
    .filter(color => color.startsWith("icon-"))
    .map(color => color.replace("icon-", ""));

  const IconComponent = computed<typeof AArrowDown | null>(() => props.name ? icons[props.name] : null);
</script>

<template>
  <component
    :is="IconComponent"
    :class="cn(
      'shrink-0',
      !props.currentColor ? ' ' : `text-icon-${props.color} hover:text-icon-${props.color}-hover active:text-icon-${props.color}-active disabled:text-icon-${props.color}-disabled`,
      props.class)"
    :height="Number(size) * 4"
    :width="Number(size) * 4"
  />
</template>
