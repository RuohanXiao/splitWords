const initState = {
  // 里面是初始化数据
};
//利用Object.assign 重组object并返回
const reducer = (state = initState, action) => {
  switch (action.type) {
    // 例子：
    // case "OPEN_MODAL": 
    //   return Object.assign({}, state, {
    //     ...state, 
    //     visible: true    // 需要修改的值放在后面，覆写前面 state 中相同的值
    //   })
    default:
      return state;
  }
}

export default reducer