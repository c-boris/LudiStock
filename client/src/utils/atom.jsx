// atom.jsx
import { atom } from "jotai";

export const userAtom = atom({
  email: "",
  id: "",
  isLoggedIn: false,
  username: "",
});
