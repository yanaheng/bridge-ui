
import style from './Header.css'

const ImpsHeader=({imps})=>{
    console.log(imps)
    return(
        <div className={style.imps}>
            <div className={style.iheader}>IMPs</div>
            <div className={style.ibody}  >NS : {imps.ns_point}<br />EW : {imps.ew_point}</div>
        </div>
    )
}

const SeatsHeader =({dealer})=>{
    return(
        <div className={style.seats}>
            {/* <div className='s1' style={{textAlign:'center',lineHeight:'100%'}}>{this.props.dealer==='north'?'D':null}</div>
            <div className='s2'>{this.props.dealer==='west'?'D':null}</div>
            <div className='s'><span style={{display:'block',marginTop:'23%'}}>{this.props.board_id?this.props.board_id:null}</span></div>
            <div className='s3'>{this.props.dealer==='east'?'D':null}</div>
            <div className='s4' style={{textAlign:'center',lineHeight:'100%'}}>{this.props.dealer==='south'?'D':null}</div> */}
            <div className={style.s1}>D</div>
            <div className={style.s2}></div>
            <div className={style.s}><span>2</span></div>
            <div className={style.s3}></div>
            <div className={style.s4}></div>
        </div>
    )
}

const TricksHeader =({tricks})=>{
    return(
        <div className={style.tricks}>
            {/* <div className='s1'>{this.props.vertical?this.props.vertical:0}</div>
            <div className='s2' style={{textAlign:'center'}}>{this.props.contract?this.props.contract:null}<br/>{this.props.declarer?this.props.declarer:null}</div>
            <div className='s3'>{this.props.transverse?this.props.transverse:0}</div> */}
            <div className={style.s1}>{tricks.ns_win}</div>
            <div className={style.s2}>{tricks.contract}<br/>{tricks.declarer}</div>
            <div className={style.s3}>{tricks.ew_win}</div>
        </div>
    )
}
export {ImpsHeader, SeatsHeader, TricksHeader}