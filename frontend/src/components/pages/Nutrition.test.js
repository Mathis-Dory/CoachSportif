import ReactDOM from "react-dom";
import {MemoryRouter} from "react-router-dom";
import Nutrition from "./nutrition";
import React from "react";

test("render sans que ça plante", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MemoryRouter><Nutrition /></MemoryRouter>, div);
});