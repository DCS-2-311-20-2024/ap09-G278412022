//
// 応用プログラミング 第9,10回 自由課題 (ap0901.js)
// G38400-2023 拓殖太郎
//
"use strict"; // 厳格モード

// ライブラリをモジュールとして読み込む
import * as THREE from "three";
import { GUI } from "ili-gui";

// ３Ｄページ作成関数の定義

"use strict"; // 厳格モード

import * as THREE from 'three';
import GUI from 'ili-gui';
import { makeMetalRobot, makeCBRobot } from './robot.js'

// ３Ｄページ作成関数の定義
function init() {
  const cameraParam = { // カメラの設定値
    fov: 50, // 視野角
    x: 5,
    y: 10,
    z: 20
  };

  // シーン作成
  const scene = new THREE.Scene();

  // 座標軸の設定
  const axes = new THREE.AxesHelper(18);
  scene.add(axes);
  axes.visible = false;


  // 平面の設定
  const planeGeometry = new THREE.PlaneGeometry(20, 15);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: "Green"});
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.receiveShadow = true;
  scene.add(plane);

  // 金属製ロボットの追加
  const metalRobot = makeMetalRobot();
  metalRobot.position.x = 3;
  scene.add(metalRobot);

  // 金属製ロボットの追加
  const cardboardRobot = makeCBRobot();
  cardboardRobot.position.x = -3;
  scene.add(cardboardRobot);

  // 光源の設定
  const spotLight = new THREE.SpotLight(0xffffff, 500);
  spotLight.position.set(-2, 10, 10);
  spotLight.castShadow=true;
  scene.add(spotLight);

  // カメラの設定
  const camera = new THREE.PerspectiveCamera(
    cameraParam.fov, window.innerWidth/window.innerHeight, 0.1, 1000);

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0x703000 );
  renderer.shadowMap.enabled = true;
  document.getElementById("WebGL-output")
    .appendChild(renderer.domElement);

  // 描画関数の定義
  function render() {
    camera.fov = cameraParam.fov;
    camera.position.x = cameraParam.x;
    camera.position.y = cameraParam.y;
    camera.position.z = cameraParam.z;
    camera.lookAt(0, 3, 0);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  }

  // カメラのコントローラ
  const gui = new GUI();
  gui.add(cameraParam, "fov", 10, 100).onChange(render);
  gui.add(cameraParam, "x", -40, 40).onChange(render);
  gui.add(cameraParam, "y", -40, 40).onChange(render);
  gui.add(cameraParam, "z", -40, 40).onChange(render);

  // 描画
  render();
}

// 3Dページ作成関数の呼び出し
init();
