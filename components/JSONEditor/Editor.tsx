import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ size: ["small", false, "large", "huge"] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],
    ["link"],
  ],
  history: {
    // Enable with custom configurations
    delay: 2500,
    userOnly: true,
  },
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
