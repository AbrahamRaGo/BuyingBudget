import { useMemo } from "react";
import ExpenseDetail from "./ExpenseDetail";
import { useBudgetStore } from "../store";

function ExpenseList() {
  const { items } = useBudgetStore();
  const isEmpty = useMemo(() => items.length === 0, [items]);
  return (
    <div className="mt-10 overflow-scroll max-h-100">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold">No hay gastos</p>
      ) : (
        <>
          {items.map((item) => (
            <ExpenseDetail key={item.id} item={item} />
          ))}
        </>
      )}
    </div>
  );
}

export default ExpenseList;
