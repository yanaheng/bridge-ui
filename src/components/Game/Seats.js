import React from 'react'
import style from './Seats.css';
import jsStyle from './seatsStyle'

class Seats extends React.Component{
    constructor(props){
        super(props);
        this.seats={
            'right': [{ x: 0, y: 0 }, { x: 0, y: 0 }],  // seat 用于记录坐标 
            'bottom': [{ x: 0, y: 0 }, { x: 0, y: 0 }], // 第一个xy 是 四个区域左上角坐标
            'left': [{ x: 0, y: 0 }, { x: 0, y: 0 }],  // 第二个xy 是 出牌4个区域坐标。
            'top': [{ x: 0, y: 0 }, { x: 0, y: 0 }]   // 也就是牌出到什么地方。
        }
        this.ref={};
        for (let key in this.seats) {
            this.ref[key] = React.createRef()
        }
    }
    render(){
        console.log(this.ref)
        return(
            <div>
                {/* <div id='right' className={style.right} style={jsStyle.right} ref={this.ref.right}>right</div>
                <div id='left' className={style.left} style={jsStyle.left} ref={this.ref.left}>left</div>
                <div id='bottom' className={style.bottom} style={jsStyle.bottom} ref={this.ref.bottom}>bottom</div>
                <div id='top' className={style.top} style={jsStyle.top} ref={this.ref.top}>top</div> */}
                <div id='top' className={style.top} style={jsStyle.top} ref={this.ref.top}>top</div>
                <div id='right' className={style.right} style={jsStyle.right} ref={this.ref.right}>right</div>
                <div id='bottom' className={style.bottom} style={jsStyle.bottom} ref={this.ref.bottom}>bottom</div>
                <div id='left' className={style.left} style={jsStyle.left} ref={this.ref.left}>left</div>
            </div>
        )
    }

}

export default Seats