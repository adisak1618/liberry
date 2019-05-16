var express = require('express');
const router = express.Router();
import * as request from "request-promise";
import * as axios from "axios";
import { Request, Response } from "express";
// const models = require('./../models');
import * as jwt from "jsonwebtoken";
import * as Cookies from 'js-cookie';
import { Staff } from "../entity/Staff";
import { Invite } from "../entity/Invite";
/* list all categories. */
router.get('/', async (req: Request, res: Response) => {
  const { code, invite_code } = req.query;
  const url = 'https://api.line.me/oauth2/v2.1/token';
  const form = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: `http://localhost:3000/admin/loginsuccess?invite_code=${invite_code}`,
    client_id: '1574531203',
    client_secret: '95a89ebebffb28a3c2d4254f45fab209'
  }
  // res.redirect(`http://localhost:3000/admin/success?code=${code}`);
  try {
    const data = await request({
      method: 'POST',
      url: url,
      form: form
    })
    const token = JSON.parse(data);
    const decode_token = jwt.verify(token.id_token, process.env.LoginchannelSecret, {
      issuer: 'https://access.line.me',
      audience: process.env.LoginchannelID,
      algorithms: ['HS256']
    })
    console.log('decode_token', decode_token);
    console.log('invite_code', invite_code);
    const staffs = await Staff.findOne({
      where: {
        lineid: decode_token["sub"]
      }
    })

    if (staffs) {
      res.cookie('library-token', token.id_token, { maxAge: 900000 });
      // res.redirect(`http://localhost:3000/admin/success?token=${token.id_token}`);
      res.redirect('http://localhost:3000/admin/staff');
    } else if (invite_code) {
      const invite = await Invite.findOne({
        where: {
          code: invite_code
        }
      })
      if (invite) {
        invite.success = "true";
        const newStuff = Staff.create({
          name: decode_token['name'],
          profile_url: decode_token['picture'],
          role: invite.role,
          lineid: decode_token['sub']
        });
        await newStuff.save();
        await invite.save();
        // res.redirect(`http://localhost:3000/admin/success?token=${token.id_token}`);
        res.redirect("https://line.me/R/ti/p/%40456buhvr");
      } else {
        // res.redirect('http://localhost:3000/');
        throw Error();
      }
    } else {
      throw Error();
      // res.redirect('http://localhost:3000/');
    }

    // if (staffs) {
    //   res.redirect(`http://localhost:3000/admin/success?token=${token.id_token}`);
    // } else {
    //   res.redirect('http://localhost:3000/');
    // }
  } catch (error) {
    console.log('err', error);
    res.redirect('http://localhost:3000/');
  }
});

export const loginSuccess = router;
