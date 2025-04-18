export async function getWeatherData(location) {
    try {
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days&key=JUQ8SVN682P2DGCKTGRHHEYSE&contentType=json`,
            { mode: "cors" },
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        const weatherData = extractWeekData(
            [
                "datetime",
                "humidity",
                "temp",
                "windspeed",
                "precip",
                "conditions",
            ],
            json.days.slice(0, 7),
        );
        return weatherData;
    } catch (error) {
        return error;
    }
}

function extractWeekData(keysArray, weekData) {
    return weekData.reduce((acc, dayData) => {
        acc.push(extractData(keysArray, dayData));
        return acc;
    }, []);
}

function extractData(keysArray, dayData) {
    return keysArray.reduce((acc, key) => {
        if (key in dayData) acc[key] = dayData[key];
        return acc;
    }, {});
}
