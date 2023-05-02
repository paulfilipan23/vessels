function loadVessels() {
  return fetch(
    "https://import-coding-challenge-api.portchain.com/api/v2/vessels"
  ).then((response) => response.json());
}

function loadVessel(vesselIMO: number) {
  return fetch(
    `https://import-coding-challenge-api.portchain.com/api/v2/schedule/${vesselIMO}`
  ).then((response) => response.json());
}

export { loadVessels, loadVessel };
