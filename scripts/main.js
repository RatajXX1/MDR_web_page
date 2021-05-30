var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, document.querySelector("#world").offsetWidth / document.querySelector("#world").offsetHeight, 1, 1000);
camera.position.set(0, 0, 14);
camera.lookAt(scene.position);
var renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#word_bg"),
    antialias: false,
    alpha: true
});
renderer.setClearColor(0x000000 , 0);
renderer.setSize(document.querySelector("#world").offsetWidth, document.querySelector("#world").offsetHeight);
var geom = new THREE.SphereBufferGeometry(5, 180, 90);
var colors = [];
var color = new THREE.Color();
for (let i = 0; i < geom.attributes.position.count; i++) {
  color.set("white");
  color.toArray(colors, i * 3);
}
geom.addAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
var loader = new THREE.TextureLoader();
loader.setCrossOrigin('');
var texture = loader.load('img/textures/earthspec1k.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(1, 1);
var disk = loader.load('img/textures/circle.png');
var points = new THREE.Points(geom, new THREE.ShaderMaterial({
  vertexColors: THREE.VertexColors,
  uniforms: {
    visibility: {
      value: texture
    },
    shift: {
      value: 0
    },
    shape: {
      value: disk
    },
    size: {
      value: 0.3
    },
    scale: {
      value: window.innerHeight / 2
    }
  },
  vertexShader: `		
      uniform float scale;
      uniform float size;
      varying vec2 vUv;
      varying vec3 vColor;
      void main() {
        vUv = uv;
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = size * ( scale / length( mvPosition.xyz )) * (0.3 + sin(uv.y * 2.1415926) * 0. );
        gl_Position = projectionMatrix * mvPosition;
      }
  `,
  fragmentShader: `
      uniform sampler2D visibility;
      uniform float shift;
      uniform sampler2D shape;
      varying vec2 vUv;
      varying vec3 vColor;
      void main() {
        vec2 uv = vUv;
        uv.x += shift;
        vec4 v = texture2D(visibility, uv);
        if (length(v.rgb) > 1.0) discard;
        gl_FragColor = vec4( vColor, 1.0 );
        vec4 shapeData = texture2D( shape, gl_PointCoord );
        if (shapeData.a < 0.0625) discard;
        gl_FragColor = gl_FragColor * shapeData;
      }
  `,
  transparent: false
}));


scene.add(points);
var clock = new THREE.Clock();
var time = 0;
window.onresize = function() {
  camera.aspect = document.querySelector("#world").offsetWidth / document.querySelector("#world").offsetHeight
  camera.updateProjectionMatrix();
  renderer.setSize(document.querySelector("#world").offsetWidth, document.querySelector("#world").offsetHeight);
}
render();
function render() {
  time += clock.getDelta();
  points.material.uniforms.shift.value += 0.0015;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}