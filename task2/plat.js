/* Tretyakov Andrey (AT7), 10-7, 05.06.2025, geometry module */

import * as mth from "./mth.js"

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

    let Indices = [0, 1, 2,
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

export function setDefaultTetrahedronGeom() {
    let a = Math.sqrt(3) / 3;
    let vertices = [mth.Vec3Normalize(mth.Vec3Set(-a, -a, -a)),
    mth.Vec3Normalize(mth.Vec3Set(a, -a, a)),
    mth.Vec3Normalize(mth.Vec3Set(a, a, -a)),
    mth.Vec3Normalize(mth.Vec3Set(-a, a, a))];
    let Indices = [1, 2, 3,
        1, 3, 4,
        1, 2, 4,
        2, 3, 4];
    let normals = vertices;
    return [vertices, normals, Indices];
}

export function setDefaultOctahedron() {
    let a = Math.sqrt(3) / 3;
    let vertices = [-a, 0, 0,
        0, 0, a,
        0, 0, a,
    -a, a, a];
    let Indices = [1, 2, 3,
        1, 3, 4,
        1, 2, 4,
        2, 3, 4];
    return [vertices, Indices];
} 