require('dotenv').config();
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2019-07-12',
    iam_apikey: process.env.APIKEY,
    url: process.env.URL,
    disable_ssl_verification: true,

});
app.post('/', (req, res) => {
    const analyzeParams = {
        'text': req.body.message,
        'features': {
            'keywords': {}
        }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            res.status(200).json(analysisResults.keywords);
        })
        .catch(err => {
            console.log('error:', err);
        });
});

app.listen(3000,() => {
    console.log('App running');
})

