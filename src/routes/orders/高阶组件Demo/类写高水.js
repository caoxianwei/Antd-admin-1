/*

 *   @desc 一个表单类
 *  上部分：筛选框
 *  中间部分： 表格
 *
 *  @param 属性
 *     地址栏的信息： pathname
 *     获取数据的api
 *     表格：
 *          表头数据：colums
 *          表格数据：datasource
 *          分页信息:
 *                 total //一共多少条数据
 *                 totalpage //总共多少页
 *                 showRows //每页显示多少行
 *                 currentPage //当前页
 *
 *      筛选栏：
 *          时间选择、输入框、下拉框、关联框
 *
 *  @func 方法
 *      筛选： search
 *      获取数据：
 *      上页下页跳转至多少页
 *  @extends
 *      下面：脚注
 *      表格操作： 新增修改删除取消编辑 【dialog或者行内编辑
 *      toolbar:新建单据 保存单据 删除单据 审核单据 导出excel
 *
 *  @memos:
 *      工厂模式： 专门一个工厂负责实例化
 */

