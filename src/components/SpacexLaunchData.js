export async function getLaunchData (){

    /*const url = "https://api.spacexdata.com/v4/launches";
    const response = await fetch(url);
    const data = await response.json();*/

    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', "https://api.spacexdata.com/v4/launches", false)
    xmlHttp.send()
    const data = JSON.parse(xmlHttp.responseText)
    return data;
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {getLaunchData}