#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec4 normal;
varying vec2 vTextureCoord;
varying vec4 vFinalColor;

uniform sampler2D uSampler;
uniform float timeFactor;
uniform vec4 targetColor;
uniform bool hasTexture;

void main() {
    vec4 initialColor = vFinalColor;
    if(hasTexture){
        vec4 textureColor = texture2D(uSampler, vTextureCoord);
        initialColor = initialColor * textureColor;
    }
    vec4 deltaColor = targetColor - initialColor;
    gl_FragColor = initialColor + (deltaColor * (sin(timeFactor) + 1.0) / 2.0);
}
