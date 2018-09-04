import mockjs from 'mockjs';
import {getBanners, getGrid, getNews} from './mock/home'
import {getMatches, joinChannel, initBoard} from './mock/game'
// 是否禁用代理
// const noProxy = process.env.NO_PROXY === 'true';

const proxy={
    'GET /api/getbanners': getBanners, 
    'GET /api/getGrid': getGrid, 
    'GET /api/getNews': getNews, 
    'GET /api/get_matches': getMatches, 
    'POST /api/join_channel': joinChannel,
    'POST /api/init_board': initBoard
}

export default (proxy);

