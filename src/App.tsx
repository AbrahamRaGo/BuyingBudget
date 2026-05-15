import BudgetForm from "./components/BudgetForm";
import { BudgetTracker } from "./components/BudgetTracker";
import ExpenseList from "./components/ExpenseList";
import ExpenseModal from "./components/ExpenseModal";
import { useBudgetStore } from "./store";

function App() {
  const { budget, resetApp } = useBudgetStore();
  return (
    <>
      <header className="bg-blue-800 text-center md:flex md:justify-between">
        <h1 className="text-white p-3 text-4xl font-bold">Buying Budget</h1>
        <button
          onClick={() => resetApp()}
          className=" cursor-pointer text-white bg-rose-400 hover:bg-rose-500 rounded-md m-3 p-2 font-bold"
        >
          Reiniciar presupuesto
        </button>
      </header>

      {budget > 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-10 m-5 md:max-w-xl mx-auto w-11/12">
          <BudgetTracker />
          <ExpenseList />
          <ExpenseModal />
        </div>
      ) : (
        <BudgetForm />
      )}
    </>
  );
}

export default App;
