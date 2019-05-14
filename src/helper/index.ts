import { Client, Message } from "@line/bot-sdk";
import { Request, Response } from "express";
import * as queryString from "query-string";
import { validationResult } from "express-validator/check";

export const client = new Client({
  channelAccessToken: process.env.channelAccessToken,
  channelSecret: process.env.channelSecret
});

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

export const response = (res: any, data: any, errorcode: any, message: any) => {
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

export const validateBody = (req: Request, res: Response, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    next();
  }
};
