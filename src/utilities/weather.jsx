import querystring from 'querystring';

export const TYPE_TORNADO       = 'tornado';
export const TYPE_THUNDERSTORMS = 'thunderstorms';
export const TYPE_SNOW          = 'snow';
export const TYPE_RAIN          = 'rain';
export const TYPE_CLOUD_NIGHT   = 'cloud-night';
export const TYPE_CLOUD_DAY     = 'cloud-day';
export const TYPE_NIGHT         = 'night';
export const TYPE_SUNNY         = 'sunny';
export const TYPE_UNKNOWN       = null;

export let types = {
	TYPE_TORNADO,
	TYPE_THUNDERSTORMS,
	TYPE_SNOW,
	TYPE_RAIN,
	TYPE_CLOUD_NIGHT,
	TYPE_CLOUD_DAY,
	TYPE_NIGHT,
	TYPE_SUNNY,
	TYPE_UNKNOWN
};

function runQuery(query, callback) {
	let api = "https://query.yahooapis.com/v1/public/yql";
	let params = {
		format: 'json',
		diagnostics: 'true',
		callback: '',
		q: query
	};

	let url = api + '?' + querystring.stringify(params);
	let request = new XMLHttpRequest();
	request.open('GET', url);
	request.addEventListener("load", () => {
		callback(request);
	});
	request.send();

	return request;
}

export function findLocation(location, callback) {
	return runQuery('select * from geo.placefinder where text="' + location + '" and gflags="R" limit 1', (request) => {
		if (request.readyState !== 4 || request.status !== 200) {
			return;
		}

		// Parse it.
		let data = JSON.parse(request.responseText);
		if (data.count < 1) {
			return;
		}

		callback(data.query.results.Result.woeid);
	});
}

export function updateWeather(id, callback) {
	return runQuery('select * from weather.forecast where woeid="' + id + '"', (request) => {
		if (request.readyState !== 4 || request.status !== 200) {
			return;
		}

		// Parse it.
		let data = JSON.parse(request.responseText);
		if (data.count < 1) {
			return;
		}

		let weather = data.query.results.channel;
		callback(weather);
	});
}

export function conditionType(typeCode) {
	if (typeof typeCode !== 'number') {
		typeCode = parseInt(typeCode);
	}

	switch (typeCode) {
		case 0: // tornado
		case 1: // tropical storm
		case 2: // hurricane
			return TYPE_TORNADO;

		case 3: // severe thunderstorms
		case 4: // thunderstorms
		case 37: // isolated thunderstorms
		case 38: // scattered thunderstorms
		case 39: // scattered thunderstorms
		case 45: // thundershowers
		case 47: // isolated thundershowers
			return TYPE_THUNDERSTORMS;

		case 5: // mixed rain and snow
		case 6: // mixed rain and sleet
		case 7: // mixed snow and sleet
		case 13: // snow flurries
		case 14: // light snow showers
		case 15: // blowing snow
		case 16: // snow
		case 41: // heavy snow
		case 42: // scattered snow showers
		case 43: // heavy snow
		case 46: // snow showers
			return TYPE_SNOW;

		case 8: // freezing drizzle
		case 9: // drizzle
		case 10: // freezing rain
		case 11: // showers
		case 12: // showers
		case 17: // hail
		case 18: // sleet
		case 35: // mixed rain and hail
		case 40: // scattered showers
			return TYPE_RAIN;

		case 19: // dust
		case 20: // foggy
		case 21: // haze
		case 22: // smoky
		case 23: // blustery
		case 24: // windy
		case 26: // cloudy
		case 27: // mostly cloudy (night)
		case 29: // partly cloudy (night)
			return TYPE_CLOUD_NIGHT;

		case 28: // mostly cloudy (day)
		case 30: // partly cloudy (day)
		case 44: // partly cloudy
			return TYPE_CLOUD_DAY;

		case 31: // clear (night)
		case 33: // fair (night)
			return TYPE_NIGHT;

		case 25: // cold
		case 32: // sunny
		case 34: // fair (day)
		case 36: // hot
			return TYPE_SUNNY;

		case 3200: // not available
		default:
			return TYPE_UNKNOWN;
	}
}
