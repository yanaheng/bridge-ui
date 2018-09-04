
// import {Icon } from 'antd';
import { getBanners, getGrid, getNews } from '../services/api';
export default {

    namespace: 'home',

    state: {
        navbar:{
            style:{},
            mode:'dark',
            icon:null,
            text:'智赛桥牌',
        },
        banners:{
            data:[],
            imgHeight: 176,
        },
        grid:{
            data:[],
        },
        newsList:{
            data:[]
        }
    },

    effects:{
        *getBanner(_,{put,call}){
            const data = yield call(getBanners);
            console.log(data)
            yield put({
                type: 'saveBanner',
                data
              })
        },
        *getGrid(_,{put,call}){
            const data = yield call(getGrid);
            console.log(data)
            yield put({
                type: 'saveGrid',
                data,
            })
        },
        *getNews(_,{put,call}){
            const data = yield call(getNews);
            console.log(data)
            yield put({
                type: 'saveNews',
                data,
            })
        }
    },

    reducers: {
        saveBanner(state,{data}){
            const banners={...state.banners,...data}
            return {...state,banners}
        },
        saveGrid(state,{data}){
            const grid={...state.grid,...data}
            return {...state,grid}
        },
        saveNews(state,{data}){
            const newsList ={...state.newsList,...data}
            return {...state,newsList}
        },
    },
  
  };
  