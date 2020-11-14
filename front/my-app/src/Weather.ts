// endpoint
const endpoint = "https://api.openweathermap.org/data/2.5/onecall";
const APIkey = "2ccfd4d986b14add9ca00ea5e81ef02e";
interface Result {
  lat: string;
  lon: string;
  timezone: string;
  timezone_offset: string;
  current: Current;
}

interface Current {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Array<object>;
}

// interface APIError {
//   id: string;
//   message: string;
// }

// interface getWeatherResult {
//   status: "success" | "error";
//   apiResult?: Result;
//   error?: string;
// }

/**
 *　天気予報を取得します
 * @param lat 緯度
 * @param lon 経度
 */
export const getWeather = async (city: string): Promise<Result> => {
  const { lat, lon } = convertCitiesToLatAndLon(city);
  const res = await fetch(
    `${endpoint}?lat=${lat}&lon=${lon}&units=metric&lang=ja&exclude=minutely&appid=${APIkey}`
  );
  const data = (await res.json()) as Result;
  console.log(data);
  return data;
};

/**
 * 指定された都市の緯度と経度を返却します。
 * @param city 都市
 */
const convertCitiesToLatAndLon = (city: string) => {
  if (city === "札幌") return { lat: 43, lon: 141 };
  if (city === "仙台") return { lat: 38, lon: 140 };
  if (city === "東京") return { lat: 35, lon: 139 };
  if (city === "名古屋") return { lat: 35, lon: 136 };
  if (city === "大阪") return { lat: 34, lon: 135 };
  if (city === "広島") return { lat: 34, lon: 132 };
  if (city === "福岡") return { lat: 33, lon: 130 };

  // default これでよいかはさておき・・
  return { lat: 0, lon: 0 };
};

export default getWeather;
