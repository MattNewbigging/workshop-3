import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class AssetManager {
  models = new Map();
  textures = new Map();
  lootNames: string[] = [];

  private loadingManager = new THREE.LoadingManager();

  applyModelTexture(model: THREE.Object3D, textureName: string) {
    const texture = this.textures.get(textureName);
    if (!texture) {
      return;
    }

    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.map = texture;
      }
    });
  }

  load(): Promise<void> {
    const gltfLoader = new GLTFLoader(this.loadingManager);
    const fbxLoader = new FBXLoader(this.loadingManager);
    const textureLoader = new THREE.TextureLoader(this.loadingManager);

    this.loadModels(gltfLoader, fbxLoader);
    this.loadTextures(textureLoader);

    return new Promise((resolve) => {
      this.loadingManager.onLoad = () => {
        resolve();
      };
    });
  }

  private loadModels(gltfLoader: GLTFLoader, fbxLoader: FBXLoader) {
    // level

    const levelUrl = new URL("/models/lootBoxScene.glb", import.meta.url).href;
    gltfLoader.load(levelUrl, (gltf) => this.models.set("level", gltf.scene));

    // chest body

    const chestBodyUrl = new URL("/models/chestBody.fbx", import.meta.url).href;
    fbxLoader.load(chestBodyUrl, (group) =>
      this.models.set("chest-body", group)
    );

    // chest lid

    const chestLidUrl = new URL("/models/chestLid.fbx", import.meta.url).href;
    fbxLoader.load(chestLidUrl, (group) => this.models.set("chest-lid", group));

    // coins

    const coinsUrl = new URL("/models/SM_Item_Coins_04.fbx", import.meta.url)
      .href;
    fbxLoader.load(coinsUrl, (group) => this.models.set("coins", group));
    this.lootNames.push("coins");

    // potions

    const potion1Url = new URL("/models/SM_Item_Potion_02.fbx", import.meta.url)
      .href;
    fbxLoader.load(potion1Url, (group) => this.models.set("potion-1", group));
    this.lootNames.push("potion-1");

    const potion2Url = new URL("/models/SM_Item_Potion_05.fbx", import.meta.url)
      .href;
    fbxLoader.load(potion2Url, (group) => this.models.set("potion-2", group));
    this.lootNames.push("potion-2");

    const potion3Url = new URL("/models/SM_Item_Potion_07.fbx", import.meta.url)
      .href;
    fbxLoader.load(potion3Url, (group) => this.models.set("potion-3", group));
    this.lootNames.push("potion-3");

    // axes

    const axe1Url = new URL("/models/SM_Wep_Axe_Nature_01.fbx", import.meta.url)
      .href;
    fbxLoader.load(axe1Url, (group) => this.models.set("axe-1", group));
    this.lootNames.push("axe-1");

    const axe2Url = new URL(
      "/models/SM_Wep_Crystal_Axe_01.fbx",
      import.meta.url
    ).href;
    fbxLoader.load(axe2Url, (group) => this.models.set("axe-2", group));
    this.lootNames.push("axe-2");

    const axe3Url = new URL("/models/SM_Wep_Ornate_Axe_01.fbx", import.meta.url)
      .href;
    fbxLoader.load(axe3Url, (group) => this.models.set("axe-3", group));
    this.lootNames.push("axe-3");

    // swords

    const sword1Url = new URL("/models/SM_Wep_Cutlass_01.fbx", import.meta.url)
      .href;
    fbxLoader.load(sword1Url, (group) => this.models.set("sword-1", group));
    this.lootNames.push("sword-1");

    const sword2Url = new URL(
      "/models/SM_Wep_Ornate_Sword_01.fbx",
      import.meta.url
    ).href;
    fbxLoader.load(sword2Url, (group) => this.models.set("sword-2", group));
    this.lootNames.push("sword-2");

    const sword3Url = new URL(
      "/models/SM_Wep_Straightsword_01.fbx",
      import.meta.url
    ).href;
    fbxLoader.load(sword3Url, (group) => this.models.set("sword-3", group));
    this.lootNames.push("sword-3");

    // hammers

    const hammer1Url = new URL(
      "/models/SM_Wep_Hammer_Mace_Spikes_01.fbx",
      import.meta.url
    ).href;
    fbxLoader.load(hammer1Url, (group) => this.models.set("hammer-1", group));
    this.lootNames.push("hammer-1");

    const hammer2Url = new URL(
      "/models/SM_Wep_Hammer_Small_01.fbx",
      import.meta.url
    ).href;
    fbxLoader.load(hammer2Url, (group) => this.models.set("hammer-2", group));
    this.lootNames.push("hammer-2");

    const hammer3Url = new URL(
      "/models/SM_Wep_Ornate_Spikes_01.fbx",
      import.meta.url
    ).href;
    fbxLoader.load(hammer3Url, (group) => this.models.set("hammer-3", group));
    this.lootNames.push("hammer-3");

    // shields

    const shield1Url = new URL(
      "/models/SM_Wep_Shield_Heater_01.fbx",
      import.meta.url
    ).href;
    fbxLoader.load(shield1Url, (group) => this.models.set("shield-1", group));
    this.lootNames.push("shield-1");

    const shield2Url = new URL(
      "/models/SM_Wep_Shield_Ornate_02.fbx",
      import.meta.url
    ).href;
    fbxLoader.load(shield2Url, (group) => this.models.set("shield-2", group));
    this.lootNames.push("shield-2");

    const shield3Url = new URL(
      "/models/SM_Wep_Shield_Plank_01.fbx",
      import.meta.url
    ).href;
    fbxLoader.load(shield3Url, (group) => this.models.set("shield-3", group));
    this.lootNames.push("shield-3");
  }

  private loadTextures(textureLoader: THREE.TextureLoader) {
    // dungeon 1 atlas

    const d1Url = new URL("/textures/Dungeons_Texture_01.png", import.meta.url)
      .href;
    const d1Texture = textureLoader.load(d1Url);
    d1Texture.encoding = THREE.sRGBEncoding;
    this.textures.set("d1-atlas", d1Texture);
  }
}
