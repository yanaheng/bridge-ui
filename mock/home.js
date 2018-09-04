const getBanners=(req,res)=>{
    res.json(['http://img1.imgtn.bdimg.com/it/u=468607901,1588455290&fm=27&gp=0.jpg', 
                'http://img2.imgtn.bdimg.com/it/u=3697750747,3010173749&fm=27&gp=0.jpg', 
                'http://img0.imgtn.bdimg.com/it/u=1240263340,3709766928&fm=27&gp=0.jpg'])

}

const getGrid=(req,res)=>{
    res.json([{
            icon: 'red-envelope',
            text: {key:'match', title: '大型赛事', desc: '一大波红包正在等你' },
        }, {
            icon: 'flag',
            text: {key:'match', title: '俱乐部招募', desc: '欢迎优秀团队加入' }
        }, {
            icon: 'solution',
            text: {key:'match', title: '成绩查询', desc: '近期比赛成绩查询' }
        }, {
            icon: 'video-camera',
            text: {key:'match', title: '桥牌课堂', desc: '从入门到高手' }
        }])
}

const getNews=(req,res)=>{
    res.json(
        [{
            thumb:'http://img5.imgtn.bdimg.com/it/u=3318747708,1678519635&fm=27&gp=0.jpg',
            text:'中国桥牌协会大师分英雄榜',
            time:'2018-5-14~2018-5-20'
        },{
            thumb:'http://img5.imgtn.bdimg.com/it/u=3318747708,1678519635&fm=27&gp=0.jpg',
            text:' 仁者乐山，智者乐桥：无问输赢，但问过程',
            time:'2018-5-21'
        },{
            thumb:'http://img5.imgtn.bdimg.com/it/u=3318747708,1678519635&fm=27&gp=0.jpg',
            text:'让桥牌哲理锻造强国一代',
            time:'2018-5-25'
        }]
    )
}

export default {
    getBanners,
    getGrid,
    getNews,
}