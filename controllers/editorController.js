import uploadImage from "../utils/cloudinary.js";

const uploadFile = async (req, res, next) => {
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

export default uploadFile;