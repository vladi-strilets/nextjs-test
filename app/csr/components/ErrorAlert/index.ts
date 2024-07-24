import dynamic from "next/dynamic";

export const DynamicErrorAlert = dynamic(() =>
  import("./ErrorAlert").then((mod) => mod.ErrorAlert)
);
