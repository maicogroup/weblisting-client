import http from 'http'

export default function ({ route, from, app }) {
    if(process.client) {
        const trackingState = app.$cookies.get('trackingState');
        if(trackingState == 'disabled') return;

        const trackingData = app.$cookies.get(from.path);
        const userId = app.$cookies.get('browserId');
        if(trackingData != null) {
            let msDiff = new Date() - new Date(trackingData.timeArrival);
            let trackingDataReq = {
                site: trackingData.site,
                timeOnSite: (msDiff - msDiff % 1000) / 1000,
                userId: userId,
                timeArrival: trackingData.timeArrival
            }
            sendTrackingData(trackingDataReq);
            app.$cookies.remove(from.path);
        }
    }
    app.$cookies.set(route.path, {
        site: route.fullPath,
        timeArrival: new Date(),
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

    fetch("http://maico.vn:3101/graphql", requestOptions)
    .then(response => response.text())
    .catch(error => console.log('error', error));
};