import * as THREE from "three";

import Experience from "./Experience";

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;

    this.pixelRatioModifier = 1;
    this.setRenderer();
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.autoClear = false;

    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.CineonToneMapping;
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(
      this.sizes.pixelRatio * this.pixelRatioModifier
    );
    this.renderer.gammaOutput = true;
    this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height);
  }
  resize() {
    // Desktop mode
    if (window.matchMedia("(min-width: 1080px)").matches) {
      this.pixelRatioModifier = 1;
    }
    // Mobile mode
    else {
      this.pixelRatioModifier = 0.8;
    }
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(
      this.sizes.pixelRatio * this.pixelRatioModifier
    );
  }
  update() {
    this.renderer.render(this.scene, this.camera.perspectiveCamera);
    // // Second Screen
    // this.renderer.setScissorTest(true);
    // this.renderer.setViewport(
    //   this.sizes.width - this.sizes.width / 3,
    //   this.sizes.height - this.sizes.height / 3,
    //   this.sizes.width / 3,
    //   this.sizes.height / 3
    // );
    // this.renderer.setScissor(
    //   this.sizes.width - this.sizes.width / 3,
    //   this.sizes.height - this.sizes.height / 3,
    //   this.sizes.width / 3,
    //   this.sizes.height / 3
    // );
    // this.renderer.render(this.scene, this.camera.orthographicCamera);
    // this.renderer.setScissorTest(false);
  }
}
