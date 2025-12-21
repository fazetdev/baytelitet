declare module 'leaflet' {
  export = L;
}

declare module 'leaflet/dist/leaflet.css' {
  const content: string;
  export default content;
}
