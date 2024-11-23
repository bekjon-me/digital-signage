// @ts-check
import antfu from "@antfu/eslint-config";

export default antfu(
  {
    formatters: true,
    stylistic: {
      quotes: "double",
      semi: true,
      overrides: {
        "curly": ["error", "all"],
        "style/brace-style": ["error", "1tbs", { allowSingleLine: true }],
      },

    },
    vue: {
      overrides: {
        "vue/script-indent": ["error", 2, { baseIndent: 1 }],
        "style/indent": "off",
        "vue/html-self-closing": "off",
        "vue/custom-event-name-casing": ["error", "kebab-case"],
        "vue/no-textarea-mustache": "off",
        "vue/max-attributes-per-line": ["error", {
          singleline: {
            max: 3,
          },
          multiline: {
            max: 1,
          },
        }],
      },

    },
  },
);
