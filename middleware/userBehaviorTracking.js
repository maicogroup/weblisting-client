import http from 'http'

export default function ({ route, app }) {
    const trackingData = app.$cookies.get('behavior-tracking');
    const userId = app.$cookies.get('browserId');
    if(trackingData != null) {
        let msDiff = new Date() - new Date(trackingData.timeIn);
        let trackingDataReq = {
            site: trackingData.site,
            timeOnSite: (msDiff - msDiff % 1000) / 1000,
            userId: userId
        }
        sendTrackingData(trackingDataReq);
    }
    app.$cookies.set('behavior-tracking', {
        site: route.fullPath,
        timeIn: new Date(),
    })
}

function sendTrackingData(data){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
    query: "mutation AddTracking($input: AddTrackingInput!){\r\n  addTracking(input: $input){\r\n    string\r\n  }\r\n}",
    variables: {"input": data}
    })
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow'
    };

    fetch("https://localhost:7247/graphql/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};