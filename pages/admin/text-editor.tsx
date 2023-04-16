import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { JSONEditor } from "@components";
import { getStaticPropsText } from "@lib";
import FabComponent from "@mui/material/Fab";
import SaveIcon from "@mui/icons-material/Save";
import styled from "styled-components";
import { AdminClient } from "@lib";
import { useMutation } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 1rem;
  min-height: 100vh;
`;

const Fab = styled(FabComponent)`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const Page = ({ text }: any) => {
  const [node, setNode] = useState(text);
  const dirty = node !== text;
  const { mutate, isLoading } = useMutation(AdminClient.updateText);

  return (
    <Main>
      <JSONEditor node={node} setNode={(n: any) => setNode({ ...n })} />
      <Fab color="primary" disabled={!dirty}>
        {isLoading && <CircularProgress />}

        {!isLoading && (
          <SaveIcon
            onClick={() => {
              mutate(node, {
                onSuccess: () => alert("Saved"),
                onError: () => alert("Error"),
              });
            }}
          />
        )}
      </Fab>
    </Main>
  );
};

export default Page;

export const getStaticProps = getStaticPropsText(
  (ctx: GetServerSidePropsContext) => {
    // perform auth check here
    // or use HOC
  }
);
