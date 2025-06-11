(function (exports) {
    'use strict';

    /* Tretyakov Andrey (AT7), 10-7, 04.06.2025, math module */

    /* Pi math constant */
    let PI = 3.14159265358979323846;

    class Vec3 {
        constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }
    class Vec4 {
        constructor(x, y, z, w) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
    }
    class Matr {
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
    function MatrTranslate(T) {
        return new Matr(1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            T.x, T.y, T.z, 1);
    }
    function MatrScale(S) {
        return new Matr(S.x, 0, 0, 0,
            0, S.y, 0, 0,
            0, 0, S.z, 0,
            0, 0, 0, 1);
    }

    function MatrRotate(AngleInDegrees, R) {
        let s = Math.sin(AngleInDegrees / 180 * PI), c = Math.cos(AngleInDegrees / 180 * PI),
            x = R.x, y = R.y, z = R.z;

        return new Matr(x * x * (1 - c) + c, x * y * (1 - c) + z * s, x * z * (1 - c) - y * s, 0,
            x * y * (1 - c) - z * s, y * y * (1 - c) + c, y * z * (1 - c) + x * s, 0,
            x * z * (1 - c) + y * s, y * z * (1 - c) - x * s, z * z * (1 - c) + c, 0,
            0, 0, 0, 1);
    }
    let UnitMatrix = new Matr(1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1);
    function MatrMulMatr(M1, M2) {
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
            M1.A[3][0] * M2.A[0][3] + M1.A[3][1] * M2.A[1][3] + M1.A[3][2] * M2.A[2][3] + M1.A[3][3] * M2.A[3][3]);
        return r;
    }
    function Vec3Set(X, Y, Z) {
        return new Vec3(X, Y, Z);
    }
    function Vec3SubVec3(V1, V2) {
        return new Vec3(V1.x - V2.x, V1.y - V2.y, V1.z - V2.z);
    }
    function Vec3DivNum(V, N) {
        if (N != 0)
            return new Vec3(V.x / N, V.y / N, V.z / N);
        else
            return V;
    }
    function Vec3DotVec3(V1, V2) {
        return V1.x * V2.x + V1.y * V2.y + V1.z * V2.z;
    }
    function Vec3CrossVec3(V1, V2) {
        return new Vec3(V1.y * V2.z - V1.z * V2.y, V1.z * V2.x - V1.x * V2.z, V1.x * V2.y - V1.y * V2.x);
    }
    function Vec3Normalize(V) {
        let len = Vec3DotVec3(V, V);

        if (len != 0 && len != 1)
            return Vec3DivNum(V, Math.sqrt(len));
        else
            return V;
    }
    function MatrView(Loc, At, Up1) {
        let Dir = Vec3Normalize(Vec3SubVec3(At, Loc));
        let Right = Vec3Normalize(Vec3CrossVec3(Dir, Up1));
        let Up = Vec3Normalize(Vec3CrossVec3(Right, Dir));

        let m = new Matr(Right.x, Up.x, -Dir.x, 0,
            Right.y, Up.y, -Dir.y, 0,
            Right.z, Up.z, -Dir.z, 0,
            -Vec3DotVec3(Loc, Right), -Vec3DotVec3(Loc, Up), Vec3DotVec3(Loc, Dir), 1);
        return m;
    }
    function MatrFrustum(L, R, B, T, N, F) {
        let m = new Matr(2 * N / (R - L), 0, 0, 0,
            0, 2 * N / (T - B), 0, 0,
            (R + L) / (R - L), (T + B) / (T - B), -300.1 / (F - N), -1,
            0, 0, -2 * N * F / (F - N), 0);
        return m;
    }

    function CamSetProj(W, H, ProjSize, ProjDist, ProjFarClip) {
        let Wp = ProjSize, Hp = ProjSize;
        if (W >= H)
            Wp *= W / H;
        else
            Hp *= H / W;

        return MatrFrustum(-Wp / 2, Wp / 2, -Hp / 2, Hp / 2, ProjDist, ProjFarClip);
    }

    function ArrFromVec3(V) {
        return [V.x, V.y, V.z]
    }
    function Vec4Set(X, Y, Z, W) {
        return new Vec4(X, Y, Z, W);
    }

    /* Tretyakov Andrey (AT7), 10-7, 05.06.2025, shaders support module */
    let vs, fs;
    let program;

    let u_time_location,
        u_frame_w_location,
        u_frame_h_location,
        u_matrVP_location,
        u_matrW_location,
        u_camDir_location,
        u_camLoc_location;

    const ft1 = fetch("./shaders/vert.glsl")
        .then((res) => res.text())
        .then((data) => {
            vs = data;
        });

    const ft2 = fetch("./shaders/frag.glsl")
        .then((res) => res.text())
        .then((data) => {
            fs = data;
        });

    function loadShader(shaderStr, type, gl) {
        const shader = gl.createShader(type);

        gl.shaderSource(shader, shaderStr);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
        }
        return shader;
    }

    function getUniformLocations(gl) {
        u_time_location = gl.getUniformLocation(program, "u_time");
        u_frame_w_location = gl.getUniformLocation(program, "FrameW");
        u_frame_h_location = gl.getUniformLocation(program, "FrameH");
        u_matrVP_location = gl.getUniformLocation(program, "MatrVP");
        u_matrW_location = gl.getUniformLocation(program, "MatrW");
        u_camDir_location = gl.getUniformLocation(program, "CamDir");
        u_camLoc_location = gl.getUniformLocation(program, "CamLoc");
    }

    async function initShaders(gl) {
        await Promise.all([ft1, ft2]);
        vs = loadShader(vs, gl.VERTEX_SHADER, gl);
        fs = loadShader(fs, gl.FRAGMENT_SHADER, gl);
        program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const Buf = gl.getProgramInfoLog(program);
            console.log(Buf);
        }
        gl.useProgram(program);
        getUniformLocations(gl);
    }

    /* Tretyakov Andrey (AT7), 10-7, 06.06.2025, render module */

    let FrameW, FrameH;
    let timeFromStart;
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
    function initGL(canvas) {
        gl = canvas.getContext("webgl2");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
        FrameW = canvas.width;
        FrameH = canvas.height;
        initShaders(gl);
        initBuffers();
        gl.enable(gl.DEPTH_TEST);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        initGlobalDrawQueue();
    }

    let globalMatrW = UnitMatrix;
    function drawScene() {
        if (exports.isPause)
            timeFromStart = exports.pausetime;
        else
            timeFromStart = (new Date()).getTime() - exports.startTime - exports.pausetime;

        gl.clearColor(198 / 255, 251 / 255, 251 / 255, 1);
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 40, 0);
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 40, 12);
        gl.enableVertexAttribArray(2);
        gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 40, 28);

        /* Set camera and triangle points */
        let loc = new Vec3(15 + Math.cos(timeFromStart / 500 / 2) * 30, 15 + 30 * Math.sin(timeFromStart / 500 / 2), 15 + Math.sin(timeFromStart / 500 / 2) * 30);
        let at = new Vec3(15, 15, 15);
        let up = new Vec3(0, 1, 0);
        let MatrV = MatrView(loc, at, up);
        let MatrP = CamSetProj(FrameW, FrameH, 0.1, 0.1, 300);
        let MatrVP = MatrMulMatr(MatrV, MatrP);


        let MatrW = MatrTranslate(Vec3Set(2, 0, 2 + 2 * Math.cos(timeFromStart / 500 * PI)));
        MatrW = MatrMulMatr(MatrScale(Vec3Set(6, 6, 6)), MatrW);

        MatrMulMatr(MatrW, MatrVP);

        gl.uniform1f(u_time_location, timeFromStart / 1000.0);
        gl.uniform1f(u_frame_w_location, FrameW);
        gl.uniform1f(u_frame_h_location, FrameH);
        gl.uniform3fv(u_camDir_location, new Float32Array(ArrFromVec3(Vec3Normalize(Vec3SubVec3(loc, at)))), 0, 3);
        gl.uniform3fv(u_camLoc_location, new Float32Array(ArrFromVec3(Vec3Normalize(loc))), 0, 3);
        gl.uniformMatrix4fv(u_matrVP_location, false, new Float32Array(MatrVP.A[0].concat(MatrVP.A[1].concat(MatrVP.A[2].concat(MatrVP.A[3]))), 0, 16));
        gl.uniformMatrix4fv(u_matrW_location, false, new Float32Array(MatrW.A[0].concat(MatrW.A[1].concat(MatrW.A[2].concat(MatrW.A[3]))), 0, 16));

        globalMatrW = MatrMulMatr(MatrScale(Vec3Set(1 + 0.5 * Math.sin(timeFromStart / 100 / 2),
            1 + 0.5 * Math.sin(timeFromStart / 100 / 2),
            1 + 0.5 * Math.sin(timeFromStart / 100 / 2))), MatrRotate(timeFromStart / 1000 * 60, Vec3Set(0, 1, 0)));

        drawGloabalQueue(gl);
        window.requestAnimationFrame(drawScene);
    }

    /* Tretyakov Andrey (AT7), 10-7, 05.06.2025, geometry module */


    class Vertex {
        constructor(pos, color, normal) {
            this.pos = pos,
                this.color = color,
                this.normal = normal;
        }
    }

    function unitePosColorNormal(posArr, colorArr, normalArr) {
        let vertArr = [];
        for (let i = 0; i < posArr.length; i++)
            vertArr[i] = new Vertex(posArr[i], colorArr[i], normalArr[i]);
        return vertArr;
    }

    function getFloatArrayFromVertexArray(vertArr) {
        let res = [];
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

    function setDefaultCubeGeom() {
        let a = Math.sqrt(3) / 3;
        let vertices = [Vec3Normalize(Vec3Set(-a, -a, -a)),
        Vec3Normalize(Vec3Set(a, -a, -a)),
        Vec3Normalize(Vec3Set(-a, -a, a)),
        Vec3Normalize(Vec3Set(a, -a, a)),
        Vec3Normalize(Vec3Set(-a, a, -a)),
        Vec3Normalize(Vec3Set(a, a, -a)),
        Vec3Normalize(Vec3Set(-a, a, a)),
        Vec3Normalize(Vec3Set(a, a, a))];

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

    function setDefaultTetrahedronGeom() {
        let a = Math.sqrt(3) / 3;
        let vertices = [Vec3Normalize(Vec3Set(-a, -a, -a)),
        Vec3Normalize(Vec3Set(a, -a, a)),
        Vec3Normalize(Vec3Set(a, a, -a)),
        Vec3Normalize(Vec3Set(-a, a, a))];
        let Indices = [
            0, 1, 2,
            0, 2, 3,
            0, 1, 3,
            1, 2, 3
        ];
        let normals = vertices;
        return [vertices, normals, Indices];
    }

    function setDefaultOctahedronGeom() {
        let vertices = [Vec3Set(-1, 0, 0),
        Vec3Set(0, 0, 1),
        Vec3Set(1, 0, 0),
        Vec3Set(0, 0, -1),
        Vec3Set(0, 1, 0),
        Vec3Set(0, -1, 0)];
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

    function setDefaultIcosahedronGeom() {
        let vertices = [];

        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < 5; i++) {
                vertices[j * 5 + i] = Vec3Normalize(Vec3Set(Math.cos(2 * i * PI / 5 + PI * j), j - 0.5, Math.sin(2 * i * PI / 5 + PI * j)));
            }
        }
        vertices[10] = Vec3Set(0, -1, 0);
        vertices[11] = Vec3Set(0, 1, 0);
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
        return new Vec3(V1.x + V2.x + V3.x, V1.y + V2.y + V3.y, V1.z + V2.z + V3.z);
    }

    function setDefaultDodecahedronGeom() {
        let vertices = [];
        let icos = setDefaultIcosahedronGeom();
        let ind = icos[2];
        let vert = icos[0];

        for (let i = 0; i < 20; i++)
            vertices[i] = Vec3Normalize(getMedianVector3(vert[ind[i * 3]], vert[ind[i * 3 + 1]], vert[ind[i * 3 + 2]]));
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
                Indices[i * 9 + 4] = 10 + (i - 1) / 2;
                Indices[i * 9 + 5] = 10 + ((i - 1) / 2 + 1) % 5;
                Indices[i * 9 + 6] = i;
                Indices[i * 9 + 7] = (i + 2) % 10;
                Indices[i * 9 + 8] = 10 + ((i - 1) / 2 + 1) % 5;
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

    let globalDrawQueue;


    function initGlobalDrawQueue() {
        globalDrawQueue = [];
    }

    function drawGloabalQueue(gl) {
        for (let i = 0; i < globalDrawQueue.length; i++) {
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                globalDrawQueue[i][1],
                gl.STATIC_DRAW
            );

            /*
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, rnd.indexBuffer);
            gl.bufferData(
                gl.ELEMENT_ARRAY_BUFFER,
                new Uint32Array(globalDrawQueue[i][2]),
                gl.STATIC_DRAW
            ); 
            */
            gl.uniformMatrix4fv(u_matrW_location, false, new Float32Array(globalDrawQueue[i][0].A[0].concat(globalDrawQueue[i][0].A[1].concat(globalDrawQueue[i][0].A[2].concat(globalDrawQueue[i][0].A[3]))), 0, 16));
            //gl.drawElements(gl.TRIANGLES, globalDrawQueue[i][2].length, gl.UNSIGNED_INT, 0);
            gl.drawArrays(gl.TRIANGLES, 0, globalDrawQueue[i][1].length / 10);
        }
    }

    function getNormalGeom(vert, ind) {
        let vertices = [];
        let normals = [];

        for (let i = 0; i < ind.length; i += 3) {
            vertices[i] = vert[ind[i]];
            vertices[i + 1] = vert[ind[i + 1]];
            vertices[i + 2] = vert[ind[i + 2]];
            normals[i] = Vec3Normalize(Vec3CrossVec3(Vec3SubVec3(vertices[i + 1], vertices[i]), Vec3SubVec3(vertices[i + 2], vertices[i])));
            normals[i + 1] = normals[i];
            normals[i + 2] = normals[i];
        }
        return [vertices, normals];
    }

    function addToDrawQueue(matrW, vertexData, indices) {
        globalDrawQueue.push([MatrMulMatr(globalMatrW, matrW), vertexData, indices]);
    }
    function popDrawQueue() {
        globalDrawQueue.pop();
    }
    function clearDrawQueue() {
        globalDrawQueue = [];
    }

    /* Tretyakov Andrey (AT7), 10-7, 06.06.2025, main module */


    //import * as shd from "./shaders/shaders.js"
    exports.startTime = void 0; exports.pausetime = 0.0;
    exports.isPause = false;

    function onStart() {
        console.log("AT7 Platon's figures task");

        let canvas = document.getElementById("webgl-canvas");

        initGL(canvas);

        exports.startTime = (new Date()).getTime();

        document.getElementById("Pause").onclick = function () {
            exports.isPause = !exports.isPause;
            exports.pausetime = timeFromStart;
        };

        document.getElementById("Cube").onclick = function () {
            let cube1 = setDefaultCubeGeom();
            let vert = cube1[0];
            let ind = cube1[2];
            let cube2 = getNormalGeom(vert, ind);
            let vertices = cube2[0], normals = cube2[1];
            let matrW = MatrTranslate(Vec3Set(Math.random() * 30, Math.random() * 30, Math.random() * 30));

            let colors = new Array(vertices.length).fill(Vec4Set(1, 0, 1, 1), 0, vertices.length);
            let vertexData = unitePosColorNormal(vertices, colors, normals);
            vertexData = getFloatArrayFromVertexArray(vertexData);
            addToDrawQueue(matrW, vertexData, ind);
        };

        document.getElementById("Tetrahedron").onclick = function () {
            let Tetrahedron1 = setDefaultTetrahedronGeom();
            let vert = Tetrahedron1[0];
            let ind = Tetrahedron1[2];
            let Tetrahedron2 = getNormalGeom(vert, ind);
            let vertices = Tetrahedron2[0], normals = Tetrahedron2[1];
            let matrW = MatrTranslate(Vec3Set(Math.random() * 30, Math.random() * 30, Math.random() * 30));

            let colors = new Array(vertices.length).fill(Vec4Set(1, 0, 1, 1), 0, vertices.length);
            let vertexData = unitePosColorNormal(vertices, colors, normals);
            vertexData = getFloatArrayFromVertexArray(vertexData);
            addToDrawQueue(matrW, vertexData, ind);

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
            let Octahedron1 = setDefaultOctahedronGeom();
            let vert = Octahedron1[0];
            let ind = Octahedron1[2];
            let Octahedron2 = getNormalGeom(vert, ind);
            let vertices = Octahedron2[0], normals = Octahedron2[1];
            let matrW = MatrTranslate(Vec3Set(Math.random() * 30, Math.random() * 30, Math.random() * 30));

            let colors = new Array(vertices.length).fill(Vec4Set(1, 0, 1, 1), 0, vertices.length);
            let vertexData = unitePosColorNormal(vertices, colors, normals);
            vertexData = getFloatArrayFromVertexArray(vertexData);
            addToDrawQueue(matrW, vertexData, ind);

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
            let Icosahedron1 = setDefaultIcosahedronGeom();
            let vert = Icosahedron1[0];
            let ind = Icosahedron1[2];
            let Icosahedron2 = getNormalGeom(vert, ind);
            let vertices = Icosahedron2[0], normals = Icosahedron2[1];
            let matrW = MatrTranslate(Vec3Set(Math.random() * 30, Math.random() * 30, Math.random() * 30));

            let colors = new Array(vertices.length).fill(Vec4Set(1, 0, 1, 1), 0, vertices.length);
            let vertexData = unitePosColorNormal(vertices, colors, normals);
            vertexData = getFloatArrayFromVertexArray(vertexData);
            addToDrawQueue(matrW, vertexData, ind);


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
            let Dodecahedron1 = setDefaultDodecahedronGeom();
            let vert = Dodecahedron1[0];
            let ind = Dodecahedron1[2];
            let Dodecahedron2 = getNormalGeom(vert, ind);
            let vertices = Dodecahedron2[0], normals = Dodecahedron2[1];
            let matrW = MatrTranslate(Vec3Set(Math.random() * 30, Math.random() * 30, Math.random() * 30));

            let colors = new Array(vertices.length).fill(Vec4Set(1, 0, 1, 1), 0, vertices.length);
            let vertexData = unitePosColorNormal(vertices, colors, normals);
            vertexData = getFloatArrayFromVertexArray(vertexData);
            addToDrawQueue(matrW, vertexData, ind);

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
            popDrawQueue();
        };
        document.getElementById("Clear").onclick = function () {
            clearDrawQueue();
        };
        document.addEventListener('keydown', function (event) {
            if (event.code == 'KeyW') ;
        });

        drawScene();
    }
    window.addEventListener("load", () => { onStart(); });

    //window.onresize = () => { rnd.FrameW = document.getElementById("canvas").clientWidth, rnd.FrameH = document.getElementById("canvas").clientHeight }
    //window.event.

    return exports;

})({});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbXRoLmpzIiwic2hhZGVycy9zaGFkZXJzLmpzIiwiLi4vcm5kLmpzIiwiLi4vcGxhdC5qcyIsIi4uL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogVHJldHlha292IEFuZHJleSAoQVQ3KSwgMTAtNywgMDQuMDYuMjAyNSwgbWF0aCBtb2R1bGUgKi9cclxuXHJcbi8qIFBpIG1hdGggY29uc3RhbnQgKi9cclxuZXhwb3J0IGxldCBQSSA9IDMuMTQxNTkyNjUzNTg5NzkzMjM4NDY7XHJcblxyXG5leHBvcnQgY2xhc3MgVmVjMyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB6KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMueiA9IHo7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFZlYzQge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgeiwgdykge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLnogPSB6O1xyXG4gICAgICAgIHRoaXMudyA9IHc7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIE1hdHIge1xyXG4gICAgY29uc3RydWN0b3IoQTAwLCBBMDEsIEEwMiwgQTAzLFxyXG4gICAgICAgIEExMCwgQTExLCBBMTIsIEExMyxcclxuICAgICAgICBBMjAsIEEyMSwgQTIyLCBBMjMsXHJcbiAgICAgICAgQTMwLCBBMzEsIEEzMiwgQTMzKSB7XHJcbiAgICAgICAgdGhpcy5BID1cclxuICAgICAgICAgICAgW1tBMDAsIEEwMSwgQTAyLCBBMDNdLFxyXG4gICAgICAgICAgICBbQTEwLCBBMTEsIEExMiwgQTEzXSxcclxuICAgICAgICAgICAgW0EyMCwgQTIxLCBBMjIsIEEyM10sXHJcbiAgICAgICAgICAgIFtBMzAsIEEzMSwgQTMyLCBBMzNdXTtcclxuICAgIH07XHJcbn1cclxuZXhwb3J0IGNsYXNzIENBTUVSQSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihsb2MsIGF0LCB1cCwgdywgaCwgcHJvalNpemUsIFByb2pEaXN0LCBmYXJDbGlwKSB7XHJcbiAgICAgICAgdGhpcy5tYXRyVmlldyA9IE1hdHJWaWV3KGxvYywgYXQsIHVwKTtcclxuICAgICAgICB0aGlzLmxvYyA9IGxvYztcclxuICAgICAgICB0aGlzLmF0ID0gYXQ7XHJcbiAgICAgICAgdGhpcy51cCA9IFZlYzNTZXQodGhpcy5tYXRyVmlldy5BWzBdWzFdLCB0aGlzLm1hdHJWaWV3LkFbMV1bMV0sIHRoaXMubWF0clZpZXcuQVsyXVsxXSk7XHJcbiAgICAgICAgdGhpcy5SaWdodCA9IFZlYzNTZXQodGhpcy5tYXRyVmlldy5BWzBdWzBdLCB0aGlzLm1hdHJWaWV3LkFbMV1bMF0sIHRoaXMubWF0clZpZXcuQVsyXVswXSk7XHJcbiAgICAgICAgdGhpcy5EaXIgPSBWZWMzU2V0KC10aGlzLm1hdHJWaWV3LkFbMF1bMl0sIC10aGlzLm1hdHJWaWV3LkFbMV1bMl0sIC10aGlzLm1hdHJWaWV3LkFbMl1bMl0pO1xyXG4gICAgICAgIHRoaXMubWF0clByb2ogPSBDYW1TZXRQcm9qKHcsIGgsIHByb2pTaXplLCBwcm9qRGlzdCwgZmFyQ2xpcCk7XHJcbiAgICAgICAgdGhpcy5tYXRyVlAgPSBNYXRyTXVsTWF0cih0aGlzLm1hdHJWaWV3LCB0aGlzLm1hdHJQcm9qKTtcclxuICAgIH1cclxuICAgIGNhbVVwZGF0ZSA9IChsb2MsIGF0LCB1cCkgPT4ge1xyXG4gICAgICAgIHRoaXMubWF0clZpZXcgPSBNYXRyVmlldyhsb2MsIGF0LCB1cCk7XHJcbiAgICAgICAgdGhpcy5sb2MgPSBsb2M7XHJcbiAgICAgICAgdGhpcy5hdCA9IGF0O1xyXG4gICAgICAgIHRoaXMudXAgPSBWZWMzU2V0KHRoaXMubWF0clZpZXcuQVswXVsxXSwgdGhpcy5tYXRyVmlldy5BWzFdWzFdLCB0aGlzLm1hdHJWaWV3LkFbMl1bMV0pO1xyXG4gICAgICAgIHRoaXMuUmlnaHQgPSBWZWMzU2V0KHRoaXMubWF0clZpZXcuQVswXVswXSwgdGhpcy5tYXRyVmlldy5BWzFdWzBdLCB0aGlzLm1hdHJWaWV3LkFbMl1bMF0pO1xyXG4gICAgICAgIHRoaXMuRGlyID0gVmVjM1NldCgtdGhpcy5tYXRyVmlldy5BWzBdWzJdLCAtdGhpcy5tYXRyVmlldy5BWzFdWzJdLCAtdGhpcy5tYXRyVmlldy5BWzJdWzJdKTtcclxuICAgICAgICB0aGlzLm1hdHJQcm9qID0gQ2FtU2V0UHJvaih3LCBoLCBwcm9qU2l6ZSwgcHJvakRpc3QsIGZhckNsaXApO1xyXG4gICAgICAgIHRoaXMubWF0clZQID0gTWF0ck11bE1hdHIodGhpcy5tYXRyVmlldywgdGhpcy5tYXRyUHJvaik7XHJcbiAgICB9XHJcbiAgICBsb2NBZGQgPSAodikgPT4ge1xyXG4gICAgICAgIHRoaXMubG9jID0gVmVjM0FkZFZlYzModGhpcy5sb2MsIHYpO1xyXG4gICAgICAgIHRoaXMuY2FtVXBkYXRlKHRoaXMubG9jLCB0aGlzLmF0LCB0aGlzLnVwKTtcclxuICAgIH1cclxuICAgIGF0VXBkYXRlID0gKGRpcikgPT4ge1xyXG4gICAgICAgIHRoaXMuYXQgPSBWZWMzQWRkVmVjMyh0aGlzLmxvYywgZGlyKTtcclxuICAgICAgICB0aGlzLmNhbVVwZGF0ZSh0aGlzLmxvYywgdGhpcy5hdCwgdGhpcy51cCk7XHJcbiAgICB9XHJcblxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBNYXRyVHJhbnNsYXRlKFQpIHtcclxuICAgIHJldHVybiBuZXcgTWF0cigxLCAwLCAwLCAwLFxyXG4gICAgICAgIDAsIDEsIDAsIDAsXHJcbiAgICAgICAgMCwgMCwgMSwgMCxcclxuICAgICAgICBULngsIFQueSwgVC56LCAxKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gTWF0clNjYWxlKFMpIHtcclxuICAgIHJldHVybiBuZXcgTWF0cihTLngsIDAsIDAsIDAsXHJcbiAgICAgICAgMCwgUy55LCAwLCAwLFxyXG4gICAgICAgIDAsIDAsIFMueiwgMCxcclxuICAgICAgICAwLCAwLCAwLCAxKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1hdHJSb3RhdGUoQW5nbGVJbkRlZ3JlZXMsIFIpIHtcclxuICAgIGxldCBzID0gTWF0aC5zaW4oQW5nbGVJbkRlZ3JlZXMgLyAxODAgKiBQSSksIGMgPSBNYXRoLmNvcyhBbmdsZUluRGVncmVlcyAvIDE4MCAqIFBJKSxcclxuICAgICAgICB4ID0gUi54LCB5ID0gUi55LCB6ID0gUi56O1xyXG5cclxuICAgIHJldHVybiBuZXcgTWF0cih4ICogeCAqICgxIC0gYykgKyBjLCB4ICogeSAqICgxIC0gYykgKyB6ICogcywgeCAqIHogKiAoMSAtIGMpIC0geSAqIHMsIDAsXHJcbiAgICAgICAgeCAqIHkgKiAoMSAtIGMpIC0geiAqIHMsIHkgKiB5ICogKDEgLSBjKSArIGMsIHkgKiB6ICogKDEgLSBjKSArIHggKiBzLCAwLFxyXG4gICAgICAgIHggKiB6ICogKDEgLSBjKSArIHkgKiBzLCB5ICogeiAqICgxIC0gYykgLSB4ICogcywgeiAqIHogKiAoMSAtIGMpICsgYywgMCxcclxuICAgICAgICAwLCAwLCAwLCAxKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gTWF0clRyYW5zcG9zZShNKSB7XHJcbiAgICByZXR1cm4gbmV3IE1hdHIoTS5BWzBdWzBdLCBNLkFbMV1bMF0sIE0uQVsyXVswXSwgTS5BWzNdWzBdLFxyXG4gICAgICAgIE0uQVswXVsxXSwgTS5BWzFdWzFdLCBNLkFbMl1bMV0sIE0uQVszXVsxXSxcclxuICAgICAgICBNLkFbMF1bMl0sIE0uQVsxXVsyXSwgTS5BWzJdWzJdLCBNLkFbM11bMl0sXHJcbiAgICAgICAgTS5BWzBdWzNdLCBNLkFbMV1bM10sIE0uQVsyXVszXSwgTS5BWzNdWzNdKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gTWF0ckRldGVybTN4MyhBMTEsIEExMiwgQTEzLCBBMjEsIEEyMiwgQTIzLCBBMzEsIEEzMiwgQTMzKSB7XHJcbiAgICByZXR1cm4gQTExICogQTIyICogQTMzICsgQTEyICogQTIzICogQTMxICsgQTEzICogQTIxICogQTMyIC0gQTExICogQTIzICogQTMyIC0gQTEyICogQTIxICogQTMzIC0gQTEzICogQTIyICogQTMxO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBNYXRyRGV0ZXJtKE0pIHtcclxuICAgIHJldHVybiBNLkFbMF1bMF0gKiBNYXRyRGV0ZXJtM3gzKE0uQVsxXVsxXSwgTS5BWzFdWzJdLCBNLkFbMV1bM10sXHJcbiAgICAgICAgTS5BWzJdWzFdLCBNLkFbMl1bMl0sIE0uQVsyXVszXSxcclxuICAgICAgICBNLkFbM11bMV0sIE0uQVszXVsyXSwgTS5BWzNdWzNdKSArXHJcblxyXG4gICAgICAgIC1NLkFbMF1bMV0gKiBNYXRyRGV0ZXJtM3gzKE0uQVsxXVswXSwgTS5BWzFdWzJdLCBNLkFbMV1bM10sXHJcbiAgICAgICAgICAgIE0uQVsyXVswXSwgTS5BWzJdWzJdLCBNLkFbMl1bM10sXHJcbiAgICAgICAgICAgIE0uQVszXVswXSwgTS5BWzNdWzJdLCBNLkFbM11bM10pICtcclxuXHJcbiAgICAgICAgTS5BWzBdWzJdICogTWF0ckRldGVybTN4MyhNLkFbMV1bMF0sIE0uQVsxXVsxXSwgTS5BWzFdWzNdLFxyXG4gICAgICAgICAgICBNLkFbMl1bMF0sIE0uQVsyXVsxXSwgTS5BWzJdWzNdLFxyXG4gICAgICAgICAgICBNLkFbM11bMF0sIE0uQVszXVsxXSwgTS5BWzNdWzNdKSArXHJcblxyXG4gICAgICAgIC1NLkFbMF1bM10gKiBNYXRyRGV0ZXJtM3gzKE0uQVsxXVswXSwgTS5BWzFdWzFdLCBNLkFbMV1bMl0sXHJcbiAgICAgICAgICAgIE0uQVsyXVswXSwgTS5BWzJdWzFdLCBNLkFbMl1bMl0sXHJcbiAgICAgICAgICAgIE0uQVszXVswXSwgTS5BWzNdWzFdLCBNLkFbM11bMl0pO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBNYXRySW52ZXJzZShNKSB7XHJcbiAgICBsZXQgZGV0ID0gTWF0ckRldGVybShNKTtcclxuICAgIGxldCByID0gbmV3IE1hdHIoMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCk7XHJcblxyXG4gICAgaWYgKGRldCA9PSAwKSB7XHJcbiAgICAgICAgci5BID0gW1sxLCAwLCAwLCAwXSwgWzAsIDEsIDAsIDBdLCBbMCwgMCwgMSwgMF0sIFswLCAwLCAwLCAxXV07XHJcbiAgICAgICAgcmV0dXJuIHI7XHJcbiAgICB9XHJcbiAgICAvKiBCdWlsZCBhZGpvaW50IG1hdHJpeCAqL1xyXG4gICAgci5BWzBdWzBdID1cclxuICAgICAgICBNYXRyRGV0ZXJtM3gzKE0uQVsxXVsxXSwgTS5BWzFdWzJdLCBNLkFbMV1bM10sXHJcbiAgICAgICAgICAgIE0uQVsyXVsxXSwgTS5BWzJdWzJdLCBNLkFbMl1bM10sXHJcbiAgICAgICAgICAgIE0uQVszXVsxXSwgTS5BWzNdWzJdLCBNLkFbM11bM10pIC8gZGV0O1xyXG4gICAgci5BWzFdWzBdID1cclxuICAgICAgICAtTWF0ckRldGVybTN4MyhNLkFbMV1bMF0sIE0uQVsxXVsyXSwgTS5BWzFdWzNdLFxyXG4gICAgICAgICAgICBNLkFbMl1bMF0sIE0uQVsyXVsyXSwgTS5BWzJdWzNdLFxyXG4gICAgICAgICAgICBNLkFbM11bMF0sIE0uQVszXVsyXSwgTS5BWzNdWzNdKSAvIGRldDtcclxuICAgIHIuQVsyXVswXSA9XHJcbiAgICAgICAgTWF0ckRldGVybTN4MyhNLkFbMV1bMF0sIE0uQVsxXVsxXSwgTS5BWzFdWzNdLFxyXG4gICAgICAgICAgICBNLkFbMl1bMF0sIE0uQVsyXVsxXSwgTS5BWzJdWzNdLFxyXG4gICAgICAgICAgICBNLkFbM11bMF0sIE0uQVszXVsxXSwgTS5BWzNdWzNdKSAvIGRldDtcclxuICAgIHIuQVszXVswXSA9XHJcbiAgICAgICAgLU1hdHJEZXRlcm0zeDMoTS5BWzFdWzBdLCBNLkFbMV1bMV0sIE0uQVsxXVsyXSxcclxuICAgICAgICAgICAgTS5BWzJdWzBdLCBNLkFbMl1bMV0sIE0uQVsyXVsyXSxcclxuICAgICAgICAgICAgTS5BWzNdWzBdLCBNLkFbM11bMV0sIE0uQVszXVsyXSkgLyBkZXQ7XHJcblxyXG4gICAgci5BWzBdWzFdID1cclxuICAgICAgICAtTWF0ckRldGVybTN4MyhNLkFbMF1bMV0sIE0uQVswXVsyXSwgTS5BWzBdWzNdLFxyXG4gICAgICAgICAgICBNLkFbMl1bMV0sIE0uQVsyXVsyXSwgTS5BWzJdWzNdLFxyXG4gICAgICAgICAgICBNLkFbM11bMV0sIE0uQVszXVsyXSwgTS5BWzNdWzNdKSAvIGRldDtcclxuICAgIHIuQVsxXVsxXSA9XHJcbiAgICAgICAgTWF0ckRldGVybTN4MyhNLkFbMF1bMF0sIE0uQVswXVsyXSwgTS5BWzBdWzNdLFxyXG4gICAgICAgICAgICBNLkFbMl1bMF0sIE0uQVsyXVsyXSwgTS5BWzJdWzNdLFxyXG4gICAgICAgICAgICBNLkFbM11bMF0sIE0uQVszXVsyXSwgTS5BWzNdWzNdKSAvIGRldDtcclxuICAgIHIuQVsyXVsxXSA9XHJcbiAgICAgICAgLU1hdHJEZXRlcm0zeDMoTS5BWzBdWzBdLCBNLkFbMF1bMV0sIE0uQVswXVszXSxcclxuICAgICAgICAgICAgTS5BWzJdWzBdLCBNLkFbMl1bMV0sIE0uQVsyXVszXSxcclxuICAgICAgICAgICAgTS5BWzNdWzBdLCBNLkFbM11bMV0sIE0uQVszXVszXSkgLyBkZXQ7XHJcbiAgICByLkFbM11bMV0gPVxyXG4gICAgICAgIE1hdHJEZXRlcm0zeDMoTS5BWzBdWzBdLCBNLkFbMF1bMV0sIE0uQVswXVsyXSxcclxuICAgICAgICAgICAgTS5BWzJdWzBdLCBNLkFbMl1bMV0sIE0uQVsyXVsyXSxcclxuICAgICAgICAgICAgTS5BWzNdWzBdLCBNLkFbM11bMV0sIE0uQVszXVsyXSkgLyBkZXQ7XHJcblxyXG4gICAgci5BWzBdWzJdID1cclxuICAgICAgICBNYXRyRGV0ZXJtM3gzKE0uQVswXVsxXSwgTS5BWzBdWzJdLCBNLkFbMF1bM10sXHJcbiAgICAgICAgICAgIE0uQVsxXVsxXSwgTS5BWzFdWzJdLCBNLkFbMV1bM10sXHJcbiAgICAgICAgICAgIE0uQVszXVsxXSwgTS5BWzNdWzJdLCBNLkFbM11bM10pIC8gZGV0O1xyXG4gICAgci5BWzFdWzJdID1cclxuICAgICAgICAtTWF0ckRldGVybTN4MyhNLkFbMF1bMF0sIE0uQVswXVsyXSwgTS5BWzBdWzNdLFxyXG4gICAgICAgICAgICBNLkFbMV1bMF0sIE0uQVsxXVsyXSwgTS5BWzFdWzNdLFxyXG4gICAgICAgICAgICBNLkFbM11bMF0sIE0uQVszXVsyXSwgTS5BWzNdWzNdKSAvIGRldDtcclxuICAgIHIuQVsyXVsyXSA9XHJcbiAgICAgICAgTWF0ckRldGVybTN4MyhNLkFbMF1bMF0sIE0uQVswXVsxXSwgTS5BWzBdWzNdLFxyXG4gICAgICAgICAgICBNLkFbMV1bMF0sIE0uQVsxXVsxXSwgTS5BWzFdWzNdLFxyXG4gICAgICAgICAgICBNLkFbM11bMF0sIE0uQVszXVsxXSwgTS5BWzNdWzNdKSAvIGRldDtcclxuICAgIHIuQVszXVsyXSA9XHJcbiAgICAgICAgLU1hdHJEZXRlcm0zeDMoTS5BWzBdWzBdLCBNLkFbMF1bMV0sIE0uQVswXVsyXSxcclxuICAgICAgICAgICAgTS5BWzFdWzBdLCBNLkFbMV1bMV0sIE0uQVsxXVsyXSxcclxuICAgICAgICAgICAgTS5BWzNdWzBdLCBNLkFbM11bMV0sIE0uQVszXVsyXSkgLyBkZXQ7XHJcblxyXG4gICAgci5BWzBdWzNdID1cclxuICAgICAgICAtTWF0ckRldGVybTN4MyhNLkFbMF1bMV0sIE0uQVswXVsyXSwgTS5BWzBdWzNdLFxyXG4gICAgICAgICAgICBNLkFbMV1bMV0sIE0uQVsxXVsyXSwgTS5BWzFdWzNdLFxyXG4gICAgICAgICAgICBNLkFbMl1bMV0sIE0uQVsyXVsyXSwgTS5BWzJdWzNdKSAvIGRldDtcclxuICAgIHIuQVsxXVszXSA9XHJcbiAgICAgICAgTWF0ckRldGVybTN4MyhNLkFbMF1bMF0sIE0uQVswXVsyXSwgTS5BWzBdWzNdLFxyXG4gICAgICAgICAgICBNLkFbMV1bMF0sIE0uQVsxXVsyXSwgTS5BWzFdWzNdLFxyXG4gICAgICAgICAgICBNLkFbMl1bMF0sIE0uQVsyXVsyXSwgTS5BWzJdWzNdKSAvIGRldDtcclxuICAgIHIuQVsyXVszXSA9XHJcbiAgICAgICAgLU1hdHJEZXRlcm0zeDMoTS5BWzBdWzBdLCBNLkFbMF1bMV0sIE0uQVswXVszXSxcclxuICAgICAgICAgICAgTS5BWzFdWzBdLCBNLkFbMV1bMV0sIE0uQVsxXVszXSxcclxuICAgICAgICAgICAgTS5BWzJdWzBdLCBNLkFbMl1bMV0sIE0uQVsyXVszXSkgLyBkZXQ7XHJcbiAgICByLkFbM11bM10gPVxyXG4gICAgICAgIE1hdHJEZXRlcm0zeDMoTS5BWzBdWzBdLCBNLkFbMF1bMV0sIE0uQVswXVsyXSxcclxuICAgICAgICAgICAgTS5BWzFdWzBdLCBNLkFbMV1bMV0sIE0uQVsxXVsyXSxcclxuICAgICAgICAgICAgTS5BWzJdWzBdLCBNLkFbMl1bMV0sIE0uQVsyXVsyXSkgLyBkZXQ7XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5leHBvcnQgbGV0IFVuaXRNYXRyaXggPSBuZXcgTWF0cigxLCAwLCAwLCAwLFxyXG4gICAgMCwgMSwgMCwgMCxcclxuICAgIDAsIDAsIDEsIDAsXHJcbiAgICAwLCAwLCAwLCAxKVxyXG5leHBvcnQgZnVuY3Rpb24gTWF0ck11bE1hdHIoTTEsIE0yKSB7XHJcbiAgICBsZXQgciA9IG5ldyBNYXRyKFxyXG4gICAgICAgIE0xLkFbMF1bMF0gKiBNMi5BWzBdWzBdICsgTTEuQVswXVsxXSAqIE0yLkFbMV1bMF0gKyBNMS5BWzBdWzJdICogTTIuQVsyXVswXSArIE0xLkFbMF1bM10gKiBNMi5BWzNdWzBdLFxyXG4gICAgICAgIE0xLkFbMF1bMF0gKiBNMi5BWzBdWzFdICsgTTEuQVswXVsxXSAqIE0yLkFbMV1bMV0gKyBNMS5BWzBdWzJdICogTTIuQVsyXVsxXSArIE0xLkFbMF1bM10gKiBNMi5BWzNdWzFdLFxyXG4gICAgICAgIE0xLkFbMF1bMF0gKiBNMi5BWzBdWzJdICsgTTEuQVswXVsxXSAqIE0yLkFbMV1bMl0gKyBNMS5BWzBdWzJdICogTTIuQVsyXVsyXSArIE0xLkFbMF1bM10gKiBNMi5BWzNdWzJdLFxyXG4gICAgICAgIE0xLkFbMF1bMF0gKiBNMi5BWzBdWzNdICsgTTEuQVswXVsxXSAqIE0yLkFbMV1bM10gKyBNMS5BWzBdWzJdICogTTIuQVsyXVszXSArIE0xLkFbMF1bM10gKiBNMi5BWzNdWzNdLFxyXG4gICAgICAgIE0xLkFbMV1bMF0gKiBNMi5BWzBdWzBdICsgTTEuQVsxXVsxXSAqIE0yLkFbMV1bMF0gKyBNMS5BWzFdWzJdICogTTIuQVsyXVswXSArIE0xLkFbMV1bM10gKiBNMi5BWzNdWzBdLFxyXG4gICAgICAgIE0xLkFbMV1bMF0gKiBNMi5BWzBdWzFdICsgTTEuQVsxXVsxXSAqIE0yLkFbMV1bMV0gKyBNMS5BWzFdWzJdICogTTIuQVsyXVsxXSArIE0xLkFbMV1bM10gKiBNMi5BWzNdWzFdLFxyXG4gICAgICAgIE0xLkFbMV1bMF0gKiBNMi5BWzBdWzJdICsgTTEuQVsxXVsxXSAqIE0yLkFbMV1bMl0gKyBNMS5BWzFdWzJdICogTTIuQVsyXVsyXSArIE0xLkFbMV1bM10gKiBNMi5BWzNdWzJdLFxyXG4gICAgICAgIE0xLkFbMV1bMF0gKiBNMi5BWzBdWzNdICsgTTEuQVsxXVsxXSAqIE0yLkFbMV1bM10gKyBNMS5BWzFdWzJdICogTTIuQVsyXVszXSArIE0xLkFbMV1bM10gKiBNMi5BWzNdWzNdLFxyXG4gICAgICAgIE0xLkFbMl1bMF0gKiBNMi5BWzBdWzBdICsgTTEuQVsyXVsxXSAqIE0yLkFbMV1bMF0gKyBNMS5BWzJdWzJdICogTTIuQVsyXVswXSArIE0xLkFbMl1bM10gKiBNMi5BWzNdWzBdLFxyXG4gICAgICAgIE0xLkFbMl1bMF0gKiBNMi5BWzBdWzFdICsgTTEuQVsyXVsxXSAqIE0yLkFbMV1bMV0gKyBNMS5BWzJdWzJdICogTTIuQVsyXVsxXSArIE0xLkFbMl1bM10gKiBNMi5BWzNdWzFdLFxyXG4gICAgICAgIE0xLkFbMl1bMF0gKiBNMi5BWzBdWzJdICsgTTEuQVsyXVsxXSAqIE0yLkFbMV1bMl0gKyBNMS5BWzJdWzJdICogTTIuQVsyXVsyXSArIE0xLkFbMl1bM10gKiBNMi5BWzNdWzJdLFxyXG4gICAgICAgIE0xLkFbMl1bMF0gKiBNMi5BWzBdWzNdICsgTTEuQVsyXVsxXSAqIE0yLkFbMV1bM10gKyBNMS5BWzJdWzJdICogTTIuQVsyXVszXSArIE0xLkFbMl1bM10gKiBNMi5BWzNdWzNdLFxyXG4gICAgICAgIE0xLkFbM11bMF0gKiBNMi5BWzBdWzBdICsgTTEuQVszXVsxXSAqIE0yLkFbMV1bMF0gKyBNMS5BWzNdWzJdICogTTIuQVsyXVswXSArIE0xLkFbM11bM10gKiBNMi5BWzNdWzBdLFxyXG4gICAgICAgIE0xLkFbM11bMF0gKiBNMi5BWzBdWzFdICsgTTEuQVszXVsxXSAqIE0yLkFbMV1bMV0gKyBNMS5BWzNdWzJdICogTTIuQVsyXVsxXSArIE0xLkFbM11bM10gKiBNMi5BWzNdWzFdLFxyXG4gICAgICAgIE0xLkFbM11bMF0gKiBNMi5BWzBdWzJdICsgTTEuQVszXVsxXSAqIE0yLkFbMV1bMl0gKyBNMS5BWzNdWzJdICogTTIuQVsyXVsyXSArIE0xLkFbM11bM10gKiBNMi5BWzNdWzJdLFxyXG4gICAgICAgIE0xLkFbM11bMF0gKiBNMi5BWzBdWzNdICsgTTEuQVszXVsxXSAqIE0yLkFbMV1bM10gKyBNMS5BWzNdWzJdICogTTIuQVsyXVszXSArIE0xLkFbM11bM10gKiBNMi5BWzNdWzNdKVxyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzNTZXQoWCwgWSwgWikge1xyXG4gICAgcmV0dXJuIG5ldyBWZWMzKFgsIFksIFopO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMzQWRkVmVjMyhWMSwgVjIpIHtcclxuICAgIHJldHVybiBuZXcgVmVjMyhWMS54ICsgVjIueCwgVjEueSArIFYyLnksIFYxLnogKyBWMi56KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gVmVjM1N1YlZlYzMoVjEsIFYyKSB7XHJcbiAgICByZXR1cm4gbmV3IFZlYzMoVjEueCAtIFYyLngsIFYxLnkgLSBWMi55LCBWMS56IC0gVjIueik7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzNNdWxWZWMzKFYxLCBWMikge1xyXG4gICAgcmV0dXJuIG5ldyBWZWMzKFYxLnggKiBWMi54LCBWMS55ICogVjIueSwgVjEueiAqIFYyLnopO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMzTXVsTnVtKFYxLCBOKSB7XHJcbiAgICByZXR1cm4gbmV3IFZlYzMoVjEueCAqIE4sIFYxLnkgKiBOLCBWMS56ICogTik7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzNEaXZOdW0oViwgTikge1xyXG4gICAgaWYgKE4gIT0gMClcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzMoVi54IC8gTiwgVi55IC8gTiwgVi56IC8gTik7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgcmV0dXJuIFY7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzNOZWcoVikge1xyXG4gICAgcmV0dXJuIG5ldyBWZWMzKC1WLngsIC1WLnksIC1WLnopO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBWZWMzRG90VmVjMyhWMSwgVjIpIHtcclxuICAgIHJldHVybiBWMS54ICogVjIueCArIFYxLnkgKiBWMi55ICsgVjEueiAqIFYyLno7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzNDcm9zc1ZlYzMoVjEsIFYyKSB7XHJcbiAgICByZXR1cm4gbmV3IFZlYzMoVjEueSAqIFYyLnogLSBWMS56ICogVjIueSwgVjEueiAqIFYyLnggLSBWMS54ICogVjIueiwgVjEueCAqIFYyLnkgLSBWMS55ICogVjIueCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzNMZW4oVikge1xyXG4gICAgbGV0IGxlbiA9IFZlYzNEb3RWZWMzKFYsIFYpO1xyXG5cclxuICAgIHJldHVybiBNYXRoLnNxcnQobGVuKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gVmVjM0xlbjIoVikge1xyXG4gICAgbGV0IGxlbiA9IFZlYzNEb3RWZWMzKFYsIFYpO1xyXG5cclxuICAgIHJldHVybiBsZW47XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIFZlYzNOb3JtYWxpemUoVikge1xyXG4gICAgbGV0IGxlbiA9IFZlYzNEb3RWZWMzKFYsIFYpO1xyXG5cclxuICAgIGlmIChsZW4gIT0gMCAmJiBsZW4gIT0gMSlcclxuICAgICAgICByZXR1cm4gVmVjM0Rpdk51bShWLCBNYXRoLnNxcnQobGVuKSk7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgcmV0dXJuIFY7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIFBvaW50VHJhbnNmb3JtKFYsIE0pIHtcclxuICAgIHJldHVybiBWZWMzU2V0KFYueCAqIE0uQVswXVswXSArIFYueSAqIE0uQVsxXVswXSArIFYueiAqIE0uQVsyXVswXSArIE0uQVszXVswXSxcclxuICAgICAgICBWLnggKiBNLkFbMF1bMV0gKyBWLnkgKiBNLkFbMV1bMV0gKyBWLnogKiBNLkFbMl1bMV0gKyBNLkFbM11bMV0sXHJcbiAgICAgICAgVi54ICogTS5BWzBdWzJdICsgVi55ICogTS5BWzFdWzJdICsgVi56ICogTS5BWzJdWzJdICsgTS5BWzNdWzJdKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gVmVjdG9yVHJhbnNmb3JtKFYsIE0pIHtcclxuICAgIHJldHVybiBWZWMzU2V0KFYueCAqIE0uQVswXVswXSArIFYueSAqIE0uQVsxXVswXSArIFYueiAqIE0uQVsyXVswXSxcclxuICAgICAgICBWLnggKiBNLkFbMF1bMV0gKyBWLnkgKiBNLkFbMV1bMV0gKyBWLnogKiBNLkFbMl1bMV0sXHJcbiAgICAgICAgVi54ICogTS5BWzBdWzJdICsgVi55ICogTS5BWzFdWzJdICsgVi56ICogTS5BWzJdWzJdKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gVmVjM011bE1hdHIoViwgTSkge1xyXG4gICAgbGV0IHcgPSBWLnggKiBNLkFbMF1bM10gKyBWLnkgKiBNLkFbMV1bM10gKyBWLnogKiBNLkFbMl1bM10gKyBNLkFbM11bM107XHJcblxyXG4gICAgbGV0IHIgPSBuZXcgVmVjMygoVi54ICogTS5BWzBdWzBdICsgVi55ICogTS5BWzFdWzBdICsgVi56ICogTS5BWzJdWzBdICsgTS5BWzNdWzBdKSAvIHcsXHJcbiAgICAgICAgKFYueCAqIE0uQVswXVsxXSArIFYueSAqIE0uQVsxXVsxXSArIFYueiAqIE0uQVsyXVsxXSArIE0uQVszXVsxXSkgLyB3LFxyXG4gICAgICAgIChWLnggKiBNLkFbMF1bMl0gKyBWLnkgKiBNLkFbMV1bMl0gKyBWLnogKiBNLkFbMl1bMl0gKyBNLkFbM11bMl0pIC8gdyk7XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gTWF0clZpZXcoTG9jLCBBdCwgVXAxKSB7XHJcbiAgICBsZXQgRGlyID0gVmVjM05vcm1hbGl6ZShWZWMzU3ViVmVjMyhBdCwgTG9jKSk7XHJcbiAgICBsZXQgUmlnaHQgPSBWZWMzTm9ybWFsaXplKFZlYzNDcm9zc1ZlYzMoRGlyLCBVcDEpKTtcclxuICAgIGxldCBVcCA9IFZlYzNOb3JtYWxpemUoVmVjM0Nyb3NzVmVjMyhSaWdodCwgRGlyKSk7XHJcblxyXG4gICAgbGV0IG0gPSBuZXcgTWF0cihSaWdodC54LCBVcC54LCAtRGlyLngsIDAsXHJcbiAgICAgICAgUmlnaHQueSwgVXAueSwgLURpci55LCAwLFxyXG4gICAgICAgIFJpZ2h0LnosIFVwLnosIC1EaXIueiwgMCxcclxuICAgICAgICAtVmVjM0RvdFZlYzMoTG9jLCBSaWdodCksIC1WZWMzRG90VmVjMyhMb2MsIFVwKSwgVmVjM0RvdFZlYzMoTG9jLCBEaXIpLCAxKTtcclxuICAgIHJldHVybiBtO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBNYXRyRnJ1c3R1bShMLCBSLCBCLCBULCBOLCBGKSB7XHJcbiAgICBsZXQgbSA9IG5ldyBNYXRyKDIgKiBOIC8gKFIgLSBMKSwgMCwgMCwgMCxcclxuICAgICAgICAwLCAyICogTiAvIChUIC0gQiksIDAsIDAsXHJcbiAgICAgICAgKFIgKyBMKSAvIChSIC0gTCksIChUICsgQikgLyAoVCAtIEIpLCAtKEYgKyBOKSAvIChGIC0gTiksIC0xLFxyXG4gICAgICAgIDAsIDAsIC0gMiAqIE4gKiBGIC8gKEYgLSBOKSwgMCk7XHJcbiAgICByZXR1cm4gbTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIENhbVNldFByb2ooVywgSCwgUHJvalNpemUsIFByb2pEaXN0LCBQcm9qRmFyQ2xpcCkge1xyXG4gICAgbGV0IFdwID0gUHJvalNpemUsIEhwID0gUHJvalNpemU7XHJcbiAgICBpZiAoVyA+PSBIKVxyXG4gICAgICAgIFdwICo9IFcgLyBIO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIEhwICo9IEggLyBXO1xyXG5cclxuICAgIHJldHVybiBNYXRyRnJ1c3R1bSgtV3AgLyAyLCBXcCAvIDIsIC1IcCAvIDIsIEhwIC8gMiwgUHJvakRpc3QsIFByb2pGYXJDbGlwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEFyckZyb21WZWMzKFYpIHtcclxuICAgIHJldHVybiBbVi54LCBWLnksIFYuel1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gVmVjNFNldChYLCBZLCBaLCBXKSB7XHJcbiAgICByZXR1cm4gbmV3IFZlYzQoWCwgWSwgWiwgVyk7XHJcbn0iLCIvKiBUcmV0eWFrb3YgQW5kcmV5IChBVDcpLCAxMC03LCAwNS4wNi4yMDI1LCBzaGFkZXJzIHN1cHBvcnQgbW9kdWxlICovXHJcbmxldCB2cywgZnM7XHJcbmV4cG9ydCBsZXQgcHJvZ3JhbTtcclxuXHJcbmV4cG9ydCBsZXQgdV90aW1lX2xvY2F0aW9uLFxyXG4gICAgdV9mcmFtZV93X2xvY2F0aW9uLFxyXG4gICAgdV9mcmFtZV9oX2xvY2F0aW9uLFxyXG4gICAgdV9tYXRyVlBfbG9jYXRpb24sXHJcbiAgICB1X21hdHJXX2xvY2F0aW9uLFxyXG4gICAgdV9jYW1EaXJfbG9jYXRpb24sXHJcbiAgICB1X2NhbUxvY19sb2NhdGlvbjtcclxuXHJcbmNvbnN0IGZ0MSA9IGZldGNoKFwiLi9zaGFkZXJzL3ZlcnQuZ2xzbFwiKVxyXG4gICAgLnRoZW4oKHJlcykgPT4gcmVzLnRleHQoKSlcclxuICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgdnMgPSBkYXRhO1xyXG4gICAgfSk7XHJcblxyXG5jb25zdCBmdDIgPSBmZXRjaChcIi4vc2hhZGVycy9mcmFnLmdsc2xcIilcclxuICAgIC50aGVuKChyZXMpID0+IHJlcy50ZXh0KCkpXHJcbiAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgIGZzID0gZGF0YTtcclxuICAgIH0pO1xyXG5cclxuZnVuY3Rpb24gbG9hZFNoYWRlcihzaGFkZXJTdHIsIHR5cGUsIGdsKSB7XHJcbiAgICBjb25zdCBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSk7XHJcblxyXG4gICAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc2hhZGVyU3RyKTtcclxuICAgIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcclxuXHJcbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICAgIGFsZXJ0KGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2hhZGVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRVbmlmb3JtTG9jYXRpb25zKGdsKSB7XHJcbiAgICB1X3RpbWVfbG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgXCJ1X3RpbWVcIik7XHJcbiAgICB1X2ZyYW1lX3dfbG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgXCJGcmFtZVdcIik7XHJcbiAgICB1X2ZyYW1lX2hfbG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgXCJGcmFtZUhcIik7XHJcbiAgICB1X21hdHJWUF9sb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcIk1hdHJWUFwiKTtcclxuICAgIHVfbWF0cldfbG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgXCJNYXRyV1wiKTtcclxuICAgIHVfY2FtRGlyX2xvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIFwiQ2FtRGlyXCIpO1xyXG4gICAgdV9jYW1Mb2NfbG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgXCJDYW1Mb2NcIik7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0U2hhZGVycyhnbCkge1xyXG4gICAgY29uc3QgYWxsRGF0YSA9IGF3YWl0IFByb21pc2UuYWxsKFtmdDEsIGZ0Ml0pO1xyXG4gICAgdnMgPSBsb2FkU2hhZGVyKHZzLCBnbC5WRVJURVhfU0hBREVSLCBnbCk7XHJcbiAgICBmcyA9IGxvYWRTaGFkZXIoZnMsIGdsLkZSQUdNRU5UX1NIQURFUiwgZ2wpO1xyXG4gICAgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcclxuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2cyk7XHJcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnMpO1xyXG4gICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XHJcbiAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKSB7XHJcbiAgICAgICAgY29uc3QgQnVmID0gZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coQnVmKTtcclxuICAgIH1cclxuICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XHJcbiAgICBnZXRVbmlmb3JtTG9jYXRpb25zKGdsKTtcclxufSIsIi8qIFRyZXR5YWtvdiBBbmRyZXkgKEFUNyksIDEwLTcsIDA2LjA2LjIwMjUsIHJlbmRlciBtb2R1bGUgKi9cclxuaW1wb3J0ICogYXMgbXRoIGZyb20gXCIuL210aC5qc1wiXHJcbmltcG9ydCAqIGFzIHNoZCBmcm9tIFwiLi9kaXN0L3NoYWRlcnMvc2hhZGVycy5qc1wiXHJcbmltcG9ydCAqIGFzIG1haW4gZnJvbSBcIi4vbWFpbi5qc1wiXHJcbmltcG9ydCAqIGFzIHBsYXQgZnJvbSBcIi4vcGxhdC5qc1wiXHJcblxyXG5leHBvcnQgbGV0IEZyYW1lVywgRnJhbWVIO1xyXG5leHBvcnQgbGV0IHRpbWVGcm9tU3RhcnQ7XHJcbmxldCBQcm9qU2l6ZSA9IDAuMTtcclxubGV0IGdsO1xyXG5cclxuZXhwb3J0IGxldCB2ZXJ0ZXhCdWZmZXIsIGluZGV4QnVmZmVyO1xyXG5mdW5jdGlvbiBpbml0QnVmZmVycygpIHtcclxuICAgIHZlcnRleEJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZlcnRleEJ1ZmZlcik7XHJcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IFszLCAxLCAtMSwgLTEsIDEsIDEsIC0xLCAtMywgMl07XHJcbiAgICBnbC5idWZmZXJEYXRhKFxyXG4gICAgICAgIGdsLkFSUkFZX0JVRkZFUixcclxuICAgICAgICBuZXcgRmxvYXQzMkFycmF5KHZlcnRpY2VzKSxcclxuICAgICAgICBnbC5TVEFUSUNfRFJBV1xyXG4gICAgKTtcclxuICAgIGluZGV4QnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpbmRleEJ1ZmZlcik7XHJcbiAgICBjb25zdCBpbmRpY2VzID0gWzAsIDEsIDJdO1xyXG4gICAgZ2wuYnVmZmVyRGF0YShcclxuICAgICAgICBnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUixcclxuICAgICAgICBuZXcgVWludDMyQXJyYXkoaW5kaWNlcyksXHJcbiAgICAgICAgZ2wuU1RBVElDX0RSQVdcclxuICAgICk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRHTChjYW52YXMpIHtcclxuICAgIGdsID0gY2FudmFzLmdldENvbnRleHQoXCJ3ZWJnbDJcIik7XHJcbiAgICBnbC52aWV3cG9ydFdpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgZ2wudmlld3BvcnRIZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgRnJhbWVXID0gY2FudmFzLndpZHRoO1xyXG4gICAgRnJhbWVIID0gY2FudmFzLmhlaWdodDtcclxuICAgIHNoZC5pbml0U2hhZGVycyhnbCk7XHJcbiAgICBpbml0QnVmZmVycygpO1xyXG4gICAgZ2wuZW5hYmxlKGdsLkRFUFRIX1RFU1QpO1xyXG4gICAgZ2wuYmxlbmRGdW5jKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XHJcbiAgICBwbGF0LmluaXRHbG9iYWxEcmF3UXVldWUoKVxyXG59XHJcblxyXG5leHBvcnQgbGV0IGdsb2JhbE1hdHJXID0gbXRoLlVuaXRNYXRyaXg7XHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3U2NlbmUoKSB7XHJcbiAgICBpZiAobWFpbi5pc1BhdXNlKVxyXG4gICAgICAgIHRpbWVGcm9tU3RhcnQgPSBtYWluLnBhdXNldGltZTtcclxuICAgIGVsc2VcclxuICAgICAgICB0aW1lRnJvbVN0YXJ0ID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKSAtIG1haW4uc3RhcnRUaW1lIC0gbWFpbi5wYXVzZXRpbWU7XHJcblxyXG4gICAgZ2wuY2xlYXJDb2xvcigxOTggLyAyNTUsIDI1MSAvIDI1NSwgMjUxIC8gMjU1LCAxKTtcclxuICAgIGdsLnZpZXdwb3J0KDAsIDAsIGdsLnZpZXdwb3J0V2lkdGgsIGdsLnZpZXdwb3J0SGVpZ2h0KTtcclxuICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQpO1xyXG5cclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KDApO1xyXG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcigwLCAzLCBnbC5GTE9BVCwgZmFsc2UsIDQwLCAwKTtcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KDEpO1xyXG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcigxLCA0LCBnbC5GTE9BVCwgZmFsc2UsIDQwLCAxMik7XHJcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSgyKTtcclxuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoMiwgMywgZ2wuRkxPQVQsIGZhbHNlLCA0MCwgMjgpO1xyXG5cclxuICAgIC8qIFNldCBjYW1lcmEgYW5kIHRyaWFuZ2xlIHBvaW50cyAqL1xyXG4gICAgbGV0IGxvYyA9IG5ldyBtdGguVmVjMygxNSArIE1hdGguY29zKHRpbWVGcm9tU3RhcnQgLyA1MDAgLyAyKSAqIDMwLCAxNSArIDMwICogTWF0aC5zaW4odGltZUZyb21TdGFydCAvIDUwMCAvIDIpLCAxNSArIE1hdGguc2luKHRpbWVGcm9tU3RhcnQgLyA1MDAgLyAyKSAqIDMwKTtcclxuICAgIGxldCBhdCA9IG5ldyBtdGguVmVjMygxNSwgMTUsIDE1KTtcclxuICAgIGxldCB1cCA9IG5ldyBtdGguVmVjMygwLCAxLCAwKTtcclxuICAgIGxldCBNYXRyViA9IG10aC5NYXRyVmlldyhsb2MsIGF0LCB1cCk7XHJcbiAgICBsZXQgTWF0clAgPSBtdGguQ2FtU2V0UHJvaihGcmFtZVcsIEZyYW1lSCwgMC4xLCAwLjEsIDMwMCk7XHJcbiAgICBsZXQgTWF0clZQID0gbXRoLk1hdHJNdWxNYXRyKE1hdHJWLCBNYXRyUCk7XHJcblxyXG5cclxuICAgIGxldCBNYXRyVyA9IG10aC5NYXRyVHJhbnNsYXRlKG10aC5WZWMzU2V0KDIsIDAsIDIgKyAyICogTWF0aC5jb3ModGltZUZyb21TdGFydCAvIDUwMCAqIG10aC5QSSkpKTtcclxuICAgIE1hdHJXID0gbXRoLk1hdHJNdWxNYXRyKG10aC5NYXRyU2NhbGUobXRoLlZlYzNTZXQoNiwgNiwgNikpLCBNYXRyVylcclxuXHJcbiAgICBsZXQgTWF0cldWUCA9IG10aC5NYXRyTXVsTWF0cihNYXRyVywgTWF0clZQKTtcclxuXHJcbiAgICBnbC51bmlmb3JtMWYoc2hkLnVfdGltZV9sb2NhdGlvbiwgdGltZUZyb21TdGFydCAvIDEwMDAuMCk7XHJcbiAgICBnbC51bmlmb3JtMWYoc2hkLnVfZnJhbWVfd19sb2NhdGlvbiwgRnJhbWVXKTtcclxuICAgIGdsLnVuaWZvcm0xZihzaGQudV9mcmFtZV9oX2xvY2F0aW9uLCBGcmFtZUgpO1xyXG4gICAgZ2wudW5pZm9ybTNmdihzaGQudV9jYW1EaXJfbG9jYXRpb24sIG5ldyBGbG9hdDMyQXJyYXkobXRoLkFyckZyb21WZWMzKG10aC5WZWMzTm9ybWFsaXplKG10aC5WZWMzU3ViVmVjMyhsb2MsIGF0KSkpKSwgMCwgMyk7XHJcbiAgICBnbC51bmlmb3JtM2Z2KHNoZC51X2NhbUxvY19sb2NhdGlvbiwgbmV3IEZsb2F0MzJBcnJheShtdGguQXJyRnJvbVZlYzMobXRoLlZlYzNOb3JtYWxpemUobG9jKSkpLCAwLCAzKTtcclxuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYoc2hkLnVfbWF0clZQX2xvY2F0aW9uLCBmYWxzZSwgbmV3IEZsb2F0MzJBcnJheShNYXRyVlAuQVswXS5jb25jYXQoTWF0clZQLkFbMV0uY29uY2F0KE1hdHJWUC5BWzJdLmNvbmNhdChNYXRyVlAuQVszXSkpKSwgMCwgMTYpKTtcclxuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYoc2hkLnVfbWF0cldfbG9jYXRpb24sIGZhbHNlLCBuZXcgRmxvYXQzMkFycmF5KE1hdHJXLkFbMF0uY29uY2F0KE1hdHJXLkFbMV0uY29uY2F0KE1hdHJXLkFbMl0uY29uY2F0KE1hdHJXLkFbM10pKSksIDAsIDE2KSk7XHJcblxyXG4gICAgZ2xvYmFsTWF0clcgPSBtdGguTWF0ck11bE1hdHIobXRoLk1hdHJTY2FsZShtdGguVmVjM1NldCgxICsgMC41ICogTWF0aC5zaW4odGltZUZyb21TdGFydCAvIDEwMCAvIDIpLFxyXG4gICAgICAgIDEgKyAwLjUgKiBNYXRoLnNpbih0aW1lRnJvbVN0YXJ0IC8gMTAwIC8gMiksXHJcbiAgICAgICAgMSArIDAuNSAqIE1hdGguc2luKHRpbWVGcm9tU3RhcnQgLyAxMDAgLyAyKSkpLCBtdGguTWF0clJvdGF0ZSh0aW1lRnJvbVN0YXJ0IC8gMTAwMCAqIDYwLCBtdGguVmVjM1NldCgwLCAxLCAwKSkpO1xyXG5cclxuICAgIHBsYXQuZHJhd0dsb2FiYWxRdWV1ZShnbCk7XHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXdTY2VuZSk7XHJcbn0iLCIvKiBUcmV0eWFrb3YgQW5kcmV5IChBVDcpLCAxMC03LCAwNS4wNi4yMDI1LCBnZW9tZXRyeSBtb2R1bGUgKi9cclxuXHJcbmltcG9ydCAqIGFzIG10aCBmcm9tIFwiLi9tdGguanNcIlxyXG5pbXBvcnQgKiBhcyBybmQgZnJvbSBcIi4vcm5kLmpzXCJcclxuaW1wb3J0ICogYXMgc2hkIGZyb20gXCIuL2Rpc3Qvc2hhZGVycy9zaGFkZXJzLmpzXCJcclxuXHJcbmV4cG9ydCBjbGFzcyBWZXJ0ZXgge1xyXG4gICAgY29uc3RydWN0b3IocG9zLCBjb2xvciwgbm9ybWFsKSB7XHJcbiAgICAgICAgdGhpcy5wb3MgPSBwb3MsXHJcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcixcclxuICAgICAgICAgICAgdGhpcy5ub3JtYWwgPSBub3JtYWxcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVuaXRlUG9zQ29sb3JOb3JtYWwocG9zQXJyLCBjb2xvckFyciwgbm9ybWFsQXJyKSB7XHJcbiAgICBsZXQgdmVydEFyciA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3NBcnIubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgdmVydEFycltpXSA9IG5ldyBWZXJ0ZXgocG9zQXJyW2ldLCBjb2xvckFycltpXSwgbm9ybWFsQXJyW2ldKVxyXG4gICAgcmV0dXJuIHZlcnRBcnI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGbG9hdEFycmF5RnJvbVZlcnRleEFycmF5KHZlcnRBcnIpIHtcclxuICAgIGxldCByZXMgPSBbXVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2ZXJ0QXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcmVzW2kgKiAxMF0gPSB2ZXJ0QXJyW2ldLnBvcy54O1xyXG4gICAgICAgIHJlc1tpICogMTAgKyAxXSA9IHZlcnRBcnJbaV0ucG9zLnk7XHJcbiAgICAgICAgcmVzW2kgKiAxMCArIDJdID0gdmVydEFycltpXS5wb3MuejtcclxuICAgICAgICByZXNbaSAqIDEwICsgM10gPSB2ZXJ0QXJyW2ldLmNvbG9yLng7XHJcbiAgICAgICAgcmVzW2kgKiAxMCArIDRdID0gdmVydEFycltpXS5jb2xvci55O1xyXG4gICAgICAgIHJlc1tpICogMTAgKyA1XSA9IHZlcnRBcnJbaV0uY29sb3IuejtcclxuICAgICAgICByZXNbaSAqIDEwICsgNl0gPSB2ZXJ0QXJyW2ldLmNvbG9yLnc7XHJcbiAgICAgICAgcmVzW2kgKiAxMCArIDddID0gdmVydEFycltpXS5ub3JtYWwueDtcclxuICAgICAgICByZXNbaSAqIDEwICsgOF0gPSB2ZXJ0QXJyW2ldLm5vcm1hbC55O1xyXG4gICAgICAgIHJlc1tpICogMTAgKyA5XSA9IHZlcnRBcnJbaV0ubm9ybWFsLno7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IEZsb2F0MzJBcnJheShyZXMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0RGVmYXVsdEN1YmVHZW9tKCkge1xyXG4gICAgbGV0IGEgPSBNYXRoLnNxcnQoMykgLyAzO1xyXG4gICAgbGV0IHZlcnRpY2VzID0gW210aC5WZWMzTm9ybWFsaXplKG10aC5WZWMzU2V0KC1hLCAtYSwgLWEpKSxcclxuICAgIG10aC5WZWMzTm9ybWFsaXplKG10aC5WZWMzU2V0KGEsIC1hLCAtYSkpLFxyXG4gICAgbXRoLlZlYzNOb3JtYWxpemUobXRoLlZlYzNTZXQoLWEsIC1hLCBhKSksXHJcbiAgICBtdGguVmVjM05vcm1hbGl6ZShtdGguVmVjM1NldChhLCAtYSwgYSkpLFxyXG4gICAgbXRoLlZlYzNOb3JtYWxpemUobXRoLlZlYzNTZXQoLWEsIGEsIC1hKSksXHJcbiAgICBtdGguVmVjM05vcm1hbGl6ZShtdGguVmVjM1NldChhLCBhLCAtYSkpLFxyXG4gICAgbXRoLlZlYzNOb3JtYWxpemUobXRoLlZlYzNTZXQoLWEsIGEsIGEpKSxcclxuICAgIG10aC5WZWMzTm9ybWFsaXplKG10aC5WZWMzU2V0KGEsIGEsIGEpKV07XHJcblxyXG4gICAgbGV0IEluZGljZXMgPSBbXHJcbiAgICAgICAgMCwgMSwgMixcclxuICAgICAgICAxLCAyLCAzLFxyXG4gICAgICAgIDUsIDQsIDcsXHJcbiAgICAgICAgNCwgNiwgNyxcclxuICAgICAgICAwLCAxLCA0LFxyXG4gICAgICAgIDEsIDUsIDQsXHJcbiAgICAgICAgMiwgMywgNixcclxuICAgICAgICA2LCAzLCA3LFxyXG4gICAgICAgIDAsIDIsIDQsXHJcbiAgICAgICAgNiwgNCwgMixcclxuICAgICAgICAxLCAzLCA1LFxyXG4gICAgICAgIDUsIDcsIDNdO1xyXG4gICAgbGV0IG5vcm1hbHMgPSB2ZXJ0aWNlcztcclxuICAgIHJldHVybiBbdmVydGljZXMsIG5vcm1hbHMsIEluZGljZXNdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0RGVmYXVsdEN1YmVHZW9tVHJpYW5nbGVzKCkge1xyXG4gICAgbGV0IHZlcnRpY2VzID0gW107XHJcbiAgICBsZXQgbm9ybWFscyA9IFtdO1xyXG4gICAgbGV0IGN1YmUgPSBzZXREZWZhdWx0Q3ViZUdlb20oKTtcclxuICAgIGxldCB2ZXJ0ID0gY3ViZVswXTtcclxuICAgIGxldCBpbmQgPSBjdWJlWzJdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kLmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICAgICAgdmVydGljZXNbaV0gPSB2ZXJ0W2luZFtpXV07XHJcbiAgICAgICAgdmVydGljZXNbaSArIDFdID0gdmVydFtpbmRbaSArIDFdXTtcclxuICAgICAgICB2ZXJ0aWNlc1tpICsgMl0gPSB2ZXJ0W2luZFtpICsgMl1dO1xyXG4gICAgICAgIG5vcm1hbHNbaV0gPSBtdGguVmVjM05vcm1hbGl6ZShtdGguVmVjM0Nyb3NzVmVjMyhtdGguVmVjM1N1YlZlYzModmVydGljZXNbaSArIDJdLCB2ZXJ0aWNlc1tpXSksIG10aC5WZWMzU3ViVmVjMyh2ZXJ0aWNlc1tpICsgMV0sIHZlcnRpY2VzW2ldKSkpXHJcbiAgICAgICAgbm9ybWFsc1tpICsgMV0gPSBub3JtYWxzW2ldO1xyXG4gICAgICAgIG5vcm1hbHNbaSArIDJdID0gbm9ybWFsc1tpXTtcclxuICAgIH1cclxuICAgIHJldHVybiBbdmVydGljZXMsIG5vcm1hbHNdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0RGVmYXVsdFRldHJhaGVkcm9uR2VvbSgpIHtcclxuICAgIGxldCBhID0gTWF0aC5zcXJ0KDMpIC8gMztcclxuICAgIGxldCB2ZXJ0aWNlcyA9IFttdGguVmVjM05vcm1hbGl6ZShtdGguVmVjM1NldCgtYSwgLWEsIC1hKSksXHJcbiAgICBtdGguVmVjM05vcm1hbGl6ZShtdGguVmVjM1NldChhLCAtYSwgYSkpLFxyXG4gICAgbXRoLlZlYzNOb3JtYWxpemUobXRoLlZlYzNTZXQoYSwgYSwgLWEpKSxcclxuICAgIG10aC5WZWMzTm9ybWFsaXplKG10aC5WZWMzU2V0KC1hLCBhLCBhKSldO1xyXG4gICAgbGV0IEluZGljZXMgPSBbXHJcbiAgICAgICAgMCwgMSwgMixcclxuICAgICAgICAwLCAyLCAzLFxyXG4gICAgICAgIDAsIDEsIDMsXHJcbiAgICAgICAgMSwgMiwgM1xyXG4gICAgXTtcclxuICAgIGxldCBub3JtYWxzID0gdmVydGljZXM7XHJcbiAgICByZXR1cm4gW3ZlcnRpY2VzLCBub3JtYWxzLCBJbmRpY2VzXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldERlZmF1bHRPY3RhaGVkcm9uR2VvbSgpIHtcclxuICAgIGxldCB2ZXJ0aWNlcyA9IFttdGguVmVjM1NldCgtMSwgMCwgMCksXHJcbiAgICBtdGguVmVjM1NldCgwLCAwLCAxKSxcclxuICAgIG10aC5WZWMzU2V0KDEsIDAsIDApLFxyXG4gICAgbXRoLlZlYzNTZXQoMCwgMCwgLTEpLFxyXG4gICAgbXRoLlZlYzNTZXQoMCwgMSwgMCksXHJcbiAgICBtdGguVmVjM1NldCgwLCAtMSwgMCldO1xyXG4gICAgbGV0IEluZGljZXMgPSBbXHJcbiAgICAgICAgMCwgMSwgNCxcclxuICAgICAgICAxLCAyLCA0LFxyXG4gICAgICAgIDIsIDMsIDQsXHJcbiAgICAgICAgMCwgMywgNCxcclxuICAgICAgICAwLCAxLCA1LFxyXG4gICAgICAgIDEsIDIsIDUsXHJcbiAgICAgICAgMiwgMywgNSxcclxuICAgICAgICAwLCAzLCA1XHJcbiAgICBdO1xyXG4gICAgbGV0IG5vcm1hbHMgPSB2ZXJ0aWNlcztcclxuICAgIHJldHVybiBbdmVydGljZXMsIG5vcm1hbHMsIEluZGljZXNdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0RGVmYXVsdEVhc3RlckVnZ0dlb20oKSB7XHJcbiAgICBsZXQgdmVydGljZXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDI7IGorKykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzW2ogKiA1ICsgaV0gPSBtdGguVmVjM05vcm1hbGl6ZShtdGguVmVjM1NldChNYXRoLmNvcygyICogaSAqIG10aC5QSSAvIDUgKyBtdGguUEkgLyAyICogaiksIGogLSAwLjUsIE1hdGguc2luKDIgKiBpICogbXRoLlBJIC8gNSArIG10aC5QSSAvIDIgKiBqKSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZlcnRpY2VzWzEwXSA9IG10aC5WZWMzU2V0KDAsIC0xLCAwKTtcclxuICAgIHZlcnRpY2VzWzExXSA9IG10aC5WZWMzU2V0KDAsIDEsIDApO1xyXG4gICAgbGV0IEluZGljZXMgPSBbXHJcbiAgICAgICAgMCwgMSwgOCxcclxuICAgICAgICA4LCA5LCAxLFxyXG4gICAgICAgIDEsIDIsIDksXHJcbiAgICAgICAgOSwgNSwgMixcclxuICAgICAgICAyLCAzLCA1LFxyXG4gICAgICAgIDUsIDYsIDMsXHJcbiAgICAgICAgMywgNCwgNixcclxuICAgICAgICA2LCA3LCA0LFxyXG4gICAgICAgIDQsIDAsIDcsXHJcbiAgICAgICAgNywgOCwgMFxyXG4gICAgXTtcclxuICAgIGxldCBub3JtYWxzID0gdmVydGljZXM7XHJcbiAgICByZXR1cm4gW3ZlcnRpY2VzLCBub3JtYWxzLCBJbmRpY2VzXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldERlZmF1bHRJY29zYWhlZHJvbkdlb20oKSB7XHJcbiAgICBsZXQgdmVydGljZXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDI7IGorKykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzW2ogKiA1ICsgaV0gPSBtdGguVmVjM05vcm1hbGl6ZShtdGguVmVjM1NldChNYXRoLmNvcygyICogaSAqIG10aC5QSSAvIDUgKyBtdGguUEkgKiBqKSwgaiAtIDAuNSwgTWF0aC5zaW4oMiAqIGkgKiBtdGguUEkgLyA1ICsgbXRoLlBJICogaikpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2ZXJ0aWNlc1sxMF0gPSBtdGguVmVjM1NldCgwLCAtMSwgMCk7XHJcbiAgICB2ZXJ0aWNlc1sxMV0gPSBtdGguVmVjM1NldCgwLCAxLCAwKTtcclxuICAgIGxldCBJbmRpY2VzID0gW1xyXG4gICAgICAgIDcsIDgsIDAsXHJcbiAgICAgICAgMCwgMSwgOCxcclxuICAgICAgICA4LCA5LCAxLFxyXG4gICAgICAgIDEsIDIsIDksXHJcbiAgICAgICAgOSwgNSwgMixcclxuICAgICAgICAyLCAzLCA1LFxyXG4gICAgICAgIDUsIDYsIDMsXHJcbiAgICAgICAgMywgNCwgNixcclxuICAgICAgICA2LCA3LCA0LFxyXG4gICAgICAgIDQsIDAsIDcsXHJcbiAgICAgICAgMCwgMSwgMTAsXHJcbiAgICAgICAgMSwgMiwgMTAsXHJcbiAgICAgICAgMiwgMywgMTAsXHJcbiAgICAgICAgMywgNCwgMTAsXHJcbiAgICAgICAgNCwgMCwgMTAsXHJcbiAgICAgICAgNSwgNiwgMTEsXHJcbiAgICAgICAgNiwgNywgMTEsXHJcbiAgICAgICAgNywgOCwgMTEsXHJcbiAgICAgICAgOCwgOSwgMTEsXHJcbiAgICAgICAgOSwgNSwgMTFcclxuICAgIF07XHJcbiAgICBsZXQgbm9ybWFscyA9IHZlcnRpY2VzO1xyXG4gICAgcmV0dXJuIFt2ZXJ0aWNlcywgbm9ybWFscywgSW5kaWNlc107XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE1lZGlhblZlY3RvcjMoVjEsIFYyLCBWMykge1xyXG4gICAgcmV0dXJuIG5ldyBtdGguVmVjMyhWMS54ICsgVjIueCArIFYzLngsIFYxLnkgKyBWMi55ICsgVjMueSwgVjEueiArIFYyLnogKyBWMy56KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldERlZmF1bHREb2RlY2FoZWRyb25HZW9tKCkge1xyXG4gICAgbGV0IHZlcnRpY2VzID0gW107XHJcbiAgICBsZXQgaWNvcyA9IHNldERlZmF1bHRJY29zYWhlZHJvbkdlb20oKTtcclxuICAgIGxldCBpbmQgPSBpY29zWzJdO1xyXG4gICAgbGV0IHZlcnQgPSBpY29zWzBdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKylcclxuICAgICAgICB2ZXJ0aWNlc1tpXSA9IG10aC5WZWMzTm9ybWFsaXplKGdldE1lZGlhblZlY3RvcjModmVydFtpbmRbaSAqIDNdXSwgdmVydFtpbmRbaSAqIDMgKyAxXV0sIHZlcnRbaW5kW2kgKiAzICsgMl1dKSlcclxuICAgIGxldCBJbmRpY2VzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgICAgICBpZiAoaSAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICBJbmRpY2VzW2kgKiA5XSA9IGk7XHJcbiAgICAgICAgICAgIEluZGljZXNbaSAqIDkgKyAxXSA9IChpICsgMSkgJSAxMDtcclxuICAgICAgICAgICAgSW5kaWNlc1tpICogOSArIDJdID0gKGkgKyAyKSAlIDEwO1xyXG4gICAgICAgICAgICBJbmRpY2VzW2kgKiA5ICsgM10gPSBpO1xyXG4gICAgICAgICAgICBJbmRpY2VzW2kgKiA5ICsgNF0gPSAxNSArIChpIC8gMiArIDEpICUgNTtcclxuICAgICAgICAgICAgSW5kaWNlc1tpICogOSArIDVdID0gMTUgKyAoaSAvIDIgKyAyKSAlIDU7XHJcbiAgICAgICAgICAgIEluZGljZXNbaSAqIDkgKyA2XSA9IGk7XHJcbiAgICAgICAgICAgIEluZGljZXNbaSAqIDkgKyA3XSA9IChpICsgMikgJSAxMDtcclxuICAgICAgICAgICAgSW5kaWNlc1tpICogOSArIDhdID0gMTUgKyAoaSAvIDIgKyAyKSAlIDU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgSW5kaWNlc1tpICogOV0gPSBpO1xyXG4gICAgICAgICAgICBJbmRpY2VzW2kgKiA5ICsgMV0gPSAoaSArIDEpICUgMTA7XHJcbiAgICAgICAgICAgIEluZGljZXNbaSAqIDkgKyAyXSA9IChpICsgMikgJSAxMDtcclxuICAgICAgICAgICAgSW5kaWNlc1tpICogOSArIDNdID0gaTtcclxuICAgICAgICAgICAgSW5kaWNlc1tpICogOSArIDRdID0gMTAgKyAoaSAtIDEpIC8gMjtcclxuICAgICAgICAgICAgSW5kaWNlc1tpICogOSArIDVdID0gMTAgKyAoKGkgLSAxKSAvIDIgKyAxKSAlIDU7XHJcbiAgICAgICAgICAgIEluZGljZXNbaSAqIDkgKyA2XSA9IGk7XHJcbiAgICAgICAgICAgIEluZGljZXNbaSAqIDkgKyA3XSA9IChpICsgMikgJSAxMDtcclxuICAgICAgICAgICAgSW5kaWNlc1tpICogOSArIDhdID0gMTAgKyAoKGkgLSAxKSAvIDIgKyAxKSAlIDU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgSW5kaWNlc1s5MF0gPSAxMDtcclxuICAgIEluZGljZXNbOTFdID0gMTE7XHJcbiAgICBJbmRpY2VzWzkyXSA9IDEyO1xyXG4gICAgSW5kaWNlc1s5M10gPSAxMDtcclxuICAgIEluZGljZXNbOTRdID0gMTI7XHJcbiAgICBJbmRpY2VzWzk1XSA9IDEzO1xyXG4gICAgSW5kaWNlc1s5Nl0gPSAxMDtcclxuICAgIEluZGljZXNbOTddID0gMTM7XHJcbiAgICBJbmRpY2VzWzk4XSA9IDE0O1xyXG4gICAgSW5kaWNlc1s5OV0gPSAxNTtcclxuICAgIEluZGljZXNbMTAwXSA9IDE2O1xyXG4gICAgSW5kaWNlc1sxMDFdID0gMTc7XHJcbiAgICBJbmRpY2VzWzEwMl0gPSAxNTtcclxuICAgIEluZGljZXNbMTAzXSA9IDE3O1xyXG4gICAgSW5kaWNlc1sxMDRdID0gMTg7XHJcbiAgICBJbmRpY2VzWzEwNV0gPSAxNTtcclxuICAgIEluZGljZXNbMTA2XSA9IDE4O1xyXG4gICAgSW5kaWNlc1sxMDddID0gMTk7XHJcbiAgICBsZXQgbm9ybWFscyA9IHZlcnRpY2VzO1xyXG4gICAgcmV0dXJuIFt2ZXJ0aWNlcywgbm9ybWFscywgSW5kaWNlc107XHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgZ2xvYmFsRHJhd1F1ZXVlO1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0R2xvYmFsRHJhd1F1ZXVlKCkge1xyXG4gICAgZ2xvYmFsRHJhd1F1ZXVlID0gW107XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3R2xvYWJhbFF1ZXVlKGdsKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdsb2JhbERyYXdRdWV1ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBybmQudmVydGV4QnVmZmVyKTtcclxuICAgICAgICBnbC5idWZmZXJEYXRhKFxyXG4gICAgICAgICAgICBnbC5BUlJBWV9CVUZGRVIsXHJcbiAgICAgICAgICAgIGdsb2JhbERyYXdRdWV1ZVtpXVsxXSxcclxuICAgICAgICAgICAgZ2wuU1RBVElDX0RSQVdcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHJuZC5pbmRleEJ1ZmZlcik7XHJcbiAgICAgICAgZ2wuYnVmZmVyRGF0YShcclxuICAgICAgICAgICAgZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsXHJcbiAgICAgICAgICAgIG5ldyBVaW50MzJBcnJheShnbG9iYWxEcmF3UXVldWVbaV1bMl0pLFxyXG4gICAgICAgICAgICBnbC5TVEFUSUNfRFJBV1xyXG4gICAgICAgICk7IFxyXG4gICAgICAgICovXHJcbiAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdihzaGQudV9tYXRyV19sb2NhdGlvbiwgZmFsc2UsIG5ldyBGbG9hdDMyQXJyYXkoZ2xvYmFsRHJhd1F1ZXVlW2ldWzBdLkFbMF0uY29uY2F0KGdsb2JhbERyYXdRdWV1ZVtpXVswXS5BWzFdLmNvbmNhdChnbG9iYWxEcmF3UXVldWVbaV1bMF0uQVsyXS5jb25jYXQoZ2xvYmFsRHJhd1F1ZXVlW2ldWzBdLkFbM10pKSksIDAsIDE2KSk7XHJcbiAgICAgICAgLy9nbC5kcmF3RWxlbWVudHMoZ2wuVFJJQU5HTEVTLCBnbG9iYWxEcmF3UXVldWVbaV1bMl0ubGVuZ3RoLCBnbC5VTlNJR05FRF9JTlQsIDApO1xyXG4gICAgICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCBnbG9iYWxEcmF3UXVldWVbaV1bMV0ubGVuZ3RoIC8gMTApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Tm9ybWFsR2VvbSh2ZXJ0LCBpbmQpIHtcclxuICAgIGxldCB2ZXJ0aWNlcyA9IFtdO1xyXG4gICAgbGV0IG5vcm1hbHMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZC5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgIHZlcnRpY2VzW2ldID0gdmVydFtpbmRbaV1dO1xyXG4gICAgICAgIHZlcnRpY2VzW2kgKyAxXSA9IHZlcnRbaW5kW2kgKyAxXV07XHJcbiAgICAgICAgdmVydGljZXNbaSArIDJdID0gdmVydFtpbmRbaSArIDJdXTtcclxuICAgICAgICBub3JtYWxzW2ldID0gbXRoLlZlYzNOb3JtYWxpemUobXRoLlZlYzNDcm9zc1ZlYzMobXRoLlZlYzNTdWJWZWMzKHZlcnRpY2VzW2kgKyAxXSwgdmVydGljZXNbaV0pLCBtdGguVmVjM1N1YlZlYzModmVydGljZXNbaSArIDJdLCB2ZXJ0aWNlc1tpXSkpKVxyXG4gICAgICAgIG5vcm1hbHNbaSArIDFdID0gbm9ybWFsc1tpXTtcclxuICAgICAgICBub3JtYWxzW2kgKyAyXSA9IG5vcm1hbHNbaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW3ZlcnRpY2VzLCBub3JtYWxzXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRvRHJhd1F1ZXVlKG1hdHJXLCB2ZXJ0ZXhEYXRhLCBpbmRpY2VzKSB7XHJcbiAgICBnbG9iYWxEcmF3UXVldWUucHVzaChbbXRoLk1hdHJNdWxNYXRyKHJuZC5nbG9iYWxNYXRyVywgbWF0clcpLCB2ZXJ0ZXhEYXRhLCBpbmRpY2VzXSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHBvcERyYXdRdWV1ZSgpIHtcclxuICAgIGdsb2JhbERyYXdRdWV1ZS5wb3AoKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJEcmF3UXVldWUoKSB7XHJcbiAgICBnbG9iYWxEcmF3UXVldWUgPSBbXTtcclxufSIsIi8qIFRyZXR5YWtvdiBBbmRyZXkgKEFUNyksIDEwLTcsIDA2LjA2LjIwMjUsIG1haW4gbW9kdWxlICovXHJcblxyXG4vKlxyXG48c2NyaXB0IHR5cGU9XCJtb2R1bGVcIiBzcmM9XCJtdGguanNcIj48L3NjcmlwdD5cclxuPHNjcmlwdCB0eXBlPVwibW9kdWxlXCIgc3JjPVwic2hhZGVycy9zaGFkZXJzLmpzXCI+PC9zY3JpcHQ+XHJcbiovXHJcblxyXG5pbXBvcnQgKiBhcyBtdGggZnJvbSBcIi4vbXRoLmpzXCJcclxuaW1wb3J0ICogYXMgcGx0IGZyb20gXCIuL3BsYXQuanNcIlxyXG5pbXBvcnQgKiBhcyBybmQgZnJvbSBcIi4vcm5kLmpzXCJcclxuXHJcbi8vaW1wb3J0ICogYXMgc2hkIGZyb20gXCIuL3NoYWRlcnMvc2hhZGVycy5qc1wiXHJcbmV4cG9ydCBsZXQgc3RhcnRUaW1lLCBwYXVzZXRpbWUgPSAwLjA7XHJcbmV4cG9ydCBsZXQgaXNQYXVzZSA9IGZhbHNlO1xyXG5sZXQgZmlndXJlc2NvdW50ID0gMDtcclxuXHJcbmZ1bmN0aW9uIG9uU3RhcnQoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkFUNyBQbGF0b24ncyBmaWd1cmVzIHRhc2tcIik7XHJcbiAgICBsZXQgbXVsdCA9IDAuMDAwNDc7XHJcblxyXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2ViZ2wtY2FudmFzXCIpO1xyXG5cclxuICAgIHJuZC5pbml0R0woY2FudmFzKTtcclxuXHJcbiAgICBzdGFydFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUGF1c2VcIikub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpc1BhdXNlID0gIWlzUGF1c2U7XHJcbiAgICAgICAgcGF1c2V0aW1lID0gcm5kLnRpbWVGcm9tU3RhcnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQ3ViZVwiKS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBjdWJlMSA9IHBsdC5zZXREZWZhdWx0Q3ViZUdlb20oKTtcclxuICAgICAgICBsZXQgdmVydCA9IGN1YmUxWzBdO1xyXG4gICAgICAgIGxldCBpbmQgPSBjdWJlMVsyXTtcclxuICAgICAgICBsZXQgY3ViZTIgPSBwbHQuZ2V0Tm9ybWFsR2VvbSh2ZXJ0LCBpbmQpO1xyXG4gICAgICAgIGxldCB2ZXJ0aWNlcyA9IGN1YmUyWzBdLCBub3JtYWxzID0gY3ViZTJbMV07XHJcbiAgICAgICAgbGV0IG1hdHJXID0gbXRoLk1hdHJUcmFuc2xhdGUobXRoLlZlYzNTZXQoTWF0aC5yYW5kb20oKSAqIDMwLCBNYXRoLnJhbmRvbSgpICogMzAsIE1hdGgucmFuZG9tKCkgKiAzMCkpO1xyXG5cclxuICAgICAgICBsZXQgY29sb3JzID0gbmV3IEFycmF5KHZlcnRpY2VzLmxlbmd0aCkuZmlsbChtdGguVmVjNFNldCgxLCAwLCAxLCAxKSwgMCwgdmVydGljZXMubGVuZ3RoKTtcclxuICAgICAgICBsZXQgdmVydGV4RGF0YSA9IHBsdC51bml0ZVBvc0NvbG9yTm9ybWFsKHZlcnRpY2VzLCBjb2xvcnMsIG5vcm1hbHMpO1xyXG4gICAgICAgIHZlcnRleERhdGEgPSBwbHQuZ2V0RmxvYXRBcnJheUZyb21WZXJ0ZXhBcnJheSh2ZXJ0ZXhEYXRhKTtcclxuICAgICAgICBwbHQuYWRkVG9EcmF3UXVldWUobWF0clcsIHZlcnRleERhdGEsIGluZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiVGV0cmFoZWRyb25cIikub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgVGV0cmFoZWRyb24xID0gcGx0LnNldERlZmF1bHRUZXRyYWhlZHJvbkdlb20oKTtcclxuICAgICAgICBsZXQgdmVydCA9IFRldHJhaGVkcm9uMVswXTtcclxuICAgICAgICBsZXQgaW5kID0gVGV0cmFoZWRyb24xWzJdO1xyXG4gICAgICAgIGxldCBUZXRyYWhlZHJvbjIgPSBwbHQuZ2V0Tm9ybWFsR2VvbSh2ZXJ0LCBpbmQpO1xyXG4gICAgICAgIGxldCB2ZXJ0aWNlcyA9IFRldHJhaGVkcm9uMlswXSwgbm9ybWFscyA9IFRldHJhaGVkcm9uMlsxXTtcclxuICAgICAgICBsZXQgbWF0clcgPSBtdGguTWF0clRyYW5zbGF0ZShtdGguVmVjM1NldChNYXRoLnJhbmRvbSgpICogMzAsIE1hdGgucmFuZG9tKCkgKiAzMCwgTWF0aC5yYW5kb20oKSAqIDMwKSk7XHJcblxyXG4gICAgICAgIGxldCBjb2xvcnMgPSBuZXcgQXJyYXkodmVydGljZXMubGVuZ3RoKS5maWxsKG10aC5WZWM0U2V0KDEsIDAsIDEsIDEpLCAwLCB2ZXJ0aWNlcy5sZW5ndGgpO1xyXG4gICAgICAgIGxldCB2ZXJ0ZXhEYXRhID0gcGx0LnVuaXRlUG9zQ29sb3JOb3JtYWwodmVydGljZXMsIGNvbG9ycywgbm9ybWFscyk7XHJcbiAgICAgICAgdmVydGV4RGF0YSA9IHBsdC5nZXRGbG9hdEFycmF5RnJvbVZlcnRleEFycmF5KHZlcnRleERhdGEpO1xyXG4gICAgICAgIHBsdC5hZGRUb0RyYXdRdWV1ZShtYXRyVywgdmVydGV4RGF0YSwgaW5kKTtcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICBsZXQgVGV0cmFoZWRyb24gPSBwbHQuc2V0RGVmYXVsdFRldHJhaGVkcm9uR2VvbSgpO1xyXG4gICAgICAgIGxldCB2ZXJ0aWNlcyA9IFRldHJhaGVkcm9uWzBdO1xyXG4gICAgICAgIGxldCBub3JtYWxzID0gVGV0cmFoZWRyb25bMV07XHJcbiAgICAgICAgbGV0IGluZGljZXMgPSBUZXRyYWhlZHJvblsyXTtcclxuICAgICAgICBsZXQgbWF0clcgPSBtdGguTWF0clRyYW5zbGF0ZShtdGguVmVjM1NldChNYXRoLnJhbmRvbSgpICogMzAsIE1hdGgucmFuZG9tKCkgKiAzMCwgTWF0aC5yYW5kb20oKSAqIDMwKSk7XHJcblxyXG4gICAgICAgIGxldCBjb2xvcnMgPSBuZXcgQXJyYXkodmVydGljZXMubGVuZ3RoKS5maWxsKG10aC5WZWM0U2V0KDEsIDAsIDEsIDEpLCAwLCAxMDApO1xyXG4gICAgICAgIGxldCB2ZXJ0ZXhEYXRhID0gcGx0LnVuaXRlUG9zQ29sb3JOb3JtYWwodmVydGljZXMsIGNvbG9ycywgbm9ybWFscyk7XHJcbiAgICAgICAgdmVydGV4RGF0YSA9IHBsdC5nZXRGbG9hdEFycmF5RnJvbVZlcnRleEFycmF5KHZlcnRleERhdGEpO1xyXG4gICAgICAgIHBsdC5hZGRUb0RyYXdRdWV1ZShtYXRyVywgdmVydGV4RGF0YSwgaW5kaWNlcyk7XHJcbiAgICAgICAgKi9cclxuICAgIH07XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIk9jdGFoZWRyb25cIikub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgT2N0YWhlZHJvbjEgPSBwbHQuc2V0RGVmYXVsdE9jdGFoZWRyb25HZW9tKCk7XHJcbiAgICAgICAgbGV0IHZlcnQgPSBPY3RhaGVkcm9uMVswXTtcclxuICAgICAgICBsZXQgaW5kID0gT2N0YWhlZHJvbjFbMl07XHJcbiAgICAgICAgbGV0IE9jdGFoZWRyb24yID0gcGx0LmdldE5vcm1hbEdlb20odmVydCwgaW5kKTtcclxuICAgICAgICBsZXQgdmVydGljZXMgPSBPY3RhaGVkcm9uMlswXSwgbm9ybWFscyA9IE9jdGFoZWRyb24yWzFdO1xyXG4gICAgICAgIGxldCBtYXRyVyA9IG10aC5NYXRyVHJhbnNsYXRlKG10aC5WZWMzU2V0KE1hdGgucmFuZG9tKCkgKiAzMCwgTWF0aC5yYW5kb20oKSAqIDMwLCBNYXRoLnJhbmRvbSgpICogMzApKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbG9ycyA9IG5ldyBBcnJheSh2ZXJ0aWNlcy5sZW5ndGgpLmZpbGwobXRoLlZlYzRTZXQoMSwgMCwgMSwgMSksIDAsIHZlcnRpY2VzLmxlbmd0aCk7XHJcbiAgICAgICAgbGV0IHZlcnRleERhdGEgPSBwbHQudW5pdGVQb3NDb2xvck5vcm1hbCh2ZXJ0aWNlcywgY29sb3JzLCBub3JtYWxzKTtcclxuICAgICAgICB2ZXJ0ZXhEYXRhID0gcGx0LmdldEZsb2F0QXJyYXlGcm9tVmVydGV4QXJyYXkodmVydGV4RGF0YSk7XHJcbiAgICAgICAgcGx0LmFkZFRvRHJhd1F1ZXVlKG1hdHJXLCB2ZXJ0ZXhEYXRhLCBpbmQpO1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgIGxldCBjdWJlID0gcGx0LnNldERlZmF1bHRPY3RhaGVkcm9uR2VvbSgpO1xyXG4gICAgICAgIGxldCB2ZXJ0aWNlcyA9IGN1YmVbMF07XHJcbiAgICAgICAgbGV0IG5vcm1hbHMgPSBjdWJlWzFdO1xyXG4gICAgICAgIGxldCBpbmRpY2VzID0gY3ViZVsyXTtcclxuICAgICAgICBsZXQgbWF0clcgPSBtdGguTWF0clRyYW5zbGF0ZShtdGguVmVjM1NldChNYXRoLnJhbmRvbSgpICogMzAsIE1hdGgucmFuZG9tKCkgKiAzMCwgTWF0aC5yYW5kb20oKSAqIDMwKSk7XHJcblxyXG4gICAgICAgIGxldCBjb2xvcnMgPSBuZXcgQXJyYXkodmVydGljZXMubGVuZ3RoKS5maWxsKG10aC5WZWM0U2V0KDEsIDAsIDEsIDEpLCAwLCAxMDApO1xyXG4gICAgICAgIGxldCB2ZXJ0ZXhEYXRhID0gcGx0LnVuaXRlUG9zQ29sb3JOb3JtYWwodmVydGljZXMsIGNvbG9ycywgbm9ybWFscyk7XHJcbiAgICAgICAgdmVydGV4RGF0YSA9IHBsdC5nZXRGbG9hdEFycmF5RnJvbVZlcnRleEFycmF5KHZlcnRleERhdGEpO1xyXG4gICAgICAgIHBsdC5hZGRUb0RyYXdRdWV1ZShtYXRyVywgdmVydGV4RGF0YSwgaW5kaWNlcyk7XHJcbiAgICAgICAgKi9cclxuICAgIH07XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkljb3NhaGVkcm9uXCIpLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IEljb3NhaGVkcm9uMSA9IHBsdC5zZXREZWZhdWx0SWNvc2FoZWRyb25HZW9tKCk7XHJcbiAgICAgICAgbGV0IHZlcnQgPSBJY29zYWhlZHJvbjFbMF07XHJcbiAgICAgICAgbGV0IGluZCA9IEljb3NhaGVkcm9uMVsyXTtcclxuICAgICAgICBsZXQgSWNvc2FoZWRyb24yID0gcGx0LmdldE5vcm1hbEdlb20odmVydCwgaW5kKTtcclxuICAgICAgICBsZXQgdmVydGljZXMgPSBJY29zYWhlZHJvbjJbMF0sIG5vcm1hbHMgPSBJY29zYWhlZHJvbjJbMV07XHJcbiAgICAgICAgbGV0IG1hdHJXID0gbXRoLk1hdHJUcmFuc2xhdGUobXRoLlZlYzNTZXQoTWF0aC5yYW5kb20oKSAqIDMwLCBNYXRoLnJhbmRvbSgpICogMzAsIE1hdGgucmFuZG9tKCkgKiAzMCkpO1xyXG5cclxuICAgICAgICBsZXQgY29sb3JzID0gbmV3IEFycmF5KHZlcnRpY2VzLmxlbmd0aCkuZmlsbChtdGguVmVjNFNldCgxLCAwLCAxLCAxKSwgMCwgdmVydGljZXMubGVuZ3RoKTtcclxuICAgICAgICBsZXQgdmVydGV4RGF0YSA9IHBsdC51bml0ZVBvc0NvbG9yTm9ybWFsKHZlcnRpY2VzLCBjb2xvcnMsIG5vcm1hbHMpO1xyXG4gICAgICAgIHZlcnRleERhdGEgPSBwbHQuZ2V0RmxvYXRBcnJheUZyb21WZXJ0ZXhBcnJheSh2ZXJ0ZXhEYXRhKTtcclxuICAgICAgICBwbHQuYWRkVG9EcmF3UXVldWUobWF0clcsIHZlcnRleERhdGEsIGluZCk7XHJcblxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgIGxldCBjdWJlID0gcGx0LnNldERlZmF1bHRJY29zYWhlZHJvbkdlb20oKTtcclxuICAgICAgICBsZXQgdmVydGljZXMgPSBjdWJlWzBdO1xyXG4gICAgICAgIGxldCBub3JtYWxzID0gY3ViZVsxXTtcclxuICAgICAgICBsZXQgaW5kaWNlcyA9IGN1YmVbMl07XHJcbiAgICAgICAgbGV0IG1hdHJXID0gbXRoLk1hdHJUcmFuc2xhdGUobXRoLlZlYzNTZXQoTWF0aC5yYW5kb20oKSAqIDMwLCBNYXRoLnJhbmRvbSgpICogMzAsIE1hdGgucmFuZG9tKCkgKiAzMCkpO1xyXG5cclxuICAgICAgICBsZXQgY29sb3JzID0gbmV3IEFycmF5KHZlcnRpY2VzLmxlbmd0aCkuZmlsbChtdGguVmVjNFNldCgxLCAwLCAxLCAxKSwgMCwgMTAwKTtcclxuICAgICAgICBsZXQgdmVydGV4RGF0YSA9IHBsdC51bml0ZVBvc0NvbG9yTm9ybWFsKHZlcnRpY2VzLCBjb2xvcnMsIG5vcm1hbHMpO1xyXG4gICAgICAgIHZlcnRleERhdGEgPSBwbHQuZ2V0RmxvYXRBcnJheUZyb21WZXJ0ZXhBcnJheSh2ZXJ0ZXhEYXRhKTtcclxuICAgICAgICBwbHQuYWRkVG9EcmF3UXVldWUobWF0clcsIHZlcnRleERhdGEsIGluZGljZXMpO1xyXG4gICAgICAgICovXHJcbiAgICB9O1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJEb2RlY2FoZWRyb25cIikub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgRG9kZWNhaGVkcm9uMSA9IHBsdC5zZXREZWZhdWx0RG9kZWNhaGVkcm9uR2VvbSgpO1xyXG4gICAgICAgIGxldCB2ZXJ0ID0gRG9kZWNhaGVkcm9uMVswXTtcclxuICAgICAgICBsZXQgaW5kID0gRG9kZWNhaGVkcm9uMVsyXTtcclxuICAgICAgICBsZXQgRG9kZWNhaGVkcm9uMiA9IHBsdC5nZXROb3JtYWxHZW9tKHZlcnQsIGluZCk7XHJcbiAgICAgICAgbGV0IHZlcnRpY2VzID0gRG9kZWNhaGVkcm9uMlswXSwgbm9ybWFscyA9IERvZGVjYWhlZHJvbjJbMV07XHJcbiAgICAgICAgbGV0IG1hdHJXID0gbXRoLk1hdHJUcmFuc2xhdGUobXRoLlZlYzNTZXQoTWF0aC5yYW5kb20oKSAqIDMwLCBNYXRoLnJhbmRvbSgpICogMzAsIE1hdGgucmFuZG9tKCkgKiAzMCkpO1xyXG5cclxuICAgICAgICBsZXQgY29sb3JzID0gbmV3IEFycmF5KHZlcnRpY2VzLmxlbmd0aCkuZmlsbChtdGguVmVjNFNldCgxLCAwLCAxLCAxKSwgMCwgdmVydGljZXMubGVuZ3RoKTtcclxuICAgICAgICBsZXQgdmVydGV4RGF0YSA9IHBsdC51bml0ZVBvc0NvbG9yTm9ybWFsKHZlcnRpY2VzLCBjb2xvcnMsIG5vcm1hbHMpO1xyXG4gICAgICAgIHZlcnRleERhdGEgPSBwbHQuZ2V0RmxvYXRBcnJheUZyb21WZXJ0ZXhBcnJheSh2ZXJ0ZXhEYXRhKTtcclxuICAgICAgICBwbHQuYWRkVG9EcmF3UXVldWUobWF0clcsIHZlcnRleERhdGEsIGluZCk7XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgbGV0IGN1YmUgPSBwbHQuc2V0RGVmYXVsdERvZGVjYWhlZHJvbkdlb20oKTtcclxuICAgICAgICBsZXQgdmVydGljZXMgPSBjdWJlWzBdO1xyXG4gICAgICAgIGxldCBub3JtYWxzID0gY3ViZVsxXTtcclxuICAgICAgICBsZXQgaW5kaWNlcyA9IGN1YmVbMl07XHJcbiAgICAgICAgbGV0IG1hdHJXID0gbXRoLk1hdHJUcmFuc2xhdGUobXRoLlZlYzNTZXQoTWF0aC5yYW5kb20oKSAqIDMwLCBNYXRoLnJhbmRvbSgpICogMzAsIE1hdGgucmFuZG9tKCkgKiAzMCkpO1xyXG5cclxuICAgICAgICBsZXQgY29sb3JzID0gbmV3IEFycmF5KHZlcnRpY2VzLmxlbmd0aCkuZmlsbChtdGguVmVjNFNldCgxLCAwLCAxLCAxKSwgMCwgMTAwKTtcclxuICAgICAgICBsZXQgdmVydGV4RGF0YSA9IHBsdC51bml0ZVBvc0NvbG9yTm9ybWFsKHZlcnRpY2VzLCBjb2xvcnMsIG5vcm1hbHMpO1xyXG4gICAgICAgIHZlcnRleERhdGEgPSBwbHQuZ2V0RmxvYXRBcnJheUZyb21WZXJ0ZXhBcnJheSh2ZXJ0ZXhEYXRhKTtcclxuICAgICAgICBwbHQuYWRkVG9EcmF3UXVldWUobWF0clcsIHZlcnRleERhdGEsIGluZGljZXMpO1xyXG4gICAgICAgICovXHJcbiAgICB9O1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJEZWxldGVcIikub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBwbHQucG9wRHJhd1F1ZXVlKCk7XHJcbiAgICB9O1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJDbGVhclwiKS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHBsdC5jbGVhckRyYXdRdWV1ZSgpO1xyXG4gICAgfTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQuY29kZSA9PSAnS2V5VycpIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcm5kLmRyYXdTY2VuZSgpO1xyXG59XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7IG9uU3RhcnQoKSB9KTtcclxuXHJcbi8vd2luZG93Lm9ucmVzaXplID0gKCkgPT4geyBybmQuRnJhbWVXID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIikuY2xpZW50V2lkdGgsIHJuZC5GcmFtZUggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKS5jbGllbnRIZWlnaHQgfVxyXG4vL3dpbmRvdy5ldmVudC4iXSwibmFtZXMiOlsic2hkLmluaXRTaGFkZXJzIiwicGxhdC5pbml0R2xvYmFsRHJhd1F1ZXVlIiwibXRoLlVuaXRNYXRyaXgiLCJtYWluLmlzUGF1c2UiLCJtYWluLnBhdXNldGltZSIsIm1haW4uc3RhcnRUaW1lIiwibXRoLlZlYzMiLCJtdGguTWF0clZpZXciLCJtdGguQ2FtU2V0UHJvaiIsIm10aC5NYXRyTXVsTWF0ciIsIm10aC5NYXRyVHJhbnNsYXRlIiwibXRoLlZlYzNTZXQiLCJtdGguUEkiLCJtdGguTWF0clNjYWxlIiwic2hkLnVfdGltZV9sb2NhdGlvbiIsInNoZC51X2ZyYW1lX3dfbG9jYXRpb24iLCJzaGQudV9mcmFtZV9oX2xvY2F0aW9uIiwic2hkLnVfY2FtRGlyX2xvY2F0aW9uIiwibXRoLkFyckZyb21WZWMzIiwibXRoLlZlYzNOb3JtYWxpemUiLCJtdGguVmVjM1N1YlZlYzMiLCJzaGQudV9jYW1Mb2NfbG9jYXRpb24iLCJzaGQudV9tYXRyVlBfbG9jYXRpb24iLCJzaGQudV9tYXRyV19sb2NhdGlvbiIsIm10aC5NYXRyUm90YXRlIiwicGxhdC5kcmF3R2xvYWJhbFF1ZXVlIiwicm5kLnZlcnRleEJ1ZmZlciIsIm10aC5WZWMzQ3Jvc3NWZWMzIiwicm5kLmdsb2JhbE1hdHJXIiwic3RhcnRUaW1lIiwicGF1c2V0aW1lIiwiaXNQYXVzZSIsInJuZC5pbml0R0wiLCJybmQudGltZUZyb21TdGFydCIsInBsdC5zZXREZWZhdWx0Q3ViZUdlb20iLCJwbHQuZ2V0Tm9ybWFsR2VvbSIsIm10aC5WZWM0U2V0IiwicGx0LnVuaXRlUG9zQ29sb3JOb3JtYWwiLCJwbHQuZ2V0RmxvYXRBcnJheUZyb21WZXJ0ZXhBcnJheSIsInBsdC5hZGRUb0RyYXdRdWV1ZSIsInBsdC5zZXREZWZhdWx0VGV0cmFoZWRyb25HZW9tIiwicGx0LnNldERlZmF1bHRPY3RhaGVkcm9uR2VvbSIsInBsdC5zZXREZWZhdWx0SWNvc2FoZWRyb25HZW9tIiwicGx0LnNldERlZmF1bHREb2RlY2FoZWRyb25HZW9tIiwicGx0LnBvcERyYXdRdWV1ZSIsInBsdC5jbGVhckRyYXdRdWV1ZSIsInJuZC5kcmF3U2NlbmUiXSwibWFwcGluZ3MiOiI7OztJQUFBO0FBQ0E7SUFDQTtJQUNPLElBQUksRUFBRSxHQUFHLHNCQUFzQixDQUFDO0FBQ3ZDO0lBQ08sTUFBTSxJQUFJLENBQUM7SUFDbEIsSUFBSSxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDekIsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsS0FBSztJQUNMLENBQUM7SUFDTSxNQUFNLElBQUksQ0FBQztJQUNsQixJQUFJLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDNUIsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixLQUFLO0lBQ0wsQ0FBQztJQUNNLE1BQU0sSUFBSSxDQUFDO0lBQ2xCLElBQUksV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDbEMsUUFBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBQzFCLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUMxQixRQUFRLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtJQUM1QixRQUFRLElBQUksQ0FBQyxDQUFDO0lBQ2QsWUFBWSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQ2pDLFlBQVksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDaEMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUNoQyxZQUFZLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNsQyxLQUFLO0lBQ0wsQ0FBQztJQWdDTSxTQUFTLGFBQWEsQ0FBQyxDQUFDLEVBQUU7SUFDakMsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDOUIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ2xCLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNsQixRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFDTSxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUU7SUFDN0IsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ2hDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNwQixRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7QUFDRDtJQUNPLFNBQVMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUU7SUFDOUMsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDeEYsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQztJQUNBLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFDNUYsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFDaEYsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFDaEYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBeUdNLElBQUksVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDM0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ2QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ2QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUM7SUFDUixTQUFTLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO0lBQ3BDLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJO0lBQ3BCLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0csUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdHLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0csUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdHLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0csUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdHLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0csUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdHLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0csUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdHLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQzlHLElBQUksT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ00sU0FBUyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDakMsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUlNLFNBQVMsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7SUFDcEMsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQU9NLFNBQVMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDakMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ2QsUUFBUSxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkQ7SUFDQSxRQUFRLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFJTSxTQUFTLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO0lBQ3BDLElBQUksT0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBQ00sU0FBUyxhQUFhLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtJQUN0QyxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRyxDQUFDO0lBV00sU0FBUyxhQUFhLENBQUMsQ0FBQyxFQUFFO0lBQ2pDLElBQUksSUFBSSxHQUFHLEdBQUcsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNoQztJQUNBLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQzVCLFFBQVEsT0FBTyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM3QztJQUNBLFFBQVEsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQW1CTSxTQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRTtJQUN2QyxJQUFJLElBQUksR0FBRyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbEQsSUFBSSxJQUFJLEtBQUssR0FBRyxhQUFhLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELElBQUksSUFBSSxFQUFFLEdBQUcsYUFBYSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN0RDtJQUNBLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzdDLFFBQVEsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2hDLFFBQVEsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2hDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25GLElBQUksT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ00sU0FBUyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDOUMsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDN0MsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDaEMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsTUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3BFLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEMsSUFBSSxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7QUFDRDtJQUNPLFNBQVMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFF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R0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEQsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDM0QsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2xDO0lBQ0EsSUFBSSxFQUFFLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsSUFBSSxFQUFFLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekQsSUFBSSxFQUFFLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsSUFBSSxFQUFFLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDMUQsSUFBSSxFQUFFLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsSUFBSSxFQUFFLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDMUQ7SUFDQTtJQUNBLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSUUsSUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxD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QyxRQUFRLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNyRSxJQUFJLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7QUFDRDtJQUNPLFNBQVMsNEJBQTRCLENBQUMsT0FBTyxFQUFFO0lBQ3RELElBQUksSUFBSSxHQUFHLEdBQUcsR0FBRTtJQUNoQixJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzdDLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN2QyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNDLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0MsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM3QyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzdDLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxD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QyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEQsWUFBWSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsWUFBWSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzlDLFlBQVksT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RELFNBQVMsTUFBTTtJQUNmLFlBQVksT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsWUFBWSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzlDLFlBQVksT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QyxZQUFZLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxZQUFZLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xELFlBQVksT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELFlBQVksT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLFlBQVksT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QyxZQUFZLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxTQUFTO0lBQ1QsS0FBSztJQUNMLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNyQixJQUFJLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDckIsSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNyQixJQUFJLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDckIsSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNyQixJQUFJLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDckIsSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNyQixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdEIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN0QixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdEIsSUFBSSxP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
