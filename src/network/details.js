import { request } from './request.js'

export function getDetails(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

export class DetailsBasic {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.oldPrice = itemInfo.oldPrice;
    this.nowPrice = itemInfo.lowNowPrice;
    this.discountDesc = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
  }
}

export class DetailsShop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

export class ItemParams {
  constructor(info, rule) {
    this.infoKey = info.key;
    this.ruleKey = rule.key;
    this.set = info.set;
    this.tables = rule.tables[0];
  }
}