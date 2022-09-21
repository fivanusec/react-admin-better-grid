import * as React from "react";

import { Admin, Resource } from "react-admin";

import { QueryClient } from "react-query";
import dataProvider from "./api";
import jobs from "./jobs";
import jsonServerProvider from "ra-data-json-server";

interface AppProps {}

const queryClient = new QueryClient();
const api = jsonServerProvider("http://localhost:3500");

const App = ({}: AppProps) => {
  return (
    <Admin dataProvider={api} queryClient={queryClient}>
      <Resource name="jobs" list={jobs.list} />
    </Admin>
  );
};

export default App;
