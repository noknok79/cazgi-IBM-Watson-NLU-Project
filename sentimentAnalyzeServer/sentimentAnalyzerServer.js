const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();
//Mark Anthony Villanueva
function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;

}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
});

app.get("/text/emotion", (req,res) => {
    let naturalLanguageUnderstanding = getNLUInstance();
    const analyzeParams = {
        //'html': '<html><head><title>Fruits</title></head><body><h1>Apples and Oranges</h1><p>I love apples! I don\'t like oranges.</p></body></html>',
        'text': req.query.text,
        'features': {
            'emotion': {
            }
        },
        'language': 'en'
    };
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            let emotion_text = analysisResults.result.emotion.document.emotion;
            console.log(JSON.stringify(emotion_text, null, 2));
            return res.send(JSON.stringify(emotion_text, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
            return res.send('err');
        });

});

app.get("/url/sentiment", (req,res) => {
    let naturalLanguageUnderstanding = getNLUInstance();
    const analyzeParams = {
        //'html': '<html><head><title>Fruits</title></head><body><h1>Apples and Oranges</h1><p>I love apples! I don\'t like oranges.</p></body></html>',
        'url': req.query.url,
        'features': {
            'sentiment': {
            }
        },
        'language': 'en'
    };
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            let sentiment = analysisResults.result.sentiment.document.label;
            console.log(JSON.stringify(sentiment, null, 2));
            return res.send(JSON.stringify(sentiment, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
            return res.send('err');
        });
});

app.get("/url/emotion", (req,res) => {
    let naturalLanguageUnderstanding = getNLUInstance();
    const analyzeParams = {
        //'html': '<html><head><title>Fruits</title></head><body><h1>Apples and Oranges</h1><p>I love apples! I don\'t like oranges.</p></body></html>',
        'url': req.query.url,
        'features': {
            'emotion': {
            }
        },
        'language': 'en'
    };
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            let emotion_text = analysisResults.result.emotion.document.emotion;
            console.log(JSON.stringify(emotion_text, null, 2));
            return res.send(JSON.stringify(emotion_text, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
            return res.send('err');
        });
});

app.get("/text/sentiment", (req,res) => {
    let naturalLanguageUnderstanding = getNLUInstance();
    const analyzeParams = {
        //'html': '<html><head><title>Fruits</title></head><body><h1>Apples and Oranges</h1><p>I love apples! I don\'t like oranges.</p></body></html>',
        'text': req.query.text,
        'features': {
            'sentiment': {
            }
        },
        'language': 'en'
    };
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            let sentiment = analysisResults.result.sentiment.document.label;
            console.log(JSON.stringify(sentiment, null, 2));
            return res.send(JSON.stringify(sentiment, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
            return res.send('err');
        });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})
