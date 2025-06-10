/* Tretyakov Andrey (AT7), 10-7, 06.06.2025, main module */

/*
<script type="module" src="mth.js"></script>
<script type="module" src="shaders/shaders.js"></script>
*/

import * as mth from "./mth.js"
import * as plt from "./plat.js"
import * as rnd from "./rnd.js"

//import * as shd from "./shaders/shaders.js"
export let startTime, pausetime = 0.0;
export let isPause = false;
let figurescount = 0;

function onStart() {
    console.log("AT7 Platon's figures task");
    let mult = 0.00047;

    let canvas = document.getElementById("webgl-canvas");

    rnd.initGL(canvas);

    startTime = (new Date()).getTime();

    document.getElementById("Pause").onclick = function () {
        isPause = !isPause;
        pausetime = rnd.timeFromStart;
    };

    document.getElementById("Cube").onclick = function () {
        let cube = plt.setDefaultCubeGeom();
        let vertices = cube[0];
        let normals = cube[1];
        let indices = cube[2];
        let matrW = mth.MatrTranslate(mth.Vec3Set(Math.random() * 30, Math.random() * 30, Math.random() * 30));

        let colors = new Array(vertices.length).fill(mth.Vec4Set(1, 0, 1, 1), 0, 100);
        let vertexData = plt.unitePosColorNormal(vertices, colors, normals);
        vertexData = plt.getFloatArrayFromVertexArray(vertexData);
        plt.addToDrawQueue(matrW, vertexData, indices);
    };

    document.getElementById("Tetrahedron").onclick = function () {
        let Tetrahedron = plt.setDefaultTetrahedronGeom();
        let vertices = Tetrahedron[0];
        let normals = Tetrahedron[1];
        let indices = Tetrahedron[2];
        let matrW = mth.MatrTranslate(mth.Vec3Set(Math.random() * 30, Math.random() * 30, Math.random() * 30));
        //matrW = mth.UnitMatrix;

        let colors = new Array(vertices.length).fill(mth.Vec4Set(1, 0, 1, 1), 0, 100);
        let vertexData = plt.unitePosColorNormal(vertices, colors, normals);
        vertexData = plt.getFloatArrayFromVertexArray(vertexData);
        plt.addToDrawQueue(matrW, vertexData, indices);
    };
    document.getElementById("Octahedron").onclick = function () {
        let cube = plt.setDefaultOctahedronGeom();
        let vertices = cube[0];
        let normals = cube[1];
        let indices = cube[2];
        let matrW = mth.MatrTranslate(mth.Vec3Set(Math.random() * 30, Math.random() * 30, Math.random() * 30));

        let colors = new Array(vertices.length).fill(mth.Vec4Set(1, 0, 1, 1), 0, 100);
        let vertexData = plt.unitePosColorNormal(vertices, colors, normals);
        vertexData = plt.getFloatArrayFromVertexArray(vertexData);
        plt.addToDrawQueue(matrW, vertexData, indices);
    };
    document.getElementById("Icosahedron").onclick = function () {
        let cube = plt.setDefaultIcosahedronGeom();
        let vertices = cube[0];
        let normals = cube[1];
        let indices = cube[2];
        let matrW = mth.MatrTranslate(mth.Vec3Set(Math.random() * 30, Math.random() * 30, Math.random() * 30));

        let colors = new Array(vertices.length).fill(mth.Vec4Set(1, 0, 1, 1), 0, 100);
        let vertexData = plt.unitePosColorNormal(vertices, colors, normals);
        vertexData = plt.getFloatArrayFromVertexArray(vertexData);
        plt.addToDrawQueue(matrW, vertexData, indices);
    };
    document.getElementById("Dodecahedron").onclick = function () {
        let cube = plt.setDefaultDodecahedronGeom();
        let vertices = cube[0];
        let normals = cube[1];
        let indices = cube[2];
        let matrW = mth.MatrTranslate(mth.Vec3Set(Math.random() * 30, Math.random() * 30, Math.random() * 30));

        let colors = new Array(vertices.length).fill(mth.Vec4Set(1, 0, 1, 1), 0, 100);
        let vertexData = plt.unitePosColorNormal(vertices, colors, normals);
        vertexData = plt.getFloatArrayFromVertexArray(vertexData);
        plt.addToDrawQueue(matrW, vertexData, indices);
    };
    document.getElementById("Delete").onclick = function () {
        plt.popDrawQueue();
    };
    document.getElementById("Clear").onclick = function () {
        plt.clearDrawQueue();
    };

    rnd.drawScene();
}
window.addEventListener("load", () => { onStart() });
//window.onresize = () => { rnd.FrameW = document.getElementById("canvas").clientWidth, rnd.FrameH = document.getElementById("canvas").clientHeight }