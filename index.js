let queries = require('./queries.json')

const axios = require("axios");
require('dotenv').config();
let urlx = `https://api.themoviedb.org/3/search/person?`
let actor_id = {};


function map_actors_with_ID(actor_name) {
    if (actor_id[actor_name] != null)
        return;
    let config = {
        method: 'get',
        url: urlx + `api_key=${process.env.THE_MOVIE_DB_KEY}&query=${actor_name}`,
        headers: {}
    };

    axios(config)
        .then((result) => {
            if (result["total_results"] == 0)
                return null;
            actor_id[actor_name] = result.data.results[0]["id"];
            console.log(actor_name + " " + actor_id[actor_name]);
            return;

        }).catch((err) => {
            console.error(err.message);
            console.log(`Failed to identify ${actor_name}`);
            return;
        });
}


//console.log(queries["actors"])
queries["actors"].forEach(element => {
    map_actors_with_ID(element);
});




function modify_url(urlx, actors) {
    urlx += "&with_people=";
    for (let i = 0; i < actors.length - 1; i++) {
        urlx += `${actor_id[actors[i]]},`;
    }
    urlx += actor_id[actors[actors.length - 1]];

    console.log(urlx);
}

modify_url(urlx, queries["actors"])

function func() {
    var config = {
        method: 'get',
        url: urlx + `&${process.env.THE_MOVIE_DB_KEY}`,
        headers: {}
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}

func();