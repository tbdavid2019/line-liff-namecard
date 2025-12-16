module.exports = [
  // Template 1 - Announcement
  {
    id: '1',
    data: {
      template: '1',
      title: '數位名片新功能上線',
      place: '線上',
      time: '2023/12/26 15:00',
      url: 'https://github.com/tbdavid2019/line-liff-namecard',
      imageUrl: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
      description: '我們剛剛更新了數位名片的功能！\n新增了 Flex Message 樣板支援，讓您可以更方便地分享資訊。\n\n快來試試看吧！',
      activity: '系統更新'
    }
  },
  // Template 2 - Staff List
  {
    id: '2',
    data: {
      template: '2',
      title: '開發團隊名單',
      place: '台北市',
      imageUrl: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_2_restaurant.png',
      url: 'https://github.com/tbdavid2019',
      activity: '團隊成員',
      map: 'https://maps.google.com',
      people: [
        { name: 'David', time: 'Frontend Lead' },
        { name: 'Alice', time: 'Designer' },
        { name: 'Bob', time: 'Backend Dev' }
      ]
    }
  },
  // Template 3 - Card
  {
    id: '3',
    data: {
      template: '3',
      title: 'David Tsai',
      description: '全端工程師\n熱愛開源專案與新技術',
      avatar: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
      back: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
      followUrl: 'https://github.com/tbdavid2019'
    }
  },
  // Template 4 - News
  {
    id: '4',
    data: {
      template: '4',
      image: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
      date: '2023.12.16',
      description: '【重要通知】API 服務維護公告',
      link: 'https://github.com/tbdavid2019/line-liff-namecard',
      tag: 'News',
      targetPicker: 'Line'
    }
  }
]
