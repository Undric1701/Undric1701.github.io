#version 300 es
precision highp float;

layout (location = 0) out vec4 o_color;
                        
uniform float u_time;
uniform float FrameW;
uniform float FrameH;

void main() {
    o_color = vec4(1, 0, 0, 1);
}