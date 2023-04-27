import { Page } from "@components";
import { UpdatableText } from "easy-text-update";
import { Typography } from "@mui/material";

export default function Home() {
  return (
    <Page>
      <UpdatableText
        path="Home.title"
        component={<Typography variant="h4" />}
      />
    </Page>
  );
}
