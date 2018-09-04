
// import { Icon } from 'antd'
export default {

    namespace: 'app',

    state: {
        fullScreen:true,
        hidden:false,
        selectedTab:'blueTab',
    },

    effects:{
    },

    reducers: {
      changeTabBar(state,{selectedTab:tabBar}){   //底部tabBar按钮切换
        return{...state, ...{selectedTab:tabBar}}
      }     
    },
  
  };
  