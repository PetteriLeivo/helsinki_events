const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')
app.use(cors())



app.get('/musicevents', (req, res) => {
    axios
        .get("https://api.hel.fi/linkedevents/v1/event/",
            {
                params: {
                    include: "location",
                    start: "now",
                    //end: "2022-12-31",
                    audience_min_age_gt: 12,
                    keyword: "yso:p11185" + "," + "yso:p1808", 
                    sort: "start_time",
                    page: req.query.page
                }
            }
        )
        .then((response) => {
            console.log(response.data)
            res.send(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
}
)





app.get("/", (req, res) => {
    axios.get("https://api.hel.fi/linkedevents/v1/keyword_set/helsinki:topics/")
        .then((response) => {
            res.send(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
})


app.get('/pelit', (req, res) => {
    axios
        .get("https://api.hel.fi/linkedevents/v1/event/",
            {
                params: {
                    keyword: "yso:p6062"
                }
            }
        )
        .then((response) => {
            console.log(response.data)
            res.send(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
}
)

app.get('/ruoat', (req, res) => {
    axios
        .get("https://api.hel.fi/linkedevents/v1/event/",
            {
                params: {
                    division: "katajanokka",
                    keyword: "yso:p3670"
                }
            }
        )
        .then((response) => {
            console.log(response.data)
            res.send(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
}
)

app.get('/elokuvat', (req, res) => {
    axios
        .get("https://api.hel.fi/linkedevents/v1/event/",
            {
                params: {
                    start: "now",
                    keyword: "yso:p1235"
                }
            }
        )
        .then((response) => {
            console.log(response.data)
            res.send(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
}
)


app.listen(3001)
