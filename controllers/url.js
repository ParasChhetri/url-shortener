import { Url } from "../models/Url.js";
import shortid from "shortid";
export const urlShort = async (req, resp) => {
    const longUrl = req.body.longUrl;
    const shortCode = shortid.generate();
    const shortUrl = `http://localhost:4200/${shortCode}`;
    const newUrl = new Url({ shortCode, longUrl });
    await newUrl.save();
    console.log(`short URL : ${newUrl}`);
    resp.render('index.ejs', { shortUrl });
}

export const getOrignalURL = async (req, resp) => {
    const shortCode = req.params.shortCode;
    const urlRecorded = await Url.findOne({ shortCode });

    if (urlRecorded) {
        resp.redirect(urlRecorded.longUrl);
    } else {
        resp.status(404).send("URL not found");
    }
}
