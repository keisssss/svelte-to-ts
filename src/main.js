import App from "./App.svelte";
import { writable, get } from "svelte/store";
import { afterUpdate } from "svelte";

export const state = writable("state6");

const stateToTarget = {
  state1: {
    style: "embed",
    type: "change",
    element: document.querySelector(
      "body > div:nth-of-type(1) > div:nth-of-type(1)"
    ),
  },
  state2: {
    style: "embed",
    type: "change",
    element: document.querySelector(
      "body > div:nth-of-type(1) > div:nth-of-type(2)"
    ),
  },
  state3: {
    style: "embed",
    type: "change",
    element: document.querySelector(
      "body > div:nth-of-type(1) > div:nth-of-type(3)"
    ),
  },
  state4: {
    style: "embed",
    type: "insert-before",
    element: document.querySelector("body > div:nth-of-type(2) > div"),
  },
  state5: {
    style: "embed",
    type: "insert-after",
    element: document.querySelector("body > div:nth-of-type(2) > div"),
  },
  state6: {
    style: "modal",
    type: "",
    element: document.body,
  },
};

function mountReplace(Component, options) {
  const target = options.target;
  document.querySelectorAll("#svelte-container").forEach((e) => {
    e.remove();
  });
  const frag = document.createElement("div");
  frag.id = "svelte-container";
  frag.style.height = "100%";
  frag.style.width = "100%";
  frag.style.top = 0;
  frag.style.left = 0;
  if (target.style === "modal") {
    frag.style.position = "absolute";
  } else if (target.style === "embed") {
    if (target.type === "change") {
      const elems = target.element.children;
      if (elems.length !== 0) {
        while (elems.length) {
          elems.item(0).remove();
        }
      } else {
        target.element.innerHTML = "";
      }
    } else if (target.type === "insert-before") {
      frag.style.height = "";
      frag.style.width = "";
    } else if (target.type === "insert-after") {
      frag.style.height = "";
      frag.style.width = "";
    }
  }

  //   const frag = document.createDocumentFragment();
  new Component({ ...options, target: frag });
  console.log(target);
  if (target.style === "modal") {
    target.element.appendChild(frag);
  } else if (target.style === "embed") {
    if (target.type === "change") {
      target.element.appendChild(frag);
    } else if (target.type === "insert-before") {
      const parent = target.element.parentNode;
      parent.insertBefore(frag, target.element);
    } else if (target.type === "insert-after") {
      const parent = target.element.parentNode;
      target.element.after(frag);
    } else {
      console.log("here");
    }
  }
}

state.subscribe((v) => {
  //   console.log("subscribe");
  mountReplace(App, {
    target: stateToTarget[v],
    props: { state },
  });
});
