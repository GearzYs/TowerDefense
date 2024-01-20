// BUILDER | Handle the creation of a tower
import Tower from '../models/Tower.js';

class TowerBuilder {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.cellSize = 0;
    this.bullets = [];
    this.towersTypes = [];
    this.type = 0;
    this.towerAudio = null;
  }

  withPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  withCellSize(cellSize) {
    this.cellSize = cellSize;
    return this;
  }

  withBullets(bullets) {
    this.bullets = bullets;
    return this;
  }

  withTowersTypes(towersTypes) {
    this.towersTypes = towersTypes;
    return this;
  }

  withType(type) {
    this.type = type;
    return this;
  }

  withTowerAudio(towerAudio) {
    this.towerAudio = towerAudio;
    return this;
  }

  build() {
    return new Tower(
      this.x,
      this.y,
      this.cellSize,
      this.bullets,
      this.towersTypes,
      this.type,
      this.towerAudio
    );
  }
}

export default TowerBuilder;
