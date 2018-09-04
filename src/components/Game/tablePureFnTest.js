import Card from '../../routes/Game/Card'
import Sound from './Sound'
import { connect } from 'http2';

// class tablePureFn{
function tablePureFnTest(){
    // constructor({props,dispatch}){
    //     this.width = window.screen.width;
    //     this.height = window.screen.height;
    //     this.center=null;       //牌桌中心
    //     this._csize=null;
    //     this.seats=null;
    //     this.board=null;
        
    // }
    let width = window.screen.width;
    let height = window.screen.height;
    let center=null;       //牌桌中心
    let _csize=null;
    let seats=null;
    let board=null;

    /* 通过计算获得 Card 的 size */
    const csize=()=>{
        return this._csize || (() => {
            return width * 0.18;
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
        this.board=board.ref.board;
        this.seats=seats;

        const center = { x: 0, y: 0 };
        center.x = this.board.current.offsetTop +
            parseInt(this.board.current.style.height.slice(0, -2),10) / 2
        center.y = this.board.current.offsetLeft +
            parseInt(this.board.current.style.width.slice(0, -2),10) / 2
        this.center = center;
        const offset = this.csize * 0.7 / 2
        for (let key in this.seats.seats) {
            this.seats.seats[key][0]['y'] = this.seats.ref[key].current.offsetTop;
            this.seats.seats[key][0]['x'] = this.seats.ref[key].current.offsetLeft;
            if (key === 'right') {
                this.seats.seats[key][0]['y'] = this.seats.seats[key][0]['y'] + this.width * 0.06
                // 下面是处理　牌的叠放顺序　联合参考：dealCards
                this.seats.seats[key][1]['y'] = center.y - offset
                this.seats.seats[key][1]['x'] = center.x - offset
            } else if (key === 'bottom') {
                this.seats.seats[key][0]['x'] = this.seats.seats[key][0]['x'] //+ this.width * 0.21
                this.seats.seats[key][1]['y'] = center.y - offset
                this.seats.seats[key][1]['x'] = center.x - this.csize * 0.7 / 2;
            } else if (key === 'left') {
                this.seats.seats[key][0]['y'] = this.seats.seats[key][0]['y'] + this.width * 0.06
                this.seats.seats[key][1]['y'] = center.y - offset
                this.seats.seats[key][1]['x'] = center.x + offset - this.csize;
            } else {
                this.seats.seats[key][0]['x'] = this.seats.seats[key][0]['x'] // + this.width * 0.21
                this.seats.seats[key][1]['y'] = center.y + offset - this.csize;
                this.seats.seats[key][1]['x'] = center.x - this.csize * 0.7 / 2;
            }
        }
        return this.seats.seats
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
                //cards[index1][index2] = [];
                for (var i = 0; i < s.length; i++) {
                    cards[index1].push({
                        onclick: () => false,              // onclick 必须是个函数
                        animation:{},
                        active: 0,
                        index: index,
                        key: index++,
                        seat: tablePureFn.direction[index1],       // 这张牌是那个方位的
                        //table: this,
                        size: this.csize,                // 牌的大小
                        card: s[i] + suits[index2],
                        position: { x: this.width / 2, y: this.width * 2 }     // 考虑一个默认位置。
                    })
                }
            });
        });
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
    dealCards=(statecards,seats)=> {
        const cards = statecards;
        const offset = this.csize * 0.7 / 2
        cards.forEach((item, index) => {
            let rotate = 0;
            let seat = tablePureFn.direction[index]
            let [x, y] = [seats[seat][0].x, seats[seat][0].y]
            if ('13'.indexOf(index) !== -1) rotate = -90;
            x = x + this.width / 16 / 5; y = y + this.width / 16 / 5; // margin
            item.forEach((item1, index1) => {
                cards[index][index1].animation = {
                    top: y,
                    left: x,
                    delay: (item1.key % 13) * 80,
                    duration: 300,
                    rotate: rotate,
                    transformOrigin: `${offset}px ${offset}px`
                }
                cards[index][index1].active = 2; 
                cards[index][index1].onclick =  this.playCard(item1);
                // cards[index][index1].onclick =  () => false;
                if ('13'.indexOf(index) !== -1) y = y + this.csize * 0.15;
                else x = x + this.csize * 0.39;
            });
        })
        Sound.play('deal');
        return cards;
    }

    playCard=(card)=>{
        return()=>{
            console.log(card)
        }
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

}

tablePureFn.direction = ['top', 'right', 'bottom', 'left', ]

// export default tablePureFn;
export default connect(({game})=>({game}))(tablePureFn)