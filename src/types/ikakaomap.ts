export interface KakaoMaps {
    maps: {
        LatLng: new (latitude: number, longitude: number) => LatLng;
        Map: new (
            container: HTMLElement,
            options: { center: LatLng; level: number; mapTypeId?: MapTypeId }
        ) => Map;
        Marker: new (options: { position: LatLng; image?: MarkerImage }) => Marker;
        MarkerImage: new (
            src: string,
            size: Size,
            options?: { offset: Point }
        ) => MarkerImage;
        Size: new (width: number, height: number) => Size;
        Point: new (x: number, y: number) => Point;
        load: (callback: () => void) => void;
    };
}

// 지도 중심 좌표를 나타내는 LatLng 객체
export interface LatLng {
    getLat: () => number;
    getLng: () => number;
}

// 지도 객체
export interface Map {
    setCenter: (latlng: LatLng) => void;
    setLevel: (level: number) => void;
    addOverlayMapTypeId: (mapTypeId: MapTypeId) => void;
    removeOverlayMapTypeId: (mapTypeId: MapTypeId) => void;
}

// 지도 타입 (일반, 스카이뷰 등)
type MapTypeId = "ROADMAP" | "SKYVIEW" | "HYBRID";

// 마커 객체
export interface Marker {
    setMap: (map: Map | null) => void;
    setPosition: (latlng: LatLng) => void;
    setImage: (image: MarkerImage) => void;
}

// 마커 이미지 객체
export interface MarkerImage {
    getSrc: () => string; // 이미지의 경로를 반환
    getSize: () => Size;  // 이미지의 크기 반환
    getOffset: () => Point; // 이미지의 기준점 반환
}

// 크기 객체
export interface Size {
    getWidth: () => number;
    getHeight: () => number;
}

// 좌표 객체
export interface Point {
    getX: () => number;
    getY: () => number;
}
