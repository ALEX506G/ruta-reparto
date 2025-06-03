import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";

const poblaciones = [
  { nombre: "Monforte del Cid", coords: [38.3706, -0.7296] },
  { nombre: "Alicante", coords: [38.3452, -0.4810] },
  { nombre: "Elda", coords: [38.4772, -0.7910] },
  { nombre: "San Juan", coords: [38.4014, -0.4364] },
  { nombre: "Campello", coords: [38.4282, -0.3977] },
  { nombre: "Petrer", coords: [38.4786, -0.7688] },
  { nombre: "Muchamiel", coords: [38.4368, -0.4454] },
  { nombre: "Elche", coords: [38.2699, -0.7126] },
  { nombre: "Novelda", coords: [38.3846, -0.7654] },
  { nombre: "Aspe", coords: [38.3450, -0.7683] },
];

function calcularRuta(base, puntos) {
  return [base, ...puntos.sort((a, b) => {
    const distA = Math.hypot(a.coords[0] - base.coords[0], a.coords[1] - base.coords[1]);
    const distB = Math.hypot(b.coords[0] - base.coords[0], b.coords[1] - base.coords[1]);
    return distA - distB;
  })];
}

export default function RutaReparto() {
  const base = poblaciones[0];
  const puntos = poblaciones.slice(1);
  const ruta = calcularRuta(base, puntos);

  return (
    <div>
      <h2>Ruta de Reparto</h2>
      <ol>
        {ruta.map((p, i) => (
          <li key={i}>{p.nombre}</li>
        ))}
      </ol>
      <MapContainer center={base.coords} zoom={10} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {ruta.map((p, i) => (
          <Marker key={i} position={p.coords} icon={L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
          })}>
            <Popup>{p.nombre}</Popup>
          </Marker>
        ))}
        <Polyline positions={ruta.map(p => p.coords)} color="blue" />
      </MapContainer>
    </div>
  );
}
