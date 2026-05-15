import { formatCurrency } from "../helpers";

type Props = {
  label?: string;
  amount: number;
};

function AmountDisplay({ label, amount }: Props) {
  return (
    <p className="text-xl md:text-2xl text-blue-800 font-bold">
      {label} {""}
      <span className="font-black text-black">{formatCurrency(amount)}</span>
    </p>
  );
}

export default AmountDisplay;
