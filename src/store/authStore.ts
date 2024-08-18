import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Define the state interface
interface AuthState {
  user: any;
  setUser: (user: any) => void;
}

// Create the store with persist middleware
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {},
      setUser: (user) => {
        set(() => ({ user: "fucking user" }));
      },
    }),
    {
      name: "auth-storage", // unique name for the storage
      storage: createJSONStorage(() => sessionStorage), // (optional) defaults to localStorage
    },
  ),
);

export default useAuthStore;
