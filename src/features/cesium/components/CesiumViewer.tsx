

import React, { useRef, useEffect } from 'react';
import { Viewer, Entity, PointGraphics, LabelGraphics, ModelGraphics } from 'resium';
import * as Cesium from 'cesium';

Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN;

const CesiumViewer: React.FC = () => {
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    // Chúng ta sử dụng useEffect nhưng với cơ chế kiểm tra sự tồn tại của Cesium Element
    const viewer = viewerRef.current?.cesiumElement as Cesium.Viewer;
    
    if (viewer) {
      console.log("🚀 Cesium Viewer is ready via Ref!");

      // Thiết lập ánh sáng
      viewer.scene.light = new Cesium.DirectionalLight({
        direction: Cesium.Cartesian3.fromElements(1, 1, 1),
        color: Cesium.Color.WHITE,
        intensity: 5.0,
      });

      // Kiểm tra Entity và thực hiện Fly To
      const checkInterval = setInterval(() => {
        const shrimpEntity = viewer.entities.getById('shrimp-model');
        if (shrimpEntity) {
          console.log("✅ Found Shrimp Model!");
          viewer.flyTo(shrimpEntity, {
            duration: 4,
            offset: new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-35), 1500),
          });
          clearInterval(checkInterval);
        }
      }, 500);

      return () => clearInterval(checkInterval);
    }
  }, [viewerRef.current?.cesiumElement]); // Chạy lại khi cesiumElement được gán

  return (
    <Viewer
      ref={viewerRef}
      full
      // Giải quyết lỗi terrainProvider nếu Cesium.createWorldTerrainAsync() gây lỗi TS
      terrainProvider={undefined} 
      animation={false}
      timeline={false}
      baseLayerPicker={false}
    >
      <Entity
        id="shrimp-model"
        name="Khu vực nuôi tôm"
        position={Cesium.Cartesian3.fromDegrees(105.7698, 10.0273, 10)}
      >
        <ModelGraphics
          uri="/src/assets/3D-objects/AM_Shrimp.glb" 
          minimumPixelSize={128}
          maximumScale={20000}
        />
      </Entity>

      <Entity
        name="Bến Ninh Kiều"
        position={Cesium.Cartesian3.fromDegrees(105.7698, 10.0273, 10)}
      >
        <PointGraphics pixelSize={15} color={Cesium.Color.RED} />
        <LabelGraphics text="Bến Ninh Kiều" font="16px sans-serif" pixelOffset={new Cesium.Cartesian2(0, -25)} />
      </Entity>
    </Viewer>
  );
};

export default CesiumViewer;