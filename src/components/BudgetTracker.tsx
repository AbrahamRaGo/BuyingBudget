import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AmountDisplay from "./AmountDisplay";
import { useBudgetStore } from "../store";
import { useMemo } from "react";

export const BudgetTracker = () => {
  const { budget, items } = useBudgetStore();
  const totalExpense = useMemo(
    () =>
      items.reduce(
        (total, item) => (!item.wicApproved ? total + item.total : total),
        0,
      ),
    [items],
  );

  const wicTotal = useMemo(
    () =>
      items.reduce(
        (total, item) => (item.wicApproved ? total + item.total : total),
        0,
      ),
    [items],
  );

  const available = budget - totalExpense;
  const percentage = +((totalExpense / budget) * 100).toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center max-h-40 md:max-h-96">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: percentage >= 100 ? "#dc2626" : "#3b82f6",
            trailColor: "#f5f5f5",
            textSize: 8,
            textColor: percentage >= 100 ? "#dc2626" : "#3b82f6",
          })}
          text={`${percentage}% Gastado`}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <AmountDisplay label="Presupuesto" amount={budget} />
        <AmountDisplay label="Disponible" amount={available} />
        <div className="flex gap-3 justify-items-center">
          <AmountDisplay label="Gastado" amount={totalExpense} />
          <AmountDisplay label="Wic" amount={wicTotal} />
        </div>
      </div>
    </div>
  );
};
