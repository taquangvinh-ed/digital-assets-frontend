import { Viewer, Entity, PointGraphics, LabelGraphics, PolylineGraphics, PolygonGraphics, ModelGraphics } from 'resium';
import * as Cesium from 'cesium';
import { useEffect, useRef } from 'react';

// Set token (bảo mật: dùng env, không hardcode production!)
Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN

if (!Cesium.Ion.defaultAccessToken) {
  throw new Error('Missing Cesium Ion token')
}

const CesiumViewer: React.FC = () => {
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    if (viewerRef.current?.cesiumElement) {
      const viewer = viewerRef.current.cesiumElement as Cesium.Viewer;

      // Tùy chỉnh viewer giống code của bạn
      viewer.scene.globe.enableLighting = false;
      viewer.scene.highDynamicRange = false;

      // Fix light cho model sáng hơn
      viewer.scene.light = new Cesium.DirectionalLight({
        direction: Cesium.Cartesian3.fromElements(1, 1, 1),
        color: Cesium.Color.WHITE,
        intensity: 5.0,
      });

      // Detect device & optimize
      const isLowEnd = window.devicePixelRatio < 1.5 || navigator.hardwareConcurrency < 4;
      if (isLowEnd) {
        viewer.resolutionScale = 1;
viewer.scene.postProcessStages.fxaa.enabled = false;        viewer.shadowMap.enabled = false;
      }


(viewer.flyTo as any)({
      destination: Cesium.Cartesian3.fromDegrees(105.7698, 10.0273, 2000),
      // Optional: thêm orientation để camera nhìn xuống đẹp hơn
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-20.0),  // Nhìn xuống -20 độ
        roll: 0.0,
      },
      duration: 3,  // Thời gian bay (giây)
    });

      // Fly to default
viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(105.7698, 10.0273, 2000),
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-20.0),
        roll: 0.0,
      },
      duration: 3,
    });
      return () => {
        // Cleanup nếu cần
      };
    }
  }, []);

  return (
    <Viewer
      ref={viewerRef}
      full
      terrainProvider={Cesium.createWorldTerrainAsync()}
      geocoder={Cesium.IonGeocodeProviderType.GOOGLE}
      timeline
      shouldAnimate
      baseLayerPicker={false} // Tùy chỉnh nếu cần
      homeButton={false}     // Có thể thêm custom UI
      sceneModePicker={false}
    >
      {/* Bến Ninh Kiều - Point + Label */}
      <Entity
        name="Bến Ninh Kiều"
        description="<p>Địa điểm check-in hot nhất Cần Thơ!</p>"
        position={Cesium.Cartesian3.fromDegrees(105.7698, 10.0273, 10)}
      >
        <PointGraphics pixelSize={20} color={Cesium.Color.RED} outlineColor={Cesium.Color.WHITE} outlineWidth={3} />
        <LabelGraphics
          text="Bến Ninh Kiều"
          font="20px Arial"
          fillColor={Cesium.Color.WHITE}
          outlineColor={Cesium.Color.BLACK}
          outlineWidth={2}
          verticalOrigin={Cesium.VerticalOrigin.BOTTOM}
          pixelOffset={new Cesium.Cartesian2(0, -30)}
        />
      </Entity>

      {/* Polyline sông Hậu */}
      <Entity name="Sông Hậu đoạn Ninh Kiều">
        <PolylineGraphics
          positions={Cesium.Cartesian3.fromDegreesArray([
            105.7698, 10.0273,
            105.78, 10.02,
            105.79, 10.015,
          ])}
          width={10}
          material={new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.3,
            color: Cesium.Color.CYAN,
          })}
        />
      </Entity>

      {/* Polygon khu vực */}
      <Entity name="Khu vực Ninh Kiều">
        <PolygonGraphics
          hierarchy={Cesium.Cartesian3.fromDegreesArray([
            105.76, 10.03,
            105.78, 10.03,
            105.78, 10.02,
            105.76, 10.02,
          ])}
          material={Cesium.Color.BLUE.withAlpha(0.4)}
          outline
          outlineColor={Cesium.Color.BLUE}
        />
      </Entity>

      {/* Model 3D (shrimp farm) */}
      <Entity
        name="Khu vực nuôi tôm"
        position={Cesium.Cartesian3.fromDegrees(105.7698, 10.0273, 800)}
        orientation={Cesium.Transforms.headingPitchRollQuaternion(
          Cesium.Cartesian3.fromDegrees(105.7698, 10.0273, 100),
          new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(30), 0, 0)
        )}
      >
        <ModelGraphics
          uri="/src/assets/3D-objects/AM_Shrimp.glb" // Đặt asset trong public/assets hoặc src/assets
          minimumPixelSize={128}
          maximumScale={20000}
          runAnimations
        />
      </Entity>

      {/* Google Photorealistic 3D Tiles (nếu dùng) */}
      {/* <Cesium3DTileset url="https://tile.googleapis.com/v1/3dtiles/root.json?key=YOUR_GOOGLE_KEY" /> */}
    </Viewer>
  );
};

export default CesiumViewer;