import React from 'react';
import Drawer from 'rc-drawer';
import ReactDOM from 'react-dom';
import {Modal,Button,Tooltip,Affix,Layout, Menu, Icon,Row, Col,BackTop} from 'vdap-ui';
import Header from './Header';
import Sidebar from './Sidebar';
import Aside from './Aside';
import  {affixData,sideNavConfig,sideNavPin} from 'actions/ui/uiAction';
import { connect } from 'react-redux';
import SideNavConfig from './SideNavConfig';
import Favorites from './Favorites';
import './layout.css';

const {Content} = Layout;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MainApp extends React.Component {
  state = {
      visible:false
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }

    onOpenChange=(open) =>{
	    console.log('onOpenChange', open);
	    this.setState({ open });
	  };

    setMenusClick = () => {
       const {dispatch} = this.props;
      dispatch(sideNavConfig(SideNavConfig.menus));
      this.setState({ visible: true });
    };
    setRolesClick = () => {
      const {dispatch} = this.props;
      dispatch(sideNavConfig(SideNavConfig.roles));
      this.setState({ visible: true });
    };
    setFavoritesClick = () => {
       const {dispatch} = this.props;
      dispatch(sideNavConfig(SideNavConfig.favorites));
      this.setState({ visible: true });
    };

    setTitlesClick = () => {
       const {dispatch} = this.props;
      dispatch(sideNavPin(SideNavConfig.titles));
    };


  render() {
    const {children, location, routes, params} = this.props;
    const siderMenu = (<Favorites />);

    return (
      <Layout style={{ height: '100vh' }}>

        <div style={{width:'240px',height:'70px',backgroundColor:'#2a5bb5',position:'absolute',overflow: 'auto'}}>
          <img alt="example" src={require('assets/images/ui/1.png')} style={{width:'200px',height:'70px'}} />
          </div>

        <Sidebar {...this.props}>
        </Sidebar>

        <Layout>
          <Header/>

          <Content style={{margin:'90px 20px 0 20px',padding:'10px 10px 0 10px',backgroundColor:'#ffffff',overflow: 'auto'}}>
            <div id='main-content-div'>
            {children}
            </div>
            <BackTop target={() => document.getElementById('main-content-div')}/>
          </Content>
        </Layout>
         

       <Modal
        title=""
        width='240px'
        style={{ top: 0,left:0,position:'absolute'}}
        visible={this.state.visible}
        closable
        onCancel={this.hideModal}
        footer={null}
        >
         {siderMenu}
        </Modal>

      </Layout>

    );
  }

   componentDidMount() {
     this.setTitlesClick();
   }
}
const mapStateToProps = (state, ownProps) => {
  return {
    fixedSide: state.settings.fixedSide,
    sideCollapsed: state.settings.sideCollapsed,
    fixedAside: state.settings.fixedAside,
    fixedHeader: state.settings.fixedHeader,
    hideAside: state.settings.hideAside,
    sidebarWidth : state.settings.sidebarWidth,
    theme: state.settings.theme,
  };
}
export default connect(
  mapStateToProps
)(MainApp);

