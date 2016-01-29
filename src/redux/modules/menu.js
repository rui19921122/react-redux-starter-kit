/**
 * Created by hanrui on 2016/1/29.
 */
import {createAction,handleActions, handleAction} from 'redux-actions'

export const MenuList = 'MenuList';

const defaultMenu = {
	index: {type: 'single', name: '首页', href: 'index'},
	quant: {
		type: 'multiple', name: '量化要求模块', href: '#',
		children: {
			makePlan: {type: 'single', name: '计划编制', href: 'makePlan'},
			queryPlan: {type: 'single', name: '计划查询', href: 'queryPlan'},
			examPlan: {type: 'single', name: '计划审核', href: 'examPlan'}
		}
	},
	task: {
		type: 'multiple', name: '工作职责模块', href: '#',
		children: {
			queryWork: {type: 'single', name: '查看工作标准', href: 'queryWork'},
			typeWork: {type: 'single', name: '录入实际工作', href: 'typeWork'}
		}
	},
	risk: {
		type: 'multiple', name: '安全风险管控模块', href: '#',
		children: {
			releaseRisk: {type: 'single', name: '发布风险', href: 'releaseRisk'},
			makeRisk: {type: 'single', name: '编制检查计划', href: 'makeRisk'},
			examRisk: {type: 'single', name: '审批风险检查计划', href: 'examRisk'}
		}
	}
};

export let getMenu = createAction(MenuList);
export const actions = {getMenu};
//export default handleActions({
//	[COUNTER_INCREMENT]: (state, { payload }) => state + payload
//}, [1, 2])
export default handleActions({[MenuList]: (i)=>i}, defaultMenu)
