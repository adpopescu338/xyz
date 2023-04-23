
import { getStaticPropsText } from "@lib";
import { Signin } from "@components";

export default function Home() {

  return <Signin />;
}

export const getStaticProps = getStaticPropsText;
