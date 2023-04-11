const express = require('express');
const line = require('@line/bot-sdk');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config').config;
const axios = require('axios');
const client = new line.Client(config);
app.use('/api/webhook', line.middleware(config));
app.use(bodyParser.json());

const getAqi = () => {
    return new Promise((resolve, reject) => {
        axios.get("https://api.waqi.info/feed/here/?token=2b9b7d19f47c41ab2f58a00c0f61315f7a0c5926")
            .then((response) => {
                resolve(response.data);
            })
    })
}


app.post('/api/webhook', (req, res) => {

    const event = req.body.events[0];
    if (event.type == "beacon") {
        console.log(event.beacon);
        var msg = {
            type: 'text',
            text: 'สวัสดี ผม beacon ครับ'
        };
        client.replyMessage(event.replyToken, msg)
            .then((data) => { console.log(data) })
            .catch((err) => { console.log(err) });
    } else if (event.type === 'message' && event.message.type === 'text') {

        if (event.message.text === 'ความสบาย') {
            getAqi().then((data) => {
                // console.log(data);
                const msg = [{
                    type: 'text',
                    text: 'ความสบาย ก็มา'
                }, {
                    type: 'text',
                    text: `aqi: ${data.data.aqi} pm25: ${data.data.iaqi.pm25.v} pm10: ${data.data.iaqi.pm10.v}`
                }, {
                    type: 'text',
                    text: `o3: ${data.data.iaqi.o3.v} no2: ${data.data.iaqi.no2.v} so2: ${data.data.iaqi.so2.v}`
                }, {
                    type: 'text',
                    text: `Temp: ${data.data.iaqi.t.v} Humidity: ${data.data.iaqi.h.v} Wind: ${data.data.iaqi.w.v} Pressure: ${data.data.iaqi.p.v}`
                }];

                client.replyMessage(event.replyToken, msg)
                    .then((data) => { console.log(data) })
                    .catch((err) => { console.log(err) });

            })

        } else if (event.message.text === 'โปรโมชั่น') {
            const msg = {
                type: 'text',
                text: 'โปรโมชั่น ก็มา'
            };
            client.replyMessage(event.replyToken, msg)
                .then((data) => { console.log(data) })
                .catch((err) => { console.log(err) });
        } else if (event.message.text === 'แผนที่ร้านค้า') {
            const msg = {
                type: 'text',
                text: 'แผนที่ร้านค้า ก็มา'
            };
            client.replyMessage(event.replyToken, msg)
                .then((data) => { console.log(data) })
                .catch((err) => { console.log(err) });
        }
    }

});

app.get('/api/aqi', (req, res) => {
    axios.get("https://api.waqi.info/feed/here/?token=2b9b7d19f47c41ab2f58a00c0f61315f7a0c5926")
        .then((response) => {
            console.log(response.data);
            res.status(200).json(response.data);
        })
    // res.send('Hello World!');
})


app.use('/', express.static('www'));

app.listen(3000, () => { console.log(`run at http://localhost`) });

