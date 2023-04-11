varying vec3 vertexNormal;

void main(){

    float intensity = pow(0.4 - dot(vertexNormal, vec3(0,0,1.0)), 2.0);
    gl_FragColor = vec4(0.0039, 0.3686, 0.651, 1.0) * 22.0 * intensity;   
}