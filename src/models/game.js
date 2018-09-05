import tablePureFn from '../components/Game/tablePureFn';
const TablePureFn = new tablePureFn();

export default{
    namespace:'game',

    state:{
        table_id_list: [1,2],
        table_id: 1,
        channel_id: 1,
        myChannel_id: 3,
        board_id_list: [1,2,3,4,5,6,7,8],
        board_id: 1,
        table:{
            dealer: 'E',
            declarer: 'E',
            dummy: 'W',
            contract: '2S',
            ns_win: 3,
            ew_win: 3,
            ns_point: '',
            ew_point: '',
            players:[["131 1111 1111", "N", 7],["131 2222 2222", "S", 8],["188 0000 0000", "E", 9],["188 7777 7777", "W", 10]],
            cards:'XXXX.XXX.XXX.XXX XXXX.XXXXX.XX.XX T7.52.QT985.KJ98 XXX.XXX.XXX.XXXX',
            // cards:'Q962.943.K32.764 K843.KJT87.J4.T5 T7.52.QT985.KJ98 AJ5.AQ6.A76.AQ32',  花色： S H D C   方位： N E S W 
            Cards: [],
            currentTrick:[],    //当前墩
            lastTrick: [],      //上一墩
            vulnerable:"NS",    
            calldata: [],
            currentBidCard: '',
        },
        lastState:{},
        seats:[],
        playCardFn:'',
        onSearch:false,
        showBidPanel: false,
        showLastTrick:false,
    },

    effects:{
        *init({seats,playCardFn},{put,call,select}){
            /**保存seats */
            yield put({     
                type: 'saveSeats',
                seats,
                playCardFn,
            })
            /**初始化牌 */
            const cards = yield select(state=>state.game.table.cards)    
            yield put({     
                type: 'initCards',
                cards,
            })
            /**发牌 */
            // yield put({
            //     type: 'dealCards',
            //     playCard: playCard
            // })
        },
        *playOneCard({card},{put,select}){   //出牌
            const seats = yield select(state=>state.game.seats)
            const playCardFn = yield select(state=>state.game.playCardFn)
            let Cards = yield select(state=>state.game.table.Cards)
            Cards = TablePureFn.playCard(Cards,card, seats, playCardFn);

            yield put({
                type: 'savePlayOneCard',
                Cards,
                card
            })
            yield put({
                type: 'checkCurrentTrick'
            })
            // let currentTrick = yield select(state=>state.game.table.currentTrick)
            // let lastTrick = yield select(state=>state.game.table.lastTrick)
            // if(currentTrick.length===4){
            //     console.log(44444444444444)
            //     // setTimeout(()=>{
            //         lastTrick = TablePureFn.clearBoard(currentTrick,lastTrick)
            //         console.log(lastTrick)
            //         // console.log('2222222222222')
            //         // currentTrick.map(item=>{
            //         //     console.log(item)
            //         //     lastTrick.push(item)
            //         //     TablePureFn.moveToPlayed(item);
            //         //     console.log(lastTrick)
            //         // })
            //         currentTrick=[];
            //         // return {currentTrick, lastTrick}
            //     // },1000)
            // }
            // console.log(lastTrick)
            // console.log(currentTrick)
        },
        // *checkCurrentTrick(_,{put,select}){
        //     let currentTrick = yield select(state=>state.game.table.currentTrick)
        //     // let currentTrick = state.table.currentTrick;
        //     const lastTrick = yield select(state=>state.game.table.lastTrick)
        //     // const lastTrick = state.table.lastTrick;
        //     if(currentTrick.length===4){
        //         setTimeout(() => {
        //             currentTrick.map(item=>{
        //                 lastTrick.push(item)
        //                 TablePureFn.moveToPlayed(item);
        //             })
        //         }, 1000);
        //         currentTrick = [];
        //     }
        //     const table = {...state.table,...{currentTrick,lastTrick}}
        //     return {...state,table}
        // },
    },

    reducers:{
        saveSeats(state,{seats,playCardFn}){   //保存seats
            return {...state,...{seats,playCardFn}}
        },
        initCards(state,{cards}){   //初始化牌
            const Cards=TablePureFn.initCards(cards);
            const table = {...state.table,Cards}
            return {...state,table}
        },
        dealCards(state){   //发牌
            /** let Cards=TablePureFn.initCards(state.table.cards);
            Cards=TablePureFn.dealCards(Cards,state.seats,playCard);*/
            let Cards=TablePureFn.dealCards(state.table.Cards,state.seats,state.playCardFn);
            const table = {...state.table, Cards}
            return {...state,table}
        },
        savePlayOneCard(state,{Cards,card}){
            console.log(11111111)
            const currentTrick = state.table.currentTrick;
            currentTrick.push(card);
            const table = {...state.table,...{Cards,currentTrick}}
            console.log(table)
            return {...state,table}
        },
        checkCurrentTrick(state){
            let currentTrick = state.table.currentTrick;
            let lastTrick = [];
            if(currentTrick.length===4){
                console.log(44444444444444)
                lastTrick = TablePureFn.clearBoard(currentTrick,lastTrick)
                currentTrick=[];
            }
            const table = {...state.table,...{currentTrick,lastTrick}}
            console.log(table)
            return {...state,table}
        },
        onSearch(state){    
            const onSearch = state.onSearch? false : true;
            return {...state,onSearch};
        },
        showDummy(state,{seat}){       //展示明手的牌
            const Cards = TablePureFn.showDummy(state.table.Cards,seat)
            const table = {...state.table,Cards}
            return {...state,table}
        },
        showBidPanel(state){    //展示叫牌卡
            const showBidPanel = state.showBidPanel? false : true;
            return {...state,showBidPanel};
        },
        showCalldata(state){    //展示叫的牌
            const calldata = [['2S','Pass','3NT','Pass'],['4H',null,null,null]]
            const table = {...state.table,calldata}
            return {...state,table}
        },
        showLastTrick(state){   //展示上一墩
            const showLastTrick = state.showLastTrick? false : true;
            return {...state,showLastTrick};
        },
        handleCall(state,{bidCard}){    //叫牌动作
            const calldata = TablePureFn.call(state.table.calldata, bidCard)
            const table = {...state.table,...{calldata,currentBidCard:bidCard}}
            return {...state,table}
        },
    }
} 