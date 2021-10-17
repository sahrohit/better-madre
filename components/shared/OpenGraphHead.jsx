import Head from "next/head";
const OpenGraphHead = () => (
  <Head>
    <title>Madre | where something delicious is always cooking.</title>
    <meta
      name="title"
      content="Madre | where something delicious is always cooking."
    />
    <meta
      name="description"
      content="The restaurant spreading warm love and food."
    />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.madre.vercel.app/" />
    <meta
      property="og:title"
      content="Madre | where something delicious is always cooking."
    />
    <meta
      property="og:description"
      content="Restraunt chain, focusing on Customer Satisfaction and Quality Food."
    />
    <meta property="og:image" content="https://madre.vercel.app/avatar.png" />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://www.madre.vercel.app/" />
    <meta
      property="twitter:title"
      content="Madre | where something delicious is always cooking."
    />
    <meta
      property="twitter:description"
      content="Restraunt chain, focusing on Customer Satisfaction and Quality Food."
    />
    <meta
      property="twitter:image"
      content="https://madre.vercel.app/avatar.png"
    ></meta>
  </Head>
);
export default OpenGraphHead;
