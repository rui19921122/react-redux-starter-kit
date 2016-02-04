/**
 * Created by hanrui on 2016/1/29.
 */
import {createAction,handleActions} from 'redux-actions'

export const MenuList = 'MenuList';
export const UpdateMenu = 'UpdateMenu';

const defaultMenu = [
	{type: 'single', name: '首页', href: 'loginIn', key: 'index'},
	{
		type: 'multiple', name: '量化要求模块', href: '#', key: 'value0',
		children: [
			{type: 'single', name: '计划编制', href: 'makePlan', key: 'value1'},
			{type: 'single', name: '计划查询', href: 'queryPlan', key: 'value2'},
			{type: 'single', name: '计划审核', href: 'examPlan', key: 'value3'}
		]
	},
	{
		type: 'multiple', name: '工作职责模块', href: '#', key: 'work0',
		children: [
			{type: 'single', name: '查看工作标准', href: 'queryWork', key: 'work1'},
			{type: 'single', name: '录入实际工作', href: 'typeWork', key: 'work2'}
		]
	},
	{
		type: 'multiple', name: '安全风险管控模块', href: '#', key: 'risk0',
		children: [
			{type: 'single', name: '发布风险', href: 'releaseRisk', key: 'risk1'},
			{type: 'single', name: '编制检查计划', href: 'makeRisk', key: 'risk2'},
			{type: 'single', name: '审批风险检查计划', href: 'examRisk', key: 'risk3'}
		]
	}
];
export let updateMenu = createAction(UpdateMenu);

export let getMenu = createAction(MenuList);
//export default handleActions({
//	[COUNTER_INCREMENT]: (state, { payload }) => state + payload
//}, [1, 2])
export default handleActions(
	{
		[MenuList]: (i)=>i
	}
	,
	defaultMenu
)
