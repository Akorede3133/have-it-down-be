import axios from "axios";
import uploadImage from "../utils/cloudinary.js";

export const uploadFile = async (req, res, next) => {
  const image = req.file;
  try {
    const b64 = Buffer.from(image.buffer).toString('base64');
    const mimeType =image.mimetype;
    const base64Url = `data:${mimeType};base64,${b64}`;
    const cldRes = await uploadImage(base64Url);
    console.log(cldRes.url);
    res.status(201).send({ success: 1, file: { url: cldRes.secure_url } })
  } catch (error) {
    next(error)
  }
}

export const fetchUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    const { data, headers } = await axios.get(url, { responseType: 'arraybuffer' });
    const mimeType = headers['content-type'];
    const b64 = Buffer.from(data).toString('base64');
    const base64Url = `data:${mimeType};base64,${b64}`;
    const cldRes = await uploadImage(base64Url);
    res.status(201).send({ success: 1, file: { url: cldRes.secure_url } })
  } catch (error) {
   next(error); 
  }
}