import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ align: [] }],
    ["link"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const EditorContainer = styled.div`
  .ql-container {
    min-height: 45vh;
  }
`;

type Props = {
  node: string;
  handleChange: (value: string) => void;
};

export const Editor = ({ node, handleChange }: Props) => (
  <EditorContainer>
    <ReactQuill
      value={node}
      modules={modules}
      formats={formats}
      onChange={handleChange}
    />
  </EditorContainer>
);
