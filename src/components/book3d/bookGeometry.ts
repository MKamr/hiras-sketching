/**
 * Shared page geometry and skinning for 3D book flip (from r3f-animated-book-slider reference).
 * Each page is a thin box subdivided along the spine so bones can bend it like real paper.
 */
import {
  BoxGeometry,
  Float32BufferAttribute,
  Uint16BufferAttribute,
  Vector3,
} from 'three';

const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = 1.71;
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

export const pageGeometry = new BoxGeometry(
  PAGE_WIDTH,
  PAGE_HEIGHT,
  PAGE_DEPTH,
  PAGE_SEGMENTS,
  2
);

pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);

const position = pageGeometry.attributes.position;
const vertex = new Vector3();
const skinIndexes: number[] = [];
const skinWeights: number[] = [];

for (let i = 0; i < position.count; i++) {
  vertex.fromBufferAttribute(position, i);
  const x = vertex.x;
  const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
  const skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;
  skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
  skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
}

pageGeometry.setAttribute('skinIndex', new Uint16BufferAttribute(skinIndexes, 4));
pageGeometry.setAttribute('skinWeight', new Float32BufferAttribute(skinWeights, 4));

export { PAGE_WIDTH, PAGE_HEIGHT, PAGE_DEPTH, PAGE_SEGMENTS, SEGMENT_WIDTH };
