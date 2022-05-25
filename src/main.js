import App from "./App.svelte";
import { writable, get } from "svelte/store";
import { afterUpdate } from "svelte";

export const state = writable("state4");

const stateToTarget = {
  state1: {
    type: "embed",
    target: document.querySelector(
      "body > div:nth-of-type(1) > div:nth-of-type(1)"
    ),
  },
  state2: {
    type: "embed",
    target: document.querySelector(
      "body > div:nth-of-type(1) > div:nth-of-type(2)"
    ),
  },
  state3: {
    type: "embed",
    target: document.querySelector(
      "body > div:nth-of-type(1) > div:nth-of-type(3)"
    ),
  },
  state4: {
    type: "modal",
    target: document.body,
  },
};

function mountReplace(Component, options) {
  document.querySelectorAll("#svelte-container").forEach((e) => {
    e.remove();
  });
  const frag = document.createElement("div");
  frag.id = "svelte-container";
  frag.style.height = "100%";
  frag.style.width = "100%";
  frag.style.top = 0;
  frag.style.left = 0;
  if (options.target.type === "modal") {
    frag.style.position = "absolute";
  }

  //   const frag = document.createDocumentFragment();
  new Component({ ...options, target: frag });
  options.target.target.appendChild(frag);
}

state.subscribe((v) => {
  //   console.log("subscribe");
  mountReplace(App, {
    target: stateToTarget[v],
    props: { state },
  });
});
