import {
    PerspectiveCamera,
    WebGLRenderer,
    Scene,
    Color,
    MeshBasicMaterial,
    SphereBufferGeometry,
    Mesh,
    Raycaster,
} from 'three';
import Stats from '@xailabs/three-renderer-stats';

import Detector from './detector';
import '../css/index.pcss';

function addCamera(container, scene) {
    const camera =
        new PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 1, 10000);
    camera.position.set(10, 10, 10);
    camera.lookAt(scene.position);
    camera.updateMatrix();
    return camera;
}

function addRenderer(container) {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    return renderer;
}

function init(container) {
    const sphereCount = 40;
    const width = 150;
    const length = 150;

    const scene = new Scene();
    scene.background = new Color(0x005da4);
    const camera = addCamera(container, scene);
    const renderer = addRenderer(container);

    /* const pcBuffer = generatePointcloud(new THREE.Color(1, 0, 0), width, length);
    pcBuffer.scale.set(10, 10, 10);
    pcBuffer.position.set(-5, 0, 5);
    scene.add(pcBuffer);

    const pcIndexed = generateIndexedPointcloud(new THREE.Color(0, 1, 0), width, length);
    pcIndexed.scale.set(10, 10, 10);
    pcIndexed.position.set(5, 0, 5);
    scene.add(pcIndexed);

    const pcIndexedOffset =
        generateIndexedWithOffsetPointcloud(new THREE.Color(0, 1, 1), width, length);
    pcIndexedOffset.scale.set(10, 10, 10);
    pcIndexedOffset.position.set(5, 0, -5);
    scene.add(pcIndexedOffset);

    const pcRegular = generateRegularPointcloud(new THREE.Color(1, 0, 1), width, length);
    pcRegular.scale.set(10, 10, 10);
    pcRegular.position.set(-5, 0, -5);
    scene.add(pcRegular);

    const pointclouds = [pcBuffer, pcIndexed, pcIndexedOffset, pcRegular]; */

    const sphereGeometry = new SphereBufferGeometry(0.1, 32, 32);
    const sphereMaterial = new MeshBasicMaterial({ color: 0xffffff });
    const spheres = [];
    for (let i = 0; i < sphereCount; i++) {
        const sphere = new Mesh(sphereGeometry, sphereMaterial);
        scene.add(sphere);
        spheres.push(sphere);
    }

    const threshold = 0.1;
    const raycaster = new Raycaster();
    raycaster.params.Points.threshold = threshold;

    // window.addEventListener('resize', onWindowResize, false);
    // document.addEventListener('mousemove', onDocumentMouseMove, false);

    return { scene, camera, renderer };
}

function addStats(container) {
    const stats = new Stats();
    stats.domElement.style.position	= 'absolute';
    stats.domElement.style.left	= '0px';
    stats.domElement.style.bottom = '0px';
    container.appendChild(stats.domElement);
}

function render(scene, camera, renderer) {
    // camera.applyMatrix(rotateY);
    // camera.updateMatrixWorld();
    // raycaster.setFromCamera(mouse, camera);
    // const intersections = raycaster.intersectObjects(pointclouds);
    /* intersection = intersections.length > 0 ? intersections[0] : null;
    if (toggle > 0.02 && intersection !== null) {
        spheres[ spheresIndex ].position.copy( intersection.point );
        spheres[ spheresIndex ].scale.set( 1, 1, 1 );
        spheresIndex = ( spheresIndex + 1 ) % spheres.length;
        toggle = 0;
    } */
    /* for (let i = 0; i < spheres.length; i++) {
        const sphere = spheres[i];
        sphere.scale.multiplyScalar( 0.98 );
        sphere.scale.clampScalar( 0.01, 1 );
    } */
    // toggle += clock.getDelta();
    renderer.render(scene, camera);
}

function animate(scene, camera, renderer) {
    // requestAnimationFrame(animate);
    render(scene, camera, renderer);
    // stats.update();
}

(function () {
    if (!Detector.webgl) Detector.addGetWebGLMessage();

    const container = document.getElementById('container');
    const { scene, camera, renderer } = init(container);
    // addStats(container);
    // animate(scene, camera, renderer);
    render(scene, camera, renderer);

    /* const mouse = new Vector2();
    const intersection = null;
    const rotateY = new Matrix4().makeRotationY(0.005); */
}());
