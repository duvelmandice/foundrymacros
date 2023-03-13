pbFoulWeather();

async function pbFoulWeather(){
    // Roll on Foul Weather table and grab results
    let tableFoulWeather = game.tables.getName('Foul weather');
    let drawsFoulWeather = await(tableFoulWeather.roll({async:true}));
    // Roll on Wind Direction table and grab results
    let tableWindDirection = game.tables.getName('windDirectionFlat');
    let drawsWindDirection = await(tableWindDirection.roll({async:true}));
    let windDir = Number(drawsWindDirection.results[0].text);

    // Clears previous FXMASTER effects
    FXMASTER.filters.setFilters([]);
    Hooks.call('fxmaster.updateParticleEffects', []);
    //console.log("cleared previous FXMASTER settings")
    
    //console.log("Foul Weather Table Results");
    //console.log("--------------------------");
    
    let foulWeatherResultNum = drawsFoulWeather.results[0].range[0];
    let foulWeatherText = drawsFoulWeather.results[0].text;
    //console.log(foulWeatherResultNum + " - " + foulWeatherText);

    // Switch that reads # value of FoulWeather table and assigns FXMASTER settings

    switch (foulWeatherResultNum) {
        case 2:// "deep cold, well below the line"
            //console.log(`This is the switch for ${foulWeatherResultNum} - FX Blue/Cold`);
            FXMASTER.filters.setFilters([
                { type: "color",
                    options: {
                      color: { value:"#c2edff", apply: true },
                      gamma: 0.9,
                      contrast: 0.9,
                      brightness: 1.0,
                      saturation: 1.0
                    }
                },
            ]);
            break;


        case 3: // "nauseating green mist"
            //console.log(`This is the switch for ${foulWeatherResultNum} - FX Green Mist`);
            Hooks.call('fxmaster.updateParticleEffects', [{
                "type":"fog",
                "options":{
                    "scale":1,
                    "speed":1,
                    "lifetime":1,
                    "density":0.05,
                    "tint":{"apply":true,"value":"#4f8255"}}
                }]);
            FXMASTER.filters.setFilters([{"type":"color","options":{"color":{"apply":true,"value":"#ebffed"},"saturation":1,"contrast":1,"brightness":1,"gamma":1}}]);
            break;


        case 4: // "thick, low-lying fog"
           //console.log(`This is the switch for ${foulWeatherResultNum} - FX Fog`);
            Hooks.call("fxmaster.updateParticleEffects", [{
                name: "myParticleEffectID",
                type: "fog",
                options: { density: 0.1 },
              }]);
            break;


        case 5:  // "oppressively overcast"
           //console.log(`This is the switch for ${foulWeatherResultNum} - FX Thick Clouds`);
            Hooks.call("fxmaster.updateParticleEffects", [{
                name: "myParticleEffectID",
                type: "clouds",
                options: { 
                    density: 0.2,
                    speed: 0.5,
                    direction: windDir - 90
                },
              }]);
            break;


        case 6:  // "sweltering, hellfire sunlight"
           //console.log(`This is the switch for ${foulWeatherResultNum} - FX Hot Sun`);
            FXMASTER.filters.setFilters([
                { type: "color",
                    options: {
                      color: { value:"#fde3aa", apply: true },
                      gamma: 1.1,
                      contrast: 1.1,
                      brightness: 1.0,
                      saturation: 1.0
                    }
                },
            ]);
            Hooks.call("fxmaster.updateParticleEffects", [{
                name: "myParticleEffectID",
                type: "clouds",
                options: { 
                    density: 0.03,
                    speed: 0.5,
                    direction: windDir - 90
                },
              }]);
            break;


        case 7:  // "gentle breeze, smell of decay"
           //console.log(`This is the switch for ${foulWeatherResultNum} - FX Decay Breeze`);
            Hooks.call("fxmaster.updateParticleEffects", [{
                //name: "myParticleEffectID",
                type: "clouds",
                options: { 
                    density: 0.03,
                    speed: 1,
                    direction: windDir - 90
                },
              }]);
            break;


        case 8:  // "calm before the storm"
           //console.log(`This is the switch for ${foulWeatherResultNum} - FX Calm Storm`);
            Hooks.call("fxmaster.updateParticleEffects", [{
                //name: "myParticleEffectID",
                type: "clouds", 
                options: {
                    speed: 0.2,
                    lifetime: 2.0,
                    density: 0.01,
                    tint: { value:"#242249", apply: true },
                    direction: windDir - 90,
                    scale: 3.0
                }
                
            }])
            break;


        case 9:  // "soft, cold rain"
           //console.log(`This is the switch for ${foulWeatherResultNum} - FX Soft Rain`);
            Hooks.call('fxmaster.updateParticleEffects', [
                {
                "type":"rain",
                "options":{
                    "scale":1.2,
                    "direction": windDir -90,
                    "speed":0.7,
                    "lifetime":0.4,
                    "density":0.1,
                    "tint":{"apply":false,"value":"#ffffff"}}
                },
                {
                    "type":"clouds",
                    "options":{
                        "scale":1,
                        "direction": windDir - 90,
                        "speed":0.5,
                        "lifetime":1,
                        "density":0.132,
                        "tint":{"apply":true,"value":"#353640"}
                    }
                }
            ]);
            FXMASTER.filters.setFilters([{
                "type":"color",
                "options":{
                    "color":{"apply":true,"value":"#dbe5ff"},
                    "saturation":1.1,
                    "contrast":0.9,
                    "brightness":1,
                    "gamma":0.9}
            }]);
            break;


        case 10: // "fridgid trade winds"
           //console.log(`This is the switch for ${foulWeatherResultNum} - FX Trade Winds`);
            Hooks.call('fxmaster.updateParticleEffects', [{
                "type":"clouds",
                "options":{
                    "scale":1,
                    "direction": windDir -90,
                    "speed":3,
                    "lifetime":1,
                    "density":0.004,
                    "tint":{"apply":true,"value":"#ffffff"}
                }
            }]);
            break;


        case 11:  // "torrential downpours"
           //console.log(`This is the switch for ${foulWeatherResultNum} - FX Torrential Rain`);
            Hooks.call('fxmaster.updateParticleEffects', [{
                "type":"clouds",
                "options":{
                    "scale":4,
                    "direction": windDir - 90,
                    "speed":2,
                    "lifetime":0.8,
                    "density":0.001,
                    "tint":{"apply":true,"value":"#020717"}
                }},
                {
                "type":"rain",
                "options":{
                    "scale":1,
                    "direction": windDir - 90,
                    "speed":1,
                    "lifetime":1,
                    "density":1,
                    "tint":{"apply":false,"value":"#ffffff"}
                }}
            ]);
            FXMASTER.filters.setFilters([{
                "type":"color",
                "options":{
                    "color":{"apply":true,"value":"#ccdaf5"},
                    "saturation":1.1,
                    "contrast":1,
                    "brightness":0.9,
                    "gamma":0.8
                }},
                {
                "type":"lightning",
                "options":{
                    "frequency":2000,
                    "spark_duration":300,
                    "brightness":1.2
                }
            }]);
            break;


        case 12:  // "catastrophic temptest"
           //console.log(`This is the switch for ${foulWeatherResultNum} - FX Temptest`);
            Hooks.call('fxmaster.updateParticleEffects', [{
                "type":"clouds",
                "options":{
                    "scale":4,
                    "direction":90,
                    "speed":3,
                    "lifetime":0.8,
                    "density":0.001,
                    "tint":{"apply":true,"value":"#020717"}
                }
                },{
                "type":"rainsimple",
                "options":{
                    "scale":2.3,
                    "direction":75,
                    "speed":1,
                    "lifetime":1,
                    "density":3.3,
                    "tint":{"apply":false,"value":"#ffffff"}
                }}
            ]);
            FXMASTER.filters.setFilters([{
                "type":"color",
                "options":{
                    "color":{"apply":true,"value":"#ccdaf5"},
                    "saturation":1.1,
                    "contrast":1,
                    "brightness":0.9,
                    "gamma":0.8
                }},{
                "type":"lightning",
                "options":{
                    "frequency":2000,
                    "spark_duration":435,
                    "brightness":1.1
                }
            }]);
            break;

        default:
            console.log(`Something broke in the Foul Weather switch`);
            ui.notifications.error("Foul Weather Macro error")
            return;
            break;                                                               
    };
    ui.notifications.info("Current Dark Weather: " + foulWeatherText + " with a wind heading of " + windDir);


    // Fancy Chat Output
    let chatTemplate = `
        <h2><i class="fa-solid fa-cloud-sun-rain"></i> Foul Weather </h2>
        <p> Our cursed fate brings ${foulWeatherText} </p>
        <p> <i class="fa-solid fa-wind"></i> wind heading ${windDir}&deg </p>
    `;
    ChatMessage.create({
        content: chatTemplate
    });



};

