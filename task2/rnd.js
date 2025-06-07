/* Tretyakov Andrey (AT7), 10-7, 06.06.2025, render module */
import * as mth from "./mth.js"
import * as shd from "./shaders/shaders.js"
import * as main from "./main.js"
import * as plat from "./plat.js"

export let FrameW, FrameH;
export let IsPause = false;
let ProjSize = 0.1;
let gl;

let vertexBuffer, indexBuffer;
function initBuffers() {
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    const vertices = [3, 1, -1, -1, 1, 1, -1, -3, 2];
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
    );
    indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    const indices = [0, 1, 2];
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint32Array(indices),
        gl.STATIC_DRAW
    );
}
export function initGL(canvas) {
    gl = canvas.getContext("webgl2");
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
    FrameW = canvas.width;
    FrameH = canvas.height;
    shd.initShaders(gl);
    initBuffers();
    gl.enable(gl.DEPTH_TEST);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

}

export function GetColor(Color) {
    let r = parseInt(Color.substring(1, 3), 16) / 255.0;
    let g = parseInt(Color.substring(3, 5), 16) / 255.0;
    let b = parseInt(Color.substring(5, 7), 16) / 255.0;
    return [r, g, b];
}

export function drawScene() {
    let timeFromStart = 0;

    if (IsPause)
        timeFromStart = main.pausetime;
    else
        timeFromStart = (new Date()).getTime() - main.startTime - main.pausetime;

    gl.clearColor(0.9, 0.92, 0.9, 1);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 40, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 40, 12);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 40, 28);

    /* Set camera and triangle points */
    let loc = new mth.Vec3(Math.cos(timeFromStart / 500 / 2) * 10, 15 * Math.sin(timeFromStart / 500 / 2), Math.sin(timeFromStart / 500 / 2) * 10);
    //let loc = new mth.Vec3(10, 10, 3);
    let at = new mth.Vec3(0, 0, 0);
    let up = new mth.Vec3(0, 1, 0);
    let MatrV = mth.MatrView(loc, at, up);
    let MatrP = mth.MatrFrustum(-ProjSize / 2, ProjSize / 2, -ProjSize / 2, ProjSize / 2, 0.1, 100);
    let MatrVP = mth.MatrMulMatr(MatrV, MatrP);


    let MatrW = mth.MatrTranslate(mth.Vec3Set(2, 0, 2 + 0 * 2 * Math.cos(timeFromStart / 500 * mth.PI)));
    MatrW = mth.MatrMulMatr(mth.MatrScale(mth.Vec3Set(6, 6, 6)), MatrW)
    let p1 = mth.Vec3Set(0, 0, 10);
    let p2 = mth.Vec3Set(-10, 0, 10);
    let p3 = mth.Vec3Set(-10, 0, -10);

    let MatrWVP = mth.MatrMulMatr(MatrW, MatrVP);
    //p1 = mth.Vec3MulMatr(p1, MatrWVP);
    //p2 = mth.Vec3MulMatr(p2, MatrWVP);
    //p3 = mth.Vec3MulMatr(p3, MatrWVP);

    //let cube = plat.setDefaultCubeGeom();
    let cube = plat.setDefaultTetrahedronGeom();
    let vertices = cube[0];
    let normals = cube[1];
    let indices = cube[2];
    /*
    let colors = [new mth.Vec4(1, 1, 1, 1),
    new mth.Vec4(1, 1, 1, 1),
    new mth.Vec4(1, 1, 1, 1),
    new mth.Vec4(1, 1, 1, 1),
    new mth.Vec4(0, 1, 0, 1),
    new mth.Vec4(0, 1, 0, 1),
    new mth.Vec4(0, 1, 0, 1),
    new mth.Vec4(0, 1, 0, 1)];
    */
    let colors = [new mth.Vec4(1, 1, 1, 1),
    new mth.Vec4(0, 0, 1, 1),
    new mth.Vec4(1, 0, 0, 1),
    new mth.Vec4(0, 1, 0, 1)]
    let vertexData = plat.unitePosColorNormal(vertices, colors, normals);
    vertexData = plat.getFloatArrayFromVertexArray(vertexData);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        vertexData,
        gl.STATIC_DRAW
    );
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint32Array(indices),
        gl.STATIC_DRAW
    );

    gl.uniform1f(shd.u_time_location, timeFromStart / 1000.0);
    gl.uniform1f(shd.u_frame_w_location, FrameW);
    gl.uniform1f(shd.u_frame_h_location, FrameH);
    gl.uniform3fv(shd.u_camDir_location, new Float32Array(mth.ArrFromVec3(mth.Vec3Normalize(mth.Vec3SubVec3(loc, at)))), 0, 3);
    gl.uniformMatrix4fv(shd.u_matrVP_location, false, new Float32Array(MatrVP.A[0].concat(MatrVP.A[1].concat(MatrVP.A[2].concat(MatrVP.A[3]))), 0, 16));
    gl.uniformMatrix4fv(shd.u_matrW_location, false, new Float32Array(MatrW.A[0].concat(MatrW.A[1].concat(MatrW.A[2].concat(MatrW.A[3]))), 0, 16));

    //gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_INT, 0);
    window.requestAnimationFrame(drawScene);
}