// atom.jsx
import { atom } from "jotai";

const userAtom = atom({
  isLoggedIn: false,
  isAdmin: false,
  email: "",
  username: "",
  id: "",
});

export { userAtom };
