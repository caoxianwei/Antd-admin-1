import Filter from './buyComp/filter'
import List from './buyComp/list'



let buyList = {
    "currentPage": 1,
    "total": 5,
    "totalPage": 1,
    "showRows": 10,
    "rows": [{
        "PURCHASE_MAN": "秦霖",
        "STATE": "采购中",
        "CREATE_TIME": "2017/09/19",
        "REAL_SUM": 0,
        "ORDER_NO": "CG201709190002",
        "CUSTOMER_TYPE": "零散客户（实时定价）",
        "STOREHOUSE_ID": 6,
        "STOREHOUSE_NAME": "南山中学库",
        "MEMO": "",
        "PURCHASE_DATE": "2017/09/20",
        "TYPE_ID": 14,
        "ID": 22,
        "EVALUATE_SUM": 0,
        "PRINTCOUNT": 0,
        "ISVERIFY": "0",
        "TRADE_TYPE": "干调类",
        "CREATE_MAN": "超级管理员"
    }, {
        "PURCHASE_MAN": "秦霖",
        "STATE": "采购中",
        "CREATE_TIME": "2017/09/19",
        "REAL_SUM": 0,
        "ORDER_NO": "CG201709190001",
        "CUSTOMER_TYPE": "涪城",
        "STOREHOUSE_ID": 6,
        "STOREHOUSE_NAME": "南山中学库",
        "MEMO": "",
        "PURCHASE_DATE": "2017/09/20",
        "TYPE_ID": 2,
        "ID": 21,
        "EVALUATE_SUM": 0,
        "PRINTCOUNT": 0,
        "ISVERIFY": "0",
        "TRADE_TYPE": "水果类",
        "CREATE_MAN": "超级管理员"
    }, {
        "PURCHASE_MAN": "1",
        "STATE": "入库完成",
        "AUDITOR": "超级管理员",
        "CREATE_TIME": "2017/09/18",
        "REAL_SUM": 0,
        "ORDER_NO": "CG201709180001",
        "CUSTOMER_TYPE": "零散客户（实时定价）",
        "STOREHOUSE_ID": 6,
        "STOREHOUSE_NAME": "南山中学库",
        "MEMO": "",
        "PURCHASE_DATE": "2017/09/20",
        "TYPE_ID": 14,
        "ID": 20,
        "PRINTCOUNT": 0,
        "EVALUATE_SUM": 0,
        "ISVERIFY": "1",
        "TRADE_TYPE": "干调类/蛋类",
        "CREATE_MAN": "超级管理员",
        "AUDITOR_TIME": "2017/09/18"
    }, {
        "PURCHASE_MAN": "秦霖",
        "STATE": "采购中",
        "AUDITOR": "超级管理员",
        "CREATE_TIME": "2017/09/01",
        "REAL_SUM": 0,
        "ORDER_NO": "CG201707280001",
        "CUSTOMER_TYPE": "三台",
        "STOREHOUSE_ID": 1,
        "STOREHOUSE_NAME": "三台区库",
        "MEMO": "上午",
        "PURCHASE_DATE": "2017/07/06",
        "TYPE_ID": 1,
        "ID": 19,
        "PRINTCOUNT": 0,
        "EVALUATE_SUM": 0,
        "ISVERIFY": "1",
        "TRADE_TYPE": "水果类/蔬菜类",
        "CREATE_MAN": "超级管理员",
        "AUDITOR_TIME": "2017/09/01"
    }]
}


// const {CUSTOMER_NAME,CUSTOMER_TYPE,ORDER_NO,DISTRIBUTION_DATE} = orderList
// const filterProps = {
//     valueData:{
//         CUSTOMER_NAME,
//         CUSTOMER_TYPE,
//         ORDER_NO,
//         DISTRIBUTION_DATE
//     }
// }


//const {ORDER_NO,PURCHASE_MAN,PURCHASE_DATE,MEMO,CREATE_TIME,STOREHOUSE_NAME,TRADE_TYPE,STATE} = orderList
const listProps = {
    dataSource:buyList.rows,
}

const buyOrder = () =>{
    return(
        <div>
            <Filter/>
            <List {...listProps} />
        </div>
    )
}
export default buyOrder
