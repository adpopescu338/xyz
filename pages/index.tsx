import { useText } from "@contexts";
import { getStaticPropsText } from "@lib";

export default function Home() {
  const { tProps } = useText("Home");

  return (
    <main>
      <div {...tProps("title")} />
    </main>
  );
}

export const getStaticProps = getStaticPropsText;
