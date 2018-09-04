import {connect} from 'dva'
const My=({my})=>{
    console.log(my)
    return (
        <div>
            风刀霜剑；麻烦事墩数；乐山大佛；
        </div>
    )
}

export default connect(({my})=>({my}))(My)