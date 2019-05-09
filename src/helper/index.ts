import { Client, Message } from "@line/bot-sdk";
import { config } from "../../line_config";
import * as queryString from "query-string";
import { validationResult } from "express-validator/check";

export const client = new Client(config);

export const replyMessage = (replyToken: string, data: Message) => {
  return client.replyMessage(replyToken, data);
}

export const parseQueryString = (str: string) => {
  const splitData = str.split('?');
  let data: { name: string, query?: any } = { name: splitData[0] };
  if (splitData.length === 2) {
    const queryData = queryString.parse(splitData[1]);
    data = { query: queryData, ...data };
  }
  return data;
}

export const response = (res, data, errorcode, message) => {
  if (errorcode === undefined) {
    res.json(data);
  } else {
    res.status(400).json({
      "errors": {
        "code": errorcode,
        "message": message
      }
    });
  }
};

export const validateBody = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    next();
  }
};
