import Filter from './sellComp/filter'
import List from '../originOrder/originComp/list'
import HocTable from '../../HocTable'



const sellOrder = ({data}) => {
    if(data!==null){
        const {
            CUSTOMER_NAME,
            CUSTOMER_TYPE,
            ORDER_NO,
            DISTRIBUTION_DATE,
            STATE
        } = data

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
        } = data

        const listProps = {
            dataSource: data.rows,
            footerData: {
                LUMP_SUM,
                MEMO,
                CREATE_MAN,
                AUDITOR,
                AUDITOR_TIME,
                PRINTCOUNT
            }
        }
        return (
            <div>
                <Filter {...filterProps}/>
                <List {...listProps} />
            </div>
        )
    }
    return(
        <span>Error</span>
    )
}

const HocSell = HocTable(sellOrder)


export default HocSell
