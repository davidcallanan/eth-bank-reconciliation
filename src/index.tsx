/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import { MetaProvider } from "@solidjs/meta";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element missing!",
  );
}

render(() => <MetaProvider><App/></MetaProvider>, root!);
