/**
 * R3F scene: 3D book wired to BookNavigationContext.
 * Renders inside Canvas; uses useBookNavigation() so context must wrap the Canvas.
 */
// @ts-nocheck - R3F JSX intrinsics (mesh, directionalLight, etc.) need global types
import { Environment } from '@react-three/drei';
import { Book3D } from './Book3D';
import { useBookNavigation } from '../../context/BookNavigationContext';

export function Experience3D() {
  const { currentIndex, totalPages, goToIndex } = useBookNavigation();

  return (
    <>
      <Book3D
        pageCount={totalPages}
        page={currentIndex}
        onPageChange={goToIndex}
      />
      <Environment preset="studio" />
      <directionalLight
        position={[2, 5, 2]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
}
