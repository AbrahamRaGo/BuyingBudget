import { formatCurrency } from "../helpers";
import { useBudgetStore } from "../store";
import type { Item } from "../types";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

type Props = {
  item: Item;
};

function ExpenseDetail({ item }: Props) {
  const { deleteItem, setActiveId } = useBudgetStore();
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setActiveId(item.id)}>Actualizar</SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive onClick={() => deleteItem(item.id)}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-gray-50 text-lg shadow-lg p-10 w-full border-b border-gray-200 flex flex-1 items-center">
          <div className="md:flex flex-1 w-full gap-3 items-center">
            <p className="font-bold">{item.quantity}</p>
            <p>{item.name}</p>
            <p className="text-sm md:text-lg">{formatCurrency(item.price)}</p>
          </div>

          {item.wicApproved ? (
            <p className=" text-sm bg-pink-500 mx-3 p-1 text-white rounded-md ">
              wic
            </p>
          ) : (
            ""
          )}
          {item.taxable ? (
            <p className=" text-sm p-1 bg-blue-500 mr-3 text-white rounded-md">
              tax
            </p>
          ) : (
            ""
          )}
          <div className="md:flex flex-none">
            <p className=" mx-3 text-xl text-gray-500 font-bold">
              {formatCurrency(item.subtotal)}
            </p>
            <p className="text-xl font-bold mx-3">
              {formatCurrency(item.total)}
            </p>
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}

export default ExpenseDetail;
