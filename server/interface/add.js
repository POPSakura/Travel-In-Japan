import Router from 'koa-router'
import CountyModel from '../dbs/models/counties.js'
import CityModel from '../dbs/models/cities.js'
import PlaceModel from '../dbs/models/places.js'
import AreaModel from '../dbs/models/areas.js'
import HotelModel from '../dbs/models/hotels.js'

const router = new Router({
  prefix: '/add'
})

router.get('/', async (ctx) => {
  const data = [{
    'hotel_id': 29010000,
    'hotel': '乐活JR奈良站超级酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29012,
    'top': 1,
    'hot': true,
    'english_hotel': 'Super Hotel Lohas JR Nara Eki',
    'introduction': '酒店的位置很好，靠近JR站，出行十分方便。酒店靠近奈良景区、依水园，沿途风景十分漂亮。酒店提供自助式早餐，味道很棒，性价比很高。',
    'image': ['/hotel_img/nailiang/29010000/1576386978088.jpeg', '/hotel_img/nailiang/29010000/1576386980148.jpeg', '/hotel_img/nailiang/29010000/1576386982184.jpeg', '/hotel_img/nailiang/29010000/1576386984210.jpeg', '/hotel_img/nailiang/29010000/1576386986245.jpeg', '/hotel_img/nailiang/29010000/1576386988295.jpeg', '/hotel_img/nailiang/29010000/1576386990394.jpeg'],
    'concerns': ['罗哈斯JR奈良站超级酒店紧邻JR车站，交通方便。', '酒店中有露天和室内两种温泉浴池。', '（男女分隔）酒店提供自助式早餐。', '酒店中可以免费打长途电话，但没有无线网络。', '贴士酒店旁边有一家超市卖场，晚上会有折扣产品出售，价格十分实惠。', '酒店提供的早餐使用新鲜食材，有机蔬菜和面包都值得推荐。', '女性房客还有五样小礼品可以选择哦。', '（面膜、足膜、沐浴随身包、泡澡粉，超窝心～）蜂蜂们请注意，这里的早餐时间和退房时间都比较早。', '（咖啡9点停止供应）。'],
    'brand': 'Super hotel',
    'kind': '度假村',
    'facility': ['wifi服务', '电梯', '吹风机'],
    'address': '奈良市三条本町1-2',
    'latitude': 34.68091,
    'longitude': 135.81949,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 00:00',
    'leave_time': '10:00',
    'room_count': '233',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010001, 29010002, 29010007, 29010009],
  }, {
    'hotel_id': 29010001,
    'hotel': '奈良小町宾馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29012,
    'top': 1,
    'hot': true,
    'english_hotel': 'Guesthouse Nara Komachi',
    'introduction': '位于住宅区内的温馨家庭式旅馆，靠近JR车站，交通便捷。在酒店大叔的帮助下租辆自行车游奈良是一次难忘的经历。',
    'image': ['/hotel_img/nailiang/29010001/1576387331711.jpeg', '/hotel_img/nailiang/29010001/1576387334153.jpeg', '/hotel_img/nailiang/29010001/1576387336191.jpeg', '/hotel_img/nailiang/29010001/1576387338219.jpeg', '/hotel_img/nailiang/29010001/1576387340318.jpeg', '/hotel_img/nailiang/29010001/1576387342512.jpeg', '/hotel_img/nailiang/29010001/1576387344612.jpeg'],
    'concerns': ['坐落于奈良市的中心地带，距离市中心仅3千米，十分方便出游。', '深入居民区的地理位置，使您近距离贴近日本生活。', '周围公共交通设施完善，出JR奈良站后步行200米即可到达。', '靠近春日大社、东大寺等旅游景点，步行即可到达。', '贴士家庭式旅馆配置齐全，设有wifi，并有公共厨房可供住客使用。', '提供自行车租借服务。', '房间小而温馨，更适合单人或情侣入住。', '。'],
    'facility': ['wifi服务', '吹风机'],
    'address': 'Suruga-machi 41-2',
    'latitude': 34.67894,
    'longitude': 135.82084,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 22:00',
    'leave_time': '11:00',
    'room_count': '9',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010000, 29010002, 29010007, 29010009],
  }, {
    'hotel_id': 29010002,
    'hotel': '奈良日航国际酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29012,
    'top': 0,
    'hot': false,
    'english_hotel': 'Hotel Nikko Nara',
    'introduction': '酒店属于精品酒店，典型的现代化风格。设���温泉池，楼下就是JR奈良站，还有很多的商店、餐饮店，去奈良公园、奈良町步行即可。',
    'image': ['/hotel_img/nailiang/29010002/1576387524963.jpeg', '/hotel_img/nailiang/29010002/1576387527007.jpeg', '/hotel_img/nailiang/29010002/1576387529093.jpeg', '/hotel_img/nailiang/29010002/1576387531242.jpeg', '/hotel_img/nailiang/29010002/1576387533273.jpeg', '/hotel_img/nailiang/29010002/1576387535358.jpeg', '/hotel_img/nailiang/29010002/1576387537429.jpeg'],
    'concerns': ['HotelNikkoNara位于火车站旁，距离兴福寺、奈良市资料馆、奈良市物语馆不远。', '步行即可到达奈良公园，和可爱的小鹿玩耍。', '酒店中设有���店、会议���和酒吧。', '贴士酒店早上有自助式早餐，种类十分丰富，有水果和谷物。', '酒店提供自行车租借服务，蜂蜂们可以租自行车前往附近景点。', '位置便利，周边有便利店、超市和餐馆。', '。'],
    'brand': '日航城市',
    'facility': ['wifi服务', '电梯', '餐厅', '吹风机'],
    'address': '三条本町8-1',
    'latitude': 34.68149,
    'longitude': 135.81849,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00',
    'leave_time': '11:00',
    'room_count': '330',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010000, 29010001, 29010010, 29010020],
  }, {
    'hotel_id': 29010003,
    'hotel': '奈良酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Nara Hotel',
    'kind': '度假村',
    'introduction': '奈良酒店是一家有百年历史的老店，拥有经典的日式建筑，坐落在奈良公园的山丘之上，俯瞰古都的历史遗迹，据说是卓别林和赫本住过的哦。',
    'image': ['/hotel_img/nailiang/29010003/1576387848970.jpeg', '/hotel_img/nailiang/29010003/1576387851111.jpeg', '/hotel_img/nailiang/29010003/1576387853219.jpeg', '/hotel_img/nailiang/29010003/1576387855265.jpeg', '/hotel_img/nailiang/29010003/1576387857291.jpeg', '/hotel_img/nailiang/29010003/1576387859408.jpeg', '/hotel_img/nailiang/29010003/1576387861440.jpeg'],
    'concerns': ['奈良酒店落成于1909年，现在有老馆和新馆供蜂蜂们选择。', '房间为古朴的木质风格，舒适温馨，配以高高的天花板，给蜂蜂们好的入住体验。', '距离奈良市中心十分近，走路1km即可到达奈良公园。', '酒店还有具特色的公共区域，休闲吧、迷你吧、熨衣设施, 日报等一应俱全。', '贴士酒店的餐厅十分有特点，值得一去。', '这个酒店还有自己品牌的牛肉罐头售卖。', '有免费wifi。', '酒店周围有许多好吃的餐馆。', '。'],
    'facility': ['wifi服务', '免费停车场', '电梯', '餐厅'],
    'address': 'Takabatake-cho 1096',
    'latitude': 34.67972,
    'longitude': 135.83367,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00',
    'leave_time': '11:00',
    'room_count': '127',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010013, 29010017, 29010032, 29010033],
  }, {
    'hotel_id': 29010004,
    'hotel': '奈良背包客宾馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 1,
    'hot': false,
    'english_hotel': 'Guesthouse Nara Backpackers',
    'introduction': '宾馆距离奈良公园仅有200m，也是有着百年历史的传统建筑。在有暖桌的客厅喝茶，很惬意。宾馆服务人员也很热情周到，值得推荐！',
    'image': ['/hotel_img/nailiang/29010004/1576388200277.jpeg', '/hotel_img/nailiang/29010004/1576388202344.jpeg', '/hotel_img/nailiang/29010004/1576388204382.jpeg', '/hotel_img/nailiang/29010004/1576388206480.jpeg', '/hotel_img/nailiang/29010004/1576388208540.jpeg', '/hotel_img/nailiang/29010004/1576388210647.jpeg', '/hotel_img/nailiang/29010004/1576388212775.jpeg'],
    'concerns': ['宾馆地理位置优越，步行几分钟就可以到达奈良公园，很方便蜂蜂前去游玩。', '宾馆距离JR奈良站3公里，驾车约10分钟，方便蜂蜂们出行。', '宾馆日式花园的花草树木为蜂蜂们带来静谧的氛围，还有现代化厨房和投币式洗衣机供蜂蜂们使用。', '贴士宾馆可提供停车位，方便选择自驾游出行的蜂蜂们停车。', '宾馆房间里有可以上锁的小铁柜，可供蜂蜂们使用。', '。'],
    'facility': ['wifi服务'],
    'address': 'Yurugi-cho 31',
    'latitude': 34.68689,
    'longitude': 135.83336,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:30 - 21:00',
    'leave_time': '10:00',
    'room_count': '8',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010006, 29010011, 29010012, 29010021],
  }, {
    'hotel_id': 29010005,
    'hotel': '鹿园酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 1,
    'hot': false,
    'english_hotel': 'The Deer Park Inn',
    'introduction': '位于奈良公园内的鹿园酒店是一家温馨的家庭式旅店。推开酒店的窗户就能看到可爱的小鹿。如果您是热爱大自然的朋友，这里将是您不二的选择。',
    'image': ['/hotel_img/nailiang/29010005/1576390325278.jpeg', '/hotel_img/nailiang/29010005/1576390327323.jpeg', '/hotel_img/nailiang/29010005/1576390329346.jpeg', '/hotel_img/nailiang/29010005/1576390331423.jpeg', '/hotel_img/nailiang/29010005/1576390333539.jpeg', '/hotel_img/nailiang/29010005/1576390335676.jpeg', '/hotel_img/nailiang/29010005/1576390337717.jpeg'],
    'concerns': ['酒店位于著名的奈良公园内。', '距离Kintesunara火车站有8分钟车程。', '酒店距离春日大社有7分钟步行路程，距离东大寺有15分钟步行路程。', '贴士提供免费的无线网络，并设有公共厨房。', '没有独立卫浴设施，住客需要与其他客人共用浴室和卫生间。', '园中有可爱的小鹿供住客饲喂。', '酒店不提供餐食，住客可以使用额外收费的投币式洗衣店。', '酒店不接待9岁或以下的儿童入住。', '。'],
    'facility': ['wifi服务', '餐厅'],
    'address': 'Kasuganocho 158-5',
    'latitude': 34.68407,
    'longitude': 135.84703,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:30 - 21:00',
    'leave_time': '10:00',
    'room_count': '10',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010019, 29010029, 29010003, 29010004],
  }, {
    'hotel_id': 29010006,
    'hotel': '奈良白鹿庄',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29013,
    'top': 1,
    'hot': false,
    'english_hotel': 'Nara Hakushikaso',
    'introduction': '白鹿庄就位于奈良站旁边，位置很方便。日式的客房配有榻榻米，��团床。在这里还可以吃到日式早餐，泡到公共温泉。',
    'image': ['/hotel_img/nailiang/29010006/1576390418843.jpeg', '/hotel_img/nailiang/29010006/1576390421018.jpeg', '/hotel_img/nailiang/29010006/1576390423061.jpeg', '/hotel_img/nailiang/29010006/1576390425206.jpeg', '/hotel_img/nailiang/29010006/1576390427739.jpeg', '/hotel_img/nailiang/29010006/1576390429842.jpeg', '/hotel_img/nailiang/29010006/1576390431993.jpeg'],
    'concerns': ['酒店的位置非常好，就位于奈良站1号出口旁。', '日式客房内有草编榻榻米，纸屏风和传统的蒲团床。', '提供自行车出租服务，可以骑车前往东大寺和奈良公园。', '贴士推荐蜂蜂们预定日式早餐，还有西式的可以选择。', '酒店有公共浴池，环境很不错。', '。'],
    'facility': ['收费停车场', '电梯','餐厅'],
    'address': 'Hanashibacho 4',
    'latitude': 34.68606,
    'longitude': 135.82882,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:30 - 18:00',
    'leave_time': '10:00',
    'room_count': '26',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010004, 29010008, 29010011, 29010012],
  }, {
    'hotel_id': 29010007,
    'hotel': '藤田奈良酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29013,
    'top': 0,
    'hot': false,
    'english_hotel': 'Hotel Fujita Nara',
    'introduction': '酒店距离JR奈良火车站和近铁奈良火车站都只有500米之遥，蜂蜂们可以租借店里的自行车游玩。',
    'image': ['/hotel_img/nailiang/29010007/1576390513030.jpeg', '/hotel_img/nailiang/29010007/1576390515140.jpeg', '/hotel_img/nailiang/29010007/1576390517429.jpeg', '/hotel_img/nailiang/29010007/1576390519734.jpeg', '/hotel_img/nailiang/29010007/1576390521785.jpeg', '/hotel_img/nailiang/29010007/1576390523927.jpeg', '/hotel_img/nailiang/29010007/1576390526063.jpeg'],
    'concerns': ['坐落于奈良市的中心地带，距离大佛和寺庙区不到1km的距离，到JR车站也只需步行。', '房间中提供免费的茶和咖啡。', '免费的自行车租借服务。', '楼下有酒吧和小花园，让客人尽情放松身心。', '贴士酒店内有优惠小食套餐供蜂蜂们选择，包括一罐啤酒和一些小吃。', '酒店有厚厚的窗帘，保证了蜂蜂们的睡眠质量。', '。'],
    'brand': '藤田',
    'facility': ['wifi服务', '免费停车场', '电梯', '餐厅', '吹风机'],
    'address': '47-1 Shimosanjo-cho',
    'latitude': 34.68213,
    'longitude': 135.82466,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '14:00 - 00:00',
    'leave_time': '11:00',
    'room_count': '117',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010000, 29010001, 29010008, 29010009],
  }, {
    'hotel_id': 29010008,
    'hotel': '游山旅舍附楼',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29013,
    'top': 0,
    'hot': true,
    'english_hotel': 'Yuzan Guesthouse Annex',
    'introduction': '从旅舍出发步行8分钟就是JR奈良车站，到奈良公园和东大寺也只要步行几分钟。房间大，公共空间也十分舒适。洗浴间都很干净，值得体验。',
    'image': ['/hotel_img/nailiang/29010008/1576390606975.jpeg', '/hotel_img/nailiang/29010008/1576390609047.jpeg', '/hotel_img/nailiang/29010008/1576390611159.jpeg', '/hotel_img/nailiang/29010008/1576390613245.jpeg', '/hotel_img/nailiang/29010008/1576390615293.jpeg', '/hotel_img/nailiang/29010008/1576390617415.jpeg', '/hotel_img/nailiang/29010008/1576390619480.jpeg'],
    'concerns': ['旅舍附近很多景点，包括林神社、Yamato Renta Cycle Kintetsu Nara和Waplus Nara等。', '从旅舍到市中心的奈良公园（Nara Park）走路11分钟即到，非常方便蜂蜂们前去游玩。', '旅舍具日式庭院特色的客房都配备有空调，让蜂蜂们感受到更加贴心细致的入住体验。', '贴士旅舍是Yuzan Annex，可别跟Yuzan Nara搞混了哟，虽然二者只相距10分钟路程。', '旅舍前台可提供行李寄存服务，方便有需要的蜂蜂。', '。'],
    'facility': ['wifi服务'],
    'address': 'Aburasakacho 423',
    'latitude': 34.68463,
    'longitude': 135.82351,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 22:00',
    'leave_time': '11:00',
    'room_count': '4',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010006, 29010007, 29010009, 29010010],
  }, {
    'hotel_id': 29010009,
    'hotel': '奈良乌贺阳宾馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29013,
    'top': 0,
    'hot': false,
    'english_hotel': 'Nara Ugaya Guesthouse',
    'introduction': '乌贺阳宾馆有着温馨舒适的公共区域，在这里你可以喝着香醇的咖啡和当地人聊天，他们会带给你不同的看待日本文化的视角。',
    'image': ['/hotel_img/nailiang/29010009/1576390688438.jpeg', '/hotel_img/nailiang/29010009/1576390690543.jpeg', '/hotel_img/nailiang/29010009/1576390692615.jpeg', '/hotel_img/nailiang/29010009/1576390694736.jpeg', '/hotel_img/nailiang/29010009/1576390696920.jpeg', '/hotel_img/nailiang/29010009/1576390698991.jpeg', '/hotel_img/nailiang/29010009/1576390701062.jpeg'],
    'concerns': ['坐落于奈良市中心地带，可步行至周围的巴士车站和地铁站。', '距离兴福寺、雁后寺、奈良市物语馆等景点仅数步之遥。', '提供榻榻米床垫，是体验日式文化的好选择。', '精心装置的公共区域和咖啡馆，旨在为客人提供大的舒适度。', '【tips】有一间公用浴室，开放到晚上10点。', '房间是相互连接的。', '如果需要寄存行李需要支付额外费用。', '不提供免费毛巾。', '。'],
    'facility': ['wifi服务'],
    'address': '奥子守町4-1',
    'latitude': 34.68069,
    'longitude': 135.8245,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 22:00',
    'leave_time': '11:00',
    'room_count': '5',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010000, 29010001, 29010007, 29010008],
  }, {
    'hotel_id': 29010010,
    'hotel': '御宿诺诺奈良天然温泉酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29012,
    'top': 1,
    'hot': false,
    'english_hotel': 'Onyado Nono Nara Natural Hot Spring',
    'kind': '度假村',
    'introduction': '位置非常棒，走路就可以到地铁站。房间是传统的日式榻榻米，很有在地感觉。早餐非常棒，不可错过！',
    'image': ['/hotel_img/nailiang/29010010/1576390761333.jpeg', '/hotel_img/nailiang/29010010/1576390763431.jpeg', '/hotel_img/nailiang/29010010/1576390765589.jpeg', '/hotel_img/nailiang/29010010/1576390767623.jpeg', '/hotel_img/nailiang/29010010/1576390769679.jpeg', '/hotel_img/nailiang/29010010/1576390771770.jpeg', '/hotel_img/nailiang/29010010/1576390773908.jpeg'],
    'concerns': ['距 JR奈良站（JR Nara Station）有3分钟步行路程 距 兴福寺（Kofuku-ji Temple）有15分钟步行路程距 东大寺（Todaiji Temple）有10分钟车程距 奈良公园（Nara Park）有20分钟步行路程距 大阪伊丹机场（Osaka Itami Airport）37公里贴士设有按摩服务提供24小时前台和免费行李寄存服务。'],
    'brand': '多米',
    'facility': ['wifi服务', '收费停车场', '电梯', '餐厅', '吹风机'],
    'address': 'Omiyacho 1-1-6',
    'latitude': 34.68231,
    'longitude': 135.82018,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 00:00',
    'leave_time': '11:00',
    'room_count': '216',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010000, 29010001, 29010002, 29010007],
  }, {
    'hotel_id': 29010011,
    'hotel': '春日酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29013,
    'top': 1,
    'hot': true,
    'english_hotel': 'Kasuga Hotel',
    'introduction': '酒店拥有露天浴室,能够给您置身于山野之中的感觉。小小的花园给人以自然的感觉,淙淙的流水阻隔了喧嚣的噪音,简直好无缺。',
    'image': ['/hotel_img/nailiang/29010011/1576390836311.jpeg', '/hotel_img/nailiang/29010011/1576390838386.jpeg', '/hotel_img/nailiang/29010011/1576390840494.jpeg', '/hotel_img/nailiang/29010011/1576390842533.jpeg', '/hotel_img/nailiang/29010011/1576390844575.jpeg', '/hotel_img/nailiang/29010011/1576390846662.jpeg', '/hotel_img/nailiang/29010011/1576390848721.jpeg'],
    'concerns': ['春日酒店距离Kintetsu Nara火车站只有200米的路程，距离兴福寺仅有500米的路程。', '春日酒店是一家日式风格的酒店，但是每一层都配有一间带有西式床的房间。', '住在这里的蜂蜂们可以尽情享用红茶和柠檬水和日本料理。', '酒店有漂亮的公共温泉浴场。', '贴士提供免费wifi。', '推荐选择包括晚餐的房间。', '酒店中就有礼品店。', '。'],
    'facility': ['wifi服务', '收费停车场', '电梯', '餐厅'],
    'address': '登大路町40',
    'latitude': 34.68413,
    'longitude': 135.82974,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 23:00',
    'leave_time': '10:00',
    'room_count': '32',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010004, 29010006, 29010007, 29010013],
  }, {
    'hotel_id': 29010012,
    'hotel': '新若狭酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Hotel New Wakasa',
    'introduction': '酒店在近铁奈良车站附近，日式客房，有公共浴池和足浴池可以放松身心。客房内有独立的休息区，蜂蜂们可以在这里欣赏若草山和东大寺的美丽景色。',
    'image': ['/hotel_img/nailiang/29010012/1576390889880.jpeg', '/hotel_img/nailiang/29010012/1576390891970.jpeg', '/hotel_img/nailiang/29010012/1576390894067.jpeg', '/hotel_img/nailiang/29010012/1576390896171.jpeg', '/hotel_img/nailiang/29010012/1576390898274.jpeg', '/hotel_img/nailiang/29010012/1576390900360.jpeg', '/hotel_img/nailiang/29010012/1576390902454.jpeg'],
    'concerns': ['酒店距离东大寺约8分钟步行时间，距离奈良公园约15分钟步行时间。', '酒店提供带榻榻米（草编）地板的日式客房，空调客房设有日式被褥。', '在酒店屋顶露台欣赏若草山和东大寺的美丽景色。', '贴士酒店在用餐室提供日式晚餐和早餐。', '酒店内有室内游泳池和SPA 浴缸。', '。'],
    'facility': ['wifi服务', '免费停车场', '电梯', '餐厅', '吹风机'],
    'address': '北半田東町１番地',
    'latitude': 34.68802,
    'longitude': 135.83413,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 19:00',
    'leave_time': '10:00',
    'room_count': '1',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010004, 29010006, 29010021, 29010003],
  }, {
    'hotel_id': 29010013,
    'hotel': '宝塔酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 1,
    'hot': false,
    'english_hotel': 'Hotel Pagoda',
    'introduction': '酒店是一间经济型商务酒店，距离东大寺、奈良公园、兴福寺等景点都很近。运气好的话还会在窗户外看到可爱的小鹿。',
    'image': ['/hotel_img/nailiang/29010013/1576390947712.jpeg', '/hotel_img/nailiang/29010013/1576390949800.jpeg', '/hotel_img/nailiang/29010013/1576390951927.jpeg', '/hotel_img/nailiang/29010013/1576390954040.jpeg', '/hotel_img/nailiang/29010013/1576390956111.jpeg', '/hotel_img/nailiang/29010013/1576390958210.jpeg', '/hotel_img/nailiang/29010013/1576390960277.jpeg'],
    'concerns': ['酒店到奈良公园和兴福寺仅需300米左右的路程，距离东大寺1km。', '住在这里的蜂蜂们步行1km左右就可以到达JR奈良火车站（JR Nara Train Station）和近铁奈良火车站（Kintetsu Nara Train Station）。', ' 部分客房配有传统榻榻米（草编）地板的区域。', '提供自行车租赁，若客人有需要还可以向酒店要求免费英语导游的服务。', '贴士酒店不提供餐点和免费wifi，入住的蜂蜂们要注意哦。', '。'],
    'facility': ['wifi服务', '收费停车场', '电梯', '吹风机'],
    'address': 'Takabatake-cho 1122',
    'latitude': 34.68125,
    'longitude': 135.83331,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 00:00',
    'leave_time': '10:00',
    'room_count': '25',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010003, 29010011, 29010017, 29010032],
  }, {
    'hotel_id': 29010014,
    'hotel': '大和高原博斯科日式旅馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 0,
    'top': 0,
    'hot': false,
    'english_hotel': 'Yamato Kogen Bosco Villa',
    'image': ['/hotel_img/nailiang/29010014/1576391021364.jpeg', '/hotel_img/nailiang/29010014/1576391023598.jpeg', '/hotel_img/nailiang/29010014/1576391025657.jpeg', '/hotel_img/nailiang/29010014/1576391027696.jpeg', '/hotel_img/nailiang/29010014/1576391029735.jpeg', '/hotel_img/nailiang/29010014/1576391032652.jpeg', '/hotel_img/nailiang/29010014/1576391034740.jpeg'],
    'concerns': ['下榻大和高原Bosco别墅，感受奈良的独特魅力。', ' 酒店为顾客配备了一系列的设施和服务，旨在让各位住客能够享受更多舒适与便捷。', ' 24小时安保, 每日客房清洁服务, 纪念品商店, 自助洗衣设施, 无障碍通道等设施都已配备，可供住客使用。', ' 客房舒适温馨，部分客房内设毛巾, 镜子, 空调, 暖气, 唤醒服务等设施。', ' 为了让游客���验更很好的住宿体验，酒店提供了多种休闲设施，例如迷你高尔夫球场, 按摩浴缸, 水疗中心, 花园等。', ' 不论您是带着何种目的前往奈良，大和高原Bosco别墅都可让您感受到家的温馨与舒适。', '。'],
    'facility': ['wifi服务', '收费停车场', '电梯', '餐厅', '吹风机'],
    'address': '針町3918',
    'latitude': 34.60929,
    'longitude': 135.93925,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 19:00',
    'leave_time': '11:00',
    'room_count': '30',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
  }, {
    'hotel_id': 29010015,
    'hotel': '奈良町宾馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29015,
    'top': 1,
    'hot': false,
    'english_hotel': 'Guesthouse Naramachi',
    'introduction': '旅店的建筑是一百多年的日式老房子，典型的日本建筑。后面还有一个日式的小花园，很有奈良的风格。',
    'image': ['/hotel_img/nailiang/29010015/1576391077589.jpeg', '/hotel_img/nailiang/29010015/1576391079746.jpeg', '/hotel_img/nailiang/29010015/1576391081813.jpeg', '/hotel_img/nailiang/29010015/1576391084318.jpeg', '/hotel_img/nailiang/29010015/1576391086420.jpeg', '/hotel_img/nailiang/29010015/1576391088471.jpeg', '/hotel_img/nailiang/29010015/1576391090647.jpeg'],
    'concerns': ['\n这是一家由有百年历史的民居改成的Guest House，保留着传统的民居结构，十分干净整洁。', '\n酒店有单间和宿舍两种，给蜂蜂们更多的选择。', '\n酒店提供自行车租借、按摩服务，客人可以租用浴衣和浴袍���\n贴士\n酒店一层有免费的饮料提供。', '\n热情好客的老板会给您很多好的旅行选择，还会为你制定计划。', '\n运气好的话，蜂蜂还可能住在挂有书法家字画的古朴房间哦。', '\n晚上蜂蜂们可以与来自各个国家的友人聊天。', '。'],
    'facility': ['wifi服务'],
    'address': '北京終町30',
    'latitude': 34.67337,
    'longitude': 135.82906,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 22:00',
    'leave_time': '10:00',
    'room_count': '4',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010035, 29010054, 29010062, 29010069],
  }, {
    'hotel_id': 29010016,
    'hotel': '山部酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29011,
    'top': 0,
    'hot': false,
    'english_hotel': 'Yamabe Hotel',
    'introduction': '传统的日式民宿，提供日式西式两种房型可以选择。传统的公共浴室，可以泡澡，感受日本沐浴文化。酒店位于天理，步行五分钟可达到JR站。',
    'image': ['/hotel_img/nailiang/29010016/1576391134347.jpeg', '/hotel_img/nailiang/29010016/1576391136567.jpeg', '/hotel_img/nailiang/29010016/1576391138834.jpeg', '/hotel_img/nailiang/29010016/1576391141045.jpeg', '/hotel_img/nailiang/29010016/1576391143205.jpeg', '/hotel_img/nailiang/29010016/1576391145245.jpeg', '/hotel_img/nailiang/29010016/1576391147450.jpeg'],
    'concerns': ['酒店距离JR天理火车站有5分钟步行路程，距离JR奈良火车站有15分钟火车路程。', '酒店距离法隆寺有20分钟车程，距离历史悠久的明日香村有30分钟车程。', ' 提供日式和西式两种房型。', '传统的日式房型，设有榻榻米，传统日本浴室还可泡澡。', '贴士客人可以使用洗衣设施和免费停车场。', '酒店还供应免费咖啡。', '酒店提供免费自行车租赁服务。', '。'],
    'facility': ['wifi服务', '免费停车场'],
    'address': 'Tabe-cho 543',
    'latitude': 34.60368,
    'longitude': 135.82958,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '12:00 - 00:00',
    'leave_time': '09:00',
    'room_count': '12',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
  }, {
    'hotel_id': 29010017,
    'hotel': '阿苏卡索酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': true,
    'english_hotel': 'Asukasou Nara',
    'introduction': '酒店地处奈良公园边缘，出门是猿泽池，附近有很多名胜。酒店部分房间有阳台，可以看到一旁兴福寺里的五重塔。酒店员工很有礼貌，服务热情周到。',
    'image': ['/hotel_img/nailiang/29010017/1576391202216.jpeg', '/hotel_img/nailiang/29010017/1576391204329.jpeg', '/hotel_img/nailiang/29010017/1576391206563.jpeg', '/hotel_img/nailiang/29010017/1576391208633.jpeg', '/hotel_img/nailiang/29010017/1576391210773.jpeg', '/hotel_img/nailiang/29010017/1576391212877.jpeg', '/hotel_img/nailiang/29010017/1576391214967.jpeg'],
    'concerns': ['酒店距离市中心仅1km路程，毗邻雁后寺、兴福寺、奈良市物语馆等景点。', '酒店配有西式床铺和日式蒲团床垫的客房，蜂蜂们可自行选择。', '酒店距离近铁奈良火车站约有10分钟步行路程。', '贴士酒店部分房间配有美丽的木制工艺品和新鲜绿茶。', '酒店提供接机和自行车租赁服务。', '酒店1楼设有1间咖啡酒廊。', '。'],
    'facility': ['wifi服务', '收费停车场', '电梯', '餐厅'],
    'address': 'Takabatake-cho 1113-3',
    'latitude': 34.68057,
    'longitude': 135.83225,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 19:00',
    'leave_time': '10:00',
    'room_count': '30',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010003, 29010011, 29010013, 29010018],
  }, {
    'hotel_id': 29010018,
    'hotel': '花小路酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29013,
    'top': 0,
    'hot': false,
    'english_hotel': 'Hotel Hanakomichi',
    'introduction': '有西式和日式两种不同客房可选择，满足不同的住宿需求。优越的地理位置，方便去往不同的景点。店内的日式餐厅更提供了便捷的用餐环境。',
    'image': ['/hotel_img/nailiang/29010018/1576391274977.jpeg', '/hotel_img/nailiang/29010018/1576391277020.jpeg', '/hotel_img/nailiang/29010018/1576391279212.jpeg', '/hotel_img/nailiang/29010018/1576391281294.jpeg', '/hotel_img/nailiang/29010018/1576391283431.jpeg', '/hotel_img/nailiang/29010018/1576391285587.jpeg', '/hotel_img/nailiang/29010018/1576391287868.jpeg'],
    'concerns': ['酒店距离近铁奈良火车站（4号出口）仅有50米。', '靠近各大景点，距离兴福寺有5分钟步行路程，距离东大寺有1.6公里。', '距离仙洞公共浴池大约有4分钟步行路程，并提供免费停车场。', '贴士有西式和日式两种不同的客房供客人选择。', '设有一间日式餐厅，住客可以付费享受早午餐。', '酒店内设有一间礼品店，满足您购物的需求。', '。'],
    'facility': ['wifi服务', '电梯', '餐厅', '吹风机'],
    'address': '小西町２３番地',
    'latitude': 34.68339,
    'longitude': 135.82754,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:30 - 00:00',
    'leave_time': '10:00',
    'room_count': '30',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010006, 29010007, 29010008, 29010009],
  }, {
    'hotel_id': 29010019,
    'hotel': '武藏野古都客栈',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Kotonoyado Musashino',
    'introduction': '传统典雅的日式旅馆，在奈良公园内，正前方是若草山，右侧是春日大社。傍晚和清晨可以独享安静的公园和可爱的小鹿。',
    'image': ['/hotel_img/nailiang/29010019/1576391332258.jpeg', '/hotel_img/nailiang/29010019/1576391334325.jpeg', '/hotel_img/nailiang/29010019/1576391336600.jpeg', '/hotel_img/nailiang/29010019/1576391338640.jpeg', '/hotel_img/nailiang/29010019/1576391340697.jpeg', '/hotel_img/nailiang/29010019/1576391342851.jpeg', '/hotel_img/nailiang/29010019/1576391344917.jpeg'],
    'concerns': ['酒店位置很赞，就在若草山边上，出门就能看到小鹿，距离春日大社300米。', '提供覆盖各处的Wi-Fi以及内部停车场。', '提供自行车和行李寄存处。', '贴士床品质量很高，睡眠非常舒适。', '服务特别好，还有贴心的小姐姐帮忙穿和服。', '早晚餐都非常丰富。', '。'],
    'facility': ['wifi服务', '收费停车场'],
    'address': '奈良市春日野町90号地',
    'latitude': 34.68423,
    'longitude': 135.84696,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 18:00',
    'leave_time': '10:00',
    'room_count': '5',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010005, 29010029, 29010003, 29010004],
  }, {
    'hotel_id': 29010020,
    'hotel': '奈良华盛顿广场酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29012,
    'top': 0,
    'hot': false,
    'english_hotel': 'Nara Washington Hotel Plaza',
    'introduction': '邻近火车站，交通便捷的华盛顿酒店，专为商务和休闲旅游游客而设计。毗邻多个著名景点，只需步行即可到达奈良公园，与可爱的小鹿近距离接触。',
    'image': ['/hotel_img/nailiang/29010020/1576392245540.jpeg', '/hotel_img/nailiang/29010020/1576392247620.jpeg', '/hotel_img/nailiang/29010020/1576392249686.jpeg', '/hotel_img/nailiang/29010020/1576392251801.jpeg', '/hotel_img/nailiang/29010020/1576392253913.jpeg', '/hotel_img/nailiang/29010020/1576392256001.jpeg', '/hotel_img/nailiang/29010020/1576392258298.jpeg'],
    'concerns': ['位于奈良市中心地区，可步行至奈良公园。', '靠近兴福寺、雁后寺、奈良市物语馆，游客在旅游观光时不必舍近求远。', '交通便捷，距离JR奈良和近铁奈良线都十分近。', '贴士办理入住时需缴纳全款。', '酒店右手边有许多廉宜的饭馆，并有多个收费停车场。', '酒店设备齐全，提供免费wifi。', '。'],
    'brand': '华盛顿',
    'facility': ['wifi服务', '收费停车场', '电梯', '餐厅', '吹风机'],
    'address': 'Shimosanjo-cho 31-1',
    'latitude': 34.68215,
    'longitude': 135.82301,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '14:00 - 00:00',
    'leave_time': '10:00',
    'room_count': '204',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010000, 29010001, 29010002, 29010007],
  }, {
    'hotel_id': 29010021,
    'hotel': '若狭附楼酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Wakasa Annex',
    'introduction': '传统的日式旅馆，装修精致，古色古香。从旅馆去到主要景点都可步行到达，出行便利。旅馆��供应的日本料理，味道正宗，种类多样。',
    'image': ['/hotel_img/nailiang/29010021/1576392263127.jpeg', '/hotel_img/nailiang/29010021/1576392265269.jpeg', '/hotel_img/nailiang/29010021/1576392267381.jpeg', '/hotel_img/nailiang/29010021/1576392269545.jpeg', '/hotel_img/nailiang/29010021/1576392271615.jpeg', '/hotel_img/nailiang/29010021/1576392273685.jpeg', '/hotel_img/nailiang/29010021/1576392275767.jpeg'],
    'concerns': ['酒店为传统日式旅馆，以榻榻米（草编）地板、矮家具和障子纸屏风为特色。', '旅馆距离日本庭园依水园有8分钟步行路程，距离奈良公园有15分钟步行路程。', '旅馆距离奈良火车站有12分钟步行路程，步行八分钟可到达东大寺。', '贴士旅馆提供24小时前台、出售饮品的自动售货机和免费停车场等。', '旅馆设有户外公共热澡堂，客房内有完全以木材建造的浴室。', '早晚餐时段在用餐区供应日本料理，晚餐为以时令菜肴为特色的传统怀石多道菜餐点。', '。'],
    'facility': ['wifi服务', '免费停车场', '电梯', '餐厅'],
    'address': '奈良市北半田东町1',
    'latitude': 34.68762,
    'longitude': 135.83409,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 19:00',
    'leave_time': '10:00',
    'room_count': '11',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010004, 29010006, 29010012, 29010022],
  }, {
    'hotel_id': 29010022,
    'hotel': '奈良橡树旅舍',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29013,
    'top': 1,
    'hot': false,
    'english_hotel': 'Oak Hostel Nara',
    'introduction': '性价比很高的一家经济型酒店，离奈良公园、近铁奈良站、兴福寺都非常近，位置很方便。房间设施都齐全，装修比较新，周围很繁华，也有许多餐馆...',
    'image': ['/hotel_img/nailiang/29010022/1576392280541.jpeg', '/hotel_img/nailiang/29010022/1576392282620.jpeg', '/hotel_img/nailiang/29010022/1576392285031.jpeg', '/hotel_img/nailiang/29010022/1576392287094.jpeg', '/hotel_img/nailiang/29010022/1576392289222.jpeg', '/hotel_img/nailiang/29010022/1576392291297.jpeg', '/hotel_img/nailiang/29010022/1576392293339.jpeg'],
    'concerns': ['酒店就在奈良站旁边，周边有便利店，距离奈良公园只需要十分钟步行路程，非常方便。', '酒店距离奈良公园1.8千米，步行约16分钟。', '酒店内设施齐全，包括免费房内无线网络, 自助洗衣设施, 出租车服务, 邮政服务, 纪念品商店等。', '贴士酒店内没有提供热水壶，但提供备有浴缸或淋浴的浴室。', '服务人员很亲切，特别热情。', '酒店房间虽然不大，但是非常干净，装饰精美，细节之处令人惊喜。', '。'],
    'facility': ['wifi服务', '电梯'],
    'address': 'Higashimuki Kitamachi 15',
    'latitude': 34.68549,
    'longitude': 135.82874,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 00:00',
    'leave_time': '10:00',
    'room_count': '57',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010004, 29010006, 29010007, 29010008],
  }, {
    'hotel_id': 29010023,
    'hotel': 'Ikaruga酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29011,
    'top': 0,
    'hot': false,
    'english_hotel': 'Ikaruga Hotel',
    'introduction': '酒店设有带电视的西式客房，大厅内有取款机，方便蜂蜂们外出取用现金。同时酒店有便利店，保证游人们的餐饮需求。',
    'image': ['/hotel_img/nailiang/29010023/1576392298319.jpeg', '/hotel_img/nailiang/29010023/1576392300387.jpeg', '/hotel_img/nailiang/29010023/1576392302473.jpeg', '/hotel_img/nailiang/29010023/1576392304546.jpeg', '/hotel_img/nailiang/29010023/1576392306640.jpeg', '/hotel_img/nailiang/29010023/1576392308749.jpeg', '/hotel_img/nailiang/29010023/1576392310905.jpeg'],
    'concerns': ['斑鸠酒店距离JR大和小泉站有1km路程。', '酒店内设有便利店和自动取款机可供客人使用。', '酒店中有投币式洗衣机和公共电话。', '【tips】提供免费停车服务。', '设有行李寄存处。', '。'],
    'facility': ['免费停车场'],
    'address': '奈良县大和郡山市小泉町730',
    'latitude': 34.61898631,
    'longitude': 135.7567562,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '14:00',
    'leave_time': '10:00',
    'room_count': '55',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
  }, {
    'hotel_id': 29010024,
    'hotel': '奈良艾思酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29012,
    'top': 0,
    'hot': false,
    'english_hotel': 'Hotel Asyl Nara',
    'introduction': '酒店位于世界遗产包围的奈良，酒店的名字在希腊语中是“圣域”的意思，将西洋与奈良的文化交织在一起，创造了治愈感满满的空间。',
    'image': ['/hotel_img/nailiang/29010024/1576392315748.jpeg', '/hotel_img/nailiang/29010024/1576392317862.jpeg', '/hotel_img/nailiang/29010024/1576392319990.jpeg', '/hotel_img/nailiang/29010024/1576392322129.jpeg', '/hotel_img/nailiang/29010024/1576392324169.jpeg', '/hotel_img/nailiang/29010024/1576392326313.jpeg', '/hotel_img/nailiang/29010024/1576392328493.jpeg'],
    'concerns': ['奈良Asyl酒店位于著名的奈良市中心区，地理位置便捷。', ' 酒店想您所想，力求为您提供舒适的入住体验。', ' 配备出租车服务, 免费房内无线网络, 24小时前台, 无线网络(公共区域), 停车场等设施以供住客使用。', ' 部分客房内设 免费速溶咖啡, 沙发, 无线上网(免费), 禁烟房, 空调等设施，加上温馨舒适的设计装饰，定能带给住客宾至如归的感受。', ' 在享受舒适的客房之余，住客还可尽情使用酒店内的按摩等休闲设施。', ' 在 奈良Asyl酒店 住宿期间，你会发现酒店内气氛温馨，服务很好，带给您宾至如归的感受。', '。'],
    'facility': ['wifi服务', '电梯', '餐厅', '吹风机'],
    'address': 'Aburasaka-cho 1-58',
    'latitude': 34.68408,
    'longitude': 135.82188,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 00:00',
    'leave_time': '11:00',
    'room_count': '39',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010000, 29010002, 29010007, 29010008],
  }, {
    'hotel_id': 29010025,
    'hotel': '奈良康福酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29012,
    'top': 0,
    'hot': false,
    'english_hotel': 'Comfort Hotel Nara',
    'introduction': '非传统日式风格的酒店，但古典装修的客房布置的干净舒适。酒店的地理位置很好，就在JR奈良站的不远处，很方便找到。酒店可以提供的早餐很赞。',
    'image': ['/hotel_img/nailiang/29010025/1576392333236.jpeg', '/hotel_img/nailiang/29010025/1576392335302.jpeg', '/hotel_img/nailiang/29010025/1576392337390.jpeg', '/hotel_img/nailiang/29010025/1576392339459.jpeg', '/hotel_img/nailiang/29010025/1576392341497.jpeg', '/hotel_img/nailiang/29010025/1576392343599.jpeg', '/hotel_img/nailiang/29010025/1576392345678.jpeg'],
    'concerns': ['酒店距离东大寺仅5分钟车程，距离春日大社仅3公里。', '酒店距离JR奈良火车站仅需步行5分钟，距离奈良公园有10分钟车程。', '古典风格的客房配有冰箱和平面电视，提供吸烟和非吸烟客房两种选择。', '贴士前台可以提供笔记本电脑租赁、复印和行李寄存服务。', '用餐区每天供应自助餐，提供各种热菜和凉菜。', '。'],
    'brand': '凯富',
    'facility': ['wifi服务', '免费停车场', '电梯', '吹风机'],
    'address': 'Sanjo-cho 321-3',
    'latitude': 34.67953,
    'longitude': 135.82027,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00',
    'leave_time': '10:00',
    'room_count': '131',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010000, 29010001, 29010002, 29010007],
  }, {
    'hotel_id': 29010026,
    'hotel': '格永库佐因酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29011,
    'top': 1,
    'hot': false,
    'english_hotel': 'Gyokuzoin',
    'introduction': '酒店位于信贵山，距离三乡町有2.5公里。全日式客房，在这里蜂蜂们能够体验到宁静的寺庙环境或者外出观光，走访附近的法隆寺和信贵温泉。',
    'image': ['/hotel_img/nailiang/29010026/1576392350383.jpeg', '/hotel_img/nailiang/29010026/1576392352414.jpeg', '/hotel_img/nailiang/29010026/1576392354475.jpeg', '/hotel_img/nailiang/29010026/1576392356530.jpeg', '/hotel_img/nailiang/29010026/1576392358552.jpeg', '/hotel_img/nailiang/29010026/1576392360610.jpeg', '/hotel_img/nailiang/29010026/1576392362676.jpeg'],
    'concerns': ['Gyokuzoin Temple酒店位于奈良信贵山上，蜂蜂们可以体验宁静的寺庙环境或是外出观光。', '酒店拥有传统日式客房，在那里蜂蜂们可以俯瞰整个寺庙美景。', '客房中设有公共浴池和按摩理疗，酒店中还设有纪念品商店和饮料自动售货机。', '宴会厅提供具有地方特色的日式早餐和传统的多道菜晚餐。', '【tips】使用酒店停车场需要加收额外费用。', '酒店距离Shigisan Onsen温泉有0.3km的步行路程。', '。'],
    'facility': ['电梯'],
    'address': 'Shigisan 2280',
    'latitude': 34.60954,
    'longitude': 135.66981,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 18:30',
    'leave_time': '10:00',
    'room_count': '40',
    'nearby_place': [],
    'nearby_hotel': [29010068],
  }, {
    'hotel_id': 29010027,
    'hotel': '奈良新大宫站前东横 INN',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 0,
    'top': 0,
    'hot': false,
    'english_hotel': 'Toyoko Inn Nara Shin-Omiya Ekimae',
    'introduction': '酒店就在新大宫火车站前，非常容易找到，交通便利。前往奈良各个景点都很容易到达。酒店房间不大，但是收拾的干干净净。每天还提供免费的早餐。',
    'image': ['/hotel_img/nailiang/29010027/1576392367314.jpeg', '/hotel_img/nailiang/29010027/1576392369354.jpeg', '/hotel_img/nailiang/29010027/1576392371381.jpeg', '/hotel_img/nailiang/29010027/1576392373423.jpeg', '/hotel_img/nailiang/29010027/1576392375491.jpeg', '/hotel_img/nailiang/29010027/1576392377563.jpeg', '/hotel_img/nailiang/29010027/1576392379616.jpeg'],
    'concerns': ['酒店距离新大宫站仅有2分钟步行路程。', '客人从新大宫站坐火车只需2分钟便可以到达奈良国立博物馆和奈良公园。', '酒店房间不大，设计的较为紧凑，但干净整洁。', '贴士酒店在大堂以先到先得的方式供应免费早餐。', ' 酒店提供行李寄存和洗衣服务。', '大堂供应饮料和小吃，还设有免费无线网络连接。', '。'],
    'brand': '东横',
    'facility': ['wifi服务', '收费停车场', '电梯', '吹风机'],
    'address': '4-3-2, Shibatsuji-cho',
    'latitude': 34.6865,
    'longitude': 135.81139,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00',
    'leave_time': '10:00',
    'room_count': '139',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010049, 29010064, 29010065, 29010000],
  }, {
    'hotel_id': 29010028,
    'hotel': '奈良皮亚扎酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29012,
    'top': 0,
    'hot': false,
    'english_hotel': 'Piazza Hotel Nara',
    'introduction': '位置超级方便，酒店装修时尚，床很大，很干净。楼下就是巴士总站，去各地都很方便！',
    'image': ['/hotel_img/nailiang/29010028/1576392384789.jpeg', '/hotel_img/nailiang/29010028/1576392386841.jpeg', '/hotel_img/nailiang/29010028/1576392388900.jpeg', '/hotel_img/nailiang/29010028/1576392390961.jpeg', '/hotel_img/nailiang/29010028/1576392393005.jpeg', '/hotel_img/nailiang/29010028/1576392395058.jpeg', '/hotel_img/nailiang/29010028/1576392397102.jpeg'],
    'concerns': ['位于奈良市中心，奈良广场酒店是游览奈良的很好住宿选择。', ' 完善的设施可让您在住宿期间更加愉悦。', ' 配备免费房内无线网络, 24小时安保, 便利店, 每日客房清洁服务, 无障碍通道等设施以供住客使用。', ' 部分客房内设 平板电视, 地毯, 衣架, 床单, 镜子等设施，加上温馨舒适的设计装饰，定能带给住客宾至如归的感受。', ' 酒店内设多种休闲娱乐设施。', ' 奈良广场酒店的工作人员专业友善，将尽力满足您各方面的需求。', '。'],
    'facility': ['wifi服务', '电梯', '餐厅'],
    'address': '10-11-20 Sanjohonmachi, Nara',
    'latitude': 34.6805,
    'longitude': 135.81775,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 00:00',
    'leave_time': '11:00',
    'room_count': '137',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010000, 29010001, 29010002, 29010010],
  }, {
    'hotel_id': 29010029,
    'hotel': '月日亭酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Tsukihitei Ryokan',
    'introduction': '月日亭位于世界遗产“春日原始森林”内，优美的自然风光和独有的森林全景使这里成为喜爱大自然的您的不错之选。',
    'image': ['/hotel_img/nailiang/29010029/1576392401849.jpeg', '/hotel_img/nailiang/29010029/1576392403974.jpeg', '/hotel_img/nailiang/29010029/1576392406013.jpeg', '/hotel_img/nailiang/29010029/1576392408066.jpeg', '/hotel_img/nailiang/29010029/1576392410195.jpeg', '/hotel_img/nailiang/29010029/1576392412259.jpeg', '/hotel_img/nailiang/29010029/1576392414297.jpeg'],
    'concerns': ['图卡怀特酒店位于被列为世界遗产的春日原始森林（Kasugayama Primeval Forest）内，在房间内就可以独享森林全景。', '日式风格的客房铺着传统的草编榻榻米地板并配有障纸屏风和日式棉床垫，客房中还包括了带有西式卫生间的连接浴室。', '距离春日大社仅有400米，客人只需不到十分钟的车程就可以到达近铁奈良（Kintetsu Nara）火车站和JR奈良（JR Nara）火车站。', '【tips】您可以在酒店中享受传统日式早餐和使用时令蔬菜烹饪的特色晚餐料理。', '酒店提供免费wifi。', '。'],
    'facility': ['wifi服务', '免费停车场', '吹风机'],
    'address': 'Kasugano-cho 158',
    'latitude': 34.68501,
    'longitude': 135.85213,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 18:30',
    'leave_time': '10:00',
    'room_count': '3',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010005, 29010019, 29010004, 29010012],
  }, {
    'hotel_id': 29010030,
    'hotel': '近铁奈良站前东横 INN',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29013,
    'top': 0,
    'hot': false,
    'english_hotel': 'Toyoko Inn Kintetsu Nara Ekimae',
    'introduction': '连锁酒店，周围徒步范围内即可到达东大寺、春日大社，与近铁奈良站零距离。客房简约优雅，设施一应俱全。',
    'image': ['/hotel_img/nailiang/29010030/1576392419085.jpeg', '/hotel_img/nailiang/29010030/1576392421139.jpeg', '/hotel_img/nailiang/29010030/1576392423240.jpeg', '/hotel_img/nailiang/29010030/1576392425282.jpeg', '/hotel_img/nailiang/29010030/1576392427362.jpeg', '/hotel_img/nailiang/29010030/1576392429395.jpeg', '/hotel_img/nailiang/29010030/1576392431507.jpeg'],
    'concerns': ['酒店就在近铁奈良站，马路对面就是商业街，离奈良公园很近。', '酒店设施齐全，包括无线网络、无障碍设施、报纸、电梯等，客房内必需品也是一应俱全，部分客房还配备平板电视。', '贴士酒店很有口碑，房间虽然不大，但是干净明亮，非常温馨舒适。', '早餐非常丰盛。', '。'],
    'brand': '东横',
    'facility': ['wifi服务', '电梯', '吹风机'],
    'address': '16-1, Nishi-mikado-cho',
    'latitude': 34.68438,
    'longitude': 135.82689,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 22:00',
    'leave_time': '10:00',
    'room_count': '10',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010006, 29010007, 29010008, 29010009],
  }, {
    'hotel_id': 29010031,
    'hotel': '壹岐旅馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29013,
    'top': 0,
    'hot': true,
    'english_hotel': 'Guesthouse Iki',
    'introduction': '宾馆坐落于奈良中心的中心地带，方便蜂蜂们去往各大热门景点。热情好客的老板会确保每一个宾客在这里都是愉快和舒适的。',
    'image': ['/hotel_img/nailiang/29010031/1576392436280.jpeg', '/hotel_img/nailiang/29010031/1576392438337.jpeg', '/hotel_img/nailiang/29010031/1576392440461.jpeg', '/hotel_img/nailiang/29010031/1576392442535.jpeg', '/hotel_img/nailiang/29010031/1576392444577.jpeg', '/hotel_img/nailiang/29010031/1576392446598.jpeg', '/hotel_img/nailiang/29010031/1576392448634.jpeg'],
    'concerns': ['酒店坐落于奈良市中心地带，前往热门景点变得方便快捷。', '这里提供自行车租赁服务，还有家庭房供你选择。', '热情好客的酒店老板会提前用邮件将地图发给入住的蜂蜂们。', '贴士进入酒店需要脱掉鞋子。', '洗脸池比较迷你，但十分整洁。', '免费无线网络。', ' 配有公共厨房供大家使用。', '。'],
    'facility': ['电梯', '行李寄存'],
    'address': '奈良市上三条町1-5',
    'latitude': 34.68145,
    'longitude': 135.8266,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 21:00',
    'leave_time': '10:00',
    'room_count': '8',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010007, 29010008, 29010009, 29010011],
  }, {
    'hotel_id': 29010032,
    'hotel': '神奈寐旅馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Nara Guesthouse Kamunabi',
    'introduction': '旅馆是一家青旅，距离春日大社、奈良公园不足2公里，提供榻榻米客房，从露台还可以远眺奈良公园的风景。',
    'image': ['/hotel_img/nailiang/29010032/1576392453509.jpeg', '/hotel_img/nailiang/29010032/1576392455550.jpeg', '/hotel_img/nailiang/29010032/1576392457708.jpeg', '/hotel_img/nailiang/29010032/1576392459750.jpeg', '/hotel_img/nailiang/29010032/1576392461815.jpeg', '/hotel_img/nailiang/29010032/1576392463878.jpeg', '/hotel_img/nailiang/29010032/1576392465946.jpeg'],
    'concerns': ['Nara Guesthouse Kamunabi旅馆位于奈良（Nara），提供免费WiFi。', '客人可以在内部酒吧享用饮品。', '部分客房设有便利的休息区。', '客房配有共用浴室，提供拖鞋、免费洗浴用品和吹风机。', '旅馆设有共用厨房。', 'Nara Guesthouse Kamunabi旅馆提供自行车租赁服务，距离兴福寺（Kofuku-ji）700米，距离奈良公园（Nara Park）1.2公里，距离近的大阪伊丹机场（Osaka Itami Airport）38公里。', '。'],
    'facility': ['wifi服务', '餐厅'],
    'address': 'Kideracho 1054',
    'latitude': 34.67708,
    'longitude': 135.8356,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 21:00',
    'leave_time': '11:00',
    'room_count': '15',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010003, 29010013, 29010017, 29010042],
  }, {
    'hotel_id': 29010033,
    'hotel': '大佛馆酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Daibutsukan',
    'introduction': '大佛馆是一家传统日式酒店，男女分隔的澡堂十分有特色。站在酒店的阳台上就可以看到兴福寺的五层宝塔。还有特色美味的日式早餐供蜂蜂们选择。',
    'image': ['/hotel_img/nailiang/29010033/1576392470627.jpeg', '/hotel_img/nailiang/29010033/1576392472749.jpeg', '/hotel_img/nailiang/29010033/1576392474787.jpeg', '/hotel_img/nailiang/29010033/1576392477180.jpeg', '/hotel_img/nailiang/29010033/1576392479199.jpeg', '/hotel_img/nailiang/29010033/1576392481294.jpeg', '/hotel_img/nailiang/29010033/1576392483326.jpeg'],
    'concerns': ['大佛馆酒店建于大正时代，是传统的日式建筑，毗邻兴福寺的五层宝塔，步行100m即可到达。', '距离东大寺、春日大社、奈良公园都仅有1km左右的路程。', '住在这里的蜂蜂们可以搭乘免费班车到达JR奈良火车站。', '有男女分区的澡堂，并配有足部按摩器。', '贴士日式风格的客房拥有榻榻米（草编）地板和传统的蒲团寝具。', '在公共区域内提供免费wifi。', '蜂蜂们可以选择包含早餐的预定选项，享受特色日式早餐。', '。'],
    'facility': ['免费停车场', '电梯'],
    'address': 'Takabatake-cho 250',
    'latitude': 34.68195,
    'longitude': 135.83266,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 20:00',
    'leave_time': '10:00',
    'room_count': '27',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010003, 29010011, 29010013, 29010017],
  }, {
    'hotel_id': 29010034,
    'hotel': '奈良皇家酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 0,
    'top': 0,
    'hot': false,
    'english_hotel': 'Nara Royal Hotel',
    'kind': '度假村',
    'introduction': '酒店设施豪华，有天然温泉和Spa中心和享有瀑布景色的茶室，很有日本味道。酒店提供接驳班车，去JR线很方便。酒店的附近有餐饮店，还有居酒屋。',
    'image': ['/hotel_img/nailiang/29010034/1576392488005.jpeg', '/hotel_img/nailiang/29010034/1576392490040.jpeg', '/hotel_img/nailiang/29010034/1576392492057.jpeg', '/hotel_img/nailiang/29010034/1576392494082.jpeg', '/hotel_img/nailiang/29010034/1576392496174.jpeg', '/hotel_img/nailiang/29010034/1576392498268.jpeg', '/hotel_img/nailiang/29010034/1576392500375.jpeg'],
    'concerns': ['酒店距离唐招提寺有10分钟步行路程，距离奈良车站有8分钟车程。', '酒店提供前往Shinomiya站且仅需3分钟车程的免费班车。', '酒店距离新大宫近铁站非常近，便于寻找。', '贴士此酒店提供火车站接送服务。', '每天提供收费的自助式早餐。', '。'],
    'brand': '我的居所',
    'facility': ['wifi服务', '收费停车场', '电梯', '餐厅'],
    'address': 'Hokkeji 254-1',
    'latitude': 34.68751,
    'longitude': 135.80548,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '14:00 - 01:00',
    'leave_time': '11:00',
    'room_count': '131',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010065, 29010000, 29010002, 29010045],
  }, {
    'hotel_id': 29010035,
    'hotel': '比尔酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29015,
    'top': 1,
    'hot': false,
    'english_hotel': 'Hotobil Guest House',
    'introduction': '坐落于奈良市中心，仅限女性及其家庭入住。热情好客的老板娘和店内的狗狗将陪伴您度过在奈良的愉快时光。店中提供的早餐更是得到了一致好评。',
    'image': ['/hotel_img/nailiang/29010035/1576392505040.jpeg', '/hotel_img/nailiang/29010035/1576392507099.jpeg', '/hotel_img/nailiang/29010035/1576392509131.jpeg', '/hotel_img/nailiang/29010035/1576392511163.jpeg', '/hotel_img/nailiang/29010035/1576392513227.jpeg', '/hotel_img/nailiang/29010035/1576392515312.jpeg', '/hotel_img/nailiang/29010035/1576392517357.jpeg'],
    'concerns': ['坐落于奈良市中心，距离JR奈良站有10分钟车程。', '酒店距离奈良国立博物馆、兴福寺和东大寺仅十分钟巴士车程。', '客人可以步行两分钟至田中町巴士站乘坐巴士。', '毗邻奈良公园和购物步行街，满足您购物、赏景的需求。', '贴士酒店仅限女性及其家庭入住。', '设有两间客房，提供丰盛的早餐。', '没有独立卫浴，需使用干净整洁的公共浴室。', '设施齐全，备有公共厨房和足部按摩器。', '酒店位于小巷内，闹中取静，十分惬意。', '。'],
    'facility': ['wifi服务', '免费停车场', '餐厅', '吹风机'],
    'address': 'Kainozuka-cho 181-15',
    'latitude': 34.67185,
    'longitude': 135.83141,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 23:00',
    'leave_time': '10:00',
    'room_count': '2',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010015, 29010062, 29010069, 29010003],
  }, {
    'hotel_id': 29010036,
    'hotel': '高天旅馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29013,
    'top': 0,
    'hot': false,
    'english_hotel': 'Takama Guest House',
    'introduction': '从旅馆步行就可到近铁奈良车站，出行十分方便，周边有兴福寺和东大寺等著名景点。客房是日式榻榻米地板配西式床，简约舒适。',
    'image': ['/hotel_img/nailiang/29010036/1576393640498.jpeg', '/hotel_img/nailiang/29010036/1576393642541.jpeg', '/hotel_img/nailiang/29010036/1576393644579.jpeg', '/hotel_img/nailiang/29010036/1576393646637.jpeg', '/hotel_img/nailiang/29010036/1576393648697.jpeg', '/hotel_img/nailiang/29010036/1576393650723.jpeg', '/hotel_img/nailiang/29010036/1576393652755.jpeg'],
    'concerns': ['旅馆距离Kintetsu Nara车站有3分钟的步行路程。', '旅馆距离东大寺仅需步行5分钟，距离兴福寺仅三分钟步行时间。', '旅馆客房铺有榻榻米（编织草）地板，配备有西式床。', '贴士房间内的灯皆在00:00熄灭。', '浴室和卫生间为共用设施。', '淋浴间开放至23:30。', '旅馆提供书籍和杂志供客人阅读。', '。'],
    'address': 'Nashihara-cho 27-1',
    'latitude': 34.68677,
    'longitude': 135.82596,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 22:00',
    'leave_time': '10:00',
    'room_count': '4',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010006, 29010007, 29010008, 29010011],
  }, {
    'hotel_id': 29010037,
    'hotel': '奈良宾馆3F（住宿加早餐旅馆）',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29013,
    'top': 0,
    'hot': true,
    'english_hotel': 'Nara Guesthouse 3F (B&B)',
    'introduction': '一家位置便利的青旅，就在奈良站附近，家具都采用原木色调，早���很美味，老板热情友好，可以步行到奈良公园、兴福寺等景点。',
    'image': ['/hotel_img/nailiang/29010037/1576393657472.jpeg', '/hotel_img/nailiang/29010037/1576393659495.jpeg', '/hotel_img/nailiang/29010037/1576393661515.jpeg', '/hotel_img/nailiang/29010037/1576393663538.jpeg', '/hotel_img/nailiang/29010037/1576393665580.jpeg', '/hotel_img/nailiang/29010037/1576393667674.jpeg', '/hotel_img/nailiang/29010037/1576393669736.jpeg'],
    'concerns': ['下榻奈良3F旅馆，感受奈良的独特魅力。', ' 不论是商务人士，还是观光游客，都可以尽情享受酒店内的设施和服务。', ' 在酒店内，您会发现内设免费房内无线网络, 行李存放服务, 无线网络(公共区域), 电梯, 吸烟区等设施。', ' 客房设��舒适，装饰优雅，此外还配备了众多便捷设施，部分客房还配有无线上网, 无线上网(免费), 禁烟房, 空调, 暖气等。', ' 酒店内设多种娱乐设施。', ' 热情友好的工作人员、完善的设施、优越的地理位置、便于游客前往奈良的各大景点，这些都是众多游客选择奈良3F旅馆的原因。', '。'],
    'facility': ['wifi服务', '电梯'],
    'address': 'Konishicho 5',
    'latitude': 34.68319,
    'longitude': 135.8283,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 20:00',
    'leave_time': '10:00',
    'room_count': '4',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010006, 29010007, 29010008, 29010009],
  }, {
    'hotel_id': 29010038,
    'hotel': '杉谷旅馆青年旅舍',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 1,
    'hot': true,
    'english_hotel': 'Sugiya Guest House - Hostel',
    'introduction': '位于奈良一条较为宁静的街道上，距离奈良公园很近。这里充满日式的生活气息，有公用休息区和公用厨房，很有家的感觉。',
    'image': ['/hotel_img/nailiang/29010038/1576393674339.jpeg', '/hotel_img/nailiang/29010038/1576393676500.jpeg', '/hotel_img/nailiang/29010038/1576393678552.jpeg', '/hotel_img/nailiang/29010038/1576393680579.jpeg', '/hotel_img/nailiang/29010038/1576393682636.jpeg', '/hotel_img/nailiang/29010038/1576393684671.jpeg', '/hotel_img/nailiang/29010038/1576393686734.jpeg'],
    'concerns': ['位置很好，就在商业街和奈良公园中间，旅游逛街都很方便。', '设施齐全，提供免费无线网络。', '贴士日式结构的民宿很有特色。', '有免费咖啡，还有很多的漫画，大厅还有丰富的旅游资讯。', '老板很热情，英语也很好。', '。'],
    'facility': ['wifi服务'],
    'address': 'Imamikado-cho 34-1',
    'latitude': 34.67963,
    'longitude': 135.83041,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 21:00',
    'leave_time': '10:00',
    'room_count': '9',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010003, 29010011, 29010013, 29010017],
  }, {
    'hotel_id': 29010039,
    'hotel': '奥库旅馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29013,
    'top': 0,
    'hot': false,
    'english_hotel': 'Guest House Oku',
    'introduction': '一家小而精致的民宿，在近铁奈良站附近，榻榻米客房，房东热情健谈，还可以和大家一起在公共厨房做饭。',
    'image': ['/hotel_img/nailiang/29010039/1576393899812.jpeg', '/hotel_img/nailiang/29010039/1576393901875.jpeg', '/hotel_img/nailiang/29010039/1576393903904.jpeg', '/hotel_img/nailiang/29010039/1576393905933.jpeg', '/hotel_img/nailiang/29010039/1576393907964.jpeg', '/hotel_img/nailiang/29010039/1576393909985.jpeg', '/hotel_img/nailiang/29010039/1576393912031.jpeg'],
    'concerns': ['Guest House Oku旅馆共提供3间客房。', 'Guest House Oku旅馆距离JR奈良站（JR Nara station）有15分钟步行路程，距离近铁奈良站（Kintetsu Nara Station）有5分钟步行路程，提供覆盖各处的免费WiFi。', '旅馆设有行李寄存处。', 'Guest House Oku旅馆距离兴福寺（Kofuku-ji）900米，距离东大寺（Todaiji Temple）1.4公里，距离近的机场——大阪国际机场（Osaka Itami Airport）37公里。', '。'],
    'facility': ['行李寄存'],
    'address': 'Takamaichi-cho 29',
    'latitude': 34.68596,
    'longitude': 135.8251,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 21:00',
    'leave_time': '10:30',
    'room_count': '3',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010006, 29010007, 29010008, 29010011],
  }, {
    'hotel_id': 29010040,
    'hotel': '平城旅馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Yu-Kei no Yado Heijo',
    'introduction': '旅馆有到JR奈良火车站的免费班车，很方便。旅馆内有夏季室外游泳池和茶座，在这里可以尽情欣赏奈良市的山丘景色。',
    'image': ['/hotel_img/nailiang/29010040/1576394737500.jpeg', '/hotel_img/nailiang/29010040/1576394739544.jpeg', '/hotel_img/nailiang/29010040/1576394741588.jpeg', '/hotel_img/nailiang/29010040/1576394743652.jpeg', '/hotel_img/nailiang/29010040/1576394745958.jpeg', '/hotel_img/nailiang/29010040/1576394748174.jpeg', '/hotel_img/nailiang/29010040/1576394750233.jpeg'],
    'concerns': ['距离东大寺和奈良国立博物馆有7分钟的车程。', '距离奈良公园和春日大社有10分钟的车程。', '距离JR奈良火车站仅有10分钟的车程。', '贴士客人必须在预订时便提出要求提供从奈良站到旅馆的班车服务。', '旅馆提供免费停车场。', '客人可以在7月和8月期间使用游泳池，也可到一家全年营业的礼品店购买独特的当地手工品。', '公共热水浴池提供了一个日式放松体验。', '。'],
    'facility': ['免费停车场', '电梯', '行李寄存'],
    'address': 'Kawakami-cho 728',
    'latitude': 34.69647,
    'longitude': 135.84478,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 18:00',
    'leave_time': '10:00',
    'room_count': '20',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010041, 29010005, 29010004, 29010012],
  }, {
    'hotel_id': 29010041,
    'hotel': '米卡萨酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Nara Mikasa Ryokan',
    'introduction': '酒店坐落于可以俯瞰奈良全景的若草山山腰，周边被绿意环绕，能充分感受到古都奈良自然不造作的气息，是放松身心的好住处。',
    'image': ['/hotel_img/nailiang/29010041/1576394138627.jpeg', '/hotel_img/nailiang/29010041/1576394140730.jpeg', '/hotel_img/nailiang/29010041/1576394142796.jpeg', '/hotel_img/nailiang/29010041/1576394144848.jpeg', '/hotel_img/nailiang/29010041/1576394146919.jpeg', '/hotel_img/nailiang/29010041/1576394148953.jpeg', '/hotel_img/nailiang/29010041/1576394151044.jpeg'],
    'concerns': ['客房铺有传统的蒲团被褥和榻榻米（草编）地板，设有平板电视和私人浴室。', '距离享有奈良壮丽美景的若草山（Wakakusayama Mountain）有10分钟车程，距离东大寺（Todai-ji Temple）有7分钟车程。', '旅馆距离近铁奈良火车站有10分钟车程。', '贴士式旅馆毗邻被联合国教科文组织列为世界遗产的春日原始森林Kasugano餐厅和Yukatei餐厅供应以新鲜当地食材烹制的日式晚餐。', '。'],
    'brand': '都',
    'facility': ['wifi服务', '收费停车场', '电梯', '餐厅'],
    'address': 'Kawakami-cho 728',
    'latitude': 34.697,
    'longitude': 135.84527,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 19:00',
    'leave_time': '10:30',
    'room_count': '34',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010040, 29010005, 29010004, 29010012],
  }, {
    'hotel_id': 29010042,
    'hotel': '孙诺亚旅馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Guesthouse Tsunoya',
    'image': ['/hotel_img/nailiang/29010042/1576394155989.jpeg', '/hotel_img/nailiang/29010042/1576394158071.jpeg', '/hotel_img/nailiang/29010042/1576394160263.jpeg', '/hotel_img/nailiang/29010042/1576394162415.jpeg', '/hotel_img/nailiang/29010042/1576394164460.jpeg', '/hotel_img/nailiang/29010042/1576394166611.jpeg', '/hotel_img/nailiang/29010042/1576394168699.jpeg'],
    'concerns': ['角屋民宿位于奈良的黄金地段，毗邻市区内的各大主要景点。', ' 完善的设施可让您在住宿期间更加愉悦。', ' 配备免费房内无线网络, 自助洗衣设施, 出租车服务, 每日客房清洁服务, 行李存放服务等设施以供住客使用。', ' 客房设计舒适，装饰优雅，此外还配备了众多便捷设施，部分客房还配有地毯, 衣架, 床单, 镜子, 毛巾等设施。', ' 酒店内设多种休闲娱乐设施。', ' 在 角屋民宿 住宿期间，你会发现酒店内气氛温馨，服务很好，带给您宾至如归的感受。', '。'],
    'facility': ['wifi服务'],
    'address': 'Higashiterabayashicho 5',
    'latitude': 34.67949,
    'longitude': 135.8315,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 21:00',
    'leave_time': '10:00',
    'room_count': '20',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010003, 29010011, 29010013, 29010017],
  }, {
    'hotel_id': 29010043,
    'hotel': '奈良鹿驿旅馆（自助式民宿）',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29012,
    'top': 0,
    'hot': false,
    'english_hotel': 'Nara Deer Hostel (Self Guesthouse)',
    'introduction': '青旅就在奈良站附近，从这里前往景点和周边城市很方便。宿舍房设计的很舒适，可以免费使用公共厨房，室内还有别致的小花园。',
    'image': ['/hotel_img/nailiang/29010043/1576394173664.jpeg', '/hotel_img/nailiang/29010043/1576394175956.jpeg', '/hotel_img/nailiang/29010043/1576394178065.jpeg', '/hotel_img/nailiang/29010043/1576394180196.jpeg', '/hotel_img/nailiang/29010043/1576394182254.jpeg', '/hotel_img/nailiang/29010043/1576394184287.jpeg', '/hotel_img/nailiang/29010043/1576394186336.jpeg'],
    'concerns': ['距离JR奈良站（JR Nara Station）仅有5分钟步行路程。', '距离近铁奈良站（Kintetsu Nara Station）有8分钟步行路程。', '距离兴福寺（Kofuku-ji）和春日大社（Kasuga Taisha Shrine）1.1公里。', '距离东大寺（Todaiji Temple）1.8公里，距离奈良公园（Nara Park）1.9公里。', '贴士部分客房设有私人浴室。', '客人可免费使用旅舍的共用厨房和保险箱。', '部分员工会说中文，方便蜂蜂沟通交流。', '。'],
    'facility': ['wifi服务'],
    'address': 'Sanjocho 593-17',
    'latitude': 34.67983,
    'longitude': 135.82344,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 21:00',
    'leave_time': '10:00',
    'room_count': '28',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010000, 29010001, 29010002, 29010007],
  }, {
    'hotel_id': 29010044,
    'hotel': '奈良灿路都大饭店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Hotel Sunroute Nara',
    'kind': '度假村',
    'introduction': '酒店的地理位置很好，去往奈良主要的景点都非常方便。连锁型酒店，服务品质都很有保证。房间不大，但是干净整洁。酒店的服务很专业。',
    'image': ['/hotel_img/nailiang/29010044/1576394191126.jpeg', '/hotel_img/nailiang/29010044/1576394193244.jpeg', '/hotel_img/nailiang/29010044/1576394195322.jpeg', '/hotel_img/nailiang/29010044/1576394197410.jpeg', '/hotel_img/nailiang/29010044/1576394199501.jpeg', '/hotel_img/nailiang/29010044/1576394201579.jpeg', '/hotel_img/nailiang/29010044/1576394203631.jpeg'],
    'concerns': ['酒店位于日本的古都中心，距离奈良地区仅有几步之遥。', '步行10分钟便可抵达奈良火车站、东大寺和兴福寺。', '酒店距离奈良公园和春日大社有7分钟的车程。', '贴士大堂提供免费无线网络连接；三楼设有投币式洗衣设施。', '酒店的礼宾和自行车出租服务使您的观光更为轻松。', '餐厅每日提供包括日本和西方菜肴的自助早餐，晚餐时段提供当地特色菜。', '。'],
    'facility': ['wifi服务', '收费停车场', '电梯', '餐厅', '吹风机'],
    'address': 'Takabatakebodai-cho 1110',
    'latitude': 34.67964,
    'longitude': 135.83205,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '14:00 - 00:00',
    'leave_time': '11:00',
    'room_count': '95',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010003, 29010011, 29010013, 29010017],
  }, {
    'hotel_id': 29010045,
    'hotel': '奈良艾思安克斯酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 0,
    'top': 0,
    'hot': false,
    'english_hotel': 'Hotel Asyl Nara Annex',
    'introduction': '传统的日式经济型酒店，一如既往地日式微笑服务。这里每天都有免费班车往返奈良站。',
    'image': ['/hotel_img/nailiang/29010045/1576394208406.jpeg', '/hotel_img/nailiang/29010045/1576394210796.jpeg', '/hotel_img/nailiang/29010045/1576394212876.jpeg', '/hotel_img/nailiang/29010045/1576394214933.jpeg', '/hotel_img/nailiang/29010045/1576394217541.jpeg', '/hotel_img/nailiang/29010045/1576394219652.jpeg', '/hotel_img/nailiang/29010045/1576394221725.jpeg'],
    'concerns': ['酒店距离兴福寺3km。', '交通便利，可去往周边景点。', '提供自助式早餐，有西式和日式两种不同选择。', '酒店有81间客房，还提供宽敞的家庭房。', '【tips】提供免费wifi。', '提供机场接送服务。', '。'],
    'facility': ['wifi服务', '免费停车场', '餐厅'],
    'address': 'Sijyooji 1-4-45',
    'latitude': 34.68176,
    'longitude': 135.80112,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 00:00',
    'leave_time': '11:00',
    'room_count': '81',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010034, 29010000, 29010002, 29010065],
  }, {
    'hotel_id': 29010046,
    'hotel': '古市 53 号线旅馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Guest House Route53 Furuichi',
    'introduction': '性价比很高的酒店，房间很大。离奈良车站很近，步行10分钟以内。酒店旁边就是商业街，有特别多的餐馆和纪念品商店，吃饭买东西都很方便。离景...',
    'image': ['/hotel_img/nailiang/29010046/1576394226534.jpeg', '/hotel_img/nailiang/29010046/1576394228652.jpeg', '/hotel_img/nailiang/29010046/1576394230689.jpeg', '/hotel_img/nailiang/29010046/1576394232761.jpeg', '/hotel_img/nailiang/29010046/1576394234831.jpeg', '/hotel_img/nailiang/29010046/1576394236871.jpeg', '/hotel_img/nailiang/29010046/1576394238984.jpeg'],
    'concerns': ['旅馆距离兴福寺需要步行8分钟。', '旅馆距离东大寺以及奈良公园均需要2分钟车程。', '旅馆距离大阪伊丹机场需要40分钟车程。', '贴士旅馆提供共用厨房，可以在酒店内自己做饭吃。', '提供覆盖各处的无线网络，方便查询信息。', '提供额外收费的自行车租赁服务，方便蜂蜂出行。', '。'],
    'facility': ['wifi服务'],
    'address': 'Higashiterabayashi-cho 6',
    'latitude': 34.67963,
    'longitude': 135.8314,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 21:00',
    'leave_time': '10:00',
    'room_count': '10',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010003, 29010011, 29010013, 29010017],
  }, {
    'hotel_id': 29010047,
    'hotel': '奈良微笑酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29012,
    'top': 0,
    'hot': false,
    'english_hotel': 'Smile Hotel Nara',
    'image': ['/hotel_img/nailiang/29010047/1576394243617.jpeg', '/hotel_img/nailiang/29010047/1576394245716.jpeg', '/hotel_img/nailiang/29010047/1576394248851.jpeg', '/hotel_img/nailiang/29010047/1576394250917.jpeg', '/hotel_img/nailiang/29010047/1576394253011.jpeg', '/hotel_img/nailiang/29010047/1576394255089.jpeg', '/hotel_img/nailiang/29010047/1576394257138.jpeg'],
    'concerns': ['酒店位置 奈良微笑旅館坐落于奈良中心地段，距离东大寺和兴福寺不到 10 分钟车程。', ' 此酒店距离奈良国立博物馆 1.3 英里（2.1 公里），距离春日神社 1.9 英里（3.1 公里）。', '客房 有 175 间空调客房提供冰箱和平板电视；��定能在旅途中找到家的舒适。', '免费的有线和无线上网帮助您与朋友保持联系；此外客房还提供收费电影，以满足您的娱乐需求。', '配备淋浴/盆浴组合的私人浴室提供免费洗浴用品和坐浴桶。', '便利设施包括电话，以及书桌和电热水壶。', '餐饮 每天 07:00 至 09:30 提供收费的自助式早餐早餐。', '商务及其他服务设施 特色服务/设施包括24 小时前台服务、行李储存室和洗衣设施。', '酒店提供收费自助停车。', '。'],
    'facility': ['wifi服务', '收费停车场', '电梯', '餐厅', '吹风机'],
    'address': 'Sanjohon 4-21',
    'latitude': 34.67952,
    'longitude': 135.81905,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 00:00',
    'leave_time': '10:00',
    'room_count': '175',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010000, 29010001, 29010002, 29010009],
  }, {
    'hotel_id': 29010048,
    'hotel': '料亭约亚旅馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29011,
    'top': 0,
    'hot': false,
    'english_hotel': 'Ryotei Jyusouya',
    'image': ['/hotel_img/nailiang/29010048/1576394261847.jpeg', '/hotel_img/nailiang/29010048/1576394264016.jpeg', '/hotel_img/nailiang/29010048/1576394266202.jpeg', '/hotel_img/nailiang/29010048/1576394268318.jpeg', '/hotel_img/nailiang/29010048/1576394270501.jpeg', '/hotel_img/nailiang/29010048/1576394272654.jpeg', '/hotel_img/nailiang/29010048/1576394274706.jpeg'],
    'concerns': ['旅亭十三屋旅馆位于奈良的黄金地段，毗邻市区内的各大主要景点。', ' 酒店想您所想，能为您提供住宿期间的一切需品。', ' 一切生活需品，例如教堂, 邮政服务, 停车场, 商店, 接送服务等都已为您准备就绪。', ' 客房设计舒适，装饰优雅，此外还配备了众多便捷设施，部分客房还配有免费茶水, 拖鞋, 毛巾, 禁烟房, 空调等。', ' 为了让游客体验更很好的住宿体验，酒店提供了多种休闲设施，例如按摩浴缸等。', ' 旅亭十三屋旅馆地理位置便捷，内部装饰令人倍感舒适，是游览奈良时的理想住宿选择。', '。'],
    'facility': ['wifi服务', '免费停车场', '电梯', '餐厅'],
    'address': 'Sangocho Shigisannishi 3-27',
    'latitude': 34.60725,
    'longitude': 135.66852,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 19:00',
    'leave_time': '10:00',
    'room_count': '5',
    'nearby_place': [],
    'nearby_hotel': [29010026, 29010068],
  }, {
    'hotel_id': 29010049,
    'hotel': 'ML国际青年旅舍',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 0,
    'top': 0,
    'hot': false,
    'english_hotel': 'ML International Hostel',
    'introduction': '旅舍大的优点在于就出了火车站口就可以到达旅舍，便于寻找，非常便利。内部设施简单，和一般青旅一样，提供客房和宿舍两种选择。',
    'image': ['/hotel_img/nailiang/29010049/1576394279516.jpeg', '/hotel_img/nailiang/29010049/1576394281561.jpeg', '/hotel_img/nailiang/29010049/1576394283671.jpeg', '/hotel_img/nailiang/29010049/1576394285811.jpeg', '/hotel_img/nailiang/29010049/1576394287865.jpeg', '/hotel_img/nailiang/29010049/1576394290103.jpeg', '/hotel_img/nailiang/29010049/1576394292241.jpeg'],
    'concerns': ['旅馆位于Shinomiya火车站前方，出站就可以找到。', '旅馆距离东大寺和奈良公园有25分钟的火车加步行路程。', '距离兴福寺有13分钟的火车加步行路程。', '贴士旅馆有宿舍和客房两种房型可供选择。', '浴室和卫生间为共用设施。', '。'],
    'facility': ['wifi服务', '收费停车场'],
    'address': 'Shibatsuji-cho 2-11-1 5F',
    'latitude': 34.68547,
    'longitude': 135.81216,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 23:00',
    'leave_time': '10:00',
    'room_count': '1',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010064, 29010065, 29010000, 29010002],
  }, {
    'hotel_id': 29010050,
    'hotel': '奈良县游客交流馆 & 住宿中心',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Nara Visitor Center and Inn',
    'introduction': '非常适合外国游客住宿，房间是整洁的日式床铺，一楼有可以学习日本文化的交流中心。楼下有洗衣机和大澡堂。非常接近景点东大寺、神鹿公园。',
    'image': ['/hotel_img/nailiang/29010050/1576394296910.jpeg', '/hotel_img/nailiang/29010050/1576394298990.jpeg', '/hotel_img/nailiang/29010050/1576394301075.jpeg', '/hotel_img/nailiang/29010050/1576394303126.jpeg', '/hotel_img/nailiang/29010050/1576394305195.jpeg', '/hotel_img/nailiang/29010050/1576394307263.jpeg', '/hotel_img/nailiang/29010050/1576394309372.jpeg'],
    'concerns': ['酒店距离兴福寺和奈良町有3分钟步行路程。', '酒店距离东大寺和鹿园有10分钟的步行路程。', '酒店距离近铁线的奈良站有7分钟的步行路程，距离JR奈良站14分钟的步行路程。', '贴士酒店设有免费WiFi和24小时前台，提供行李寄存处。', '酒店内设有提供免费洗浴用品和吹风机的公共浴室。', '酒店还设有投币式自助洗衣设施、共用厨房以及可免费使用的联网电脑。', '。'],
    'facility': ['wifi服务', '电梯', '吹风机'],
    'address': '630-8361 奈良县, 奈良, Ikeno-cho 3, 日本',
    'latitude': 34.68052,
    'longitude': 135.83163,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 00:00',
    'leave_time': '10:00',
    'room_count': '24',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010003, 29010011, 29010013, 29010017],
  }, {
    'hotel_id': 29010051,
    'hotel': '优选奈良站世纪酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29012,
    'top': 0,
    'hot': false,
    'english_hotel': 'Centurion Hotel Classic Nara Station',
    'image': ['/hotel_img/nailiang/29010051/1576394314030.jpeg', '/hotel_img/nailiang/29010051/1576394316273.jpeg', '/hotel_img/nailiang/29010051/1576394318411.jpeg', '/hotel_img/nailiang/29010051/1576394320541.jpeg', '/hotel_img/nailiang/29010051/1576394322608.jpeg', '/hotel_img/nailiang/29010051/1576394324663.jpeg', '/hotel_img/nailiang/29010051/1576394326753.jpeg'],
    'concerns': ['酒店位置 古典奈良百夫长酒店位于奈良，距离兴福寺和奈良国立博物馆不到 10 分钟车程。', ' 此酒店距离东大寺 1.9 英里（3 公里），距离春日神社 2 英里（3.2 公里）。', '客房 有 90 间空调客房提供平板电视；您定能在旅途中找到家的舒适。', '免费的有线和无线上网帮助您与朋友保持联系；此外客房还提供卫星节目，以满足您的娱乐需求。', '配备淋浴/盆浴组合的私人浴室提供浸泡浴缸和免费洗浴用品。', '便利设施包括书桌，而且每天提供客房服务餐饮 每天 06:30 至 09:30 提供收费的自助式早餐早餐。', '商务及其他服务设施 特色服务/设施包括24 小时前台服务、行李储存室和洗衣设施。', '。'],
    'brand': '百夫长',
    'facility': ['wifi服务', '电梯', '餐厅'],
    'address': 'Aburasakacho 1-51',
    'latitude': 34.68364,
    'longitude': 135.82104,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 23:00',
    'leave_time': '11:00',
    'room_count': '90',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010000, 29010001, 29010002, 29010007],
  }, {
    'hotel_id': 29010052,
    'hotel': '鹿民宿',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29013,
    'top': 0,
    'hot': false,
    'english_hotel': 'Deer Guesthouse',
    'image': ['/hotel_img/nailiang/29010052/1576394331644.jpeg', '/hotel_img/nailiang/29010052/1576394333730.jpeg', '/hotel_img/nailiang/29010052/1576394335762.jpeg', '/hotel_img/nailiang/29010052/1576394337879.jpeg', '/hotel_img/nailiang/29010052/1576394339959.jpeg', '/hotel_img/nailiang/29010052/1576394341993.jpeg', '/hotel_img/nailiang/29010052/1576394344090.jpeg'],
    'concerns': ['鹿民宿位于著名的旅游观光区——奈良市中心，让您的旅程变得更加轻松愉悦。', ' 酒店拥有高品质的服务以及完善的设施，以求满足住客们的各类需求。', ' 酒店内设施齐全，包括免费房内无线网络, 24小时安保, 每日客房清洁服务, 自助洗衣设施, 烧烤设施等。', ' 部分客房内设有平板电视, 空气净化器, 雨伞, 独立客厅, 无线上网。', ' 酒店内设多种休闲娱乐设施。', ' 热情的工作人员、完善的设施、优越的位置、轻松前往奈良的各大景点，这些都是众多游客选择鹿民宿的原因。', '。'],
    'facility': ['wifi服务'],
    'address': '36 Tsubai-cho,Nara,Japan',
    'latitude': 34.68093,
    'longitude': 135.82854,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 21:00',
    'leave_time': '11:00',
    'room_count': '3',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010003, 29010007, 29010009, 29010011],
  }, {
    'hotel_id': 29010053,
    'hotel': '鹿之旅馆 - 青年旅舍',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29013,
    'top': 0,
    'hot': false,
    'english_hotel': 'Deer Guesthouse - Hostel',
    'image': ['/hotel_img/nailiang/29010053/1576394348854.jpeg', '/hotel_img/nailiang/29010053/1576394351025.jpeg', '/hotel_img/nailiang/29010053/1576394353071.jpeg', '/hotel_img/nailiang/29010053/1576394355262.jpeg', '/hotel_img/nailiang/29010053/1576394357379.jpeg', '/hotel_img/nailiang/29010053/1576394359449.jpeg', '/hotel_img/nailiang/29010053/1576394361690.jpeg'],
    'concerns': ['酒店位置 鹿之旅馆 - 青年旅舍地处奈良中心，距离兴福寺和奈良国立博物馆不到 15 分钟步行��程。', ' 此青年旅馆距离东大寺 1 英里（1.5 公里），距离春日神社 1.3 英里（2.2 公里）。', '客房 3 间空调客房定能让您在旅途中找到家的舒适。', '在公用厨房中做饭。', '免费无线上网可让您与朋友保持联系。', '提供备有吹风机的公共浴室。', '设施 您可到花园欣赏美景，还可利用免费无线上网和公共区电视等服务和设施。', '商务及其他服务设施 特色服务/设施包括会说多种语言的服务员、行李储存室和洗衣设施。', '。'],
    'facility': ['电梯', '餐厅', '行李寄存'],
    'address': '36 Tsubai-cho, Nara City Center',
    'latitude': 34.680845,
    'longitude': 135.828526,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 21:00',
    'leave_time': '11:00',
    'room_count': '3',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010003, 29010007, 29010009, 29010011],
  }, {
    'hotel_id': 29010054,
    'hotel': '奈良町春天家旅馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29015,
    'top': 1,
    'hot': false,
    'english_hotel': 'HARUYA Naramachi',
    'image': ['/hotel_img/nailiang/29010054/1576394366431.jpeg', '/hotel_img/nailiang/29010054/1576394368545.jpeg', '/hotel_img/nailiang/29010054/1576394370671.jpeg', '/hotel_img/nailiang/29010054/1576394372787.jpeg', '/hotel_img/nailiang/29010054/1576394374826.jpeg', '/hotel_img/nailiang/29010054/1576394376913.jpeg'],
    'concerns': ['。'],
    'facility': ['wifi服务'],
    'address': 'Minamibukurocho 31-4',
    'latitude': 34.67648,
    'longitude': 135.82645,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 21:00',
    'leave_time': '11:00',
    'room_count': '13',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010009, 29010015, 29010038, 29010043],
  }, {
    'hotel_id': 29010055,
    'hotel': '奈良宝来精细花园酒店（仅限成人）',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 0,
    'top': 0,
    'hot': false,
    'english_hotel': 'Hotel Fine Garden Nara Horai (Adult Only)',
    'introduction': '酒店的地理位置不够理想，距离市区和景点稍远。但酒店的设施和服务好，房间内按摩椅、游戏机、电影放映机一应俱全。房间非常宽敞，很舒适。',
    'image': ['/hotel_img/nailiang/29010055/1576394381864.jpeg', '/hotel_img/nailiang/29010055/1576394383951.jpeg', '/hotel_img/nailiang/29010055/1576394386064.jpeg', '/hotel_img/nailiang/29010055/1576394391466.jpeg', '/hotel_img/nailiang/29010055/1576394393504.jpeg', '/hotel_img/nailiang/29010055/1576394395689.jpeg', '/hotel_img/nailiang/29010055/1576394397731.jpeg'],
    'concerns': ['酒店并不在奈良的市中心，距离奈良公园约20分钟车程。', 'l酒店距离近铁学园前火车站10分钟的车程，距离药师寺15分钟的车程。', '酒店设施齐全，按摩椅、按摩浴缸、电影放映机一应俱全，房间宽敞。', '贴士酒店仅供成人入住。', '提供免费的wifi和停车场。', '。'],
    'facility': ['wifi服务', '免费停车场', '电梯', '吹风机'],
    'address': 'Horai 4-34-7',
    'latitude': 34.68415,
    'longitude': 135.76547,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 00:00',
    'leave_time': '12:00',
    'room_count': '52',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
  }, {
    'hotel_id': 29010056,
    'hotel': '奈良日和宾馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29013,
    'top': 0,
    'hot': false,
    'english_hotel': 'Guest House Narabiyori',
    'introduction': '一间简单的日式民宿，房间不大，但却布置的温馨舒适，老板很热情，感觉像在家一样。旅馆距离近铁奈良站只需步行7分钟，距离几大景点都可步行...',
    'image': ['/hotel_img/nailiang/29010056/1576394402513.jpeg', '/hotel_img/nailiang/29010056/1576394404613.jpeg', '/hotel_img/nailiang/29010056/1576394406682.jpeg', '/hotel_img/nailiang/29010056/1576394408755.jpeg', '/hotel_img/nailiang/29010056/1576394410796.jpeg', '/hotel_img/nailiang/29010056/1576394413079.jpeg', '/hotel_img/nailiang/29010056/1576394415119.jpeg'],
    'concerns': ['旅馆距离Kintetsu Nara火车站有7分钟步行路程，距离JR奈良火车站有15分钟步行路程。', '旅馆位于在一幢重建的传统建筑内，提供带共用淋浴的简约日式客房。', '东大寺距离旅馆有1.7公里，奈良公园距离旅馆有大约25分钟的步行路程。', '贴士休息室提供免费茶和热水，并设有免费无线网络连接。', '所有客人都必须在旅馆清洁时（10:00至16:00）离开旅馆。', '所有客房都装有空调，提供额外收费的床单。', '旅馆不提供餐饮服务。', '。'],
    'address': '奈良县奈良市菖蒲池町2-1',
    'latitude': 34.68673,
    'longitude': 135.82413,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 21:00',
    'leave_time': '10:00',
    'room_count': '4',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010006, 29010007, 29010008, 29010018],
  }, {
    'hotel_id': 29010057,
    'hotel': '腾碧瑶旅馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29013,
    'top': 0,
    'hot': false,
    'english_hotel': 'Tenpyo Ryokan',
    'introduction': '位于商区中的旅馆可谓是有着得天独厚的地理位置。距离奈良的几大景点都有着不长的步行距离。酒店宽敞的公共浴池更是一大特色。',
    'image': ['/hotel_img/nailiang/29010057/1576394419794.jpeg', '/hotel_img/nailiang/29010057/1576394421937.jpeg', '/hotel_img/nailiang/29010057/1576394424370.jpeg', '/hotel_img/nailiang/29010057/1576394426622.jpeg', '/hotel_img/nailiang/29010057/1576394428686.jpeg', '/hotel_img/nailiang/29010057/1576394430765.jpeg', '/hotel_img/nailiang/29010057/1576394432817.jpeg'],
    'concerns': ['交通便利，距离近铁奈良站2号出口有1分钟的步行路程。', '酒店位于商业街上，方便逛街购物，距离兴福寺仅300米。', '距离历史悠久的东大寺1千米路程，步行20分钟即可到达。', '贴士设有宽敞的公共浴池，开放时间为17:00至23:00。', '并且为客人提供日式浴袍。', '大堂提供带免费网络连接的电脑。', '旅馆可为想放松的客人提供按摩服务。', '餐厅供应西餐和日本套餐，亦可提供客房服务。', '。'],
    'facility': ['wifi服务', '电梯', '餐厅', '吹风机'],
    'address': '東向中町9',
    'latitude': 34.68371,
    'longitude': 135.82879,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00',
    'leave_time': '10:00',
    'room_count': '21',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010004, 29010006, 29010007, 29010008],
  }, {
    'hotel_id': 29010058,
    'hotel': '萨若萨瓦吉吉田屋酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Sarusawaike Yoshidaya',
    'image': ['/hotel_img/nailiang/29010058/1576394437506.jpeg', '/hotel_img/nailiang/29010058/1576394439606.jpeg', '/hotel_img/nailiang/29010058/1576394441662.jpeg', '/hotel_img/nailiang/29010058/1576394443749.jpeg', '/hotel_img/nailiang/29010058/1576394445783.jpeg', '/hotel_img/nailiang/29010058/1576394447899.jpeg', '/hotel_img/nailiang/29010058/1576394450013.jpeg'],
    'concerns': ['猿泽池吉田屋旅馆位于著名的奈良市中心区，地理位置便捷。', ' 酒店内设多种设施和服务，可让您尽享舒适睡眠。', ' 酒店内设的免费房内无线网络, 24小时前台, 行李存放服务, 无线网络(公共区域), 停车场等设施供您使用。', ' 客房内需品一应俱全，部分客房还配有平板电视, 免费茶水, 镜子, 拖鞋, 沙发等设施，确保舒适的入住感受。', ' 为了让游客有更很好的住宿体验，酒店提供按摩, 花园等多种休闲设施。', ' 在 猿泽池吉田屋旅馆 住宿期间，你会发现酒店内气氛温馨，服务很好，带给您宾至如归的感受。', '。'],
    'facility': ['wifi服务', '免费停车场', '电梯','餐厅'],
    'address': 'Takabatake-cho 246',
    'latitude': 34.68157,
    'longitude': 135.832,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 22:00',
    'leave_time': '10:00',
    'room_count': '27',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010003, 29010011, 29010013, 29010017],
  }, {
    'hotel_id': 29010059,
    'hotel': '簇巴克索酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29013,
    'top': 0,
    'hot': false,
    'english_hotel': 'Tsubakiso',
    'introduction': '簇巴克索酒店毗邻近铁奈良站。酒店内有美丽的小庭院，蜂蜂们可以喝着茶，坐在窗边欣赏红叶。好客的老板娘和丰盛的早餐也得到了一致好评。',
    'image': ['/hotel_img/nailiang/29010059/1576394454626.jpeg', '/hotel_img/nailiang/29010059/1576394456675.jpeg', '/hotel_img/nailiang/29010059/1576394458750.jpeg', '/hotel_img/nailiang/29010059/1576394460797.jpeg', '/hotel_img/nailiang/29010059/1576394462861.jpeg', '/hotel_img/nailiang/29010059/1576394464906.jpeg', '/hotel_img/nailiang/29010059/1576394467024.jpeg'],
    'concerns': ['簇巴克索酒店距离近铁奈良火车站仅0.5km。', '距离东大寺和奈良公园仅1.5km的路程。', '蜂蜂们可以睡在铺有日式蒲团寝具的榻榻米草编地板上。', '部分客房还可以观赏小型露台或花园的景色。', '早餐提供美味的日式冷菜和热菜，是怀石料理的风格，但需缴纳额外的费用。', '【tips】提供免费wifi，并有免费洗衣服务。', '热情好客的老板娘会为住客准备蒸气浴哦。', '酒店位于一条安静的小巷中，建议携带地图前往。', '。'],
    'facility': ['收费停车场'],
    'address': 'Tsubakii-cho 35',
    'latitude': 34.68022,
    'longitude': 135.8271,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 21:00',
    'leave_time': '10:00',
    'room_count': '9',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010007, 29010009, 29010011, 29010017],
  }, {
    'hotel_id': 29010060,
    'hotel': '江泉旅馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Ryokan Kosen',
    'introduction': '古钱日式旅馆靠近近铁奈良车站，旅馆中配套设施齐全。每间房都有专门的日式休息区，能赶走您旅途的劳累。',
    'image': ['/hotel_img/nailiang/29010060/1576395542595.jpeg', '/hotel_img/nailiang/29010060/1576395544780.jpeg', '/hotel_img/nailiang/29010060/1576395546976.jpeg', '/hotel_img/nailiang/29010060/1576395549083.jpeg', '/hotel_img/nailiang/29010060/1576395551150.jpeg', '/hotel_img/nailiang/29010060/1576395553328.jpeg', '/hotel_img/nailiang/29010060/1576395555445.jpeg'],
    'concerns': ['古钱日式旅馆距离近铁奈良车站仅0.5km路程，距离春日大社0.6km路程。', '距离奈良国立博物馆0.8km的路程。', '每间客房都配有私人浴室，酒店中还设有公共热浴池。', '提前预定并加收额外费用即可享受酒店提供的美味早餐。', '【tips】���店不提供免费wifi。', '只接受现金付款。', '。'],
    'facility': ['wifi服务', '电梯','吹风机'],
    'address': 'Takabatakecho 1125',
    'latitude': 34.68176,
    'longitude': 135.83201,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 19:00',
    'leave_time': '10:00',
    'room_count': '24',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010003, 29010011, 29010013, 29010017],
  }, {
    'hotel_id': 29010061,
    'hotel': '樱花酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29012,
    'top': 0,
    'hot': false,
    'english_hotel': 'HOTEL Mai Sakura',
    'introduction': '酒店仅供成人入住，在奈良站附近，所有客房都配有电视、游戏机等影音设备。酒店位置有点不好找，附近有便利店。',
    'image': ['/hotel_img/nailiang/29010061/1576395560181.jpeg', '/hotel_img/nailiang/29010061/1576395562275.jpeg', '/hotel_img/nailiang/29010061/1576395564349.jpeg', '/hotel_img/nailiang/29010061/1576395566562.jpeg', '/hotel_img/nailiang/29010061/1576395568616.jpeg', '/hotel_img/nailiang/29010061/1576395570677.jpeg', '/hotel_img/nailiang/29010061/1576395572758.jpeg'],
    'concerns': ['对于想要捕捉奈良城市风采的旅客来说，樱花酒店(Hotel Mai Sakura)是一个理想的选择。', '酒店地理位置优越，驾车至JR奈良站仅需400m 。', '旅客们会发现Umemori Sushi School、梅守寿司学校寿司制作体验课程（JR奈良车站店）和JR Nara Umemori Sushi School距离酒店都不远。', '酒店占尽地理之宜，不退寺、Nara Prefectural Tourist Information Center和海龙王寺离此都很近。', '客房内的所有设施都是经过精心的考虑和安排，空调在满足您入住需求的同时又能增添家的温馨感。', '服务人员会提前为您准备好电热水壶，以满足您的饮水需求。', '倘若您在忙碌的一天后想在自己的客房内放松，提供拖鞋和吹风机的客房浴室是不错的选择。', '如果旅客想在自己的房间舒适的用餐，酒店可提供客房服务。', '若是觉得酒店的餐饮无法满足您挑剔的味蕾，附近Wa Yamamura（和やま���ら）（日本料理）的季节特别怀石套餐（晚市）、Kameya（かめや）（日本料理）的大佛烧和菊水楼（本馆）（菊水楼 本館）（日本料理）的汤品或许能勾起您的食欲。', '酒店设有按摩室，确保您下榻期间愉快、惬意。', '。'],
    'facility': ['免费停车场', '电梯', '行李寄存', '热水壶', '吹风机'],
    'address': 'Sanjohonmachi 7-21',
    'latitude': 34.67728,
    'longitude': 135.81852,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '17:00 - 00:00',
    'leave_time': '11:00',
    'room_count': '24',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010000, 29010001, 29010002, 29010025],
  }, {
    'hotel_id': 29010062,
    'hotel': '兰奢待别墅',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29015,
    'top': 0,
    'hot': false,
    'english_hotel': 'Ranjatai',
    'kind': '度假村',
    'introduction': '酒店是一栋自助式别墅，可以享受榻榻米客房，店主提供免费自行车，可以骑行到附近的兴福寺、奈良公园逛逛。',
    'image': ['/hotel_img/nailiang/29010062/1576395578014.jpeg', '/hotel_img/nailiang/29010062/1576395580109.jpeg', '/hotel_img/nailiang/29010062/1576395582185.jpeg', '/hotel_img/nailiang/29010062/1576395584365.jpeg', '/hotel_img/nailiang/29010062/1576395586401.jpeg', '/hotel_img/nailiang/29010062/1576395588452.jpeg', '/hotel_img/nailiang/29010062/1576395590659.jpeg'],
    'concerns': ['Ranjatai是一栋自助式别墅，位于奈良，配有免费WiFi和空调，距离兴福寺有1公里。', '这栋自助式别墅提供毛巾和床单。', '该地区盛行自行车运动，而别墅便提供免费自行车。', '另外，Ranjatai日式别墅距离春日大社（Kasuga Taisha）和奈良公园（Nara Park）均有1.7公里，与大阪伊丹机场（Osaka Itami Airport）相距38公里��。'],
    'facility': ['wifi服务', '收费停车场', '免费瓶装水', '吹风机'],
    'address': 'Kawanokami Tsukinuke Hoppo cho 18-6',
    'latitude': 34.67404,
    'longitude': 135.83186,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 20:00',
    'leave_time': '11:00',
    'room_count': '1',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010015, 29010032, 29010035, 29010069],
  }, {
    'hotel_id': 29010063,
    'hotel': '奈良健康园广场酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29011,
    'top': 0,
    'hot': false,
    'english_hotel': 'Nara Kenko Land Plaza Hotel',
    'image': ['/hotel_img/nailiang/29010063/1576395595743.jpeg', '/hotel_img/nailiang/29010063/1576395597874.jpeg', '/hotel_img/nailiang/29010063/1576395600043.jpeg', '/hotel_img/nailiang/29010063/1576395602103.jpeg', '/hotel_img/nailiang/29010063/1576395604201.jpeg', '/hotel_img/nailiang/29010063/1576395606325.jpeg', '/hotel_img/nailiang/29010063/1576395608475.jpeg'],
    'concerns': ['酒店位置 奈良健康园广场酒店坐落于天理，距离奈良露天风吕只有 3 分钟车程，且距离额安寺也只有 6 分钟车程。', ' 此家居型酒店距离东大寺 8.7 英里（14 公里），距离法隆寺 5.4 英里（8.7 公里）。', '客房 有 79 间空调客房提供冰箱和平板电视；您定能在旅途中找到家的舒适。', '免费无线上网可让您与朋友保持联系。', '配备淋浴/盆浴组合的私人浴室提供免费洗浴用品和坐浴桶。', '便利设施包括书桌和泡茶/咖啡用具；而且每天提供客房服务。', '设施 到全方位服务的 SPA 放松一下；在这里，您可以享受按摩和身体护理。', '一定要去体验2 个 SPA 浴缸、温泉和滑水道等度假设施。', '此酒店的其他设施包括免费无线上网、游乐厅/游戏室和礼品店/报摊。', '餐饮 您可享受酒店的部分时段客房送餐服务。', '商务及其他服务设施 特色服务/设施包括免费高速有线上网、大堂免费报纸和24 小时前台服务。', '酒店免费提供火车站接车服务，此外还提供免费自助停车。', '。'],
    'facility': ['免费wifi', '行李寄存'],
    'address': '600-1 KABATA-CHO',
    'latitude': 34.592286,
    'longitude': 135.796006,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 22:00',
    'leave_time': '10:00',
    'room_count': '79',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
  }, {
    'hotel_id': 29010064,
    'hotel': '叶风泰梦饭店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 0,
    'top': 0,
    'hot': false,
    'english_hotel': 'Hotel Half Time',
    'introduction': '酒店的地理位置非常好，距离奈良的两个火车站都非常方便，初次前来不熟悉奈良的人推荐这里。房间有些小，但干净整洁。服务人员的态度好。',
    'image': ['/hotel_img/nailiang/29010064/1576395613196.jpeg', '/hotel_img/nailiang/29010064/1576395615299.jpeg', '/hotel_img/nailiang/29010064/1576395617411.jpeg', '/hotel_img/nailiang/29010064/1576395619576.jpeg', '/hotel_img/nailiang/29010064/1576395621626.jpeg', '/hotel_img/nailiang/29010064/1576395623672.jpeg', '/hotel_img/nailiang/29010064/1576395625799.jpeg'],
    'concerns': ['酒店的住处距离Kintetsu Shinomiya火车站仅有3分钟的步行路程。', '酒店距离Hokkeiji寺庙有5分钟的步行路程，距离Todaiji寺庙有10分钟的车程。', '贴士酒店为所有客人提供日本浴衣以作为睡衣使用。', ' 酒店为客人提供一个保险箱以储存个人物品，亦提供复印和干洗服务。', '。'],
    'facility': ['wifi服务', '电梯', '餐厅', '吹风机'],
    'address': 'Shibatsuji-cho 2-11-6',
    'latitude': 34.686,
    'longitude': 135.81219,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00',
    'leave_time': '11:00',
    'room_count': '75',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010049, 29010065, 29010000, 29010002],
  }, {
    'hotel_id': 29010065,
    'hotel': '它卡门酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 0,
    'top': 0,
    'hot': false,
    'english_hotel': 'Takamado',
    'introduction': '酒店在细节上的处理很细心，老板管理的非常好，热情亲切。酒店步行到近铁站只需要十分钟，很便利，周围还有佐保川樱花园，可以赏樱。',
    'image': ['/hotel_img/nailiang/29010065/1576395630593.jpeg', '/hotel_img/nailiang/29010065/1576395632730.jpeg', '/hotel_img/nailiang/29010065/1576395634857.jpeg', '/hotel_img/nailiang/29010065/1576395637292.jpeg', '/hotel_img/nailiang/29010065/1576395639403.jpeg', '/hotel_img/nailiang/29010065/1576395641582.jpeg', '/hotel_img/nailiang/29010065/1576395644026.jpeg'],
    'concerns': ['酒店距离近铁四之宫站仅需步行3分钟。', '店距离东大寺有10分钟车程，距离兴福寺有8分钟车程。', '客房都铺有地毯地板，并配有办公桌、冰箱以及带绿茶的电热水壶。', '贴士酒店为所有客人提供日本浴衣。', '餐厅每天供应西式早餐。', '酒店提供投币式洗衣机和复印服务。', '自动售货机供应饮料。', '。'],
    'facility': ['电梯', '餐厅', '行李寄存', '热水壶', '吹风机'],
    'address': 'Omiya-cho 6-5-3',
    'latitude': 34.68534,
    'longitude': 135.80814,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '14:00',
    'leave_time': '11:00',
    'room_count': '34',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010034, 29010049, 29010064, 29010000],
  }, {
    'hotel_id': 29010066,
    'hotel': '白凤旅馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29013,
    'top': 0,
    'hot': false,
    'english_hotel': 'Ryokan Hakuhou',
    'image': ['/hotel_img/nailiang/29010066/1576395652898.jpeg', '/hotel_img/nailiang/29010066/1576395655240.jpeg', '/hotel_img/nailiang/29010066/1576395657455.jpeg', '/hotel_img/nailiang/29010066/1576395659637.jpeg', '/hotel_img/nailiang/29010066/1576395661946.jpeg', '/hotel_img/nailiang/29010066/1576395664241.jpeg', '/hotel_img/nailiang/29010066/1576395666485.jpeg'],
    'concerns': ['酒店位置 住在奈良的白凤旅馆，您将可以方便地前往兴福寺和东大寺。', ' 该日式旅馆紧邻元兴寺及奈良县文化会馆。', '客房 酒店的 20 间客房定能让您在旅途中找到家的舒适。', '休闲、SPA、高端服务设施 您可利用免费无线上网、大堂电视和旅游/票务服务等便利服务和设施。', '商务及其他服务设施 特色服务/设施包括大堂免费报纸和洗衣设施。', '。'],
    'facility': ['行李寄存'],
    'address': '4-1 KamiSanjocho Nara Nara-ken 630-8228 日本',
    'latitude': 34.681978,
    'longitude': 135.826385,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 23:00',
    'leave_time': '10:00',
    'room_count': '20',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010006, 29010007, 29010008, 29010009],
  }, {
    'hotel_id': 29010067,
    'hotel': '飞鸟路康乐饭店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Hotel Wellness Asukaji',
    'kind': '度假村',
    'introduction': '酒店坐落于奈良市中心的中心地带，距离拥有众多文物古迹的奈良公园仅百米之遥。酒店的观景台可欣赏到附近美丽的景色。',
    'image': ['/hotel_img/nailiang/29010067/1576395674784.jpeg', '/hotel_img/nailiang/29010067/1576395677989.jpeg', '/hotel_img/nailiang/29010067/1576395680464.jpeg', '/hotel_img/nailiang/29010067/1576395682880.jpeg', '/hotel_img/nailiang/29010067/1576395685170.jpeg', '/hotel_img/nailiang/29010067/1576395687357.jpeg', '/hotel_img/nailiang/29010067/1576395689753.jpeg'],
    'concerns': ['位于奈良市中心地带，信药师寺、奈良国家博物馆、雁后寺等景点都近在咫尺。', '从酒店出发步行几百米就可以到达奈良公园。', '酒店楼顶设有观景台，可以眺望到附近的文物遗产。', '【tips】提供免费wifi和免费的停车场。', '餐厅提供早餐和晚餐，包括当地特色菜，并提供素食菜谱。', '。'],
    'facility': ['wifi服务', '收费停车场', '餐厅', '吹风机'],
    'address': 'Takabatake-cho 778-1',
    'latitude': 34.67737,
    'longitude': 135.83952,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 22:00',
    'leave_time': '10:00',
    'room_count': '22',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010032, 29010079, 29010003, 29010005],
  }, {
    'hotel_id': 29010068,
    'hotel': '卡宜莫奥雅酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29011,
    'top': 1,
    'hot': false,
    'english_hotel': 'Kakimotoya Ryokan',
    'introduction': '酒店在信贵山附近，是一栋传统建筑，有公共浴池和时令菜肴。蜂蜂们在房间就能享有周围森林和山区的宜人景色。部分客房还配有私人温泉浴缸。',
    'image': ['/hotel_img/nailiang/29010068/1576395698811.jpeg', '/hotel_img/nailiang/29010068/1576395701248.jpeg', '/hotel_img/nailiang/29010068/1576395703717.jpeg', '/hotel_img/nailiang/29010068/1576395705786.jpeg', '/hotel_img/nailiang/29010068/1576395707880.jpeg', '/hotel_img/nailiang/29010068/1576395709951.jpeg', '/hotel_img/nailiang/29010068/1576395712070.jpeg'],
    'concerns': ['kakimotoya酒店位于信贵山附近，距离JR王子火车站有10分钟车程，是一家有着传统建筑风格的酒店。', '酒店提供按摩，蜂蜂们还可以到礼品店逛逛。', '私人用餐区提供日式套餐的午餐和晚餐。', '【tips】部分客房有配套私人温泉浴缸。', '打开窗户可以看到周围森林和山区的美丽景色。', '提供行李寄放服务，还设有免费停车场。', '。'],
    'facility': ['wifi服务', '免费停车场', '电梯', '餐厅'],
    'address': '奈良県生駒郡三郷町信貴山東5－8',
    'latitude': 34.60686,
    'longitude': 135.67591,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 19:00',
    'leave_time': '10:00',
    'room_count': '11',
    'nearby_place': [],
    'nearby_hotel': [29010026],
  }, {
    'hotel_id': 29010069,
    'hotel': '琥珀旅舍',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29015,
    'top': 0,
    'hot': false,
    'english_hotel': 'Guesthouse Kohaku',
    'introduction': '旅舍位于奈良中心，是一家仅能容纳9名住客的小小的旅馆，店主很热爱传统文化，乐于向客人介绍奈良的魅力。',
    'image': ['/hotel_img/nailiang/29010069/1576395717048.jpeg', '/hotel_img/nailiang/29010069/1576395719249.jpeg', '/hotel_img/nailiang/29010069/1576395721535.jpeg', '/hotel_img/nailiang/29010069/1576395724068.jpeg', '/hotel_img/nailiang/29010069/1576395726555.jpeg', '/hotel_img/nailiang/29010069/1576395729021.jpeg', '/hotel_img/nailiang/29010069/1576395731091.jpeg'],
    'concerns': ['Guesthouse Kohaku旅舍坐落在历史悠久的Naramachi区中心，所有的传统住宅均可追溯至17世纪。', '这家迷人的旅舍提供私人及宿舍式客房和供客人享用茶或咖啡的舒适休息区。', 'Kohaku Guesthouse旅舍设有覆盖各处的免费无线网络，客人可在08:00至22:00期间使用自助式共用厨房。', '旅舍提供传统活动，如可应要求提供佛经转录，但需额外收费。', '所有客房均设有空调和衣架。', '宿舍间设有私人储物柜、带阅读灯的双层床和电子插座。', '私人客房铺有榻榻米（草编）地板。', '旅舍为所有客房提供共用浴室和共用卫生间。', '旅舍距离JR Kyobate站、JR Nara站和Kintetsunara站有不到15分钟的步行路程，距离Naramachi Museum博物馆和元​​兴寺（Gango-ji Temple）有不到6分钟的步行路程，距离大阪（Osaka）有70分钟的火车车程。', '。'],
    'facility': ['吹风机'],
    'address': 'Narukawacho 10',
    'latitude': 34.6761,
    'longitude': 135.82909,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 21:00',
    'leave_time': '10:00',
    'room_count': '7',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010015, 29010035, 29010038, 29010042],
  }, {
    'hotel_id': 29010070,
    'hotel': '奈良诺波里基酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29013,
    'top': 0,
    'hot': false,
    'english_hotel': 'Noborioji Hotel Nara',
    'introduction': '诺波里基酒店是东大寺附近的一处豪华酒店，酒吧、休闲吧、健身房一应俱全。酒店内提供的法式和美式料理更是你不容错过的美食体验。',
    'image': ['/hotel_img/nailiang/29010070/1576395735768.jpeg', '/hotel_img/nailiang/29010070/1576395737874.jpeg', '/hotel_img/nailiang/29010070/1576395739979.jpeg', '/hotel_img/nailiang/29010070/1576395742129.jpeg', '/hotel_img/nailiang/29010070/1576395744167.jpeg', '/hotel_img/nailiang/29010070/1576395746284.jpeg', '/hotel_img/nailiang/29010070/1576395748487.jpeg'],
    'concerns': ['拥有现代化装修的诺波里基酒店位于奈良车站附近。', '距离东大寺和奈良公园只有1.2km，距离春日大社也只有2km。', '你可以在酒店内享用地道法国美食，还可以预约香料按摩来缓解旅途的疲惫。', '每间客房都包括���个迷你吧，窝在舒适的沙发上看看电影或是听听歌是不错的选择。', '酒店中有酒吧和健身房。', '【tips】酒店提供免费的wifi和睡衣、浴袍。', '若您有需要，酒店可以提供门童服务。', '入住时需要您穿着休闲优雅的服饰，凉鞋和短裤是禁止入内的，夹克衫是男士的优选。', '。'],
    'facility': ['wifi服务', '免费停车场', '电梯', '餐厅', '免费瓶装水', '吹风机'],
    'address': 'Noborioji-cho 40-1',
    'latitude': 34.68415,
    'longitude': 135.83004,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 20:00',
    'leave_time': '12:00',
    'room_count': '14',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010004, 29010006, 29010007, 29010011],
  }, {
    'hotel_id': 29010071,
    'hotel': '阿罗拉蛮酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 0,
    'top': 0,
    'hot': false,
    'english_hotel': 'Hotel Allamanda',
    'kind': '度假村',
    'introduction': '酒店在法华寺附近，部分客房设有户外的温泉浴缸，典雅舒适。酒店的咖啡厅、酒吧是木质天花板，很有格调。蜂蜂们可以在酒店附近体验徒步旅行。',
    'image': ['/hotel_img/nailiang/29010071/1576395753178.jpeg', '/hotel_img/nailiang/29010071/1576395755286.jpeg', '/hotel_img/nailiang/29010071/1576395757306.jpeg', '/hotel_img/nailiang/29010071/1576395759331.jpeg', '/hotel_img/nailiang/29010071/1576395761449.jpeg', '/hotel_img/nailiang/29010071/1576395763468.jpeg', '/hotel_img/nailiang/29010071/1576395765704.jpeg'],
    'concerns': ['阿罗拉蛮酒店是一家在口碑的奈良酒店，不管是深度游还是一日游，这家酒店都会是您的理想之选。', ' 酒店内设多种设施和服务，可让您尽受舒适与酣睡。', ' 秉承“顾客至上”的服务理念，阿罗拉蛮酒店的工作人员将为您提供体贴入微的服务。', ' 客房装饰精美，部分还内设 平板电视, 衣架, 免费茶水, 按摩浴缸, 空调等。', ' 酒店内设多种娱乐设施。', ' 阿罗拉蛮酒店地理位置便捷，内部装饰令人倍感舒适，是游览奈良时的理想住宿选择。', '。'],
    'facility': ['wifi服务', '免费瓶装水', '吹风机'],
    'address': 'Hokkeji 1857-3',
    'latitude': 34.69934,
    'longitude': 135.80951,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 00:00',
    'leave_time': '11:00',
    'room_count': '13',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010034, 29010049, 29010064, 29010065],
  }, {
    'hotel_id': 29010072,
    'hotel': '赛吉仙观光酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29011,
    'top': 0,
    'hot': false,
    'english_hotel': 'Shigisan Kanko Hotel',
    'kind': '度假村',
    'introduction': '酒店周边环绕着郁郁葱葱的绿树，环境清幽；在酒店内的天然温泉水疗中心可以尽情放松身心，享受大自然景色。其他服务还有放松按摩和美容护理。',
    'image': ['/hotel_img/nailiang/29010072/1576395770593.jpeg', '/hotel_img/nailiang/29010072/1576395773547.jpeg', '/hotel_img/nailiang/29010072/1576395775574.jpeg', '/hotel_img/nailiang/29010072/1576395777660.jpeg', '/hotel_img/nailiang/29010072/1576395779695.jpeg', '/hotel_img/nailiang/29010072/1576395781772.jpeg', '/hotel_img/nailiang/29010072/1576395783800.jpeg'],
    'concerns': ['酒店位于绿树环绕的小山���，设有天然温泉spa。', '这里不仅有纪念品小铺、咖啡馆、各种娱乐设施，更有冰淇淋和饮料的自动售货机，满足蜂蜂们的各种需要。', '提供日式和西式两种客房。', '贴士温泉浴场有室内和室外两种哦。', '酒店提供美味的早餐和晚餐，用餐地点有所不同。', '酒店的咖啡馆中有舒适的沙发，更有卡拉OK设施。', '。'],
    'facility': ['wifi服务', '免费停车场', '电梯', '餐厅'],
    'address': 'Shigisan Nishi 2-40',
    'latitude': 34.60701,
    'longitude': 135.669,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 19:00',
    'leave_time': '10:00',
    'room_count': '44',
    'nearby_place': [],
    'nearby_hotel': [29010026, 29010068],
  }, {
    'hotel_id': 29010073,
    'hotel': '奈良公园酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 0,
    'top': 0,
    'hot': false,
    'english_hotel': 'Nara Park Hotel',
    'image': ['/hotel_img/nailiang/29010073/1576395788351.jpeg', '/hotel_img/nailiang/29010073/1576395790380.jpeg', '/hotel_img/nailiang/29010073/1576395792504.jpeg', '/hotel_img/nailiang/29010073/1576395794545.jpeg', '/hotel_img/nailiang/29010073/1576395796657.jpeg', '/hotel_img/nailiang/29010073/1576395798732.jpeg', '/hotel_img/nailiang/29010073/1576395800875.jpeg'],
    'concerns': ['奈良公园酒店是一家2.5星级酒店，可让您的 奈良之行变得更很好。', ' 酒店为顾客配备了一系列的设施和服务，旨在让各位住客能够享受更多舒适与便捷。', ' 享受酒店内设的汽车充电站, 每日客房清洁服务, 纪念品商店, 行李存放服务, 无线网络(公共区域)等设施。', ' 客房设计舒适，装饰优雅，此外还配备了众多便捷设施，部分客房还配有平板电视, 衣架, 免费茶水, 床单, 镜子等。', ' 酒店环境宁静，还设有温泉 , 卡拉OK等休闲设施。', ' 在 奈良公园酒店 住宿期间，你会发现酒店内气氛温馨，服务很好，带给您宾至如归的感受。', '。'],
    'facility': ['wifi服务', '免费停车场', '电梯', '餐厅', '吹风机'],
    'address': 'Horai 4-18-1',
    'latitude': 34.68319,
    'longitude': 135.77093,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 18:00',
    'leave_time': '10:00',
    'room_count': '20',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010055],
  }, {
    'hotel_id': 29010074,
    'hotel': '田丸欢呼日式旅馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Kanko Hotel Tamaru',
    'image': ['/hotel_img/nailiang/29010074/1576395805821.jpeg', '/hotel_img/nailiang/29010074/1576395808247.jpeg', '/hotel_img/nailiang/29010074/1576395810312.jpeg', '/hotel_img/nailiang/29010074/1576395812601.jpeg', '/hotel_img/nailiang/29010074/1576395814675.jpeg', '/hotel_img/nailiang/29010074/1576395816729.jpeg', '/hotel_img/nailiang/29010074/1576395818779.jpeg'],
    'concerns': ['Tamaru观光酒店位于著名的奈良市中心区，地理位置便捷。', ' 酒店设施一应俱全，可让您的住宿体验变得回味无穷。', ' 免费房内无线网络, 停车场, 报纸, 自动售卖机等设施都已配备，可供住客使用。', ' 部分客房内设 平板电视, ��调, 暖气, 电话, 电视等设施，加上设计装饰温馨舒适，定能带给住客宾至如归的感受。', ' 使用按摩浴缸, 按摩等休闲设施，还可让您迅速恢复体力，精神焕发。', ' 下榻Tamaru观光酒店，可方便您前往奈良 各区。', '。'],
    'facility': ['wifi服务', '收费停车场', '吹风机'],
    'address': '押上町41番地',
    'latitude': 34.68844,
    'longitude': 135.83452,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 18:00',
    'leave_time': '10:00',
    'room_count': '26',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010004, 29010012, 29010021, 29010006],
  }, {
    'hotel_id': 29010075,
    'hotel': '北町春天旅馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Guesthouse Haru Kitamachi',
    'image': ['/hotel_img/nailiang/29010075/1576395823258.jpeg', '/hotel_img/nailiang/29010075/1576395825311.jpeg', '/hotel_img/nailiang/29010075/1576395827368.jpeg', '/hotel_img/nailiang/29010075/1576395829404.jpeg', '/hotel_img/nailiang/29010075/1576395831438.jpeg', '/hotel_img/nailiang/29010075/1576395833711.jpeg', '/hotel_img/nailiang/29010075/1576395835935.jpeg'],
    'concerns': ['位于奈良市中心，春・北町民宿是游览奈良时的很好住宿选择。', ' 酒店内设施齐全，可为住客提供舒适的住宿条件。', ' 自助洗衣设施, 每日客房清洁服务, 邮政服务, 无线网络(公共区域), 洗衣服务等设施都已配备，可供住客使用。', ' 客房装饰精美，部分还内设 衣架, 床单, 拖鞋, 无线上网, 无线上网(免费)等。', ' 酒店内设多种娱乐设施。', ' 下榻春・北町民宿，可方便您前往奈良 各区。', '。'],
    'address': 'Zoshicho 1-2',
    'latitude': 34.69399,
    'longitude': 135.83574,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 22:00',
    'leave_time': '09:00',
    'room_count': '3',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010004, 29010012, 29010006, 29010021],
  }, {
    'hotel_id': 29010076,
    'hotel': '简保之宿-奈良',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 0,
    'top': 0,
    'hot': false,
    'english_hotel': 'Kanpo no Yado Nara',
    'image': ['/hotel_img/nailiang/29010076/1576396281155.jpeg', '/hotel_img/nailiang/29010076/1576396283235.jpeg', '/hotel_img/nailiang/29010076/1576396285261.jpeg', '/hotel_img/nailiang/29010076/1576396287289.jpeg', '/hotel_img/nailiang/29010076/1576396289382.jpeg', '/hotel_img/nailiang/29010076/1576396291609.jpeg', '/hotel_img/nailiang/29010076/1576396293883.jpeg'],
    'concerns': ['位于奈良市中心，Kanpo no Yado Nara是游览奈良的很好住宿选择。', ' 酒店拥有高品质的服务以及完善的设施，以求满足住客们的各类需求。', ' 在酒店内，您会发现内设24小时安保, 出租车服务, 每日客房清洁服务, 无障碍通道, 纪念品商店等设施。', ' 客房舒适温馨，部分客房内设平板电视, 衣架, 免费茶水, 加湿器, 床单等设施。', ' 住客可享受酒店住宿内的温泉 , 卡拉OK等休闲设施。', ' 不论您出行奈良的原因为何，Kanpo no Yado Nara都可让您感受到家的温馨与舒适。', '。'],
    'facility': ['wifi服务', '免费停车场', '电梯', '餐厅', '吹风机'],
    'address': '3-9-1 Nijocho,Nara,Japan',
    'latitude': 34.68836,
    'longitude': 135.78805,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00',
    'leave_time': '10:00',
    'room_count': '42',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010045, 29010034, 29010065],
  }, {
    'hotel_id': 29010077,
    'hotel': '罗科情趣酒店(仅限成人)',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 0,
    'top': 0,
    'hot': false,
    'english_hotel': 'Hotel Rocco (Adult Only)',
    'image': ['/hotel_img/nailiang/29010077/1576396298606.jpeg', '/hotel_img/nailiang/29010077/1576396300627.jpeg', '/hotel_img/nailiang/29010077/1576396302760.jpeg', '/hotel_img/nailiang/29010077/1576396304791.jpeg', '/hotel_img/nailiang/29010077/1576396306977.jpeg', '/hotel_img/nailiang/29010077/1576396309005.jpeg', '/hotel_img/nailiang/29010077/1576396311047.jpeg'],
    'concerns': ['奈良ROCCO酒店-限大人是商务人士和观光游客前往奈良的理想下榻之处。', ' 酒店想您所想，能为您提供住宿期间的一切需品。', ' 酒店内设施繁多，24小时送餐服务, 24小时安保, 每日客房清洁服务, 停车场, 送餐服务等都已配备。', ' 客房舒适温馨，部分客房内设加湿器, 免费茶水, 毛巾, 衣架, 体重秤等设施。', ' 酒店内设多种娱乐设施。', ' 在 奈良ROCCO酒店-限大人 住宿期间，你会发现酒店内气氛温馨，服务很好，带给您宾至如归的感受。', '。'],
    'facility': ['免费停车场', '电梯', '热水壶', '吹风机'],
    'address': '1117, Hourai-Cho, Nara-City',
    'latitude': 34.6849253,
    'longitude': 135.7643136,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 22:00',
    'leave_time': '12:00',
    'room_count': '27',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010055],
  }, {
    'hotel_id': 29010078,
    'hotel': '春日野丽加列酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 0,
    'top': 0,
    'hot': false,
    'english_hotel': 'Hotel Ligare Kasugano',
    'image': ['/hotel_img/nailiang/29010078/1576396319629.png', '/hotel_img/nailiang/29010078/1576396321784.png', '/hotel_img/nailiang/29010078/1576396323866.png', '/hotel_img/nailiang/29010078/1576396326050.png', '/hotel_img/nailiang/29010078/1576396328147.jpeg', '/hotel_img/nailiang/29010078/1576396330227.jpeg', '/hotel_img/nailiang/29010078/1576396332382.png'],
    'concerns': ['春日野丽加列酒店位于著名的奈良市中心区，地理位置便捷。', ' 酒店拥有高品质的服务以及完善的设施，可满足游客们的所有需求。', ' 住客们可随意使用神殿, 每日客房清洁服务, 纪念品商店, 自助洗衣设施, 行李存放服务等设施。', ' 客房舒适温馨，部分客房内设地毯, 毛巾, 衣架, 拖鞋, 平板电视等设施。', ' 酒店内设多种娱乐设施。', ' 在 春日野丽加列酒店 住宿期间，你会发现酒店内气氛温馨，服务很好，带给您宾至如归的感受。', '。'],
    'facility': ['wifi服务', '免费停车场', '电梯', '餐厅', '吹风机'],
    'address': '757-2 Horencho',
    'latitude': 34.69208,
    'longitude': 135.82191,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00',
    'leave_time': '10:00',
    'room_count': '29',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010000, 29010006, 29010008, 29010002],
  }, {
    'hotel_id': 29010079,
    'hotel': '奈良麻吉餐厅青年旅馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Naramachi Hostel & Restaurant',
    'image': ['/hotel_img/nailiang/29010079/1576396337031.jpeg', '/hotel_img/nailiang/29010079/1576396339584.jpeg', '/hotel_img/nailiang/29010079/1576396341869.jpeg', '/hotel_img/nailiang/29010079/1576396343998.jpeg', '/hotel_img/nailiang/29010079/1576396346085.jpeg', '/hotel_img/nailiang/29010079/1576396348141.jpeg', '/hotel_img/nailiang/29010079/1576396350298.jpeg'],
    'concerns': ['Naramachi餐厅青年旅馆位于著名的旅游观光区——奈良市中心，可让您的旅程变得更加舒适和便捷。', ' 酒店想您所想，能为您提供住宿期间的一切需品。', ' 秉承“顾客至上”的服务理念，Naramachi餐厅青年旅馆的工作人员将为您提供体贴入微的服务。', ' 客房装饰精美，部分还内设 储物柜, 木地板, 衣架, 独立客厅, 沙发等。', ' 在享受客房内的舒适之余，住客还可尽情使用酒店内的休闲设施，其中包括花园等。', ' 热情友好的工作人员、完善的设施、优越的地理位置、便于游客前往奈良的各大景点，这些都是众多游客选择Naramachi餐厅青年旅馆的原因。', '。'],
    'facility': ['wifi服务', '收费停车场', '餐厅', '行李寄存', '热水壶'],
    'address': '939-1, Takabatakecho',
    'latitude': 34.67707,
    'longitude': 135.83767,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 23:00',
    'leave_time': '11:00',
    'room_count': '9',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010003, 29010032, 29010067, 29010013],
  }, {
    'hotel_id': 29010080,
    'hotel': '100%棉住宿加早餐旅馆',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Cotton 100%',
    'image': ['/hotel_img/nailiang/29010080/1576396354855.jpeg', '/hotel_img/nailiang/29010080/1576396356909.jpeg', '/hotel_img/nailiang/29010080/1576396359908.jpeg', '/hotel_img/nailiang/29010080/1576396362175.jpeg', '/hotel_img/nailiang/29010080/1576396364415.jpeg', '/hotel_img/nailiang/29010080/1576396366807.jpeg', '/hotel_img/nailiang/29010080/1576396368850.jpeg'],
    'concerns': ['位于奈良市中心，100%纯棉民宿是游览奈良时的很好住宿选择。', ' 完善的设施，精美的装饰，这些都可让您在住宿期间感受到更多愉悦。', ' 一切生活需品，例如行李存放服务, 无线网络(公共区域), 自动售卖机, 吸烟区等都已为您准备就绪。', ' 客房内饰优雅，便捷设施齐全。', ' 酒店内设多种娱乐设施。', ' 100%纯棉民宿可满足您的一切需要，酒店员工可为您提供专业的服务。', '。'],
    'facility': ['wifi服务', '吹风机'],
    'address': 'Takabatakecho 1122-21',
    'latitude': 34.68138,
    'longitude': 135.83267,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 22:30',
    'leave_time': '10:00',
    'room_count': '12',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010003, 29010011, 29010013, 29010017],
  }, {
    'hotel_id': 29010081,
    'hotel': '四季亭',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'SHIKITEI',
    'image': ['/hotel_img/nailiang/29010081/1576396373414.jpeg', '/hotel_img/nailiang/29010081/1576396375467.jpeg', '/hotel_img/nailiang/29010081/1576396377515.jpeg', '/hotel_img/nailiang/29010081/1576396379620.jpeg', '/hotel_img/nailiang/29010081/1576396381718.jpeg', '/hotel_img/nailiang/29010081/1576396383812.jpeg', '/hotel_img/nailiang/29010081/1576396385879.jpeg'],
    'concerns': ['酒店位置 四季亭酒店位于奈良，距离奈良国立博物馆和兴福寺不到 5 分钟步行路程。', ' 此日式旅馆距离东大寺 0.7 英里（1.2 公里），距离奈良公园 0.7 英里（1.2 公里）。', '客房 有 9 间空调客房提供冰箱和平板电视；您定能在旅途中找到家的舒适。', '免费无线上网让您与朋友保持联系；卫星节目可满足您的娱乐需求。', '浴室提供独立的浴缸和淋浴和免费洗浴用品。', '商务及其他服务设施 特色服务/设施包括行李储存室和前台保管箱。', '酒店提供免费自助停车。', '。'],
    'facility': ['wifi服务', '免费停车场'],
    'address': 'Takabatakecho 1163',
    'latitude': 34.68134,
    'longitude': 135.83514,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 19:00',
    'leave_time': '11:00',
    'room_count': '9',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010003, 29010013, 29010017, 29010032],
  }, {
    'hotel_id': 29010082,
    'hotel': '奈良平城百夫长青年旅舍',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 0,
    'top': 0,
    'hot': false,
    'english_hotel': 'Centurion Hostel Nara Heijokyo',
    'image': ['/hotel_img/nailiang/29010082/1576396390405.jpeg', '/hotel_img/nailiang/29010082/1576396392696.jpeg', '/hotel_img/nailiang/29010082/1576396394824.jpeg', '/hotel_img/nailiang/29010082/1576396396877.jpeg', '/hotel_img/nailiang/29010082/1576396398991.jpeg', '/hotel_img/nailiang/29010082/1576396401105.jpeg', '/hotel_img/nailiang/29010082/1576396403637.jpeg'],
    'concerns': ['奈良平城京百夫长青年旅舍是一家2星级住宿，可让您的 奈良之行舒适无忧。', ' 住宿为顾客配备了一系列的设施和服务，旨在让各位住客能够享受更多舒适与便捷。', ' 住宿内设免费房内WiFi, 每日客房清洁服务, 自助洗衣设施, 24小时前台, 行李存放服务等设施供您使用。', ' 客房舒适温馨，部分客房内设WiFi上网, WiFi上网(免费), 吸烟政策 - 禁烟, 空调, 暖气等设施。', ' 住宿内设多种休闲娱乐设施。', ' 奈良平城京百夫长青年旅舍位置便利且舒适，是游览奈良时的理想住宿选择。', '。'],
    'brand': '百夫长',
    'facility': ['wifi服务', '收费停车场', '电梯'],
    'address': '7F 1-3-1 Nijoojiminami',
    'latitude': 34.68515,
    'longitude': 135.80217,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 23:00',
    'leave_time': '11:00',
    'room_count': '45',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010034, 29010045, 29010065, 29010049],
  }, {
    'hotel_id': 29010083,
    'hotel': 'JR奈良站三条街超级酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29012,
    'top': 0,
    'hot': false,
    'english_hotel': 'Super Hotel Jr Nara Station Sanjo Street',
    'image': ['/hotel_img/nailiang/29010083/1576396408183.jpeg', '/hotel_img/nailiang/29010083/1576396410723.jpeg', '/hotel_img/nailiang/29010083/1576396412803.jpeg', '/hotel_img/nailiang/29010083/1576396414962.jpeg', '/hotel_img/nailiang/29010083/1576396417047.jpeg', '/hotel_img/nailiang/29010083/1576396419180.jpeg', '/hotel_img/nailiang/29010083/1576396421272.jpeg'],
    'concerns': ['JR奈良站前三条通超级酒店位于著名的旅游观光区——奈良，让您的旅程变得更加轻松愉悦。', ' 住宿内设施齐全，可为住客提供舒适的入住体验。', ' 住宿内设施齐全，包括24小时安保, 每日客房清洁服务, 自助洗衣设施, 出租车服务, 行李存放服务等。', ' 部分客房内设 毛巾, 衣架, 体重秤, 拖鞋, 平板电视等设施，加上温馨舒适的设计装饰，定能带给住客宾至如归的感受。', ' 住宿内设多种休闲娱乐设施。', ' JR奈良站前三条通超级酒店的工作人员专业友善，将尽力满足您各方面的需求。', '。'],
    'brand': 'Super hotel',
    'facility': ['wifi服务', '电梯'],
    'address': '500-1, Sanjo-Cho',
    'latitude': 34.6817012,
    'longitude': 135.8207405,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 00:00',
    'leave_time': '10:00',
    'room_count': '98',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010000, 29010001, 29010002, 29010007],
  }, {
    'hotel_id': 29010084,
    'hotel': '奈良格兰维罗酒店 - 和仓',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29011,
    'top': 0,
    'hot': false,
    'english_hotel': 'Grandvriohotel Nara -Wakura',
    'image': ['/hotel_img/nailiang/29010084/1576396527598.jpeg', '/hotel_img/nailiang/29010084/1576396530022.jpeg', '/hotel_img/nailiang/29010084/1576396532221.jpeg', '/hotel_img/nailiang/29010084/1576396534272.jpeg', '/hotel_img/nailiang/29010084/1576396536381.jpeg', '/hotel_img/nailiang/29010084/1576396538442.jpeg', '/hotel_img/nailiang/29010084/1576396540769.png'],
    'concerns': ['2018-10-01开业，相信奈良格兰维罗酒店 - 和仓(Grandvriohotel Nara -Wakura-)周到的服务和一流的设施，会让您在奈良开展一段难忘的旅行。', '从酒店出发，至JR天理站仅有3km远。', '到Nara Kenko Land仅需步行很短距离。', '去著名景点額安寺和Tenri University，您只需搭乘出租车很方便到达。', '酒店为您在客房内配备了房内保险箱、液晶电视机和衣柜/衣橱，所有入住的客人均可便捷的使用。', '有饮水需求的旅客，酒店还为您提供了电热水壶和咖啡壶/茶壶。', '浴室内提供拖鞋、24小时热水和浴缸，让您感受到宾至如归的享受。', '酒店提供西餐厅，以诱人的美食佳肴来满足客人。', '如果您喜欢安静的用餐，酒店可以提供房间送餐服务。', '酒店休闲区提供了各���设施，您可以在这里舒缓身心压力。', '酒店为所有入住客人提供免费停车场。', '。'],
    'facility': ['wifi服务', '收费停车场', '电梯', '餐厅', '吹风机'],
    'address': '430-1 Nikaidokaminoshocho',
    'latitude': 34.596522,
    'longitude': 135.796487,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00',
    'leave_time': '10:00',
    'room_count': '202',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
  }, {
    'hotel_id': 29010085,
    'hotel': '奈良町旅舍',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Setre Naramachi',
    'image': ['/hotel_img/nailiang/29010085/1576396545817.jpeg', '/hotel_img/nailiang/29010085/1576396547896.jpeg', '/hotel_img/nailiang/29010085/1576396549978.jpeg', '/hotel_img/nailiang/29010085/1576396552109.jpeg', '/hotel_img/nailiang/29010085/1576396554217.jpeg', '/hotel_img/nailiang/29010085/1576396556308.jpeg', '/hotel_img/nailiang/29010085/1576396558523.jpeg'],
    'concerns': ['不论是商务还是休闲旅客，奈良町旅舍(Setre Naramachi)都能让您的奈良之行变得更加美好而难忘。', '旅客们会发现猿泽池、兴福寺和Kofukuji Temple National Treasure Museum距离酒店都不远。', '优美的环境，再搭配上细致周到的服务，酒店的休闲区定能满足您的品质需求。', '。'],
    'facility': ['wifi服务', '电梯', '行李寄存', '吹风机'],
    'address': '1118 Takabatakecho',
    'latitude': 34.681056,
    'longitude': 135.832395,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 22:00',
    'leave_time': '11:00',
    'room_count': '32',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010003, 29010011, 29010013, 29010017],
  }, {
    'hotel_id': 29010086,
    'hotel': '奈良基地酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29012,
    'top': 0,
    'hot': false,
    'english_hotel': 'Hotel Base Nara',
    'image': ['/hotel_img/nailiang/29010086/1576396563444.jpeg', '/hotel_img/nailiang/29010086/1576396565526.jpeg', '/hotel_img/nailiang/29010086/1576396567573.jpeg', '/hotel_img/nailiang/29010086/1576396569677.jpeg', '/hotel_img/nailiang/29010086/1576396571768.jpeg', '/hotel_img/nailiang/29010086/1576396573859.jpeg', '/hotel_img/nailiang/29010086/1576396575932.jpeg'],
    'concerns': [],
    'facility': ['wifi服务', '电梯'],
    'address': 'Aburasakacho 438-1',
    'latitude': 34.684015,
    'longitude': 135.822857,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00 - 22:00',
    'leave_time': '10:00',
    'room_count': '1',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010000, 29010002, 29010007, 29010008],
  }, {
    'hotel_id': 29010087,
    'hotel': '慢屋奈良',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29013,
    'top': 0,
    'hot': false,
    'english_hotel': 'Slow House Nara',
    'image': ['/hotel_img/nailiang/29010087/1576396580476.jpeg', '/hotel_img/nailiang/29010087/1576396582540.jpeg', '/hotel_img/nailiang/29010087/1576396584685.jpeg', '/hotel_img/nailiang/29010087/1576396586730.jpeg', '/hotel_img/nailiang/29010087/1576396588794.jpeg', '/hotel_img/nailiang/29010087/1576396590854.jpeg', '/hotel_img/nailiang/29010087/1576396592927.jpeg'],
    'concerns': [],
    'facility': ['wifi服务', '吹风机'],
    'address': '1-5 kamisanjo-cho',
    'latitude': 34.68167,
    'longitude': 135.82644,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '16:00 - 20:00',
    'leave_time': '10:00',
    'room_count': '8',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010006, 29010007, 29010008, 29010009],
  }, {
    'hotel_id': 29010088,
    'hotel': '若狭酒店',
    'county_id': 29,
    'city_id': 2901,
    'area_id': 29014,
    'top': 0,
    'hot': false,
    'english_hotel': 'Wakasa Bettei',
    'image': ['/hotel_img/nailiang/29010088/1576396597835.jpeg', '/hotel_img/nailiang/29010088/1576396599935.jpeg', '/hotel_img/nailiang/29010088/1576396602060.jpeg', '/hotel_img/nailiang/29010088/1576396604234.jpeg', '/hotel_img/nailiang/29010088/1576396606376.jpeg', '/hotel_img/nailiang/29010088/1576396608501.jpeg', '/hotel_img/nailiang/29010088/1576396610542.jpeg'],
    'concerns': ['对于想要捕捉奈良城市风采的旅客来说，Wakasa Bettei|Wakasa Bettei是一个理想的选择。', '附近很多景点，包括奈良县立美术馆、奈良县厅和吉城园都离酒店不远。', '酒店设有按摩室，确保您下榻期间愉快、惬意。', '酒店为所有入住客人提供免费停车场。', '。'],
    'facility': ['免费停车场', '电梯'],
    'address': '1 Kitahanda Higashimachi Nara Nara-ken 630-8274 日本...',
    'latitude': 34.688114,
    'longitude': 135.834097,
    'room': [{
      'kind': '标准单人间',
      'price': 350
    }, {
      'kind': '标准双人房',
      'price': 400
    }, {
      'kind': '标准大床房',
      'price': 450
    }, {
      'kind': '日式单人间',
      'price': 400
    }, {
      'kind': '日式双人房',
      'price': 450
    }, {
      'kind': '日式大床房',
      'price': 500
    }],
    'enter_time': '15:00',
    'leave_time': '10:00',
    'room_count': '11',
    'nearby_place': [290100, 290101, 290102, 290104, 290103, 290105, 290112, 290107, 290108],
    'nearby_hotel': [29010004, 29010006, 29010012, 29010021],
  }]
  await HotelModel.insertMany(data)
})

export default router
