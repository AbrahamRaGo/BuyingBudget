import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useBudgetStore } from "../store";
import type { DraftItem } from "../types";
import ErrorMessage from "./ErrorMessage";

function ExpenseForm() {
  const initialItem = {
    name: "",
    price: 0,
    quantity: 1,
    taxable: false,
    wicApproved: false,
  };
  const [error, setError] = useState("");
  const { items, addItem, updateItem, activeId } = useBudgetStore();
  const [item, setItem] = useState<DraftItem>(initialItem);

  useEffect(() => {
    if (activeId !== "") {
      const activeItem = items.filter((it) => it.id === activeId)[0];
      setItem(activeItem);
    }
  }, [activeId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value,
    });
  };
  const handleChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: +value,
    });
  };

  const handleChangeCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: !!value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(item).includes("")) {
      setError("Ningun campo puede estar vacio");
      return;
    }
    if (activeId) {
      updateItem({ ...item, id: activeId, total: 0, subtotal: 0 });
    } else {
      addItem(item);
    }
    setItem(initialItem);
  };
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        Agregar articulo
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-lg">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Escribe el nombre del articulo"
          className="bg-slate-100 p-2 rounded-md"
          onChange={handleChange}
          value={item.name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="price" className="text-lg">
          Precio
        </label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Escribe el precio del articulo"
          className="bg-slate-100 p-2 rounded-md"
          onChange={handleChangeNumber}
          value={item.price}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="quantity" className="text-lg">
          Cantidad:
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          placeholder="Escribe la cantidad"
          className="bg-slate-100 p-2 rounded-md"
          onChange={handleChangeNumber}
          value={item.quantity}
        />
      </div>

      <div className="flex items-center mb-4 justify-around">
        <div className="flex items-center">
          <label htmlFor="taxable" className="ms-2 text-lg">
            Taxable:
          </label>
          <input
            type="checkbox"
            id="taxable"
            name="taxable"
            className="w-6 h-6 text-blue-600 bg-gray-100 ml-2 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
            onChange={handleChangeCheck}
            checked={item.taxable}
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="wicApproved" className="ms-2 text-lg">
            Wic:
          </label>
          <input
            type="checkbox"
            id="wicApproved"
            name="wicApproved"
            className="w-6 h-6 text-blue-600 bg-gray-100 ml-2 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
            onChange={handleChangeCheck}
            checked={item.wicApproved}
          />
        </div>
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value="Guardar articulo"
      />
    </form>
  );
}

export default ExpenseForm;
