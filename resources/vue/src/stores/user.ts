import type { User } from "@/models/user";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref<User>();
  const accessToken = useStorage("access_token", "");

  function setUser(newUser: User) {
    user.value = newUser;
  }

  function setToken(token: string) {
    accessToken.value = token;
  }

  return {
    user,
    accessToken,
    setUser,
    setToken,
  };
});
