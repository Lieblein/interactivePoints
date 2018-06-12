import {
    PerspectiveCamera,
    WebGLRenderer,
    Scene,
    Color,
    MeshBasicMaterial,
    SphereBufferGeometry,
    Mesh,
    Matrix4,
    VectorKeyframeTrack,
    AnimationClip,
    AnimationMixer,
    Clock,
    Vector3,
    Vector2,
} from 'three';

import Detector from './detector';
import options from './options';
import '../css/index.pcss';

window.game = {
    container: document.getElementById(options.scene.containerId),
    scene: null,
    camera: null,
    renderer: null,
    mouse: new Vector2(),
};

function addCamera() {
    const { offsetWidth, offsetHeight } = window.game.container;
    const camera = new PerspectiveCamera(
        45,
        offsetWidth / offsetHeight,
        1,
        10000,
    );
    camera.position.set(10, 10, 10);
    camera.lookAt(window.game.scene.position);
    camera.updateMatrix();

    window.game.camera = camera;
}

function addRenderer() {
    const { offsetWidth, offsetHeight } = window.game.container;
    window.game.renderer = new WebGLRenderer();
    window.game.renderer.setPixelRatio(window.devicePixelRatio);
    window.game.renderer.setSize(offsetWidth, offsetHeight);
    window.game.container.appendChild(window.game.renderer.domElement);
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

function convertSphericalToCartesian(radius, radTeta, radFi) {
    const x = radius * Math.sin(radTeta) * Math.cos(radFi);
    const y = radius * Math.sin(radTeta) * Math.sin(radFi);
    const z = radius * Math.cos(radTeta);
    return { x, y, z };
}

function generasteSphere(geometry, material, position, animationClip) {
    const sphere = new Mesh(geometry, material);
    sphere.position.set(...position);
    const scale = 0.01;
    sphere.scale.set(scale, scale, scale);

    const mixer = new AnimationMixer(sphere);
    const action = mixer.clipAction(animationClip);
    action.play();

    return {
        mesh: sphere,
        mixer,
    };
}

function createPulsationAnimation() {
    const { duration, pulseScale } = options.animation.scale;
    const times = [];
    const values = [];
    const tmp = new Vector3();
    const timesCount = 10;
    const count = duration * timesCount;
    const half = count / 2;

    for (let i = 1; i <= count; i++) {
        const time = i / timesCount;
        const coef = i <= half ? i / half : (count - i) / half;
        times.push(time);
        // const scaleFactor = Math.random() * pulseScale;
        const scaleFactor = coef * pulseScale;
        tmp.set(scaleFactor, scaleFactor, scaleFactor).toArray(values, values.length);
    }

    const trackName = '.scale';
    const track = new VectorKeyframeTrack(trackName, times, values);
    return new AnimationClip('scale', duration, [track]);
}

function generasteSpheres() {
    const { scene } = window.game;
    const widthSegments = 6;
    const heightSegments = 6;
    const sphereGeometry = new SphereBufferGeometry(
        options.sphere.radius,
        widthSegments,
        heightSegments,
    );
    const sphereMaterial = new MeshBasicMaterial({ color: options.sphere.color });
    const animationClip = createPulsationAnimation();

    const { radius: layoutRadius, delta } = options.layout;
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

        const radFiDelta = degToRad(360 / sphereCount);
        // угол между осью x и layoutRadius к currentRadius
        const tetaModule = currentDelta === 0 ? 90 : getAngle(layoutRadius, currentRadius);
        // у нас есть 2 симметричные относительно экватора параллели или экватор
        const tetas = currentDelta === 0 ? [tetaModule] : [tetaModule, 180 - tetaModule];
        const parallelSpheres = [];

        tetas.forEach((teta) => {
            const radTeta = degToRad(teta);
            for (let i = 0; i < sphereCount; i++) {
                const radFi = i * radFiDelta;
                const { x, y, z } = convertSphericalToCartesian(layoutRadius, radTeta, radFi);
                const pos = [x, y, z];
                const sphere = generasteSphere(sphereGeometry, sphereMaterial, pos, animationClip);
                scene.add(sphere.mesh);
                parallelSpheres.push(sphere);
            }
        });

        spheres.push(parallelSpheres);
        currentDelta += delta;
    }

    // добавим сферы на полюсах, чтобы не было "дырок"
    const northPos = [0, 0, layoutRadius];
    const northSphere = generasteSphere(sphereGeometry, sphereMaterial, northPos, animationClip);
    scene.add(northSphere.mesh);
    spheres.push([northSphere]);

    const southPos = [0, 0, -layoutRadius];
    const southSphere = generasteSphere(sphereGeometry, sphereMaterial, southPos, animationClip);
    scene.add(southSphere.mesh);
    spheres.push([southSphere]);

    return spheres;
}

function init() {
    window.game.clock = new Clock(); // для анимации
    window.game.scene = new Scene();
    window.game.scene.background = new Color(options.scene.color);
    addCamera();
    addRenderer();
    const spheres = generasteSpheres();

    return {
        spheres,
    };
}

function render(spheres) {
    const { x, y } = window.game.mouse;
    const { xCoef, yCoef } = options.animation.rotate;
    const rotateY = new Matrix4()
        .makeRotationY(x * xCoef)
        .makeRotationX(y * yCoef);
    window.game.camera.applyMatrix(rotateY);
    window.game.camera.updateMatrixWorld();

    const delta = window.game.clock.getDelta();
    for (let i = 0; i < spheres.length; i++) {
        for (let j = 0; j < spheres[i].length; j++) {
            const sphere = spheres[i][j];
            const { mixer } = sphere;
            mixer.update(delta * mixer.timeScale);
        }
    }

    window.game.renderer.render(window.game.scene, window.game.camera);
}

function animate(spheres) {
    window.requestAnimationFrame(() => animate(spheres));
    render(spheres);
}

function onDocumentMouseMove(event) {
    event.preventDefault();
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    const widthHalf = innerWidth / 2;
    const heightHalf = innerHeight / 2;
    const x = clientX <= widthHalf ? clientX / widthHalf : (innerWidth - clientX) / widthHalf;
    const y = clientY <= heightHalf ? clientY / heightHalf : (innerHeight - clientY) / heightHalf;
    window.game.mouse.x = x;
    window.game.mouse.y = y;
}

(function () {
    if (!Detector.webgl) Detector.addGetWebGLMessage();

    const { spheres } = init();
    animate(spheres);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
}());
