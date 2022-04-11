const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Deepgram } = require('@deepgram/sdk');
const app = express();
app.use(cors());
const PORT = 3300;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const deepgramApiKey = 'bc8e41fe9144a315278c765bee49d7a87fdb45e2';


app.post('/api/deepgram', (req, res) => {
    const audioUrl = req.body.url;
    // console.log(req.body.url)
    // const audioUrl = "https://static.deepgram.com/examples/Bueller-Life-moves-pretty-fast.wav";
    const deepgram = new Deepgram(deepgramApiKey);
    deepgram.transcription.preRecorded({ url: audioUrl }, { punctuate: true, language: 'en-IN' },)
        .then((transcription) => {
            // console.log(transcription, { depth: null });
            // res.send(req.body);
            // console.log(transcription.results.channels[0].alternatives[0])
            res.send(transcription.results.channels[0].alternatives[0])
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        });
})

app.listen((process.env.PORT || 3000), () => {
    console.log(`App listening on PORT ${PORT}`)
})

