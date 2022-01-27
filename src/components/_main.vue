<template>
    <main class="container">
        <VideoBackground  :src="require(`@/assets/rain.mp4`)" style="width: 100%; height: 100vh;">
            <div class="position-area">
                <form v-on:submit.prevent="weather()">
                    <button class="position-area__submit" type="submit" ><i class="fas fa-search"></i></button>
                    <input type="text" class="position-area__input" placeholder="enter your position ..." v-model="city"/>
                    <button class="position-area__position" @click.prevent="getLocation()"><i class="fas fa-crosshairs"></i></button>
                </form>
            </div>
        
            <div class="wrap" v-if="show">
                <div v-for="(item, index ) in response" :key="index" class="current-weather">
                    <div class="weather_data" >
                        <h2>{{item.name}}, {{item.sys.country}}</h2>
                        <h2>{{ new Date().toDateString()}}</h2>
                        <h3>Feels like: {{Kelvin(item.main.feels_like)}} °F | {{Celsius(item.main.feels_like)}} °C</h3>
                        <img :src="'http://openweathermap.org/img/wn/'+item.weather[0].icon+'@4x.png'"/>
                        <h2>{{item.weather[0].description}}</h2>
                    </div>
                    
                    <div class="more_data">
                        <div>
                            <div class="extra">
                                <i class="fas fa-humidity"></i> 
                                <span class="info">{{item.main.humidity}} %</span>
                            </div>
                            <div class="extra">
                                <i class="fas fa-temperature-low"></i>
                                <span class="info">{{Kelvin(item.main.temp_min)}} °F | {{Celsius(item.main.temp_min)}} °C</span>
                            </div>
                            <div class="extra">
                                <i class="fas fa-temperature-high"></i> 
                                <span class="info">{{Kelvin(item.main.temp_max)}} °F | {{Celsius(item.main.temp_max)}} °C</span>
                            </div>
                            <div class="extra">
                                <i class="fas fa-wind"></i> 
                                <span class="info">{{item.wind.speed}} m/s</span>
                            </div>
                        </div>
                    </div>
                </div>
                <i class="far fa-sunrise"></i> <i class="fas fa-sunset"></i>
            </div>
        </VideoBackground>  
    </main>
</template>

<script>
import VideoBackground from 'vue-responsive-video-background-player'
import axios from 'axios';
export default {
    components: {
        VideoBackground
    },
    data(){
        return {
            city:"",
            response:[],
            lat:"",
            lng:"",
            OPEN_WEATHER_API_KEY: "0c1026664740fc3220ce24742ea1a554",
            show:false,
        }
    },
    mounted(){
        this.getLocation();
    },
    methods: {
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    this.lat = position.coords.latitude
                    this.lng = position.coords.longitude
                });
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lng}&appid=${this.OPEN_WEATHER_API_KEY}`)
                    .then(res => {
                            this.show= true
                            this.response.splice(0,this.response.length)
                            this.response.push(res.data)
                            console.log(res);
                    })
                
            } else { 
                this.$toast("Geolocation is not supported by this browser.");
            }
        },
        weather(){
            try {
                if(this.city === "") {
                    this.$toast.error("Please enter a city name");
                }else {
                    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.OPEN_WEATHER_API_KEY}`)
                    .then(res => {
                        /* console.log()
                        if(res.status(404)) {
                            this.$toast.error(res);
                        }else {*/
                            this.show= true;
                            this.response.splice(0,this.response.length)
                            this.response.push(res.data);
                            console.log(res);
                        //}

                    })
                }

            } catch (error) {
                this.$toast.error(error)
            }
        },
        Celsius(value){
            return Number.parseFloat(value - 273.15).toFixed(2)
        },
        Kelvin(value){
            return Number.parseFloat((value - 273.15) * 1.8 + 32).toFixed(2)
        }
    }
}
</script>

<style scoped>
    .container {
        width:100%;
        height: 100%;
        /*padding: 2rem;
        background-color: #03e5b7;
        background-image: linear-gradient(315deg, #03e5b7 0%, #037ade 74%);*/
        display: block;
    }

    .position-area {
        width: 70rem;
        height:5rem;
        background-color: #222;
        border:none;
        border-radius: 2rem;
        margin:3rem auto;

    }

    .position-area__submit,.position-area__position{
        width:5rem;
        height: 5rem;
        border:none;
        background: transparent;
        color: #FFF;
    }

    .position-area__input{
        width:60rem;
        height: 5rem;
        padding: 2rem;
        background: transparent;
        border:none;
        color: #FFF;
    }

    .current-weather{
        width:70rem;
        height:40rem;
        padding: 2rem;
        border-radius: 1rem;
        margin: 5rem auto 2rem auto;
        background-color: #ffffff10;
        backdrop-filter: blur(12px);
        --webkit-backdrop-filter: blur(12px);
        display:grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows:1fr;
        grid-gap:2rem;
        justify-items: center;
    }

    .weather_data {
        background: #222;
        border-radius: 2rem;
        padding:2rem;
        width:25rem;
        height:35rem;
        color:antiquewhite;
        display:grid;
        grid-template-columns: 1fr;
        grid-template-rows:1fr 1fr 1fr;
        justify-items: center;
    }

    .weather_data img {
        width:15rem;
        height:15rem;
    }

    .more_data {
        width:27rem;
        height:35rem;
        display: grid;
        grid-template-rows: repeat(4, 1fr);
        grid-template-columns: 1fr;
        grid-gap:2rem ;

    }

    .extra {
        margin:1rem;
        width:25rem;
        height:7.5rem;
        background: #222;
        border-radius:2rem;
        color: #FFF;
        line-height: 7.5rem;
    }

    .extra .fas {
        padding: 0 2rem 0 2rem;
        font-size:3.5rem;
        margin:2rem 0 2rem 0;
    }

    .info {
        font-size:1.5rem;
    }

    @media screen and (max-width:70rem) {
        *,
        *::after,
        *::before{transition: all .2s;}
        .position-area {
            width: 40rem;
        }
        .position-area__input {
            width:30rem;
        }
        .current-weather{
            width:50rem;
        }
        .weather_data {
            width:20rem;
        }

        .weather_data img {
            width:15rem;
            height:15rem;
        }

        .more_data {
            width:20rem;

        }

        .extra {
            margin:1rem;
            width:20rem;
            height:7.5rem;
            background: #222;
            border-radius:2rem;
            color: #FFF;
            line-height: 7.5rem;
        }

        .extra .fas {
            padding: 0 2rem 0 2rem;
            font-size:2rem;
            margin:2rem 0 2rem 0;
        }

        .info {
            font-size:1.2rem;
        }
    }
</style>