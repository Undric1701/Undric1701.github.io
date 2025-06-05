/* Tretyakov Andrey (AT7), 10-7, 04.06.2025, math module */

/* Pi math constant */
export let PI = 3.14159265358979323846;

export class VEC3 {
    constructor(X, Y, Z) {
        this.X = X;
        this.Y = Y;
        this.Z = Z;
    }
}

export class MATR {
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
    MatrTranslate = (T) => {
        return new MATR(1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            T.X, T.Y, T.Z, 1);
    }
    MatrScale = (S) => {
        return new MATR(S.X, 0, 0, 0,
            0, S.Y, 0, 0,
            0, 0, S.Z, 0,
            0, 0, 0, 1);
    }
    MatrTranspose = () => {
        let M = this;

        return new MATR(M.A[0][0], M.A[1][0], M.A[2][0], M.A[3][0],
            M.A[0][1], M.A[1][1], M.A[2][1], M.A[3][1],
            M.A[0][2], M.A[1][2], M.A[2][2], M.A[3][2],
            M.A[0][3], M.A[1][3], M.A[2][3], M.A[3][3]);
    }
    MatrDeterm3x3 = (A11, A12, A13, A21, A22, A23, A31, A32, A33) => {
        return A11 * A22 * A33 + A12 * A23 * A31 + A13 * A21 * A32 - A11 * A23 * A32 - A12 * A21 * A33 - A13 * A22 * A31;
    }
    MatrDeterm = () => {
        let M = this;

        return M.A[0][0] * M.MatrDeterm3x3(M.A[1][1], M.A[1][2], M.A[1][3],
            M.A[2][1], M.A[2][2], M.A[2][3],
            M.A[3][1], M.A[3][2], M.A[3][3]) +

            -M.A[0][1] * M.MatrDeterm3x3(M.A[1][0], M.A[1][2], M.A[1][3],
                M.A[2][0], M.A[2][2], M.A[2][3],
                M.A[3][0], M.A[3][2], M.A[3][3]) +

            M.A[0][2] * M.MatrDeterm3x3(M.A[1][0], M.A[1][1], M.A[1][3],
                M.A[2][0], M.A[2][1], M.A[2][3],
                M.A[3][0], M.A[3][1], M.A[3][3]) +

            -M.A[0][3] * M.MatrDeterm3x3(M.A[1][0], M.A[1][1], M.A[1][2],
                M.A[2][0], M.A[2][1], M.A[2][2],
                M.A[3][0], M.A[3][1], M.A[3][2]);
    }
    MatrInverse = () => {
        let M = this;
        let det = M.MatrDeterm();

        let r = new MATR(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

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
}

export let UnitMatrix = new MATR(1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1)


export function MatrMulMatr(M1, M2) {
    let r = new MATR(
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
    return new VEC3(X, Y, Z);
}
export function Vec3AddVec3(V1, V2) {
    return new VEC3(V1.X + V2.X, V1.Y + V2.Y, V1.Z + V2.Z);
}
export function Vec3SubVec3(V1, V2) {
    return new VEC3(V1.X - V2.X, V1.Y - V2.Y, V1.Z - V2.Z);
}
export function Vec3MulVec3(V1, V2) {
    return new VEC3(V1.X * V2.X, V1.Y * V2.Y, V1.Z * V2.Z);
}
export function Vec3MulNum(V1, N) {
    return new VEC3(V1.X * N, V1.Y * N, V1.Z * N);
}
export function Vec3DivNum(V, N) {
    if (N != 0)
        return new VEC3(V.X / N, V.Y / N, V.Z / N);
    else
        return V;
}
export function Vec3Neg(V) {
    return new VEC3(-V.X, -V.Y, -V.Z);
}
export function Vec3DotVec3(V1, V2) {
    return V1.X * V2.X + V1.Y * V2.Y + V1.Z * V2.Z;
}
export function Vec3CrossVec3(V1, V2) {
    return new VEC3(V1.Y * V2.Z - V1.Z * V2.Y, V1.Z * V2.X - V1.X * V2.Z, V1.X * V2.Y - V1.Y * V2.X);
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
    return Vec3Set(V.X * M.A[0][0] + V.Y * M.A[1][0] + V.Z * M.A[2][0] + M.A[3][0],
        V.X * M.A[0][1] + V.Y * M.A[1][1] + V.Z * M.A[2][1] + M.A[3][1],
        V.X * M.A[0][2] + V.Y * M.A[1][2] + V.Z * M.A[2][2] + M.A[3][2]);
}
export function VectorTransform(V, M) {
    return Vec3Set(V.X * M.A[0][0] + V.Y * M.A[1][0] + V.Z * M.A[2][0],
        V.X * M.A[0][1] + V.Y * M.A[1][1] + V.Z * M.A[2][1],
        V.X * M.A[0][2] + V.Y * M.A[1][2] + V.Z * M.A[2][2]);
}
export function Vec3MulMatr(V, M) {
    let w = V.X * M.A[0][3] + V.Y * M.A[1][3] + V.Z * M.A[2][3] + M.A[3][3];

    let r = new VEC3((V.X * M.A[0][0] + V.Y * M.A[1][0] + V.Z * M.A[2][0] + M.A[3][0]) / w,
        (V.X * M.A[0][1] + V.Y * M.A[1][1] + V.Z * M.A[2][1] + M.A[3][1]) / w,
        (V.X * M.A[0][2] + V.Y * M.A[1][2] + V.Z * M.A[2][2] + M.A[3][2]) / w);
    return r;
}
export function MatrView(Loc, At, Up1) {
    let Dir = Vec3Normalize(Vec3SubVec3(At, Loc));
    let Right = Vec3Normalize(Vec3CrossVec3(Dir, Up1));
    let Up = Vec3Normalize(Vec3CrossVec3(Right, Dir));

    let m = new MATR(Right.X, Up.X, -Dir.X, 0,
        Right.Y, Up.Y, -Dir.Y, 0,
        Right.Z, Up.Z, -Dir.Z, 0,
        -Vec3DotVec3(Loc, Right), -Vec3DotVec3(Loc, Up), Vec3DotVec3(Loc, Dir), 1);
    return m;
}
export function MatrFrustum(L, R, B, T, N, F) {
    let m = new MATR(2 * N / (R - L), 0, 0, 0,
        0, 2 * N / (T - B), 0, 0,
        (R + L) / (R - L), (T + B) / (T - B), -(F + N) / (F - N), -1,
        0, 0, - 2 * N * F / (F - N), 0);
    return m;
}