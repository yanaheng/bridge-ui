import React from 'react';
import { Route, Link } from 'dva/router';
import { connect } from 'dva';
import { Icon } from 'antd'
import { TabBar } from 'antd-mobile';
import 'antd/dist/antd.css'; // 这一句是从哪里引入的？
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？
import './App.css'
import Home from './Home/Index'
import Game from './Game/Index'
import News from './News/Index'
import My from './My/Index'

  class TabBarApp extends React.Component {
    constructor({props,app,dispatch}){
        super(props);
        this.props=props;
    }
    componentDidMount(){
      this.props.history.push('/home')
    }
    changeTabBar=(tabBarItem)=>{
      this.props.dispatch({
        type: 'app/changeTabBar',
        selectedTab: tabBarItem,
      });
    }

    render(){
      const app=this.props.app;
      console.log(this.props)
      return (
        <div style={app.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
          <TabBar
            unselectedTintColor="#949494" // 未选中文字颜色
            tintColor="#33A3F4"           // 选中的文字颜色
            barTintColor="white"          // 整体部分背景色
            hidden={app.hidden}    // 是否隐藏
          >
            <TabBar.Item                  // 子元素
              title="主页"
              key="home"
              // 未选中图标
              icon={<Link to='/home' style={{color: 'rgb(148, 148, 148)'}}><Icon type="home" style={{fontSize:'22px'}} /></Link>}
              // 选中图标样式
              selectedIcon={<Icon type="home" style={{fontSize:'22px'}} />}
              // 是否选中状态
              selected={app.selectedTab === 'blueTab'}
              onPress={()=>{this.changeTabBar('blueTab')}}
              badge={1}  // 红色数字提示
              // data-seed="logId"
            > 
              <Route path='/home' exact  component={Home}/>
            </TabBar.Item>
            <TabBar.Item
              title="比赛"
              key="match"
              icon={<Link to="/game" style={{color: 'rgb(148, 148, 148)'}}><Icon type="rocket" style={{fontSize:'22px'}} /></Link>}
              selectedIcon={<Icon type="rocket" style={{fontSize:'22px'}} />}
              selected={app.selectedTab === 'redTab'}
              onPress={()=>this.changeTabBar('redTab')}
              badge={'new'}
            >
              <Route path='/game'  component={Game}/>
            </TabBar.Item>
            <TabBar.Item
              title="新闻"
              key="news"
              icon={<Link to="/news" style={{color: 'rgb(148, 148, 148)'}}><Icon type="form" style={{fontSize:'22px'}} /></Link>}
              selectedIcon={<Icon type="form" style={{fontSize:'22px'}} />}
              selected={app.selectedTab === 'greenTab'}
              onPress={()=>this.changeTabBar('greenTab')}
              dot
            >
              <Route path='/news' exact component={News}/>
            </TabBar.Item>
            <TabBar.Item
              title="我"
              key="my"
              icon={<Link to='/my' style={{color: 'rgb(148, 148, 148)'}}><Icon type="user" style={{fontSize:'22px'}} /></Link>}
              selectedIcon={<Icon type="user" style={{fontSize:'22px'}} />}
              selected={app.selectedTab === 'yellowTab'}
              onPress={()=>this.changeTabBar('yellowTab')}
            >
              <Route path='/my' exact component={My}/>
            </TabBar.Item>
          </TabBar>
        </div>
      );
    }
}

export default connect(({app})=>({app}))(TabBarApp);