import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useId,
} from "react";
import { Button } from "@mui/material";
import styled from "styled-components";
import { EditDialog } from "@components";
import { useMutation } from "react-query";
import { AdminClient } from "@lib";

const initialValues = {
  menuOpen: false,
  path: "",
  text: "",
  targetClientX: 0,
  targetClientY: 0,
  targetWidth: 0,
  targetHeight: 0,
};

const Context = createContext({
  editTextValues: initialValues,
  setEditTextValues: (values: any) => {},
});

type EditTextValues = {
  menuOpen: boolean;
  path: string; // path to text in json, e.g. "home.title"
  text: string; // text value to edit, e.g. "Hello World" or "<h1>Hello World</h1>"
  targetClientX: number;
  targetClientY: number;
  targetWidth: number;
  targetHeight: number;
};

export const EditTextContext = ({ children }: any) => {
  const [values, setValues] = useState<EditTextValues>(initialValues);

  return (
    <Context.Provider
      value={{
        editTextValues: values,
        setEditTextValues: setValues,
      }}
    >
      {values.menuOpen && (
        <EditTextMenu {...values} closeMenu={() => setValues(initialValues)} />
      )}
      {children}
    </Context.Provider>
  );
};

export const useEditTextContext = () => useContext(Context);

const editTextMenuWidth = 100;
const editTextMenuHeight = 100;

type EditTextMenuStyledProps = {
  left: number;
  top: number;
};

const EditTextMenuStyled = styled.div<EditTextMenuStyledProps>`
  position: absolute;
  width: ${editTextMenuWidth}px;
  height: ${editTextMenuHeight}px;
  background-color: white;
  box-shadow: 0 0 3px black;
  border-radius: 5px;
  left: ${(props: EditTextMenuStyledProps) => props.left}px;
  top: ${(props: EditTextMenuStyledProps) => props.top}px;
  z-index: 99999999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const EditTextMenu = ({
  menuOpen,
  targetClientX,
  targetClientY,
  targetWidth,
  path,
  text,
  closeMenu,
}: EditTextValues & {
  closeMenu: () => void;
}) => {
  const [editorOpen, setEditorOpen] = useState(false);
  const { mutate, isLoading } = useMutation(AdminClient.updateTextByPath);
  const id = useId();
  const id2 = useId();

  useEffect(() => {
    const listener = (e: any) => {
      const p = e.composedPath();

      if (!p.includes(document.getElementById(id))) {
        closeMenu();
      }
    };

    window.addEventListener("click", listener);

    return () => window.removeEventListener("click", listener);
  }, []);

  if (!menuOpen) return null;
  const { left, top } = getCoordinates({
    targetClientX,
    targetClientY,
    targetWidth,
  });

  const propertyName = path.split(".").pop();

  return (
    <>
      <EditTextMenuStyled left={left} top={top} id={id}>
        <Button fullWidth onClick={() => setEditorOpen(true)}>
          Edit Text
        </Button>
        <Button fullWidth color="error" onClick={closeMenu} size="small">
          Close
        </Button>
      </EditTextMenuStyled>

      <EditDialog
        id={id2}
        open={editorOpen}
        propertyName={propertyName as string}
        node={text}
        handleClose={() => setEditorOpen(false)}
        save={(newText) => {
          mutate(
            { path, text: newText },
            {
              onSuccess: () => {
                setEditorOpen(false);
                closeMenu();
                alert("Text updated successfully");
              },
              onError: () => {
                alert("There was an error updating the text");
              },
            }
          );
        }}
      />
    </>
  );
};

type GetCoordinatesArgs = Pick<
  EditTextValues,
  "targetClientX" | "targetClientY" | "targetWidth"
>;

const getCoordinates = ({
  targetClientX,
  targetClientY,
  targetWidth,
}: GetCoordinatesArgs) => {
  let left = targetClientX + targetWidth;
  let top = targetClientY;

  if (left + editTextMenuWidth > window.innerWidth) {
    left = targetClientX;
  }
  if (top + editTextMenuHeight > window.innerHeight) {
    top = targetClientY - editTextMenuHeight;
  }

  return {
    left,
    top,
  };
};
