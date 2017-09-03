const date = new Date();
const year = date.getFullYear();

const APPCONFIG = {
  brand: '北京东软望海科技有限公司',
  user: 'demo',
  year: year,
  productLink: 'http://www.viewhigh.com',
  PublicURL:'/',
  color: {
    primary: '#00BCD4',
    success: '#8BC34A',
    info: '#66BB6A',
    infoAlt: '#7E57C2',
    warning: '#FFCA28',
    danger: '#F44336',
    text: '#3D4051',
    gray: '#EDF0F1'
  },
  settings: {
    fixedSidebar: true,                             // true, false
    fixedAside: true,                               // true, false
    fixedHeader: true,                              // true, false
    hideAside: true,
    hideSidebar: true,
    collapsedSidebar: false,                            // true, false
    sidebarWidth: 'middle',                         // small, middle, large
    colorOption: '14',                              // String: 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
    theme: 'light',                                 // light, gray, dark
  }
};


export default APPCONFIG;
