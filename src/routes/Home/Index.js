import React from 'react';
import { connect } from 'dva';
import Banner from '../../components/Home/Banner';
import NavbarCommon from '../../components/NavBarCommon'
import Seperator from '../../components/Seperator'
import GridSection from './GridSection'
import NewsList from './NewsList'

class Home extends React.Component{
    constructor({props, dispatch}){
        super({props, dispatch});
        this.props=props;
        this.dispatch=dispatch;
    }
    componentDidMount(){
        this.dispatch({
            type: 'home/getBanner',
        });
        this.dispatch({
            type: 'home/getGrid',
        });
        this.dispatch({
            type: 'home/getNews',
        })
    }
    render(){
        console.log(this.props.home)
        const banners =this.props.home.banners
        const navbar =this.props.home.navbar
        const grid =this.props.home.grid
        const newsList =this.props.home.newsList
        return (
            <div>
                <NavbarCommon navbar={navbar}></NavbarCommon>
                {banners.data.length?<Banner banners={banners}/>:null}
                <GridSection grid={grid}/>
                <Seperator />
                <NewsList newsList={newsList} />
            </div>
        );
    }
}

export default connect(({home})=>({home}))(Home)