import { useEffect, useRef } from "react";
import {KakaoMaps} from "../../types/ikakaomap.ts";

interface MapComponentProps {
    latitude: string;
    longitude: string;
}

const MapComponent = ({ latitude, longitude }: MapComponentProps) => {
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadKakaoMap = () => {
            if (!window.kakao || !window.kakao.maps) {
                console.error("Kakao Maps API is not available.");
                return;
            }

            window.kakao.maps.load(() => {
                if (mapContainer.current) {
                    const kakao = window.kakao;
                    const center = new kakao.maps.LatLng(
                        parseFloat(latitude),
                        parseFloat(longitude)
                    );
                    const map = new kakao.maps.Map(mapContainer.current, {
                        center,
                        level: 3,
                    });
                    const marker = new kakao.maps.Marker({ position: center });
                    marker.setMap(map);
                }
            });
        };

        const addScript = () => {
            const script = document.createElement("script");
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API_KEY}&autoload=false&libraries=services`;
            script.async = true;
            script.onload = loadKakaoMap;
            script.onerror = () => console.error("Failed to load Kakao Maps script.");
            document.head.appendChild(script);
        };

        if (!window.kakao || !window.kakao.maps) {
            addScript();
        } else {
            loadKakaoMap();
        }
    }, [latitude, longitude]);

    return <div ref={mapContainer} style={{ width: "100%", height: "150px", borderRadius: "8px" }} />;
};

export default MapComponent;

declare global {
    interface Window {
        kakao: KakaoMaps;
    }
}
