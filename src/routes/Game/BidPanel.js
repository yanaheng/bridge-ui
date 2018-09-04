import React, { Component } from 'react';
import TweenOne from 'rc-tween-one';
import style from './BidPanel.css'
let css1 = {
    bidpanel: {
        width: '100%',
        height: '100%',
    },
}

class BidPanel extends Component {
    constructor(props) {
        super(props)
        // this.width = window.screen.width;
        this.width=document.body.clientWidth;
        const suits = ['NT', 'S', 'H', 'D', 'C'];
        const rank = [1, 2, 3, 4, 5, 6, 7];
        const bids = rank.map((i) => suits.map((j) => i + j))
        const bidblocks = bids.map((e, i) => e.map((e1, i1) => {
            return { name: e1, active: 1 }
        }))
        this.bidblocks = bidblocks;
        this.ref = React.createRef();   
    }

    UNSAFE_componentWillReceiveProps(newProps){
        const bidblocks = this.bidblocks;
        if(newProps.bidCard){
            bidblocks.map((item1, i1) => item1.map((item2, i2) => {
                if(item2.name===newProps.bidCard.name){
                    for (let i = 0; i < bidblocks.length; i++) {
                        for (let j = 0; j < bidblocks[i].length; j++) {
                            if (i < i1 ||
                                (i === i1 && j >= i2)) bidblocks[i][j].active = 0;
                        }
                    }
                }
            }))
        }
    }
    /**
     * 叫牌
     * item 点击的叫品 行列坐标。{row,col}
     */
    handleCall = (item) => {
        this.props.handleCall(item)
    }

    
    render() {
        /**展示叫牌卡 */
        const bidblocks = this.bidblocks.map((e1, i1) => e1.map((e2, i2) => {
            const animation = {}
            if (e2.active === 0) animation['brightness'] = 0.6;
            return <BidBlock key={i1+i2} name={e2.name} animation={animation}
                onClick={this.handleCall.bind(this, {name:e2.name, row: i1, col: i2})} />
        }))
        /**展示已经叫出的牌 */
        const rows = this.props.calldata.map((item,index)=>{
            return <tr key={index}>
                <td>{index+1}</td>
                {item.map((item1,index1)=>(
                    <td key={index+index1} style={{width:'20%'}}>
                        {item1?
                            <img src={`/cards/bids/${item1.toUpperCase()}.svg`} style={{height:'35%',width:'100%'}} alt=''/>
                            : ' '
                        }
                    </td>
                ))}
            </tr>
        })
        return (
            <div id='bidpanel' className={style.bidpanel} style={css1.bidpanel} ref={this.ref}>
                <div>
                    <table>
                        <thead>
                            <tr>
                            <td> </td><td>北</td><td>东</td><td>南</td><td>西</td>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
                {bidblocks}
                <div className={style.pass} onClick={this.handleCall.bind(this, {name:'Pass'})} >
                    <img className={style.suit} src={`/cards/bids/PASS.svg`}  alt=''/>
                </div>
                <div className={style.double} onClick={this.handleCall.bind(this, {name:'x'})}>
                    <img className={style.suit} src={`/cards/bids/X.svg`}  alt=''/>
                </div>
                <div className={style.redouble} onClick={this.handleCall.bind(this, {name:'xx'})}>
                    <img className={style.suit} src={`/cards/bids/XX.svg`}  alt=''/>
                </div>
            </div>
        );
    }
}
/**
 * name 5D
 * size 大小比例
 * active 0,1  0不可点击
 */
class BidBlock extends Component {
    render() {
        const suit = this.props.name.slice(-1);
        const bgcolor = { T: '#eeeeee', S: '#eeeeee', H: '#eeeeee', D: '#eeeeee', C: '#eeeeee' };
        const bidBlockStyle = {
            backgroundColor: `${bgcolor[suit]}`,

        }
        if (this.props.active === 0)
            this.props.animation && (this.props.animation['brightness'] = 0.6)
        return (
            <TweenOne
                animation={{
                    ...this.props.animation,
                    ease: 'easeOutQuint',       // 缓动参数 参考蚂蚁手册 easeOutExpo
                }}
                className={style.bidblock}
            >
                <div className={style.cn1} onClick={this.props.onClick} style={bidBlockStyle}>
                    <img className={style.suit} src={`/cards/bids/${this.props.name}.svg`}  alt=''/>
                </div>
            </TweenOne>
        );
    }
}

export default BidPanel;