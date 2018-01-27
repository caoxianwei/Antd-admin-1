/**
 *  @desc 容器组件【将被高阶组件包裹
 */
import Filter from './originComp/filter'
import List from './originComp/list'
import HocTable from './HocTable'

const CommonOrder = ({data}) =>{
    if(data!==null){
        const {CUSTOMER_NAME,CUSTOMER_TYPE,ORDER_NO,DISTRIBUTION_DATE} = data
        const filterProps = {
            valueData:{
                CUSTOMER_NAME,
                CUSTOMER_TYPE,
                ORDER_NO,
                DISTRIBUTION_DATE
            }
        }
        const {LUMP_SUM,MEMO,CREATE_MAN,AUDITOR,AUDITOR_TIME,PRINTCOUNT} = data
        const listProps = {
            dataSource:data.rows,
            footerData:{
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

const HocOrigin = HocTable(CommonOrder)


export default HocOrigin









