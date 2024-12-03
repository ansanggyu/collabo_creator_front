import { useEffect, useRef } from "react";

interface MapComponentProps {
    latitude: string;
    longitude: string;
}

const MapComponent = ({ latitude, longitude }: MapComponentProps) => {
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadKakaoMap = () => {
            if (window.kakao && mapContainer.current) {
                const map = new window.kakao.maps.Map(mapContainer.current, {
                    center: new window.kakao.maps.LatLng(parseFloat(latitude), parseFloat(longitude)),
                    level: 3,
                });

                const marker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(parseFloat(latitude), parseFloat(longitude)),
                });

                marker.setMap(map);
            }
        };

        if (window.kakao && window.kakao.maps) {
            loadKakaoMap();
        } else {
            const script = document.querySelector(
                "script[src*='https://dapi.kakao.com/v2/maps/sdk.js']"
            );

            script?.addEventListener("load", loadKakaoMap);

            return () => {
                script?.removeEventListener("load", loadKakaoMap);
            };
        }
    }, [latitude, longitude]);

    return <div ref={mapContainer} style={{ width: "100%", height: "150px", borderRadius: "8px" }} />;
};

export default MapComponent;

declare global {
    interface Window {
        kakao: any;
    }
}
