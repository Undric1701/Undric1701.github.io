

let gl;
let startTime, pausetime = 0.0;
let FrameW, FrameH;
let IsPause = false;

function initGL(canvas) {
    gl = canvas.getContext("webgl2");
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
    FrameW = canvas.width;
    FrameH = canvas.height;
}

const shaderFs = `#version 300 es
precision highp float;

layout (location = 0) out vec4 o_color;
                        
uniform float u_time;
uniform float FrameW;
uniform float FrameH;

void main() {
    o_color = vec4(1, 0, 0, 1);
}`;

const shaderVs = `#version 300 es
precision highp float;

layout (location = 0) in vec3 a_pos;
uniform mat4 MatrVP;

void main() {
    gl_Position = MatrVP * vec4(a_pos, 1);
}`;

function getShader(shaderStr, type) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, shaderStr);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
    }

    return shader;
}

let u_time_location,
    u_frame_w_location,
    u_frame_h_location,
    u_posx_location,
    u_posy_location,
    u_frac_location,
    u_iterations_location,
    u_zoom_location,
    u_background_color,
    u_fractal_color,
    u_matrVP_location;

function GetColor(Color) {
    let r = parseInt(Color.substring(1, 3), 16) / 255.0;
    let g = parseInt(Color.substring(3, 5), 16) / 255.0;
    let b = parseInt(Color.substring(5, 7), 16) / 255.0;
    return [r, g, b];
}

function initShaders() {
    const vs = getShader(shaderFs, gl.FRAGMENT_SHADER);
    const fs = getShader(shaderVs, gl.VERTEX_SHADER);

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        alert("Program linkage error");
    }

    gl.useProgram(program);

    u_time_location = gl.getUniformLocation(program, "u_time");
    u_frame_w_location = gl.getUniformLocation(program, "FrameW");
    u_frame_h_location = gl.getUniformLocation(program, "FrameH");
    u_posx_location = gl.getUniformLocation(program, "POSX");
    u_posy_location = gl.getUniformLocation(program, "POSY");
    u_frac_location = gl.getUniformLocation(program, "frac");
    u_iterations_location = gl.getUniformLocation(program, "Iterations");
    u_zoom_location = gl.getUniformLocation(program, "Zoom");
    u_background_color = gl.getUniformLocation(program, "BackgroundColor");
    u_fractal_color = gl.getUniformLocation(program, "FractalColor");
    u_matrVP_location = gl.getUniformLocation(program, "MatrVP");
}

let vertexBuffer;
function initBuffer() {
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    vertices = [3, 1, -1, -1, 1, 1, -1, -3, 2];
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
    );
}

function drawScene() {
    if (IsPause)
        timeFromStart = pausetime;
    else
        timeFromStart = (new Date()).getMilliseconds() - startTime - pausetime;

    gl.clearColor(1, 1, 1, 1);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);
    let loc = new mth.VEC3(Math.sin(timeFromStart), 5, cos(timeFromStart));
    let at = new mth.VEC3(0, 0, 0);
    let up = new mth.VEC3(0, 1, 0);
    let MatrV = mth.MatrView(loc, at, up);
    let MatrP = new mth.MatrFrustum(-FrameW / 2, FrameW / 2, -FrameH / 2, FrameH / 2, 0.1, 100);
    let MatrVP = mth.MatrMulMatr(MatrV, MatrP);

    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

    gl.uniform1f(u_time_location, timeFromStart / 1000.0);
    gl.uniform1f(u_frame_w_location, FrameW);
    gl.uniform1f(u_frame_h_location, FrameH);
    gl.uniformMatrix4fv(u_matrVP_location, true, new Float32Array(MatrVP.A, 0, 16), 0, 16);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    window.requestAnimationFrame(drawScene);
}

function onStart() {
    console.log("Platon's figures AT7 program");

    let canvas = document.getElementById("webgl-canvas");

    /*
    canvas.onmousemove = (ev) => {
        
    }; 
    
    canvas.onwheel = (ev) => {
        console.log(ev.deltaY);
    };
    
    canvas.onmousedown = (ev) => { IsClick = true };
    canvas.onmouseup = (ev) => { IsClick = false };
    
    document.getElementById("Iterations_Input").onchange = function () {
        Iterations = this.value;
    };
    document.getElementById("Pause").onclick = function () {
        IsPause = !IsPause;
        if (IsPause)
            pausetime = (new Date()).getMilliseconds();
    };

    document.getElementById("Fractal").onclick = function () {
        Frac = !Frac;
    };
    BackgroundC = document.getElementById("background-color").value;
    document.getElementById("background-color").onchange = function () {
        BackgroundC = this.value;
    };
    FractalC = document.getElementById("fractal-color").value;
    document.getElementById("fractal-color").onchange = function () {
        FractalC = this.value;
    };
    */
    initGL(canvas);
    initShaders();
    initBuffer();

    startTime = (new Date()).getMilliseconds();
    drawScene();
}