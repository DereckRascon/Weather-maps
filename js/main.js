//
// mapboxgl.accessToken = MAPBOX_KEY ;
// let ll = mapboxgl.LngLat.convert([-110.9742, 32.2540])
// let map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/dark-v10',
//     zoom: 8,
//     center: ll
// });
// let marker = new mapboxgl.Marker();
// marker.setLngLat([-110.9742, 32.2540]);
// marker.addTo(map);
// marker.setDraggable(true);
//
//
// //Gets you the coordinates of where you dragged the marker too
// marker.on("dragend", function(){
//     let coordinates = ("/" + marker._lngLat.lat + "," + marker._lngLat.lng);
//     // console.log(marker.addTo(map));
//
//
//
//
// Getting the weather for the day in tucson
// $.get(weatherURL, {
//     APPID: OPEN_WEATHER_APPID,
//     q: "Tucson, US"
// }).done(function(data){
//     console.log(data);
// })
//
//
// //Getting the 5 day forecast for tucson
// let lat = 32.2540;
// let long = -110.9742;
// marker.on("dragend", function(){
//     let lat = (marker._lngLat.lat);
//     let long =(marker._lngLat.lng);
//     // console.log(marker.addTo(map));
//
// let weather = $.get("http://api.openweathermap.org/data/2.5/forecast?lat="+ lat +"&lon="+ long +"&appid=" + OPEN_WEATHER_APPID+ "&units=metric");
//     weather.done(function(data) {
//     let reports = data.list;
//     for(let i = 0; i < reports.length; i += 8) {
//         console.log(reports[i])
//     }
// });
// });


//option 2
//

(function(){





    $().ready(function(){
        let d = new Date();
        let tz = Date();
        $.get("http://api.openweathermap.org/data/2.5/weather", {
            APPID: OPEN_WEATHER_APPID,
            q: "Tucson, US",
            units: "imperial"
        }).done(function(data){
            console.log(data.weather[0].main);
            let temp = data.main.temp.toFixed(0);
            let tempHigh = data.main.temp_max.toFixed(0);
            let tempLow = data.main.temp_min.toFixed(0);
            let tempFeel = data.main.feels_like.toFixed(0);
            let city = data.name;
            let wind = data.wind.speed;
            let description = data.weather[0].description;



            $('#currentCity').append(city);
            $('#lastUpdated').append(tz);
            $('#currentWeather').append("<hr>" + "Conditions: " + description + "<hr>" + "<h4>" + "Temperature now is " + "<h1><em>" + temp + "</em></h1>" + "<hr>" + "<h4> But it feels like</h4>" +
                "<h2><em>" + tempFeel + "</em></h2>" + "</h4>"
                );
            $('#currentWeather2').append(
                "<div>" + "<h4> High for today: </h4>" + tempHigh + "<hr>" + "<h4> Low for today: </h4>" + tempLow + "<hr>" + "<h4> Wind Speed: </h4>" + wind + "</div>"
            );
        });

        mapboxgl.accessToken = MAPBOX_KEY ;
        let ll = mapboxgl.LngLat.convert([-110.9742, 32.2540])
        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v10',
            zoom: 11,
            center: ll
        });

        let marker = new mapboxgl.Marker();
        marker.setLngLat([-110.9742, 32.2540]);
        marker.addTo(map);
        marker.setDraggable(true);


//Gets you the coordinates of where you dragged the marker too
        marker.on("dragend", function() {
            let coordinates = ("/" + marker._lngLat.lat + "," + marker._lngLat.lng);
            // console.log(marker.addTo(map));




            // Getting the weather for the day in tucson
            // $.get("https://api.openweathermap.org/data/2.5/forecast", {
            //     APPID: OPEN_WEATHER_APPID,
            //     q: "Tucson, US"
            // }).done(function(data){
            //     console.log(data);
            // })


        $('#searchButton').click(function(){
            $.get("https://api.openweathermap.org/data/2.5/forecast", {
               APPID: OPEN_WEATHER_APPID,
               latLng: coordinates,
                units: "imperial",
                q: $('#search').val()
            }).done(function(data){
                $('#search').val("")
                let day = [];
                console.log(data)
                for(let i = 0; i < data.list.length; i+=8) {
                    day.push({
                        date: data.list[i].dt_txt,
                        temp: data.list[i].main.temp.toFixed(0),
                        tempHigh: data.list[i].main.temp_max.toFixed(0),
                        tempLow: data.list[i].main.temp_min.toFixed(0),
                        tempFeel: data.list[i].main.feels_like.toFixed(0),
                        description: data.list[i].weather[0].description
                    });
                }
                for(let i = 0; i < day.length; i++){
                   let target;
                   switch(i){
                       case 0:
                           target = $('#forecast1')
                           break;
                       case 1:
                            target = $('#forecast2')
                           break;
                       case 2:
                           target = $('#forecast3')
                           break;
                       case 3:
                           target = $('#forecast4')
                           break;
                       case 4:
                           target = $('#forecast5')
                   }
                   $(target).html(
                       "<div className=\"card-body\">" + "<h3 className=\"card-title\">" + "Date: " + day[i].date + "</h3>" +
                       "<h5 className=\"card-title\">" + "Condition: " + day[i].description + "<hr>" + "Feels like: " + day[i].tempFeel + "</h5>" +
                       "<p className=\"card-text\">" + "High: " + day[i].tempHigh + "<hr>" + "Low: " + day[i].tempLow + "</p>" +
                       "</div>" + "<div className=\"card-footer\">" +
                       "<small className=\"text-muted\"></small>" + "<br>" +
                       "</div>"

                   )
                }
            })
        })

        })

    })


})();