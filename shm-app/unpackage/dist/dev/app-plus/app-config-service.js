
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/app/index","pages/home/sort","pages/home/search","pages/home/sort_list","pages/goods/reward","pages/goods/second_hand","pages/goods/second_terrace","pages/goods/settlement","pages/goods/pay","pages/status/pay_status","pages/news/notice","pages/news/details","pages/news/chat","pages/my/footmark","pages/my/login","pages/my/set-up","pages/my/personal-data","pages/my/edit-name","pages/my/edit-synopsis","pages/my/address","pages/my/edit-address","pages/my/add-address","pages/my/edit-phone","pages/my/edit-email","pages/my/contact-cards","pages/my/region","pages/real_name/index","pages/real_name/form","pages/order/list","pages/order/whereabouts","pages/order/details","pages/order/sell-details","pages/order/appraise","pages/order/view_appraise","pages/order/add_appraise","pages/my/register","pages/my/myRelease","pages/goods/update","pages/goods/sell-contact","pages/goods/check-address","pages/test","pages/goods/search_result","pages/goods/release"],"window":{"navigationStyle":"custom"},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"二手商城","compilerVersion":"3.4.5","entryPagePath":"pages/app/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/app/index","meta":{"isQuit":true},"window":{}},{"path":"/pages/home/sort","meta":{},"window":{}},{"path":"/pages/home/search","meta":{},"window":{}},{"path":"/pages/home/sort_list","meta":{},"window":{}},{"path":"/pages/goods/reward","meta":{},"window":{}},{"path":"/pages/goods/second_hand","meta":{},"window":{}},{"path":"/pages/goods/second_terrace","meta":{},"window":{}},{"path":"/pages/goods/settlement","meta":{},"window":{}},{"path":"/pages/goods/pay","meta":{},"window":{}},{"path":"/pages/status/pay_status","meta":{},"window":{}},{"path":"/pages/news/notice","meta":{},"window":{}},{"path":"/pages/news/details","meta":{},"window":{}},{"path":"/pages/news/chat","meta":{},"window":{}},{"path":"/pages/my/footmark","meta":{},"window":{}},{"path":"/pages/my/login","meta":{},"window":{}},{"path":"/pages/my/set-up","meta":{},"window":{}},{"path":"/pages/my/personal-data","meta":{},"window":{}},{"path":"/pages/my/edit-name","meta":{},"window":{}},{"path":"/pages/my/edit-synopsis","meta":{},"window":{}},{"path":"/pages/my/address","meta":{},"window":{}},{"path":"/pages/my/edit-address","meta":{},"window":{}},{"path":"/pages/my/add-address","meta":{},"window":{}},{"path":"/pages/my/edit-phone","meta":{},"window":{}},{"path":"/pages/my/edit-email","meta":{},"window":{}},{"path":"/pages/my/contact-cards","meta":{},"window":{}},{"path":"/pages/my/region","meta":{},"window":{}},{"path":"/pages/real_name/index","meta":{},"window":{}},{"path":"/pages/real_name/form","meta":{},"window":{}},{"path":"/pages/order/list","meta":{},"window":{}},{"path":"/pages/order/whereabouts","meta":{},"window":{}},{"path":"/pages/order/details","meta":{},"window":{}},{"path":"/pages/order/sell-details","meta":{},"window":{}},{"path":"/pages/order/appraise","meta":{},"window":{}},{"path":"/pages/order/view_appraise","meta":{},"window":{}},{"path":"/pages/order/add_appraise","meta":{},"window":{}},{"path":"/pages/my/register","meta":{},"window":{}},{"path":"/pages/my/myRelease","meta":{},"window":{}},{"path":"/pages/goods/update","meta":{},"window":{}},{"path":"/pages/goods/sell-contact","meta":{},"window":{}},{"path":"/pages/goods/check-address","meta":{},"window":{}},{"path":"/pages/test","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/goods/search_result","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/goods/release","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
