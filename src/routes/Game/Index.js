import { Component } from 'react'
import {connect} from 'dva'
import {Route} from 'react-router'
import Table from './Table'
import Point from './Point'

class Game extends Component{
    constructor(props){
        super(props);
        this.props=props
    }
    componentDidMount(){
        this.props.history.push('/game/table');
    }
    render(){
        return (
            <div>
                <Route path='/game/table' exact component={Table}></Route>
                <Route path='/game/point' exact component={Point}></Route>
            </div>
        )
    }
}

export default connect(({game})=>({game}))(Game)