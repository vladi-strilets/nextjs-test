export const logRender = (component: string) => {
  if (typeof window === "undefined") {
    console.log(`${component}: Server-Side render`);
  } else {
    console.log(`${component}: Client-Side render`);
  }
};
