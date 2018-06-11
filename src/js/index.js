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

function getCatheterLength(hypotenuse, catheter) {
    return Math.sqrt(hypotenuse * hypotenuse - catheter * catheter);
}

function getAngle(hypotenuse, oppositeCatheter) {
    const radian = Math.asin(oppositeCatheter / hypotenuse);
    return radian * 180 / Math.PI;
}

function degToRad(deg) {
    return deg * Math.PI / 180;
}

function generasteSpheres(scene) {
    const sphereRadius = 0.1;
    const widthSegments = 8;
    const heightSegments = 8;
    const sphereGeometry = new SphereBufferGeometry(sphereRadius, widthSegments, heightSegments);
    const sphereMaterial = new MeshBasicMaterial({ color: 0xffffff });

    const layoutRadius = 6;
    const delta = 0.5;
    let currentDelta = 0;
    const spheres = [];
    // ищем массив параллелей от экватериальной к полюсам layout-сферы
    while (currentDelta < layoutRadius) {
        // радиус параллели
        const currentRadius = currentDelta === 0 ?
            layoutRadius
            : getCatheterLength(layoutRadius, currentDelta);

        // длинна окружности параллели
        const circleLength = 2 * Math.PI * currentRadius;
        const sphereCount = Math.floor(circleLength / delta);

        const fiDelta = 360 / sphereCount;
        // угол между осью x и layoutRadius к currentRadius
        const tetaModule = currentDelta === 0 ? 90 : getAngle(layoutRadius, currentRadius);
        // у нас есть 2 симметричные относительно экватора параллели или экватор
        const tetas = currentDelta === 0 ? [tetaModule] : [tetaModule, 180 - tetaModule];

        tetas.forEach((teta) => {
            const radTeta = degToRad(teta);
            for (let i = 0; i < sphereCount; i++) {
                const radFi = degToRad(i * fiDelta);
                // console.log('fi ' + fi);
                // теперь у нас есть все 3 сферисеские координаты
                // fi, teta, layoutRadius
                const x = layoutRadius * Math.sin(radTeta) * Math.cos(radFi);
                const y = layoutRadius * Math.sin(radTeta) * Math.sin(radFi);
                const z = layoutRadius * Math.cos(radTeta);

                const sphere = new Mesh(sphereGeometry, sphereMaterial);
                sphere.position.set(x, y, z);
                scene.add(sphere);
                spheres.push(sphere);
            }
        });

        currentDelta += delta;
    }
    return spheres;
}

function init(container) {
    const scene = new Scene();
    scene.background = new Color(0x005da4);
    const camera = addCamera(container, scene);
    const renderer = addRenderer(container);
    const spheres = generasteSpheres(scene);
    const threshold = 0.1;
    const raycaster = new Raycaster();
    raycaster.params.Points.threshold = threshold;

    // document.addEventListener('mousemove', onDocumentMouseMove, false);

    return {
        scene,
        camera,
        renderer,
        raycaster,
        spheres,
    };
}

/* function addStats(container) {
    const stats = new Stats();
    stats.domElement.style.position	= 'absolute';
    stats.domElement.style.left	= '0px';
    stats.domElement.style.bottom = '0px';
    container.appendChild(stats.domElement);
} */

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

/* function animate(scene, camera, renderer) {
    // requestAnimationFrame(animate);
    render(scene, camera, renderer);
    // stats.update();
} */

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
