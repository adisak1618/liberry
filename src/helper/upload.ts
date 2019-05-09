import * as aws from "aws-sdk";
import * as request from "request-promise";
import * as sharp from "sharp";
aws.config.update({
  // Your SECRET ACCESS KEY from AWS should go here,
  // Never share it!
  // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
  secretAccessKey: process.env.AWSSecretKey,
  // Not working key, Your ACCESS KEY ID from AWS should go here,
  // Never share it!
  // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
  accessKeyId: process.env.AWSAccessKeyId,
  region: 'us-west-2' // region of your bucket
});

const s3 = new aws.S3();

interface UploadValue {
  url: string;
  name: string;
  RequestHeaders: any;
  folder: string;
}

export const uploadFromUrl = async ({ url, name, RequestHeaders, folder }: UploadValue) => {
  return new Promise(async function (resolve, reject) {
    try {
      const { headers, body } = await request({ url, encoding: null, resolveWithFullResponse: true, headers: RequestHeaders });
      const mimetype = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
      }
      const thumnailImg = await sharp(body).resize({ width: 600 }).toBuffer()
      const imgType = headers['content-type'];
      const filetype = imgType in mimetype ? mimetype[imgType] : '.png';
      const uploadThumnail = await s3.upload({
        Bucket: 'tcliberry',
        Key: `${folder}${name}${filetype}`,
        Body: thumnailImg, // buffer
        ACL: 'public-read',
        ContentType: imgType
      }).promise();
      resolve(uploadThumnail);
    } catch (error) {
      reject(error);
    }
  });
}