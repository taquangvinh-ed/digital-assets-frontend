    import * as Cesium from 'cesium';

    export const mockEntities = [{
    id: 'shrimp-001',
    name: 'Khu vực nuôi tôm Bến Ninh Kiều',
    position: Cesium.Cartesian3.fromDegrees(105.7698, 10.0273, 500),
    graphics: {
      model: {
        uri: 'https://res.cloudinary.com/dgkhbu7lc/image/upload/v1770174869/AM_Shrimp_xgkzfm.glb',
        scale: 100,
        minimumPixelSize: 300,
        maximumScale: 100000,
        shadows: Cesium.ShadowMode.DISABLED,
      },
      point: {
        pixelSize: 12,
        color: Cesium.Color.RED,
      },
      label: {
        text: 'Bến Ninh Kiều',
        font: 'bold 16px sans-serif',
        fillColor: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 3,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -28),
      },
    },
  },]