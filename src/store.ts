import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import type { DraftItem, Item } from "./types";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
type BudgetState = {
  budget: number;
  items: Item[];
  modal: boolean;
  activeId: Item["id"];
  showModal: () => void;
  closeModal: () => void;
  setBudget: (amount: number) => void;
  addItem: (item: DraftItem) => void;
  deleteItem: (id: Item["id"]) => void;
  setActiveId: (id: Item["id"]) => void;
  updateItem: (item: Item) => void;
  resetApp: () => void;
};

const createItem = (item: DraftItem): Item => {
  return {
    ...item,
    id: uuidv4(),
    subtotal: item.quantity * item.price,
    total: item.taxable
      ? item.quantity * item.price * 1.0825
      : item.quantity * item.price,
  };
};

const calcTotals = (item: Item): Item => {
  return {
    ...item,
    subtotal: item.quantity * item.price,
    total: item.taxable
      ? item.quantity * item.price * 1.0825
      : item.quantity * item.price,
  };
};

export const useBudgetStore = create<BudgetState>()(
  devtools(
    persist(
      (set) => ({
        budget: 0,
        items: [],
        modal: false,
        activeId: "",
        closeModal() {
          set((state) => ({
            ...state,
            activeId: "",
            modal: false,
          }));
        },
        showModal() {
          set((state) => ({
            ...state,
            modal: true,
          }));
        },
        setBudget(amount) {
          set((state) => ({
            ...state,
            budget: amount,
          }));
        },
        addItem(item) {
          set((state) => ({
            ...state,
            items: [...state.items, createItem(item)],
            modal: false,
          }));
        },
        deleteItem(id) {
          set((state) => ({
            ...state,
            items: state.items.filter((it) => it.id !== id),
          }));
        },
        setActiveId(id) {
          set((state) => ({
            ...state,
            activeId: id,
            modal: !state.modal,
          }));
        },
        updateItem(item) {
          set((state) => ({
            ...state,
            items: state.items.map((it) =>
              it.id === item.id ? calcTotals(item) : it,
            ),
            activeId: "",
            modal: false,
          }));
        },
        resetApp() {
          set(() => ({
            budget: 0,
            items: [],
          }));
        },
      }),
      {
        name: "budget-storage",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);
