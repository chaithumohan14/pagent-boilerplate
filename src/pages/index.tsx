import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";

const QUERY = gql`
  query HAI {
    hello
  }
`;

const index = () => {
  const query = useQuery(QUERY);
  useEffect(() => {
    console.log(query);
  });
  return <div>Hello...Next.JS...</div>;
};

export default index;
