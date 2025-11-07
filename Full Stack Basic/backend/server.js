// const express = require("express");
import express from "express";

const app = express();
app.get('/', (req, res) => {
    res.send("Server is ready");
});

app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            id: 1,
            title: "कॉमेडी जोक 1",
            content: "पप्पू डॉक्टर के पास गया – डॉक्टर साहब, जब मैं बात करता हूँ तो कोई सुनता नहीं। डॉक्टर: अगला मरीज अंदर भेजो।"
        },
        {
            id: 2,
            title: "कॉमेडी जोक 2",
            content: "टीचर: बताओ, बिजली कहाँ से आती है? छात्र: सर, पड़ोसी के घर से... जब हमारी चली जाती है!"
        },
        {
            id: 3,
            title: "कॉमेडी जोक 3",
            content: "गोलू: यार, तुम्हारे घर में शांति है क्या? पप्पू: नहीं भाई, सिर्फ़ टीवी है!"
        },
        {
            id: 4,
            title: "कॉमेडी जोक 4",
            content: "माँ: बेटा, इतनी देर से क्यों आया? बेटा: माँ, टाइम मशीन में ट्रैफिक था!"
        }
    ];

    res.send(jokes);
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})