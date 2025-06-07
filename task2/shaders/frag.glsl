#version 300 es
precision highp float;

layout (location = 0) out vec4 o_color;

in vec4 drawColor;
in vec3 drawNormal;
in vec3 drawWPos;


uniform float u_time;
uniform float FrameW;
uniform float FrameH;   
uniform vec3 CamDir;   



void main() {      
    float nl = max(0.1, dot(drawNormal, CamDir));
    o_color = vec4(drawColor.rgb * nl, drawColor.a);
    //o_color = drawColor;    
}