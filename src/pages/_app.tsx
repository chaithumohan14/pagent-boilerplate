import React from "react";

interface Props {
  Component: React.ComponentClass;
  pageProps: React.PropsWithChildren<any>;
}

const _app = (props: Props) => {
  return (
    <>
      <props.Component {...props.pageProps}></props.Component>
    </>
  );
};

export default _app;
