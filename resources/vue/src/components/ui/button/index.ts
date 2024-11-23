import config from "@/components/ui/components-config.json";
import { cva, type VariantProps } from "class-variance-authority";
import { icons } from "lucide-vue-next";

export { default as Button } from "./Button.vue";

export const buttonVariants = cva(config.button.root, {
  variants: {
    variant: {
      main: config.button.variant.main,
      destructive: config.button.variant.destructive,
      tertiary: config.button.variant.tertiary,
      secondary: config.button.variant.secondary,
      ghost: config.button.variant.ghost,
      ghostmain: config.button.variant.ghostmain,
      link: config.button.variant.link,
      linkDestructive: config.button.variant.linkdestructive,
    },
    size: {
      default: config.button.size.default,
      sm: config.button.size.sm,
      lg: config.button.size.lg,
    },
    icon: {
      ...Object.keys(icons).reduce((acc: { [key: string]: string }, key) => {
        acc[key] = config.button.icon.root || "";
        return acc;
      }, {}),
    },
    iconPosition: {
      prefix: "",
      suffix: "",
      default: "",
    },
  },
  compoundVariants: [
    {
      iconPosition: "prefix",
      icon: [...Object.keys(icons)],
      size: "sm",
      className: config.button.iconPosition.prefix.small,
    },
    {
      iconPosition: "prefix",
      icon: [...Object.keys(icons)],
      size: "default",
      className: config.button.iconPosition.prefix.default,
    },
    {
      iconPosition: "prefix",
      icon: [...Object.keys(icons)],
      size: "lg",
      className: config.button.iconPosition.prefix.large,
    },
    // suffix cases
    {
      iconPosition: "suffix",
      icon: [...Object.keys(icons)],
      size: "sm",
      className: config.button.iconPosition.suffix.small,
    },
    {
      iconPosition: "suffix",
      icon: [...Object.keys(icons)],
      size: "default",
      className: config.button.iconPosition.suffix.default,
    },
    {
      iconPosition: "suffix",
      icon: [...Object.keys(icons)],
      size: "lg",
      className: config.button.iconPosition.suffix.large,
    },
    // default cases
    {
      iconPosition: "default",
      icon: [...Object.keys(icons)],
      size: "sm",
      className: config.button.iconPosition.default.small,
    },
    {
      iconPosition: "default",
      icon: [...Object.keys(icons)],
      size: "default",
      className: config.button.iconPosition.default.default,
    },
    {
      iconPosition: "default",
      icon: [...Object.keys(icons)],
      size: "lg",
      className: config.button.iconPosition.default.large,
    },
    {
      variant: ["link", "linkDestructive"],
      className: "p-0 text-sm font-medium tracking-0",
    },
  ],
  defaultVariants: {
    variant: "main",
    size: "default",
    iconPosition: "default",
    icon: null,
  },
});

export const IconSize = cva("", {
  variants: {
    size: {
      default: config.button.icon.size.default,
      sm: config.button.icon.size.sm,
      lg: config.button.icon.size.lg,
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
