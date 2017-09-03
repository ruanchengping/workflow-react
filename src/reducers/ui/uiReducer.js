const uiReducer = (state = { sideNavConfig:[],sideNavPin:[]}, action) => {
	switch (action.type) {
	    case "sideNavConfig":
	      return {
	        ...state,
	        sideNavConfig: action. sideNavConfig
	      };
	      case "sideNavPin":
	      return {
	        ...state,
	        sideNavPin: action. sideNavPin
	      };
	    
	    default:
      		return state;  
	}
}
export default uiReducer;
