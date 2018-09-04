const tables=[{
    table_id: 1,
    open_channel: [1,3],
    close_channel: [2,4],
},{
    table_id: 2,
    open: [5, 7],
    close: [6, 8],
}]
const boards=[  //开室
    {   
        table_id: 1,
        board_id: 1,
        cards: 'Q962.943.K32.764 K843.KJT87.J4.T5 T7.52.QT985.KJ98 AJ5.AQ6.A76.AQ32',
        players: [['盼盼','N'],['萱萱','S'],['真真','W'],['安安','E']],
        dealer: 'E',
        vulnerable: 'BO',
        calls: [[1,'E','2S'],[2,'S','Pass'],[3,'W','Pass'],[4,'N','Pass']],
        declarer: 'E',
        contract: '2S',
        dummy: 'W',
        plays: [],
        current_trick: [],
        last_trick: [],
        ns_win: '',
        ew_win: '',
        result: '',
    },{
        table_id: 1,
        board_id: 2,
        cards: 'Q962.943.K32.764 K843.KJT87.J4.T5 T7.52.QT985.KJ98 AJ5.AQ6.A76.AQ32',
        players: [['盼盼','N'],['萱萱','S'],['真真','W'],['安安','E']],
        dealer: 'E',
        vulnerable: 'BO',
        calls: [[1,'E','2S'],[2,'S','Pass'],[3,'W','Pass'],[4,'N','Pass']],
        declarer: 'E',
        contract: '2S',
        dummy: 'W',
        plays: [],
        current_trick: [],
        last_trick: [],
        ns_win: '',
        ew_win: '',
        result: '',
    }
]

const getMatches=(req,res)=>{
    const table_id = tables.map(item=>{return item.table_id});
    res.json(
        table_id
    )
}

const joinChannel=(req,res)=>{
    console.log(req.body)
    if(req.body.table_id){
        const board_id = boards.map(item=>{if(item.table_id===req.body.table_id)return item.board_id}).filter(item=>{return item})
        const channel = tables.map(item=>{if(item.table_id===req.body.table_id)return item.open_channel}).filter(item=>{return item})[0]
        const resData = channel;   
        resData.push(board_id)
        res.json(
            resData
        )
    }else{
        res.json([])
    }
}

const initBoard=(req,res)=>{
    console.log(req.body)
    if(req.body.board_id&&req.body.channel_id){
        const resData = boards.map(item=>{
            if(item.board_id===req.body.board_id)
            return {
                cards: item.cards,
                players: item.players,
                dealer: item.dealer
            }
        }).filter(item=>{return item})
        res.json(
            resData[0]
        )
    }else{
        res.json([])
    }
}

export default{
    getMatches,
    joinChannel,
    initBoard,
}