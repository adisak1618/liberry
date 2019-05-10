module.exports = ({ profilePicture, fullname, userCode, tel, userClass, id }) => {
  return {
    "type": "flex",
    "altText": "Flex Message",
    "contents": {
      "type": "bubble",
      "hero": {
        "type": "image",
        "url": profilePicture,
        "size": "full",
        "aspectRatio": "1:1",
        "aspectMode": "cover"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": fullname,
            "size": "xl",
            "align": "center",
            "weight": "bold",
            "wrap": true
          },
          {
            "type": "text",
            "text": `รหัสนักเรียน: ${userCode}`,
            "margin": "sm",
            "size": "md",
            "align": "center",
            "weight": "bold",
            "wrap": true
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "md",
            "contents": [
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "xs",
                "contents": [
                  {
                    "type": "text",
                    "text": "เบอร์โทร",
                    "flex": 2,
                    "size": "sm",
                    "color": "#AAAAAA"
                  },
                  {
                    "type": "text",
                    "text": tel,
                    "flex": 5,
                    "size": "sm",
                    "align": "start",
                    "color": "#666666",
                    "wrap": true
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "ชั้นเรียน",
                    "flex": 2,
                    "size": "sm",
                    "color": "#AAAAAA"
                  },
                  {
                    "type": "text",
                    "text": userClass,
                    "flex": 5,
                    "size": "sm",
                    "color": "#666666",
                    "wrap": true
                  }
                ]
              }
            ]
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "horizontal",
        "flex": 0,
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "postback",
              "label": "คืน",
              "data": `returnBook?user=${id}`,
              "displayText": `เริ่มคืนหนังสือให้ ${fullname}`
            },
            "height": "sm",
            "style": "secondary"
          },
          {
            "type": "button",
            "action": {
              "type": "postback",
              "label": "ยืม",
              "data": `borrowBook?user=${id}`,
              "displayText": `เริ่มยืมหนังสือให้ ${fullname}`
            },
            "height": "sm",
            "style": "primary"
          }
        ]
      }
    }
  }
}