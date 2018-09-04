import React, { Component } from 'react';
import {connect} from 'dva'
import style from './Table.css'
import jsStyle from './tableStyle';
import {ImpsHeader, SeatsHeader, TricksHeader} from '../../components/Game/Header'
import Board from '../../components/Game/Board'
import Seats from '../../components/Game/Seats'
import BidPanel from './BidPanel'
import tablePureFn from '../../components/Game/tablePureFn';
const TablePureFn = new tablePureFn();

class Table extends Component{
    constructor({props, game, dispatch}){
        super({props, game,dispatch});
        this.props=props;   //包含（dispatch, state, match, location, history）
        this.ref={}
        this.ref.seats=React.createRef();   // 获得方位的引用, 以便计算发牌位置
        this.ref.board=React.createRef();   // 获得board的引用, 以便计算桌子中心的位置及出牌的位置
        this.seats=null;    // 计算得到的发牌位置和出牌位置
    }

    componentDidMount(){
        const seats=TablePureFn._initSeats(this.ref.board.current,this.ref.seats.current);
        this.seats = seats
        this.props.dispatch({
            type:'game/init',
            seats: seats,
            playCard: this.playCard
        })
    }
    playCard=(card)=>{
        return ()=>{
            this.props.dispatch({
                type: 'game/playCard',
                card: card,
            })
        }
    }


    // 测试用
    dealCards=()=>{
        this.props.dispatch({
            type: 'game/dealCards',
            playCard: this.playCard
        })
    }
    showDummy=(seat)=>{
        this.props.dispatch({
            type: 'game/showDummy',
            seat: seat
        })
    }
    onSearch=()=>{
        this.props.dispatch({
            type:'game/onSearch'
        })
    }
    showBidPanel=()=>{
        this.props.dispatch({
            type:'game/showBidPanel'
        })
    }
    showCalldata=()=>{
        this.props.dispatch({
            type:'game/showCalldata'
        })
    }
    handleCall=(item)=>{
        this.props.dispatch({
            type:'game/handleCall',
            bidCard: item
        })
    }
    showLastTrick=()=>{
        this.props.dispatch({
            type: 'game/showLastTrick'
        })
    }

    render(){
        const header={
            dealer:this.props.game.table.dealer,
            tricks:{
                declarer: this.props.game.table.declarer,
                contract: this.props.game.table.contract,
                ns_win: this.props.game.table.ns_win,
                ew_win: this.props.game.table.ew_win,
            },
            imps:{
                ns_point: this.props.game.table.ns_point,
                ew_point: this.props.game.table.ew_point,
            }
        }
        const players=this.props.game.table.players;
        const Cards=TablePureFn.createCards(this.props.game.table.Cards)
        return (
            <div>
                <div id='table'  className={style.match_table} style={jsStyle.table}>
                    <div className={style.header} id='header' style={jsStyle.header}>
                        <div className={style.re} style={jsStyle.re}><ImpsHeader imps={header.imps}/></div>
                        <div className={style.re} style={jsStyle.re}><SeatsHeader dealer={header.dealer}/></div>
                        <div className={style.re} style={jsStyle.re}><TricksHeader tricks={header.tricks}/></div>
                        <div className={style.search} style={jsStyle.search} onClick={this.onSearch}>查看</div>
                        <div id='sound'></div>
                    </div>
                    <div id='body' className={style.body} style={jsStyle.body}>
                        {this.props.game.showLastTrick ? <div id='lastTrick' className={style.lastTrick}></div> : null}
                        {this.props.game.showBidPanel?
                        <div className={style.panel} style={jsStyle.panel}>
                            <BidPanel 
                            calldata={this.props.game.table.calldata}
                            handleCall={this.handleCall}
                            bidCard={this.props.game.table.currentBidCard}
                            />
                        </div> : null
                        }
                        <Seats ref={this.ref.seats}/>
                        <Board players={players} ref={this.ref.board}/>
                        {Cards}
                        {this.props.game.onSearch?<div id="mask" className={style.mask} style={jsStyle.mask}></div>:null}
                    </div>
                    <div id='message' className={style.message}>
                    </div>
                    <div id="debug" className={style.debug}>
                        <button id="dealCards" onClick={this.dealCards}>发牌</button>
                        <button id="dummyTop" onClick={()=>this.showDummy('top')}>明手上</button>
                        <button id="showDummyLeft" onClick={()=>this.showDummy('left')}>明手左</button>
                        <button id="showDummyRight" onClick={()=>this.showDummy('right')}>明手右</button>
                        <button id="showBidPanel" onClick={()=>this.showBidPanel()}>叫牌</button>
                        <button id="showCalldata" onClick={()=>this.showCalldata()}>test叫牌</button>
                        <button id="showLastTrick" onClick={()=>this.showLastTrick()}>上一墩</button>
                    </div>
                    <div id='footer' className={style.footer} style={jsStyle.footer}>
                        <input id='say' type='text' />
                        <input type='button' value='发送' />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(({game})=>({game}))(Table)