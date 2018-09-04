import request from '../utils/request';

const structure=(params)=>{
    // const data = {
        // "jsonrpc": "2.0",
        // "method": "call",
        // "id": Math.floor(Math.random() * 100),
        // "params": params
    // }
    const options={
        method: 'POST',
        body: JSON.stringify(params),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }
    return options
}
  


export function getBanners() {
  return request('/api/getbanners');
}

export function getGrid() {
    return request('/api/getGrid');
}

export function getNews() {
    return request('/api/getNews');
}

export function getMatches(){
    return request('/api/get_matches')
}

export function joinChannel(table_id){
    return request('/api/join_channel',structure({table_id:table_id}))
}

export function initBoard(board_id,channel_id){
    return request('/api/init_board',structure({board_id,channel_id}))
}

export default{
    getBanners,
    getGrid,
    getNews,
}
