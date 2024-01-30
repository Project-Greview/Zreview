navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;
}

function error(error) {}
