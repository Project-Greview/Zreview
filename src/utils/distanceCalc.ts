export function getDistanceCalc(
  lat: number,
  lng: number,
  lat2: number,
  lng2: number
) {
  const R = 6371000;

  const dLat = ((lat2 - lat) * Math.PI) / 180;
  const dLon = ((lng2 - lng) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceResult = Math.floor(R * c);

  return distanceResult;
}
