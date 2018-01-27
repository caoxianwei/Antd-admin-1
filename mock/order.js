/**
 * 原始订单数据
 */

//http://222.196.35.35:9080/GSMS/logistics/originalorder/next.do?ID=50

//原始订单
let orderList = {
    ADVISORY_TEL1: "",
    ADVISORY_TEL2: "",
    AUDITOR: "超级管理员",
    AUDITOR_TIME: "2017/07/22",
    CREATE_MAN: "超级管理员",
    CREATE_TIME: "2017/07/22",
    CUSTOMERTYPE_ID: 3,
    CUSTOMER_ID: 148,
    CUSTOMER_NAME: "绵阳市游仙区七一剑南路小学",
    CUSTOMER_TYPE: "游仙",
    DISTRIBUTION_DATE: "2017/06/21",
    ID: 51,
    ISVERIFY: "1",
    ISWEB: "1",
    LOG: "",
    LUMP_SUM: 230.57,
    MEMO: "",
    ORDER_NO: "DD201707220003",
    PRINTCOUNT: 0,
    SINGLE_MAN: "",
    SINGLE_MAN_TEL: "",
    STATE: "收货完成",
    rows: [{
        AMOUNT: 65,
        FREE_AMOUNT: 0,
        FREE_SUM: 0,
        ID: 238,
        INTERNALTRADE_ID: 291,
        INTERNAL_NAME: "豆腐",
        INTERNAL_TYPE: "其他类",
        ORDER_ID: 51,
        SELF_AMOUNT: 65,
        SELF_SUM: 123.5,
        STATE: "下单",
        SUM: 123.5,
        TRADE_NAME: "",
        UNIT_NAME: "斤",
        UNIT_PRICE: 1.9,
    }, {
        AMOUNT: 4,
        FREE_AMOUNT: 0,
        FREE_SUM: 0,
        ID: 239,
        INTERNALTRADE_ID: 81,
        INTERNAL_NAME: "红椒",
        INTERNAL_TYPE: "蔬菜类",
        ORDER_ID: 51,
        SELF_AMOUNT: 4,
        SELF_SUM: 14.88,
        STATE: "下单",
        SUM: 14.88,
        TRADE_NAME: "",
        UNIT_NAME: "斤",
        UNIT_PRICE: 3.72
    }]
}



//采购单
let shopList = {
    currentPage: 1,
    showRows: 10,
    total: 5,
    totalPage: 1,
    rows: [{
        CREATE_MAN: "超级管理员",
        CREATE_TIME: "2017/09/19",
        CUSTOMER_TYPE: "零散客户（实时定价）",
        EVALUATE_SUM: 0,
        ID: 22,
        ISVERIFY: "0",
        MEMO: "",
        ORDER_NO: "CG201709190002",
        PRINTCOUNT: 0,
        PURCHASE_DATE: "2017/09/20",
        PURCHASE_MAN: "秦霖",
        REAL_SUM: 0,
        STATE: "采购中",
        STOREHOUSE_ID: 6,
        STOREHOUSE_NAME: "南山中学库",
        TRADE_TYPE: "干调类",
        TYPE_ID: 14
    }, {

    }]
}


//物流管理-修改记录
//http://222.196.35.35:9080/GSMS/log/getlogname.do 操作模块
//http://222.196.35.35:9080/GSMS/log/getlogctrl.do 操作类型
//http://222.196.35.35:9080/GSMS/log/list.do?currentPage=1 修改记录

//操作模块
let logname = [
    "收费类型表",
    "城市信息表",
    "商品转换表",
    "客户信息表",
    "客户类型表",
    "区域信息表",
    "内部商品信息表",
    "内部商品类型表",
    "车辆管理信息表",
    "价格维护单据表"
]
//操作类型
let logctrl = ["新增", "修改", "删除", "查询"]

//修改记录
let loghistory = {
    currentPage: 1,
    showRows: 10,
    total: 5007,
    totalPage: 501,
    rows: [{
        LOG_CONTENT: "销售订单单据表弃审:XS201702280002",
        LOG_CTRL: "弃审",
        LOG_MAN: "admin",
        LOG_NAME: "销售订单单据表",
        LOG_TIME: "2017/03/01",
    }, {
        LOG_CONTENT: "销售订单单据表审核:XS201702280002",
        LOG_CTRL: "审核",
        LOG_MAN: "admin",
        LOG_NAME: "销售订单单据表",
        LOG_TIME: "2017/03/01"
    }, {
        LOG_CONTENT: "采购单单据表弃审:CG201701100001",
        LOG_CTRL: "弃审",
        LOG_MAN: "admin",
        LOG_NAME: "采购单单据表",
        LOG_TIME: "2017/03/01"
    }]
}
