import React from 'react'
import jsStyle from './boardStyle'
import style from './Board.css'

class Board extends React.Component{
    constructor(props){
        super(props);
        this.props=props;
        this.ref={};
        this.ref.board=React.createRef();
    }
    render(){
        const seats=this.props.players.map((item, index)=>{
            return(
                <div className={style.userTag} key={index}>
                    <div className={style.seat}>
                    {item[1]} : {item[0]}
                    </div>
                </div>
            )
        })
    return(
        <div id='board' className={style.board} style={jsStyle.board} ref={this.ref.board}>
            {seats}
        </div>
    )
    }
}

export default Board