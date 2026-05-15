import { useState } from "react";
import { useBudgetStore } from "../store";

function BudgetForm() {
  const [amount, setAmount] = useState(0);
  const { setBudget } = useBudgetStore();
  return (
    <>
      <form className="space-y-5 w-11/12 mx-auto">
        <div className="flex flex-col space-y-5">
          <label
            htmlFor="budget"
            className=" text-4xl text-blue-600 font-bold text-center"
          >
            Definir presupuesto
          </label>
          <input
            type="number"
            className="w-full bg-white border rounded-sm border-gray-200 p-2"
            placeholder="Define tu presupuesto"
            name="budget"
            id="budget"
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAmount(e.target.valueAsNumber)
            }
          />
          <input
            type="submit"
            className="bg-blue-600 rounded-sm hover:bg-blue-700 disabled:opacity-10 cursor-pointer w-full p-2 text-white font-black uppercase"
            value="Definir presupuesto"
            onClick={() => setBudget(amount)}
          />
        </div>
      </form>
    </>
  );
}

export default BudgetForm;
