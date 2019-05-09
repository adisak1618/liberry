import { WebhookEvent, ReplyableEvent } from "@line/bot-sdk";
import { Action } from "../entity/Action";
import { LineUser } from "../entity/LineUser";
import { Book } from "../entity/Book";
import { getManager } from "typeorm";

const { client, replyMessage } = require('../helper');
const { BooksTemplate } = require('./messageTemplate');
export const searchBook = async (event: WebhookEvent & ReplyableEvent, action: Action, user: LineUser) => {
  try {
    if (action) {
      if (event.type === 'message' && event.message.type === 'text') {
        const replyText = event.message.text.trim().toLowerCase();
        const books = await getManager()
          .createQueryBuilder(Book, 'book')
          .leftJoinAndSelect("book.category", "category")
          .leftJoinAndSelect("book.writer", "writer")
          .where(`book.name Like '%${replyText.toLowerCase()}%'`)
          .orWhere("book.isbnCode = :isbnCode", { isbnCode: replyText })
          .limit(9)
          .getMany();

        // const books = await models.book.findAll({
        //   where: {
        //     [Op.or]: [
        //       {
        //         name: {
        //           [Op.like]: `%${replyText}%`
        //         }
        //       },
        //       {
        //         isbn_code: replyText,
        //       }
        //     ]
        //   },
        //   include: [
        //     {
        //       model: models.category,
        //       as: 'category',
        //     },
        //     {
        //       model: models.writer,
        //       as: 'writer',
        //     }
        //   ],
        //   limit: 9,
        // });
        action.success = true;
        if (books.length === 0) {
          action.data = {
            text: replyText,
            found: false,
          }
          action.save();
          return replyMessage(
            event.replyToken,
            {
              "type": "flex",
              "altText": "Flex Message",
              "contents": {
                "type": "bubble",
                "direction": "ltr",
                "header": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": "ไม่มีข้อมูล!",
                      "size": "xl",
                      "align": "center",
                      "weight": "bold"
                    }
                  ]
                },
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": "หนังสือเล่มนี้ยังไม่ได้ลงทะเบียน คุณต้องการลงทะเบียนเลยมั๊ย?",
                      "align": "center",
                      "wrap": true
                    }
                  ]
                },
                "footer": {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "button",
                      "action": {
                        "type": "postback",
                        "label": "เพิ่มเลย",
                        "displayText": "ตกลง",
                        "data": isNaN(Number(replyText)) ? "addBook" : `addBook?isbnCode=${replyText}`,
                      },
                      "style": "primary"
                    }
                  ]
                }
              }
            }
          );
        } else {
          // const { cover, name, category, writer, page_count, publisher, count, id } = books[0];
          // const newBookMsg = BookTemplate({
          //   cover: `https://s3-ap-southeast-1.amazonaws.com/tcliberry/${cover}`,
          //   name,
          //   category: category.name,
          //   writer: writer.name,
          //   page_count,
          //   publisher,
          //   count,
          //   bookid: id,
          // })
          const booksCard = books.map(({ cover, name, category, writer, page_count, publisher, count, id }) => BooksTemplate({
            cover: `https://s3-ap-southeast-1.amazonaws.com/tcliberry/${cover}`,
            name,
            category: category.name,
            writer: writer.name,
            page_count,
            publisher,
            count,
            bookid: id,
          }));
          action.data = {
            text: replyText,
            found: true,
          }
          action.save();
          const msg = {
            "type": "flex",
            "altText": "Flex Message",
            "contents": {
              "type": "carousel",
              "contents": booksCard
            }
          }
          return replyMessage(event.replyToken, msg);
        }
      } else {
        return replyMessage(event.replyToken, { type: 'text', text: 'ลองใหม่อีกรอบนะ โปรดระบุชื่อหนังสือ หรือ ISBN code เป็นตัวหนังสือ!' });
      }
    } else {
      const newAction = await Action.create({
        job: 'searchBook',
        success: false,
        lineUser: user,
      })
      newAction.save()
      return replyMessage(event.replyToken, { type: 'text', text: 'โปรดระบุชื่อหนังสือ หรือ ISBN code' });
    }
  } catch (e) {
    console.log(e);
  }
}