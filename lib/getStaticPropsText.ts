import { getText } from "@lib";

export const getStaticPropsText = (fn: any) => {
  if (typeof fn === "function") {
    return async (...args: any) => {
      const pageProps = await fn(...args);

      return {
        ...pageProps,
        props: {
          ...pageProps?.props,
          text: getText(),
        },
      };
    };
  }

  return Promise.resolve({
    props: {
      text: getText(),
    },
  });
};
