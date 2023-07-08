var randNum = 0;          //global variable for different jokes
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function showData(){
    var cityTyped = document.getElementById("textbox").value;
    //$ to use jquery and getJSON to get the data using AJAX HTTP GET request
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + cityTyped + "&units=metric&APPID=387f71db8c9c5d52487844f9286e010c", 
        function(data){
            console.log(data);              //to see on inspect elements if it works
            
            var city = data.name;
            var country = data.sys.country;
            //var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            var icon = " http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
            var weather = data.weather[0].description;
            var temp = Math.floor(data.main.temp);
            var tempMin = Math.floor(data.main.temp_min);
            var tempMax = Math.floor(data.main.temp_max);
            var humidity = Math.floor(data.main.humidity);
            var weatherMain = data.weather[0].main;         //to change background based on weather
            
            //to show current date
            var d = new Date();
            var day = d.getDate();
            var ggSettimana = d.getDay();
            var month = d.getMonth()+1;
            var anno = d.getFullYear();
            var milli = d.getTime();
            weather = weather + " - " +  days[d.getDay()] + ", " + months[d.getMonth()] + " " + day ; 
            
            //putting values 
            document.getElementById("location").innerHTML = city + ", "  + country;
            document.getElementById("icon").src = icon;
            document.getElementById("weather").innerHTML = weather;
            document.getElementById("temp").innerHTML = temp + "°";
            document.getElementById("min").innerHTML = "Min: " + tempMin + "°";
            document.getElementById("max").innerHTML = "Max: " + tempMax + "°";
            document.getElementById("humidity").innerHTML = "Humidity: " + humidity + "%";
            if(weather == "overcast clouds"){
                document.body.style.backgroundImage = "url('src/" + weather + ".jpg')";
            }else{
                if((weatherMain == "Haze") || (weatherMain == "Fog")){
                    document.body.style.backgroundImage = "url('src/mist.jpg')";
                }else{
                    document.body.style.backgroundImage = "url('src/" + weatherMain + ".jpg')";
                }
            }
        }
    );
    document.getElementById("weather-container").style.display = "block";   //to show weather container (from display none) for the first time

    //jokes JSON array for now
    const jokesQA = [  
    {
        question: "What's the difference between weather and climate?",
        answer: "You can't weather a tree, but you can climate"
    },       
    {
        question: "What did one volcano say to the other volcano?",
        answer: "I lava you"
    },
    {
        question: "When does it rain money?",
        answer: "When there's a change in the weather"
    },
    {
        question: "I tried to catch some fog",
        answer: "I mist"
    },
    {
        question: "What’s the difference between spring rolls and summer rolls?",
        answer: "Seasoning"
    },
    {
        question: "I love summer in the UK",
        answer: "It’s my favorite day of the year"
    },
    {
        question: "Some seasons are cold,",
        answer: "And summer hot "
    },
    ]
    setTimeout(function(){              //timeout for 1 second so that the weather data loads before the local array of jokes
        randNum = Math.floor((Math.random() * 7));                             //generate a random number from 0 to 7
        document.getElementById("jokebox1").innerHTML = jokesQA[randNum].question;
        document.getElementById("jokebox2").innerHTML = jokesQA[randNum].answer;
        document.getElementById("joke-container").style.display = "block";  
    }, 500);
    clearInput();
}

function clearInput(){
    document.getElementById("textbox").value = "";
}

function login(){
    var pass = document.getElementById("textbox").value;
    if(pass == "submariner"){
        window.location.href = "https://maggyprotasio.github.io/JokeBox/src/note.html";
    }
}

//if enter button was pressed (using jquery)
$(document).on('keypress',function(e) {
    if(e.which == 13) {
        showData();
        $("body .row").css("height", "100%");
    }
});

//for blur height on small devices
$("button").click(function(){
    $("body .row").css("height", "100%");
});


