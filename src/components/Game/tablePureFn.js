import Card from '../../routes/Game/Card'
import Sound from './Sound'

class tablePureFn {
    constructor(){
        // this.width = window.screen.width;
        // this.height = window.screen.height;
        this.width=document.body.clientWidth;
        // this.height=document.body.clientHeight;
        this._csize=null;
        this.seats=null;
        this.offset = this.csize * 0.7 / 2;
        this.zindex = 2;
        // this.lastTrickCard = []     //测试用
    }

    /* 通过计算获得 Card 的 size */
    get csize() {
        return this._csize || (() => {
            return this.width * 0.18;
        })()
    }
    /**
    * _initSeat 初始化 发牌位置 出牌位置的坐标。 
    * center   桌子的中心 以body 为父元素计算。
    * offset   是四张牌叠放需要错开的空间。（长 - 宽）/ 2
    * this.seat[key][0] 四个座位发牌坐标xy
    * this.seat[key][1] 四个作为出牌坐标xy
    *      出牌坐标计算依据：
    *          扑克牌的中心点和左上角位置差固定。
    *          因此可以以中心点考虑四个方位的位移 再加减相同的 位置差即可。
    *          注：0.7 是扑克的横竖比例。
    */
    _initSeats=(board=null, seats=null)=>{
        const _board=board.ref.board;
        this.seats=seats.seats;
        const ref = seats.ref;

        const center = { x: 0, y: 0 };
        center.x = _board.current.offsetTop +
            parseInt(_board.current.style.height.slice(0, -2),10) / 2
        center.y = _board.current.offsetLeft +
            parseInt(_board.current.style.width.slice(0, -2),10) / 2
        const offset = this.csize * 0.7 / 2
        for (let key in this.seats) {
            this.seats[key][0]['y'] = ref[key].current.offsetTop;
            this.seats[key][0]['x'] = ref[key].current.offsetLeft;
            if (key === 'right') {
                this.seats[key][0]['y'] = this.seats[key][0]['y'] + this.width * 0.06
                // 下面是处理　牌的叠放顺序　联合参考：dealCards
                this.seats[key][1]['y'] = center.y - offset
                this.seats[key][1]['x'] = center.x - offset
            } else if (key === 'bottom') {
                this.seats[key][0]['x'] = this.seats[key][0]['x'] //+ this.width * 0.21
                this.seats[key][1]['y'] = center.y - offset
                this.seats[key][1]['x'] = center.x - this.csize * 0.7 / 2;
            } else if (key === 'left') {
                this.seats[key][0]['y'] = this.seats[key][0]['y'] + this.width * 0.06
                this.seats[key][1]['y'] = center.y - offset
                this.seats[key][1]['x'] = center.x + offset - this.csize;
            } else {
                this.seats[key][0]['x'] = this.seats[key][0]['x'] // + this.width * 0.21
                this.seats[key][1]['y'] = center.y + offset - this.csize;
                this.seats[key][1]['x'] = center.x - this.csize * 0.7 / 2;
            }
        }
        return this.seats
    }
    /**
     * initCards 从 this.deals 初始化成 Cards 组件为渲染输出做准备，返回到 this.cards
     */
    initCards=(thisDeals)=> {
        const suits = Card.suits                    //['S', 'H', 'D', 'C'];
        const deals = thisDeals.split(' ')
        let index = 0;                              // 复位index 可以让四个人的牌同时发出来
        const cards = [[], [], [], []];             // 初始化二维数组 保存四个方位的牌
        //deals. [XXXXXXXXXXXXX,QJ98.A5.J853.QT4,XXXXXXXXXXXXX,XXXXXXXXXXXXX]
        deals.forEach((item, index1) => {
            const suit = item.split('.')
            suit.forEach((s, index2) => {           // index2 四个花色  s 'QJ98' 牌点字串
                for (var i = 0; i < s.length; i++) {
                    cards[index1].push({
                        onclick: () => false,              // onclick 必须是个函数
                        animation:{},
                        active: 0,
                        index: index,
                        key: index++,
                        seat: tablePureFn.direction[index1],       // 这张牌是那个方位的
                        size: this.csize,                // 牌的大小
                        card: s[i] + suits[index2],
                        position: { x: this.width / 2, y: this.width * 2 }     // 考虑一个默认位置。
                    })
                }
            });
        });
        console.log(cards)
        return cards;
    }
    /**
     * 发牌
     *  1） 东西方向牌是横向的，因此要确定旋转的圆心。旋转后保证左上角坐标就是牌的左上角如果按照中心旋转则还需要计算偏移量。
     *      利用 transformOrigin
     *  2） 出牌的位置 东西南北 四个位置之前计算好的。
     *  3） xy+5 目的是避免靠近牌桌边缘。
     *  4） delay 是每张牌发出来的延迟时间。按照牌编号进行计算。出牌时应清零
     *  5） '02'.indexOf(index) 东西的牌 rotate 旋转90度
     *  6） .onclick=this.onclick(item2) onclick 函数引用
     *      this.onclick(item2) 仍然返回一个函数 用来处理点击事件，传入item2
     */
    dealCards=(cards,seats,playCard)=> {
        cards.forEach((item, index) => {
            return this.dealOneSeatCards(item,seats,playCard );
        })
        Sound.play('deal');
        return cards;
    }    
    /**
     * 发某一个方位的牌
     */
    dealOneSeatCards(cards,seats,playCard){
        let rotate = 0;
        let myseat = cards[0]['seat'];
        let index = tablePureFn.direction.indexOf(myseat)
        let [x, y] = [seats[myseat][0].x, seats[myseat][0].y]
        if ('13'.indexOf(index) !== -1) rotate = -90;
        x = x + this.width / 16 / 5; y = y + this.width / 16 / 5; // margin
        cards.forEach((item1, index1) => {
            this.dealOneCard(item1,x,y,rotate,1,playCard)
            if ('13'.indexOf(index) !== -1) y = y + this.csize * 0.15;
            else x = x + this.csize * 0.39;
        });
        return cards
    }
    /**
     * 发某一张方位的牌
     */
    dealOneCard = (card,x,y,rotate,delaytime=1,fn=null)=>{  //发牌动作，某一张牌
        card.animation = {
            top: y,
            left: x,
            delay: (card.key % 13) * 80 * delaytime,
            duration: 300,
            rotate: rotate,
            transformOrigin: `${this.offset}px ${this.offset}px`
        }
        card.active = 2; 
        fn ? card.onclick =  fn(card) : card.onclick =  ()=>false
    }
    /**
     * 展开明手的牌
     */
    showDummy=(Cards,seat)=>{
        const cards = 'Q962.943.K32.764 K843.KJT87.J4.T5 T7.52.QT985.KJ98 AJ5.AQ6.A76.AQ32';
        const dummyIndex = tablePureFn.direction.indexOf(seat);
        const arrCards = cards.split(' ')[dummyIndex].split('.');
        let index = 0;
        arrCards.forEach((item1,index1)=>{
            item1.split('').forEach((item2,index2)=>{
                Cards[dummyIndex][index].card = item2 + Card.suits[index1]
                index++;
            })
        })
        return Cards
    }
    /**
     * 叫牌
     */
    call = (calldata,bid,seat) =>{
        if(calldata.length===0){
            calldata.push(Array(4).fill(null))
            calldata[0][0] = bid.name
        }else{
            const index = calldata[calldata.length-1].indexOf(null)
            console.log(index)
            calldata[calldata.length-1][index] = bid.name;
        }
        return calldata
    }
    /**
     * 出牌
     */
    playCard=(cards,card,seats)=>{
        const seatIndex = tablePureFn.direction.indexOf(card.seat);
        let rotate = 0;
        let [x, y] = [seats[card.seat][1].x, seats[card.seat][1].y]
        if ('13'.indexOf(seatIndex) !== -1) rotate = -90;
        x = x + this.width / 16 / 5; y = y + this.width / 16 / 5; // margin
        cards[seatIndex].forEach((item,index)=>{
            if(item.index===card.index){
                this.dealOneCard(item,x,y,rotate,0)
                item.zIndex = this.zindex++;
            }
        })
        Sound.play('play');
        return cards
    }
    /**
     * 将牌与图片相对应
     */
    createCards=(thiscards)=>{
        const cards = thiscards.map((item1, index1) => {
            return item1.map((item2, index2) => {
                return <Card
                    active={item2.active}
                    onClick={item2.onclick}
                    key={item2.key}
                    index={item2.key}
                    seat={item2.seat}
                    animation={item2.animation || ''}
                    card={item2.card}
                    size={item2.size}
                    position={item2.position}
                    zIndex={item2.zIndex}
                />
            });
        });
        return cards
    }
    /**
     * 展示上一墩牌
     */
    // lastTrick = () => {
    //     // 在模型里 应该先判断当前 trick 编号。然后决定是否能看lasttrick
    //     console.log(this.lastTrickCard)
    //     console.log(this.state.lastTrick)
    //         const lt = this.lastTrickCard;
    //         let card = null;
    //         let show = true;
    //         if(this.state.lastTrick) show = false;
           
    //         lt.map((item,index)=>{
    //             card = this._cardIndexOf(lt.card[index].index);
    //             console.log(lt.card[index].index)
    //             console.log(card)
    //             card['animation']['left'] = (show === true) ?
    //                 this.seat[Table.seats[this.state.userdir.indexOf(item)]][1].x - this.width / 2.9
    //                 : this.width / 2;
    //             card['animation']['top'] = (show === true) ?
    //                 this.seat[Table.seats[this.state.userdir.indexOf(item)]][1].y - this.width / 2.9
    //                 : -this.width * 2;
    //             card['zIndex']=this.zindex++
    //             card['animation']['delay']=0;
    //             this.setState({cards: this.state.cards})
    //         })
    // }
    // /**
    //  * 通过一张牌的索引，获得具体的 牌数据引用
    //  * @param {*} index 
    //  */
    // _cardIndexOf(index) {
    //     const i1 = Math.floor(index / 13);
    //     const i2 = index % 13;
    //     return this.state.cards[i1][i2];
    // }
}

tablePureFn.direction = ['top', 'right', 'bottom', 'left', ]
tablePureFn.seats = ['N', 'E', 'S', 'W']

export default tablePureFn;