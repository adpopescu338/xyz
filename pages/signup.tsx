import { getStaticPropsText } from "@lib";
import { Signup, Page } from "@components";

export default function Home() {
  return (
    <Page>
      <Signup />
    </Page>
  );
}

export const getStaticProps = getStaticPropsText;
