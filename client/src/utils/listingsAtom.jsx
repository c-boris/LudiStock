import { atom } from "jotai";

export const listingsAtom = atom([
  {
    id: 0,
    price: 0,
    title: "",
    description: "",
    user_id: 0,
    age_id: 0,
    state_id: 0,
    category_id: 0,
    category: { id: 0, label: "" },
    state: { id: 0, label: "" },
    age: { id: 0, label: "" },
    created_at: "",
    updated_at: "",
    user: { id: 0, email: "" },
  },
]);
