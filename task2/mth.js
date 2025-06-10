/* Tretyakov Andrey (AT7), 10-7, 04.06.2025, math module */

/* Pi math constant */
export let PI = 3.14159265358979323846;

export class Vec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
export class Vec4 {
    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
}
export class Matr {
    constructor(A00, A01, A02, A03,
        A10, A11, A12, A13,
        A20, A21, A22, A23,
        A30, A31, A32, A33) {
        this.A =
            [[A00, A01, A02, A03],
            [A10, A11, A12, A13],
            [A20, A21, A22, A23],
            [A30, A31, A32, A33]];
    };
}
export function MatrTranslate(T) {
    return new Matr(1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        T.x, T.y, T.z, 1);
}
export function MatrScale(S) {
    return new Matr(S.x, 0, 0, 0,
        0, S.y, 0, 0,
        0, 0, S.z, 0,
        0, 0, 0, 1);
}

export function MatrRotate(AngleInDegrees, R) {
    let s = Math.sin(AngleInDegrees / 180 * PI), c = Math.cos(AngleInDegrees / 180 * PI),
        x = R.x, y = R.y, z = R.z;

    return new Matr(x * x * (1 - c) + c, x * y * (1 - c) + z * s, x * z * (1 - c) - y * s, 0,
        x * y * (1 - c) - z * s, y * y * (1 - c) + c, y * z * (1 - c) + x * s, 0,
        x * z * (1 - c) + y * s, y * z * (1 - c) - x * s, z * z * (1 - c) + c, 0,
        0, 0, 0, 1);
}
export function MatrTranspose(M) {
    return new Matr(M.A[0][0], M.A[1][0], M.A[2][0], M.A[3][0],
        M.A[0][1], M.A[1][1], M.A[2][1], M.A[3][1],
        M.A[0][2], M.A[1][2], M.A[2][2], M.A[3][2],
        M.A[0][3], M.A[1][3], M.A[2][3], M.A[3][3]);
}
export function MatrDeterm3x3(A11, A12, A13, A21, A22, A23, A31, A32, A33) {
    return A11 * A22 * A33 + A12 * A23 * A31 + A13 * A21 * A32 - A11 * A23 * A32 - A12 * A21 * A33 - A13 * A22 * A31;
}
export function MatrDeterm(M) {
    return M.A[0][0] * MatrDeterm3x3(M.A[1][1], M.A[1][2], M.A[1][3],
        M.A[2][1], M.A[2][2], M.A[2][3],
        M.A[3][1], M.A[3][2], M.A[3][3]) +

        -M.A[0][1] * MatrDeterm3x3(M.A[1][0], M.A[1][2], M.A[1][3],
            M.A[2][0], M.A[2][2], M.A[2][3],
            M.A[3][0], M.A[3][2], M.A[3][3]) +

        M.A[0][2] * MatrDeterm3x3(M.A[1][0], M.A[1][1], M.A[1][3],
            M.A[2][0], M.A[2][1], M.A[2][3],
            M.A[3][0], M.A[3][1], M.A[3][3]) +

        -M.A[0][3] * MatrDeterm3x3(M.A[1][0], M.A[1][1], M.A[1][2],
            M.A[2][0], M.A[2][1], M.A[2][2],
            M.A[3][0], M.A[3][1], M.A[3][2]);
}
export function MatrInverse(M) {
    let det = MatrDeterm(M);
    let r = new Matr(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

    if (det == 0) {
        r.A = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        return r;
    }
    /* Build adjoint matrix */
    r.A[0][0] =
        MatrDeterm3x3(M.A[1][1], M.A[1][2], M.A[1][3],
            M.A[2][1], M.A[2][2], M.A[2][3],
            M.A[3][1], M.A[3][2], M.A[3][3]) / det;
    r.A[1][0] =
        -MatrDeterm3x3(M.A[1][0], M.A[1][2], M.A[1][3],
            M.A[2][0], M.A[2][2], M.A[2][3],
            M.A[3][0], M.A[3][2], M.A[3][3]) / det;
    r.A[2][0] =
        MatrDeterm3x3(M.A[1][0], M.A[1][1], M.A[1][3],
            M.A[2][0], M.A[2][1], M.A[2][3],
            M.A[3][0], M.A[3][1], M.A[3][3]) / det;
    r.A[3][0] =
        -MatrDeterm3x3(M.A[1][0], M.A[1][1], M.A[1][2],
            M.A[2][0], M.A[2][1], M.A[2][2],
            M.A[3][0], M.A[3][1], M.A[3][2]) / det;

    r.A[0][1] =
        -MatrDeterm3x3(M.A[0][1], M.A[0][2], M.A[0][3],
            M.A[2][1], M.A[2][2], M.A[2][3],
            M.A[3][1], M.A[3][2], M.A[3][3]) / det;
    r.A[1][1] =
        MatrDeterm3x3(M.A[0][0], M.A[0][2], M.A[0][3],
            M.A[2][0], M.A[2][2], M.A[2][3],
            M.A[3][0], M.A[3][2], M.A[3][3]) / det;
    r.A[2][1] =
        -MatrDeterm3x3(M.A[0][0], M.A[0][1], M.A[0][3],
            M.A[2][0], M.A[2][1], M.A[2][3],
            M.A[3][0], M.A[3][1], M.A[3][3]) / det;
    r.A[3][1] =
        MatrDeterm3x3(M.A[0][0], M.A[0][1], M.A[0][2],
            M.A[2][0], M.A[2][1], M.A[2][2],
            M.A[3][0], M.A[3][1], M.A[3][2]) / det;

    r.A[0][2] =
        MatrDeterm3x3(M.A[0][1], M.A[0][2], M.A[0][3],
            M.A[1][1], M.A[1][2], M.A[1][3],
            M.A[3][1], M.A[3][2], M.A[3][3]) / det;
    r.A[1][2] =
        -MatrDeterm3x3(M.A[0][0], M.A[0][2], M.A[0][3],
            M.A[1][0], M.A[1][2], M.A[1][3],
            M.A[3][0], M.A[3][2], M.A[3][3]) / det;
    r.A[2][2] =
        MatrDeterm3x3(M.A[0][0], M.A[0][1], M.A[0][3],
            M.A[1][0], M.A[1][1], M.A[1][3],
            M.A[3][0], M.A[3][1], M.A[3][3]) / det;
    r.A[3][2] =
        -MatrDeterm3x3(M.A[0][0], M.A[0][1], M.A[0][2],
            M.A[1][0], M.A[1][1], M.A[1][2],
            M.A[3][0], M.A[3][1], M.A[3][2]) / det;

    r.A[0][3] =
        -MatrDeterm3x3(M.A[0][1], M.A[0][2], M.A[0][3],
            M.A[1][1], M.A[1][2], M.A[1][3],
            M.A[2][1], M.A[2][2], M.A[2][3]) / det;
    r.A[1][3] =
        MatrDeterm3x3(M.A[0][0], M.A[0][2], M.A[0][3],
            M.A[1][0], M.A[1][2], M.A[1][3],
            M.A[2][0], M.A[2][2], M.A[2][3]) / det;
    r.A[2][3] =
        -MatrDeterm3x3(M.A[0][0], M.A[0][1], M.A[0][3],
            M.A[1][0], M.A[1][1], M.A[1][3],
            M.A[2][0], M.A[2][1], M.A[2][3]) / det;
    r.A[3][3] =
        MatrDeterm3x3(M.A[0][0], M.A[0][1], M.A[0][2],
            M.A[1][0], M.A[1][1], M.A[1][2],
            M.A[2][0], M.A[2][1], M.A[2][2]) / det;
    return r;
}
export let UnitMatrix = new Matr(1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1)
export function MatrMulMatr(M1, M2) {
    let r = new Matr(
        M1.A[0][0] * M2.A[0][0] + M1.A[0][1] * M2.A[1][0] + M1.A[0][2] * M2.A[2][0] + M1.A[0][3] * M2.A[3][0],
        M1.A[0][0] * M2.A[0][1] + M1.A[0][1] * M2.A[1][1] + M1.A[0][2] * M2.A[2][1] + M1.A[0][3] * M2.A[3][1],
        M1.A[0][0] * M2.A[0][2] + M1.A[0][1] * M2.A[1][2] + M1.A[0][2] * M2.A[2][2] + M1.A[0][3] * M2.A[3][2],
        M1.A[0][0] * M2.A[0][3] + M1.A[0][1] * M2.A[1][3] + M1.A[0][2] * M2.A[2][3] + M1.A[0][3] * M2.A[3][3],
        M1.A[1][0] * M2.A[0][0] + M1.A[1][1] * M2.A[1][0] + M1.A[1][2] * M2.A[2][0] + M1.A[1][3] * M2.A[3][0],
        M1.A[1][0] * M2.A[0][1] + M1.A[1][1] * M2.A[1][1] + M1.A[1][2] * M2.A[2][1] + M1.A[1][3] * M2.A[3][1],
        M1.A[1][0] * M2.A[0][2] + M1.A[1][1] * M2.A[1][2] + M1.A[1][2] * M2.A[2][2] + M1.A[1][3] * M2.A[3][2],
        M1.A[1][0] * M2.A[0][3] + M1.A[1][1] * M2.A[1][3] + M1.A[1][2] * M2.A[2][3] + M1.A[1][3] * M2.A[3][3],
        M1.A[2][0] * M2.A[0][0] + M1.A[2][1] * M2.A[1][0] + M1.A[2][2] * M2.A[2][0] + M1.A[2][3] * M2.A[3][0],
        M1.A[2][0] * M2.A[0][1] + M1.A[2][1] * M2.A[1][1] + M1.A[2][2] * M2.A[2][1] + M1.A[2][3] * M2.A[3][1],
        M1.A[2][0] * M2.A[0][2] + M1.A[2][1] * M2.A[1][2] + M1.A[2][2] * M2.A[2][2] + M1.A[2][3] * M2.A[3][2],
        M1.A[2][0] * M2.A[0][3] + M1.A[2][1] * M2.A[1][3] + M1.A[2][2] * M2.A[2][3] + M1.A[2][3] * M2.A[3][3],
        M1.A[3][0] * M2.A[0][0] + M1.A[3][1] * M2.A[1][0] + M1.A[3][2] * M2.A[2][0] + M1.A[3][3] * M2.A[3][0],
        M1.A[3][0] * M2.A[0][1] + M1.A[3][1] * M2.A[1][1] + M1.A[3][2] * M2.A[2][1] + M1.A[3][3] * M2.A[3][1],
        M1.A[3][0] * M2.A[0][2] + M1.A[3][1] * M2.A[1][2] + M1.A[3][2] * M2.A[2][2] + M1.A[3][3] * M2.A[3][2],
        M1.A[3][0] * M2.A[0][3] + M1.A[3][1] * M2.A[1][3] + M1.A[3][2] * M2.A[2][3] + M1.A[3][3] * M2.A[3][3])
    return r;
}
export function Vec3Set(X, Y, Z) {
    return new Vec3(X, Y, Z);
}
export function Vec3AddVec3(V1, V2) {
    return new Vec3(V1.x + V2.x, V1.y + V2.y, V1.z + V2.z);
}
export function Vec3SubVec3(V1, V2) {
    return new Vec3(V1.x - V2.x, V1.y - V2.y, V1.z - V2.z);
}
export function Vec3MulVec3(V1, V2) {
    return new Vec3(V1.x * V2.x, V1.y * V2.y, V1.z * V2.z);
}
export function Vec3MulNum(V1, N) {
    return new Vec3(V1.x * N, V1.y * N, V1.z * N);
}
export function Vec3DivNum(V, N) {
    if (N != 0)
        return new Vec3(V.x / N, V.y / N, V.z / N);
    else
        return V;
}
export function Vec3Neg(V) {
    return new Vec3(-V.x, -V.y, -V.z);
}
export function Vec3DotVec3(V1, V2) {
    return V1.x * V2.x + V1.y * V2.y + V1.z * V2.z;
}
export function Vec3CrossVec3(V1, V2) {
    return new Vec3(V1.y * V2.z - V1.z * V2.y, V1.z * V2.x - V1.x * V2.z, V1.x * V2.y - V1.y * V2.x);
}
export function Vec3Len(V) {
    let len = Vec3DotVec3(V, V);

    return Math.sqrt(len);
}
export function Vec3Len2(V) {
    let len = Vec3DotVec3(V, V);

    return len;
}
export function Vec3Normalize(V) {
    let len = Vec3DotVec3(V, V);

    if (len != 0 && len != 1)
        return Vec3DivNum(V, Math.sqrt(len));
    else
        return V;
}
export function PointTransform(V, M) {
    return Vec3Set(V.x * M.A[0][0] + V.y * M.A[1][0] + V.z * M.A[2][0] + M.A[3][0],
        V.x * M.A[0][1] + V.y * M.A[1][1] + V.z * M.A[2][1] + M.A[3][1],
        V.x * M.A[0][2] + V.y * M.A[1][2] + V.z * M.A[2][2] + M.A[3][2]);
}
export function VectorTransform(V, M) {
    return Vec3Set(V.x * M.A[0][0] + V.y * M.A[1][0] + V.z * M.A[2][0],
        V.x * M.A[0][1] + V.y * M.A[1][1] + V.z * M.A[2][1],
        V.x * M.A[0][2] + V.y * M.A[1][2] + V.z * M.A[2][2]);
}
export function Vec3MulMatr(V, M) {
    let w = V.x * M.A[0][3] + V.y * M.A[1][3] + V.z * M.A[2][3] + M.A[3][3];

    let r = new Vec3((V.x * M.A[0][0] + V.y * M.A[1][0] + V.z * M.A[2][0] + M.A[3][0]) / w,
        (V.x * M.A[0][1] + V.y * M.A[1][1] + V.z * M.A[2][1] + M.A[3][1]) / w,
        (V.x * M.A[0][2] + V.y * M.A[1][2] + V.z * M.A[2][2] + M.A[3][2]) / w);
    return r;
}
export function MatrView(Loc, At, Up1) {
    let Dir = Vec3Normalize(Vec3SubVec3(At, Loc));
    let Right = Vec3Normalize(Vec3CrossVec3(Dir, Up1));
    let Up = Vec3Normalize(Vec3CrossVec3(Right, Dir));

    let m = new Matr(Right.x, Up.x, -Dir.x, 0,
        Right.y, Up.y, -Dir.y, 0,
        Right.z, Up.z, -Dir.z, 0,
        -Vec3DotVec3(Loc, Right), -Vec3DotVec3(Loc, Up), Vec3DotVec3(Loc, Dir), 1);
    return m;
}
export function MatrFrustum(L, R, B, T, N, F) {
    let m = new Matr(2 * N / (R - L), 0, 0, 0,
        0, 2 * N / (T - B), 0, 0,
        (R + L) / (R - L), (T + B) / (T - B), -(F + N) / (F - N), -1,
        0, 0, - 2 * N * F / (F - N), 0);
    return m;
}

export function CamSetProj(W, H, ProjSize, ProjDist, ProjFarClip) {
    let Wp = ProjSize, Hp = ProjSize;
    /* Correct aspect ratio */
    if (W >= H)
        Wp *= W / H;
    else
        Hp *= H / W;

    return MatrFrustum(-Wp / 2, Wp / 2, -Hp / 2, Hp / 2, ProjDist, ProjFarClip);
} /* End of 'CamSetProj' function */


export function ArrFromVec3(V) {
    return [V.x, V.y, V.z]
}
export function Vec4Set(X, Y, Z, W) {
    return new Vec4(X, Y, Z, W);
}