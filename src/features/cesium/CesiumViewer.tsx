import React, { useRef, useEffect, useState } from 'react';
import {
  Viewer,
  Entity,
  ModelGraphics,
  PointGraphics,
  LabelGraphics,
  type CesiumComponentRef,
} from 'resium';
import * as Cesium from 'cesium';

import { mockEntities } from '../../mocks/mockEntities'; // ← import mock từ bên ngoài

Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN;

const CesiumViewer: React.FC = () => {
  const viewerRef = useRef<CesiumComponentRef<Cesium.Viewer>>(null);
  const [entities] = useState(mockEntities); // sau này có thể fetch từ API

  /** 1. Setup scene (ONE TIME) */
  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    viewer.scene.light = new Cesium.DirectionalLight({
      direction: new Cesium.Cartesian3(0.5, 1, -1),
      intensity: 3,
    });

    viewer.scene.requestRenderMode = true;
    viewer.scene.maximumRenderTimeChange = Infinity;

    viewer.scene.requestRender();
  }, []);

  /** 2. Theo dõi model và flyTo khi load xong (chỉ fly đến entity đầu tiên có model) */
  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    let destroyed = false;
    let flew = false;

    const watchModels = () => {
      if (destroyed || flew) return;

      const primitives = viewer.scene.primitives;

      for (let i = 0; i < primitives.length; i++) {
        const p = primitives.get(i);

        if (p instanceof Cesium.Model && p.ready && !flew) {
          flew = true;

          console.log('✅ Model ready, radius:', p.boundingSphere.radius);

          viewer.camera.flyToBoundingSphere(p.boundingSphere, {
            duration: 3,
            offset: new Cesium.HeadingPitchRange(
              0,
              Cesium.Math.toRadians(-35),
              p.boundingSphere.radius * 4
            ),
          });

          viewer.scene.requestRender();
          return;
        }
      }

      requestAnimationFrame(watchModels);
    };

    watchModels();

    return () => {
      destroyed = true;
    };
  }, []);

  /** 3. Request render khi camera di chuyển */
  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    const remove = viewer.camera.changed.addEventListener(() => {
      viewer.scene.requestRender();
    });

    return () => remove();
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', background: '#000' }}>
      <Viewer
        ref={viewerRef}
        full
        animation={false}
        timeline={false}
        baseLayerPicker={false}
        fullscreenButton={false}
        geocoder={false}
        selectionIndicator={false}
        infoBox={false}
        navigationHelpButton={false}
        homeButton={false}
        sceneModePicker={false}
      >
        {entities.map((ent) => (
          <Entity
            key={ent.id}
            id={ent.id}
            name={ent.name}
            position={ent.position}
          >
            {/* Model nếu có */}
            {ent.graphics.model && (
              <ModelGraphics
                uri={ent.graphics.model.uri}
                scale={ent.graphics.model.scale}
                minimumPixelSize={ent.graphics.model.minimumPixelSize}
                maximumScale={ent.graphics.model.maximumScale}
                shadows={ent.graphics.model.shadows}
              />
            )}

            {/* Point nếu có */}
            {ent.graphics.point && (
              <PointGraphics
                pixelSize={ent.graphics.point.pixelSize}
                color={ent.graphics.point.color}
              />
            )}

            {/* Label nếu có */}
            {ent.graphics.label && (
              <LabelGraphics
                text={ent.graphics.label.text}
                font={ent.graphics.label.font}
                fillColor={ent.graphics.label.fillColor}
                outlineColor={ent.graphics.label.outlineColor}
                outlineWidth={ent.graphics.label.outlineWidth}
                verticalOrigin={ent.graphics.label.verticalOrigin}
                pixelOffset={ent.graphics.label.pixelOffset}
              />
            )}

            {/* Có thể thêm BillboardGraphics, PolylineGraphics, PolygonGraphics... */}
          </Entity>
        ))}
      </Viewer>
    </div>
  );
};

export default CesiumViewer;