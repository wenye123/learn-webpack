// import { a1 } from "./a.js";
// console.log(a1);

// import("./b.ts").then(({ b1 }) => {
//   console.log("异步", b1);
// });

// import { b1 } from "./b.ts";
// console.log(b1);

// import css from "./assets/style/style.css";
// console.log(css);

// import("./style.less");
// import("./assets/style/style.css");

// import "core-js/stable";

// const timeout = (ms) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, ms);
//   });
// };

// async function init() {
//   await timeout(300);
//   console.log([[1, 2]].flat());
// }

// init();

// import("./b");

// import img from "./assets/img/1.png";
// console.log(img);

// import dayjs from "dayjs";
// console.log(dayjs);

// import button from "button";
// console.log(button);

import "@/assets/style/style.css";

async function sourcemap() {
  throw 111;
}
sourcemap();