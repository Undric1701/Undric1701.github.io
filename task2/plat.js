/* Tretyakov Andrey (AT7), 10-7, 05.06.2025, geometry module */

import * as mth from "./mth.js"
import * as rnd from "./rnd.js"
import * as shd from "./shaders/shaders.js"

export class Vertex {
    constructor(pos, color, normal) {
        this.pos = pos,
            this.color = color,
            this.normal = normal
    }
}

export function unitePosColorNormal(posArr, colorArr, normalArr) {
    let vertArr = [];
    for (let i = 0; i < posArr.length; i++)
        vertArr[i] = new Vertex(posArr[i], colorArr[i], normalArr[i])
    return vertArr;
}

export function getFloatArrayFromVertexArray(vertArr) {
    let res = []
    for (let i = 0; i < vertArr.length; i++) {
        res[i * 10] = vertArr[i].pos.x;
        res[i * 10 + 1] = vertArr[i].pos.y;
        res[i * 10 + 2] = vertArr[i].pos.z;
        res[i * 10 + 3] = vertArr[i].color.x;
        res[i * 10 + 4] = vertArr[i].color.y;
        res[i * 10 + 5] = vertArr[i].color.z;
        res[i * 10 + 6] = vertArr[i].color.w;
        res[i * 10 + 7] = vertArr[i].normal.x;
        res[i * 10 + 8] = vertArr[i].normal.y;
        res[i * 10 + 9] = vertArr[i].normal.z;
    }
    return new Float32Array(res);
}

export function setDefaultCubeGeom() {
    let a = Math.sqrt(3) / 3;
    let vertices = [mth.Vec3Normalize(mth.Vec3Set(-a, -a, -a)),
    mth.Vec3Normalize(mth.Vec3Set(a, -a, -a)),
    mth.Vec3Normalize(mth.Vec3Set(-a, -a, a)),
    mth.Vec3Normalize(mth.Vec3Set(a, -a, a)),
    mth.Vec3Normalize(mth.Vec3Set(-a, a, -a)),
    mth.Vec3Normalize(mth.Vec3Set(a, a, -a)),
    mth.Vec3Normalize(mth.Vec3Set(-a, a, a)),
    mth.Vec3Normalize(mth.Vec3Set(a, a, a))];

    let Indices = [
        0, 1, 2,
        1, 2, 3,
        5, 4, 7,
        4, 6, 7,
        0, 1, 4,
        1, 5, 4,
        2, 3, 6,
        6, 3, 7,
        0, 2, 4,
        6, 4, 2,
        1, 3, 5,
        5, 7, 3];
    let normals = vertices;
    return [vertices, normals, Indices];
}

export function setDefaultCubeGeomTriangles() {
    let vertices = [];
    let normals = [];
    let cube = setDefaultCubeGeom();
    let vert = cube[0];
    let ind = cube[2];

    for (let i = 0; i < ind.length; i += 3) {
        vertices[i] = vert[ind[i]];
        vertices[i + 1] = vert[ind[i + 1]];
        vertices[i + 2] = vert[ind[i + 2]];
        normals[i] = mth.Vec3Normalize(mth.Vec3CrossVec3(mth.Vec3SubVec3(vertices[i + 2], vertices[i]), mth.Vec3SubVec3(vertices[i + 1], vertices[i])))
        normals[i + 1] = normals[i];
        normals[i + 2] = normals[i];
    }
    return [vertices, normals];
}

export function setDefaultTetrahedronGeom() {
    let a = Math.sqrt(3) / 3;
    let vertices = [mth.Vec3Normalize(mth.Vec3Set(-a, -a, -a)),
    mth.Vec3Normalize(mth.Vec3Set(a, -a, a)),
    mth.Vec3Normalize(mth.Vec3Set(a, a, -a)),
    mth.Vec3Normalize(mth.Vec3Set(-a, a, a))];
    let Indices = [
        0, 1, 2,
        0, 2, 3,
        0, 1, 3,
        2, 2, 3
    ];
    let normals = vertices;
    return [vertices, normals, Indices];
}

export function setDefaultOctahedronGeom() {
    let vertices = [mth.Vec3Set(-1, 0, 0),
    mth.Vec3Set(0, 0, 1),
    mth.Vec3Set(1, 0, 0),
    mth.Vec3Set(0, 0, -1),
    mth.Vec3Set(0, 1, 0),
    mth.Vec3Set(0, -1, 0)];
    let Indices = [
        0, 1, 4,
        1, 2, 4,
        2, 3, 4,
        0, 3, 4,
        0, 1, 5,
        1, 2, 5,
        2, 3, 5,
        0, 3, 5
    ];
    let normals = vertices;
    return [vertices, normals, Indices];
}

export function setDefaultEasterEggGeom() {
    let vertices = [];

    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < 5; i++) {
            vertices[j * 5 + i] = mth.Vec3Normalize(mth.Vec3Set(Math.cos(2 * i * mth.PI / 5 + mth.PI / 2 * j), j - 0.5, Math.sin(2 * i * mth.PI / 5 + mth.PI / 2 * j)));
        }
    }
    vertices[10] = mth.Vec3Set(0, -1, 0);
    vertices[11] = mth.Vec3Set(0, 1, 0);
    let Indices = [
        0, 1, 8,
        8, 9, 1,
        1, 2, 9,
        9, 5, 2,
        2, 3, 5,
        5, 6, 3,
        3, 4, 6,
        6, 7, 4,
        4, 0, 7,
        7, 8, 0
    ];
    let normals = vertices;
    return [vertices, normals, Indices];
}

export function setDefaultIcosahedronGeom() {
    let vertices = [];

    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < 5; i++) {
            vertices[j * 5 + i] = mth.Vec3Normalize(mth.Vec3Set(Math.cos(2 * i * mth.PI / 5 + mth.PI * j), j - 0.5, Math.sin(2 * i * mth.PI / 5 + mth.PI * j)));
        }
    }
    vertices[10] = mth.Vec3Set(0, -1, 0);
    vertices[11] = mth.Vec3Set(0, 1, 0);
    let Indices = [
        7, 8, 0,
        0, 1, 8,
        8, 9, 1,
        1, 2, 9,
        9, 5, 2,
        2, 3, 5,
        5, 6, 3,
        3, 4, 6,
        6, 7, 4,
        4, 0, 7,
        0, 1, 10,
        1, 2, 10,
        2, 3, 10,
        3, 4, 10,
        4, 0, 10,
        5, 6, 11,
        6, 7, 11,
        7, 8, 11,
        8, 9, 11,
        9, 5, 11
    ];
    let normals = vertices;
    return [vertices, normals, Indices];
}

function getMedianVector3(V1, V2, V3) {
    return new mth.Vec3(V1.x + V2.x + V3.x, V1.y + V2.y + V3.y, V1.z + V2.z + V3.z);
}

export function setDefaultDodecahedronGeom() {
    let vertices = [];
    let icos = setDefaultIcosahedronGeom();
    let ind = icos[2];
    let vert = icos[0];

    for (let i = 0; i < 20; i++)
        vertices[i] = mth.Vec3Normalize(getMedianVector3(vert[ind[i * 3]], vert[ind[i * 3 + 1]], vert[ind[i * 3 + 2]]))
    let Indices = [];
    for (let i = 0; i < 10; i++) {
        if (i % 2 == 0) {
            Indices[i * 9] = i;
            Indices[i * 9 + 1] = (i + 1) % 10;
            Indices[i * 9 + 2] = (i + 2) % 10;
            Indices[i * 9 + 3] = i;
            Indices[i * 9 + 4] = 15 + (i / 2 + 1) % 5;
            Indices[i * 9 + 5] = 15 + (i / 2 + 2) % 5;
            Indices[i * 9 + 6] = i;
            Indices[i * 9 + 7] = (i + 2) % 10;
            Indices[i * 9 + 8] = 15 + (i / 2 + 2) % 5;
        } else {
            Indices[i * 9] = i;
            Indices[i * 9 + 1] = (i + 1) % 10;
            Indices[i * 9 + 2] = (i + 2) % 10;
            Indices[i * 9 + 3] = i;
            Indices[i * 9 + 4] = 10 + i / 2;
            Indices[i * 9 + 5] = 10 + (i / 2 + 1) % 5;
            Indices[i * 9 + 6] = i;
            Indices[i * 9 + 7] = (i + 2) % 10;
            Indices[i * 9 + 8] = 10 + (i / 2 + 1) % 5;
        }
    }
    Indices[90] = 10;
    Indices[91] = 11;
    Indices[92] = 12;
    Indices[93] = 10;
    Indices[94] = 12;
    Indices[95] = 13;
    Indices[96] = 10;
    Indices[97] = 13;
    Indices[98] = 14;
    Indices[99] = 15;
    Indices[100] = 16;
    Indices[101] = 17;
    Indices[102] = 15;
    Indices[103] = 17;
    Indices[104] = 18;
    Indices[105] = 15;
    Indices[106] = 18;
    Indices[107] = 19;
    let normals = vertices;
    return [vertices, normals, Indices];
}

export let globalDrawQueue;


export function initGlobalDrawQueue() {
    globalDrawQueue = [];
}

export function drawGloabalQueue(gl) {
    for (let i = 0; i < globalDrawQueue.length; i++) {
        gl.bindBuffer(gl.ARRAY_BUFFER, rnd.vertexBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            globalDrawQueue[i][1],
            gl.STATIC_DRAW
        );

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, rnd.indexBuffer);
        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            new Uint32Array(globalDrawQueue[i][2]),
            gl.STATIC_DRAW
        );
        gl.uniformMatrix4fv(shd.u_matrW_location, false, new Float32Array(globalDrawQueue[i][0].A[0].concat(globalDrawQueue[i][0].A[1].concat(globalDrawQueue[i][0].A[2].concat(globalDrawQueue[i][0].A[3]))), 0, 16));
        gl.drawElements(gl.TRIANGLES, globalDrawQueue[i][2].length, gl.UNSIGNED_INT, 0);
    }
}

export function addToDrawQueue(matrW, vertexData, indices) {
    globalDrawQueue.push([mth.MatrMulMatr(rnd.globalMatrW, matrW), vertexData, indices]);
}
export function popDrawQueue() {
    globalDrawQueue.pop();
}
export function clearDrawQueue() {
    globalDrawQueue = [];
}