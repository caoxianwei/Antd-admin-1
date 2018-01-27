import Filter from './sellComp/filter'
import List from './originComp/list'

let sellList = {
    "FINAL_DATE": "",
    "STATE": "下单",
    "SINGLE_MAN": "",
    "CUSTOMER_NAME": "安居初中",
    "AUDITOR": "",
    "CREATE_TIME": "2017/11/24",
    "CUSTOMER_ID": 1,
    "LOG": "",
    "CUSTOMER_TYPE": "三台",
    "SINGLE_MAN_TEL": "",
    "DELIVER_COUNT": 0,
    "MEMO": "tttttttttttttttttttttttttttttttttttttt",
    "FINAL_MAN": "",
    "CUSTOMERTYPE_ID": 1,
    "ID": 112,
    "DISTRIBUTION_DATE": "2017/09/13",
    "ISVERIFY": "0",
    "AUDITOR_TIME": "",
    "FINAL_SUM": 0,
    "ADVISORY_TEL2": "",
    "ORIGINALORDER_ID": 126,
    "ADVISORY_TEL1": "",
    "ORDER_NO": "XS201711240001",
    "PROPERTY": "0",
    "rows": [{
        "STATE": "下单",
        "INTERNAL_TYPE": "干调类",
        "UNIT_PRICE": 6,
        "UNIT_NAME": "袋",
        "REASON": "",
        "INTERNALTRADE_ID": 730,
        "PROCESSING_MODE": "未退回",
        "WAREHOUSEOUT_AMOUNT": 0,
        "REAL_SUM": 0,
        "PURCHASEDETAIL_ID": 0,
        "INTERNAL_NAME": "安琪甜酒曲",
        "STOCK": 0,
        "AMOUNT": 1,
        "STOREHOUSE_ID": 0,
        "STOREHOUSE_NAME": "",
        "REAL_PRICE": 0,
        "ORDER_ID": 112,
        "PURCHASEORDER_ID": 0,
        "SUM": 36,
        "ID": 387,
        "INOUT_UNIT": "",
        "RETURN_AMOUNT": 0,
        "REAL_AMOUNT": 0,
        "WAREHOUSEOUT_SUM": 0
    }],
    "LUMP_SUM": 1,
    "PRINTCOUNT": 0,
    "CREATE_MAN": "超级管理员"
}


const {
    CUSTOMER_NAME,
    CUSTOMER_TYPE,
    ORDER_NO,
    DISTRIBUTION_DATE,
    STATE
} = sellList

const filterProps = {
    valueData: {
        CUSTOMER_NAME,
        CUSTOMER_TYPE,
        ORDER_NO,
        DISTRIBUTION_DATE,
        STATE
    }
}


const {
    LUMP_SUM,
    MEMO,
    CREATE_MAN,
    AUDITOR,
    AUDITOR_TIME,
    PRINTCOUNT
} = sellList

const listProps = {
    dataSource: sellList.rows,
    footerData: {
        LUMP_SUM,
        MEMO,
        CREATE_MAN,
        AUDITOR,
        AUDITOR_TIME,
        PRINTCOUNT
    }
}



const CommonOrder = () => {
    return (
        <div>
            <Filter {...filterProps}/>
            <List {...listProps} />
        </div>
    )
}

export default CommonOrder
