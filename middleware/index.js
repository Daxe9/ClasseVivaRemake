import express from "express";
import axios from "axios"

const app = express();
app.use(express.json());

const apiClient = axios.create({
    baseURL: "https://web.spaggiari.eu",
    // set spaggiari headers
    headers: {
        "Content-Type": "application/json",
        "Z-Dev-Apikey": "+zorro+",
        "User-Agent": "zorro/1.0"
    }
});

app.post("/", async (req, res) => {
    if (!req.body.url) {
        return res.status(400).send("Missing url");
    }

    let headers = req.body.headers || {};
    let body = req.body.body || {};

    try {
        const response = await apiClient.post(req.body.url, body, {headers});
        res.status(response.status).send(response.data); 
    } catch (error) {
        return res.status(400).json({
            data: error.response.data
        }); 
    }

})

app.get("/", async (req, res) => {
    if (!req.body.url) {
        return res.status(400).send("Missing url");
    }

    let headers = req.body.headers || {};

    try {
        const response = await apiClient.get(req.body.url, {headers});
        res.status(response.status).send(response.data); 
    } catch (error) {
        return res.status(400).json({
            data: error.response.data
        }); 
    }
})
app.listen(3000);
