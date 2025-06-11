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
        let cube1 = plt.setDefaultCubeGeom();
        let vert = cube1[0];
        let ind = cube1[2];
        let cube2 = plt.getNormalGeom(vert, ind);
        let vertices = cube2[0], normals = cube2[1];
        let matrW = mth.MatrTranslate(mth.Vec3Set(Math.random() * 30, Math.random() * 30, Math.random() * 30));

        let colors = new Array(vertices.length).fill(mth.Vec4Set(1, 0, 1, 1), 0, vertices.length);
        let vertexData = plt.unitePosColorNormal(vertices, colors, normals);
        vertexData = plt.getFloatArrayFromVertexArray(vertexData);
        plt.addToDrawQueue(matrW, vertexData, ind);
    };

    document.getElementById("Tetrahedron").onclick = function () {
        let Tetrahedron1 = plt.setDefaultTetrahedronGeom();
        let vert = Tetrahedron1[0];
        let ind = Tetrahedron1[2];
        let Tetrahedron2 = plt.getNormalGeom(vert, ind);
        let vertices = Tetrahedron2[0], normals = Tetrahedron2[1];
        let matrW = mth.MatrTranslate(mth.Vec3Set(Math.random() * 30, Math.random() * 30, Math.random() * 30));

        let colors = new Array(vertices.length).fill(mth.Vec4Set(1, 0, 1, 1), 0, vertices.length);
        let vertexData = plt.unitePosColorNormal(vertices, colors, normals);
        vertexData = plt.getFloatArrayFromVertexArray(vertexData);
        plt.addToDrawQueue(matrW, vertexData, ind);

        /*
        let Tetrahedron = plt.setDefaultTetrahedronGeom();
        let vertices = Tetrahedron[0];
        let normals = Tetrahedron[1];
        let indices = Tetrahedron[2];
        let matrW = mth.MatrTranslate(mth.Vec3Set(Math.random() * 30, Math.random() * 30, Math.random() * 30));

        let colors = new Array(vertices.length).fill(mth.Vec4Set(1, 0, 1, 1), 0, 100);
        let vertexData = plt.unitePosColorNormal(vertices, colors, normals);
        vertexData = plt.getFloatArrayFromVertexArray(vertexData);
        plt.addToDrawQueue(matrW, vertexData, indices);
        */
    };
    document.getElementById("Octahedron").onclick = function () {
        let Octahedron1 = plt.setDefaultOctahedronGeom();
        let vert = Octahedron1[0];
        let ind = Octahedron1[2];
        let Octahedron2 = plt.getNormalGeom(vert, ind);
        let vertices = Octahedron2[0], normals = Octahedron2[1];
        let matrW = mth.MatrTranslate(mth.Vec3Set(Math.random() * 30, Math.random() * 30, Math.random() * 30));

        let colors = new Array(vertices.length).fill(mth.Vec4Set(1, 0, 1, 1), 0, vertices.length);
        let vertexData = plt.unitePosColorNormal(vertices, colors, normals);
        vertexData = plt.getFloatArrayFromVertexArray(vertexData);
        plt.addToDrawQueue(matrW, vertexData, ind);

        /*
        let cube = plt.setDefaultOctahedronGeom();
        let vertices = cube[0];
        let normals = cube[1];
        let indices = cube[2];
        let matrW = mth.MatrTranslate(mth.Vec3Set(Math.random() * 30, Math.random() * 30, Math.random() * 30));

        let colors = new Array(vertices.length).fill(mth.Vec4Set(1, 0, 1, 1), 0, 100);
        let vertexData = plt.unitePosColorNormal(vertices, colors, normals);
        vertexData = plt.getFloatArrayFromVertexArray(vertexData);
        plt.addToDrawQueue(matrW, vertexData, indices);
        */
    };
    document.getElementById("Icosahedron").onclick = function () {
        let Icosahedron1 = plt.setDefaultIcosahedronGeom();
        let vert = Icosahedron1[0];
        let ind = Icosahedron1[2];
        let Icosahedron2 = plt.getNormalGeom(vert, ind);
        let vertices = Icosahedron2[0], normals = Icosahedron2[1];
        let matrW = mth.MatrTranslate(mth.Vec3Set(Math.random() * 30, Math.random() * 30, Math.random() * 30));

        let colors = new Array(vertices.length).fill(mth.Vec4Set(1, 0, 1, 1), 0, vertices.length);
        let vertexData = plt.unitePosColorNormal(vertices, colors, normals);
        vertexData = plt.getFloatArrayFromVertexArray(vertexData);
        plt.addToDrawQueue(matrW, vertexData, ind);


        /*
        let cube = plt.setDefaultIcosahedronGeom();
        let vertices = cube[0];
        let normals = cube[1];
        let indices = cube[2];
        let matrW = mth.MatrTranslate(mth.Vec3Set(Math.random() * 30, Math.random() * 30, Math.random() * 30));

        let colors = new Array(vertices.length).fill(mth.Vec4Set(1, 0, 1, 1), 0, 100);
        let vertexData = plt.unitePosColorNormal(vertices, colors, normals);
        vertexData = plt.getFloatArrayFromVertexArray(vertexData);
        plt.addToDrawQueue(matrW, vertexData, indices);
        */
    };
    document.getElementById("Dodecahedron").onclick = function () {
        let Dodecahedron1 = plt.setDefaultDodecahedronGeom();
        let vert = Dodecahedron1[0];
        let ind = Dodecahedron1[2];
        let Dodecahedron2 = plt.getNormalGeom(vert, ind);
        let vertices = Dodecahedron2[0], normals = Dodecahedron2[1];
        let matrW = mth.MatrTranslate(mth.Vec3Set(Math.random() * 30, Math.random() * 30, Math.random() * 30));

        let colors = new Array(vertices.length).fill(mth.Vec4Set(1, 0, 1, 1), 0, vertices.length);
        let vertexData = plt.unitePosColorNormal(vertices, colors, normals);
        vertexData = plt.getFloatArrayFromVertexArray(vertexData);
        plt.addToDrawQueue(matrW, vertexData, ind);

        /*
        let cube = plt.setDefaultDodecahedronGeom();
        let vertices = cube[0];
        let normals = cube[1];
        let indices = cube[2];
        let matrW = mth.MatrTranslate(mth.Vec3Set(Math.random() * 30, Math.random() * 30, Math.random() * 30));

        let colors = new Array(vertices.length).fill(mth.Vec4Set(1, 0, 1, 1), 0, 100);
        let vertexData = plt.unitePosColorNormal(vertices, colors, normals);
        vertexData = plt.getFloatArrayFromVertexArray(vertexData);
        plt.addToDrawQueue(matrW, vertexData, indices);
        */
    };
    document.getElementById("Delete").onclick = function () {
        plt.popDrawQueue();
    };
    document.getElementById("Clear").onclick = function () {
        plt.clearDrawQueue();
    };
    document.addEventListener('keydown', function (event) {
        if (event.code == 'KeyW') {

        }
    });

    rnd.drawScene();
}
window.addEventListener("load", () => { onStart() });

//window.onresize = () => { rnd.FrameW = document.getElementById("canvas").clientWidth, rnd.FrameH = document.getElementById("canvas").clientHeight }
//window.event.