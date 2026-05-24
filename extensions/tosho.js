const TOSHO = decodeURIComponent(atob("aHR0cHM6Ly9mZWVkLmFuaW1ldG9zaG8ueHl6"));

function GET_TOSHO_RSS_BY_QUERY(quality = "all", aid = null, eid = null) {
  const q =
    quality && quality.toLowerCase() !== "all"
      ? `&q=${encodeURIComponent(quality)}`
      : "";

  if (eid !== null && eid !== 0) {
    return `${TOSHO}/json/v1/releases?eid=${encodeURIComponent(
      eid
    )}${q}&limit=100`;
  }

  if (aid !== null && aid !== 0) {
    return `${TOSHO}/json/v1/releases?aid=${encodeURIComponent(
      aid
    )}${q}&order=size-d&limit=100`;
  }

  return `${TOSHO}/json/v1/search?q=${encodeURIComponent(
    quality
  )}&limit=100&qx=1`;
}

function GET_TOSHO_RSS(packer = "[SubsPlease]") {
  return `${TOSHO}/json/v1/search?q=${encodeURIComponent(
    packer
  )}&limit=100&qx=1`;
}

export default new (class Tosho {
  encUrls = {
    tosho: decodeURIComponent(atob("aHR0cHM6Ly9mZWVkLmFuaW1ldG9zaG8ueHl6")),
    pahe: decodeURIComponent(atob("aHR0cHM6Ly9hbmltZXBhaGUucHc=")),
    paheimages: decodeURIComponent(atob("aHR0cHM6Ly9pLmFuaW1lcGFoZS5wdw==")),
    zenshinSupabase: decodeURIComponent(
      atob("aHR0cDovL3plbnNoaW4tc3VwYWJhc2UtYXBpLW15aWcub25yZW5kZXIuY29t")
    ),
    nyaaApi: decodeURIComponent(
      atob("aHR0cHM6Ly9ueWFhYXBpLm9ucmVuZGVyLmNvbS9ueWFh")
    ),
  };

  async getToshoEpisodes(quality, aids, eids) {
    try {
      const response = await fetch(GET_TOSHO_RSS_BY_QUERY(quality, aids, eids));

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data?.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getNewReleases(packer = "[SubsPlease]") {
    try {
      const response = await fetch(GET_TOSHO_RSS(packer));

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data?.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
})();
