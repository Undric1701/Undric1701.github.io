/* Tretyakov Andrey (AT7), 10-7, 05.06.2025, shaders support module */
let vs, fs;
export let program;

export let u_time_location,
    u_frame_w_location,
    u_frame_h_location,
    u_matrVP_location,
    u_matrW_location,
    u_camDir_location;

const ft1 = fetch("/shaders/vert.glsl")
    .then((res) => res.text())
    .then((data) => {
        vs = data;
    });

const ft2 = fetch("/shaders/frag.glsl")
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
}

export async function initShaders(gl) {
    // Построение "промиза" - сущности ожидания завершения указанных асинхронных запросов
    const allData = await Promise.all([ft1, ft2]);
    // Выполняем то, что необходимо после получения файлов
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