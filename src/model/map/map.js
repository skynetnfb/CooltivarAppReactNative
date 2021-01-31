type LatLng = {
    latitude: number,
    longitude: number,
};

type Region = {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
};

type Camera = {
    center: LatLng,
    pitch: number,
    heading: number,

    // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
    altitude: number,

    // Only when using Google Maps.
    zoom: number
};

type Location = {
    latitude: number,
    longitude: number,
    altitude: number,
    timestamp: number, //Milliseconds since Unix epoch
    accuracy: number,
    altitudeAccuracy: number,
    speed: number,
}

type Point = {
    x: number,
    y: number,
};

type Frame = {
    x: number,
    y: number,
    width: number,
    height: number,
};

type MapType = "standard" | "satellite" | "hybrid" | "terrain"; //Android only

type EdgePadding = {
    top: number,
    bottom: number,
    left: number
    right: number,
};

type EdgeInsets = EdgePadding;

type Marker = {
    id: string,
    coordinate: LatLng,
    title: string,
    description: string
};

type KmlContainer = {
    markers: [Marker]
};

type IndoorLevel = {
    index: number,
    name: string,
    shortName: number,
};

type IndoorBuilding = {
    underground: boolean,
    activeLevelIndex: number,
    levels: Array<IndoorLevel>,
};
