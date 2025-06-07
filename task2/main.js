/* Tretyakov Andrey (AT7), 10-7, 06.06.2025, main module */

/*
<script type="module" src="mth.js"></script>
<script type="module" src="shaders/shaders.js"></script>
*/

//import * as mth from "./mth.js"
//import * as plt from "./plat.js"
import * as rnd from "./rnd.js"

//import * as shd from "./shaders/shaders.js"
export let startTime, pausetime = 0.0;

function onStart() {
    console.log("AT7 Platon's figures task");
    let mult = 0.00047;

    let canvas = document.getElementById("webgl-canvas");

    rnd.initGL(canvas);

    startTime = (new Date()).getTime();
    rnd.drawScene();
}
window.addEventListener("load", () => { onStart() });