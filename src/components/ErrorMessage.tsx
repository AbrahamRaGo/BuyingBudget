import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function ErrorMessage({ children }: Props) {
  return (
    <p className="bg-red-600 font-bold p-2 text-white text-sm text-center">
      {children}
    </p>
  );
}

export default ErrorMessage;
