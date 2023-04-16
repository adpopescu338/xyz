import { createContext, useContext } from "react";
import sanitize from "sanitize-html";
import { useEditTextContext } from "./EditTextContext";

const Context = createContext({});

type Props = {
  children: React.ReactNode;
  text: any;
};

export const TextContext = ({ children, text }: Props) => {
  return <Context.Provider value={text}>{children}</Context.Provider>;
};

export const useText = (path: string) => {
  const text = useContext(Context);
  const { setEditTextValues } = useEditTextContext();

  const paths = path.split(".");

  let current: any = text;

  for (let i = 0; i < paths.length; i++) {
    current = current?.[paths?.[i]];
  }

  if (!current) {
    throw new Error(`Text not found for path: ${path}`);
  }

  return {
    t: (subpath: string) => getTextString(subpath, path, current),
    tProps: (subpath: string) => ({
      dangerouslySetInnerHTML: {
        __html: getTextString(subpath, path, current),
      },
      onContextMenu: (e: any) => {
        e.preventDefault();
        setEditTextValues({
          menuOpen: true,
          path: `${path}.${subpath}`,
          text: getTextString(subpath, path, current),
          targetClientX: e.clientX,
          targetClientY: e.clientY,
          targetWidth: e.target.offsetWidth,
        });
      },
    }),
  };
};

const getTextString = (subpath: string, path: string, parentObj: any) => {
  const subpaths = subpath.split(".");

  let curr: any = parentObj;

  for (let i = 0; i < subpaths.length; i++) {
    curr = curr?.[subpaths?.[i]];
  }

  if (!curr) {
    throw new Error(`Text not found for sub path: ${path}.${subpath}`);
  }

  if (typeof curr !== "string") {
    throw new Error(`Text is not a string for sub path: ${path}.${subpath}`);
  }

  return sanitize(curr);
};
