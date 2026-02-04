// components/CesiumEntity.tsx
import React from 'react';
import {
  Entity,
  ModelGraphics,
  PointGraphics,
  LabelGraphics,
  BillboardGraphics,
  // PolylineGraphics, PolygonGraphics, ... nếu cần sau này
} from 'resium';
import * as Cesium from 'cesium';
import type { CesiumEntity } from '../../../types/CesiumEntity';

interface CesiumEntityProps {
    entityData: CesiumEntity
  
}

const CesiumEntity: React.FC<CesiumEntityProps> = ({ entityData }) => {
  const { id, name, position, graphics = {} } = entityData;

  const cartPosition = Cesium.Cartesian3.fromDegrees(
    position.longitude,
    position.latitude,
    position.height
  );

  return (
    <Entity
      id={String(id)}
      name={name || 'Unnamed Entity'}
      position={cartPosition}
    >
      {/* Model */}
      {graphics.model && (
        <ModelGraphics
          uri={graphics.model.uri}
          scale={graphics.model.scale ?? 1}
          minimumPixelSize={graphics.model.minimumPixelSize ?? 128}
          maximumScale={graphics.model.maximumScale ?? 20000}
          shadows={
            graphics.model.shadows === 'DISABLED'
              ? Cesium.ShadowMode.DISABLED
              : Cesium.ShadowMode.ENABLED
          }
        />
      )}

      {/* Point */}
      {graphics.point && (
        <PointGraphics
          pixelSize={graphics.point.pixelSize ?? 10}
          color={
            graphics.point.color
              ? Cesium.Color.fromCssColorString(graphics.point.color)
              : Cesium.Color.RED
          }
          outlineColor={
            graphics.point.outlineColor
              ? Cesium.Color.fromCssColorString(graphics.point.outlineColor)
              : Cesium.Color.WHITE
          }
          outlineWidth={graphics.point.outlineWidth ?? 0}
        />
      )}

      {/* Label */}
      {graphics.label && (
        <LabelGraphics
          text={graphics.label.text}
          font={graphics.label.font ?? '14px sans-serif'}
          fillColor={
            graphics.label.fillColor
              ? Cesium.Color.fromCssColorString(graphics.label.fillColor)
              : Cesium.Color.WHITE
          }
          outlineColor={
            graphics.label.outlineColor
              ? Cesium.Color.fromCssColorString(graphics.label.outlineColor)
              : Cesium.Color.BLACK
          }
          outlineWidth={graphics.label.outlineWidth ?? 2}
          verticalOrigin={
            graphics.label.verticalOrigin === 'BOTTOM'
              ? Cesium.VerticalOrigin.BOTTOM
              : Cesium.VerticalOrigin.CENTER
          }
          pixelOffset={
            graphics.label.pixelOffset
              ? new Cesium.Cartesian2(...graphics.label.pixelOffset)
              : new Cesium.Cartesian2(0, 0)
          }
        />
      )}

      {/* Billboard (nếu có) */}
      {graphics.billboard && (
        <BillboardGraphics
          image={graphics.billboard.image}
          scale={graphics.billboard.scale ?? 1}
          width={graphics.billboard.width}
          height={graphics.billboard.height}
        />
      )}

      {/* Thêm các graphics khác nếu cần */}
    </Entity>
  );
};

export default CesiumEntity;