s
export interface CesiumEntity {
    id: string | number;
    name?: string;
    description?: string;
    position: {
      longitude: number;
      latitude: number;
      height: number;
    };
    graphics?: {
      model?: {
        uri: string;
        scale?: number;
        minimumPixelSize?: number;
        maximumScale?: number;
        shadows?: string;
      };
      point?: {
        pixelSize?: number;
        color?: string;
        outlineColor?: string;
        outlineWidth?: number;
      };
      label?: {
        text: string;
        font?: string;
        fillColor?: string;
        outlineColor?: string;
        outlineWidth?: number;
        verticalOrigin?: string;
        pixelOffset?: [number, number];
      };
      billboard?: {
        image: string;
        scale?: number;
        width?: number;
        height?: number;
      };
      // thêm các loại graphics khác nếu cần: polyline, polygon...
    };
    // các trường khác từ DB nếu cần
  };