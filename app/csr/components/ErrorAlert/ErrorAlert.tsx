import { PropsWithChildren } from "react";

export const ErrorAlert = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <div className="flex justify-center items-center">
      <p className="font-bold text-red-500">{children}</p>
    </div>
  );
};
