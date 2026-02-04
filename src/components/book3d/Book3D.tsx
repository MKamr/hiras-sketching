/**
 * 3D book with skinned pages (curved flip) - ported from r3f-animated-book-slider.
 * Driven by props: page (current index) and onPageChange (when user clicks a page).
 */
// @ts-nocheck - R3F JSX intrinsics (group, primitive) need global types
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { easing } from 'maath';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bone,
  Color,
  Group,
  MeshStandardMaterial,
  Skeleton,
  SkinnedMesh,
} from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';
import {
  pageGeometry,
  PAGE_DEPTH,
  PAGE_SEGMENTS,
  SEGMENT_WIDTH,
} from './bookGeometry';

const easingFactor = 0.5;
const easingFactorFold = 0.3;
const insideCurveStrength = 0.18;
const outsideCurveStrength = 0.05;
const turningCurveStrength = 0.09;

const PAPER_COLOR = new Color('#F4F1EA');
const SPINE_COLOR = new Color('#2B2B2B');
const emissiveColor = new Color('#D8A34A');

const basePageMaterials = [
  new MeshStandardMaterial({ color: PAPER_COLOR }),
  new MeshStandardMaterial({ color: SPINE_COLOR }),
  new MeshStandardMaterial({ color: PAPER_COLOR }),
  new MeshStandardMaterial({ color: PAPER_COLOR }),
];

type Page3DProps = {
  number: number;
  page: number;
  opened: boolean;
  bookClosed: boolean;
  onPageClick: (opened: boolean, number: number) => void;
};

function Page3D({ number, page, opened, bookClosed, onPageClick }: Page3DProps) {
  const group = useRef<Group>(null);
  const turnedAt = useRef(0);
  const lastOpened = useRef(opened);
  const skinnedMeshRef = useRef<SkinnedMesh>(null);

  const manualSkinnedMesh = useMemo(() => {
    const bones: Bone[] = [];
    for (let i = 0; i <= PAGE_SEGMENTS; i++) {
      const bone = new Bone();
      bones.push(bone);
      bone.position.x = i === 0 ? 0 : SEGMENT_WIDTH;
      if (i > 0) bones[i - 1].add(bone);
    }
    const skeleton = new Skeleton(bones);
    const materials = [
      ...basePageMaterials,
      new MeshStandardMaterial({
        color: PAPER_COLOR,
        roughness: 0.1,
        emissive: emissiveColor,
        emissiveIntensity: 0,
      }),
      new MeshStandardMaterial({
        color: PAPER_COLOR,
        roughness: 0.1,
        emissive: emissiveColor,
        emissiveIntensity: 0,
      }),
    ];
    const mesh = new SkinnedMesh(pageGeometry, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    mesh.add(skeleton.bones[0]);
    mesh.bind(skeleton);
    return mesh;
  }, []);

  useFrame((_, delta) => {
    if (!skinnedMeshRef.current) return;

    if (lastOpened.current !== opened) {
      turnedAt.current = +new Date();
      lastOpened.current = opened;
    }
    let turningTime = Math.min(400, Date.now() - turnedAt.current) / 400;
    turningTime = Math.sin(turningTime * Math.PI);

    let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;
    if (!bookClosed) {
      targetRotation += degToRad(number * 0.8);
    }

    const bones = skinnedMeshRef.current.skeleton.bones;
    for (let i = 0; i < bones.length; i++) {
      const target = i === 0 ? group.current : bones[i];
      if (!target) continue;

      const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0;
      const outsideCurveIntensity = i >= 8 ? Math.cos(i * 0.3 + 0.09) : 0;
      const turningIntensity =
        Math.sin(i * Math.PI * (1 / bones.length)) * turningTime;
      let rotationAngle =
        insideCurveStrength * insideCurveIntensity * targetRotation -
        outsideCurveStrength * outsideCurveIntensity * targetRotation +
        turningCurveStrength * turningIntensity * targetRotation;
      let foldRotationAngle = degToRad(Math.sign(targetRotation) * 2);
      if (bookClosed) {
        if (i === 0) {
          rotationAngle = targetRotation;
          foldRotationAngle = 0;
        } else {
          rotationAngle = 0;
          foldRotationAngle = 0;
        }
      }
      const rot = (target as { rotation: { x: number; y: number; z: number } }).rotation;
      easing.dampAngle(rot, 'y', rotationAngle, easingFactor, delta);
      const foldIntensity =
        i > 8
          ? Math.sin(i * Math.PI * (1 / bones.length) - 0.5) * turningTime
          : 0;
      easing.dampAngle(rot, 'x', foldRotationAngle * foldIntensity, easingFactorFold, delta);
    }
  });

  return (
    <group
      ref={group}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onPageClick(opened, number);
      }}
      onPointerDown={(e: ThreeEvent<PointerEvent>) => e.stopPropagation()}
    >
      <primitive
        object={manualSkinnedMesh}
        ref={skinnedMeshRef}
        position-z={-number * PAGE_DEPTH + page * PAGE_DEPTH}
      />
    </group>
  );
}

export type Book3DProps = {
  pageCount: number;
  page: number;
  onPageChange: (newPage: number) => void;
};

export function Book3D({ pageCount, page, onPageChange }: Book3DProps) {
  const [delayedPage, setDelayedPage] = useState(page);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const goToPage = () => {
      setDelayedPage((prev) => {
        if (page === prev) return prev;
        timeout = setTimeout(
          goToPage,
          Math.abs(page - prev) > 2 ? 50 : 150
        );
        if (page > prev) return prev + 1;
        if (page < prev) return prev - 1;
        return prev;
      });
    };
    goToPage();
    return () => clearTimeout(timeout);
  }, [page]);

  const handlePageClick = (opened: boolean, number: number) => {
    onPageChange(opened ? number : number + 1);
  };

  return (
    <group rotation-y={-Math.PI / 2}>
      {Array.from({ length: pageCount }, (_, index) => (
        <Page3D
          key={index}
          number={index}
          page={delayedPage}
          opened={delayedPage > index}
          bookClosed={delayedPage === 0 || delayedPage === pageCount}
          onPageClick={handlePageClick}
        />
      ))}
    </group>
  );
}
