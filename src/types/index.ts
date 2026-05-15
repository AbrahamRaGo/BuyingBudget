export type Item = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  taxable: boolean;
  wicApproved: boolean;
  subtotal: number;
  total: number;
};

export type DraftItem = Omit<Item, "id" | "subtotal" | "total">;
