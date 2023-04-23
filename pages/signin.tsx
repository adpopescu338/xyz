import { getStaticPropsText } from "@lib";
import { Signin, Page } from "@components";

export default function Home() {
  return (
    <Page>
      <Signin />
    </Page>
  );
}

export const getStaticProps = getStaticPropsText;
