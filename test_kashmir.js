const DottedMap = require("dotted-map").default;

const config = {
  height: 120,
  grid: "diagonal",
  region: {
    lat: { min: 6, max: 38 },
    lng: { min: 68, max: 98 },
  },
};

const map = new DottedMap(config);

// Define bounding box for PoK (Pakistan occupied Kashmir)
// Roughly 33N to 37.5N, 71E to 77E
const pokTopLeft = map.getPin({ lat: 37.5, lng: 71 });
const pokBottomRight = map.getPin({ lat: 33, lng: 77 });

console.log("PoK Box:", { pokTopLeft, pokBottomRight });

const mapPak = new DottedMap({ ...config, countries: ["PAK"] });
const pakPoints = mapPak.getPoints();

// Filter PAK points within the box
// Note: Y increases downwards usually in SVG, but let's check values.
// In dotted-map, usually (0,0) is top-left? Or bottom-left?
// Previous test: Lucknow (26N) y=22, Max Y=59 (for height 60).
// So Y increases as Lat decreases (Top to Bottom).
// So Top Lat (37.5) should have smaller Y than Bottom Lat (33).

const pokPoints = pakPoints.filter(
  (p) =>
    p.x >= pokTopLeft.x &&
    p.x <= pokBottomRight.x &&
    p.y >= pokTopLeft.y &&
    p.y <= pokBottomRight.y
);

console.log(`Total PAK points: ${pakPoints.length}`);
console.log(`PoK points found: ${pokPoints.length}`);

// Aksai Chin (China)
// Roughly 34N to 36.5N, 77E to 81E
const acTopLeft = map.getPin({ lat: 36.5, lng: 77 });
const acBottomRight = map.getPin({ lat: 34, lng: 81 });

const mapChn = new DottedMap({ ...config, countries: ["CHN"] });
const chnPoints = mapChn.getPoints();

const acPoints = chnPoints.filter(
  (p) =>
    p.x >= acTopLeft.x &&
    p.x <= acBottomRight.x &&
    p.y >= acTopLeft.y &&
    p.y <= acBottomRight.y
);

console.log(`Total CHN points: ${chnPoints.length}`);
console.log(`Aksai Chin points found: ${acPoints.length}`);
