(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{35:function(e,n,t){e.exports=t(97)},40:function(e,n,t){},97:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(5),i=t.n(o),l=(t(40),t(20)),c=t(21),u=t(33),p=t(22),d=t(34),s=t(4),m=t(23),h=t.n(m),g=t(1),f=t(30),b=t(27),v=t(7),_=t.n(v),C=t(9),w=t(28),E=t.n(w),y=t(29),I=t.n(y),k=t(12);function O(){var e=Object(s.a)(["\n  width: 100%;\n\n  .select-control {\n    border-radius: 2em;\n    background: #eee;\n  }\n\n  .select-input {\n    margin-left: 0.5em;\n  }\n"]);return O=function(){return e},e}var j=Object(g.default)(_.a)(O()),T=function(e){var n=e.triggerNextStep,t=(e.steps,L()),o=Object(a.useState)(!1),i=Object(k.a)(o,2),l=i[0],c=i[1],u=Object(a.useState)(t[0].value),p=Object(k.a)(u,2),d=p[0],s=p[1];return r.a.createElement(j,{value:d,disabled:l,options:t,virtualized:!0,classes:{selectControl:"select-control",selectInput:"select-input"},onChange:function(e){s(e),c(!0),n({value:D[e]})}})},S=[{key:"us",value:"us",flag:"us",label:"United States"},{key:"vn",value:"vn",flag:"vn",label:"Vietnam"},{key:"rs",value:"rs",flag:"rs",label:"Serbia"}],A=["atlanticCod","blueCrab","dolphinFish","grouper","kingCrab","pacificCod","redSnapper","seaCucumber","shark","swordfish","albacoreTuna","bigeyeTuna","skipjackTuna","yellowfinTuna","bluefinTuna"],D=new I.a({en:{input_placeholder:"Type your answer . . .",atlanticCod:"Atlantic Cod",blueCrab:"Blue Crab (Atlantic)",dolphinFish:"Dolphinfish (Mahi Mahi)",grouper:"Grouper",kingCrab:"King Crab (red)",pacificCod:"Pacific Cod",redSnapper:"Red Snapper",seaCucumber:"Sea Cucumber",shark:"Shark",swordfish:"Swordfish",albacoreTuna:"Albacore Tuna",bigeyeTuna:"Bigeye Tuna",skipjackTuna:"Skipjack Tuna",yellowfinTuna:"Yellowfin Tuna",bluefinTuna:"Bluefin Tuna",prompt_welcome:"Welcome back Captain!",prompt_end:"See you soon Captain!",prompt_anotherOne:"What else can I add for you Captain?",prompt_unavailable:"I'm sorry Captain, I'm afraid I can't do that . . .",prompt_initial:"What would you like to add?",addNew:"Add new",catch:"Catch \ud83d\udc1f",transport:"Transport \ud83d\udea2",landing:"Landing \u2693",sale:"Sale \ud83d\udcb0",nothing:"I'm good \ud83d\ude01",prompt_nothing:"Smooth sail \ud83d\udca8",prompt_catch:"What did you caught?",prompt_quantity:"How many {previousValue} did you caught?",prompt_preservation:"How are you preserving them?",prompt_catchCongrat:"\ud83d\udc1f Congratulation on the catch! \ud83d\udc1f",chilled:"Frozen \u2744",salted:"Dried \u2668",fresh:"Fresh \u2728",prompt_landing:"Have you finished unpacking?",prompt_landingConfirm:"\u2693 Your time, container, and geolocation has been automatically recorded! Please review the data for accuracy:",inprogress:"Inprogress \u23f3",finished:"Finished \ud83c\udfc1",prompt_confirmData:"Does the data seems accurate?",dataIsAccurate:"Yes",dataIsInaccurate:"No",prompt_errorReported:"I have reported this error to our engineer. TODO: Continue this flow to add self-input data",date:"Date",time:"Time",timeZone:"Time Zone",container:"Container",geoLocation:"Location"},vn:{input_placeholder:"Xin giao nh\u1eadp th\xf4ng tin",prompt_welcome:"Ch\xe0o m\u1eebng tr\u1edf l\u1ea1i thuy\u1ec1n tr\u01b0\u1edfng!",prompt_end:"H\u1eb9n g\u1eb7p l\u1ea1i thuy\u1ec1n tr\u01b0\u1edfng!",prompt_unavailable:"Xin l\u1ed7i Thuy\u1ec1n tr\u01b0\u1edfng, ph\u1ea7n m\u1ec1m ch\u01b0a \u0111\u01b0\u1ee3c c\xe0i \u0111\u1eb7t  . . .",prompt_initial:"Thuy\u1ec1n tr\u01b0\u1edfng mu\u1ed1n l\xe0m g\xec??",addNew:"Th\xeam m\u1edbi",catch:"B\u1eaft \ud83d\udc1f",transport:"Di chuy\u1ec3n \ud83d\udea2",landing:"H\u1ea1 c\xe1nh \u2693",sale:"Giao b\xe1n \ud83d\udcb0",prompt_catch:"Lo\u1ea1i b\u1eaft n\xe0o?"},rs:{input_placeholder:"\u0420\u0435\u0446\u0438\u0442\u0435 \u043a\u0430\u043f\u0435\u0442\u0430\u043d\u0443 \u0410\u0445\u043e\u0438!",prompt_welcome:"\u0414\u043e\u0431\u0440\u043e\u0434\u043e\u0448\u043b\u0438 \u043d\u0430\u0437\u0430\u0434 \u043a\u0430\u043f\u0435\u0442\u0430\u043d\u0435!",prompt_end:"\u0412\u0438\u0434\u0438\u043c\u043e \u0441\u0435 \u0443\u0441\u043a\u043e\u0440\u043e \u043a\u0430\u043f\u0435\u0442\u0430\u043d\u0435!",prompt_unavailable:"\u0416\u0430\u043e \u043c\u0438 \u0458\u0435 \u043a\u0430\u043f\u0435\u0442\u0430\u043d\u0435, \u0431\u043e\u0458\u0438\u043c \u0441\u0435 \u0434\u0430 \u0442\u043e \u043d\u0435 \u043c\u043e\u0433\u0443 \u0434\u0430 \u0443\u0440\u0430\u0434\u0438\u043c . . .",prompt_initial:"\u0428\u0442\u0430 \u0436\u0435\u043b\u0438\u0442\u0435 \u0434\u0430 \u0440\u0430\u0434\u0438\u0442\u0435?",addNew:"\u0414\u043e\u0434\u0430\u0458 \u043d\u043e\u0432\u043e",catch:"\u0426\u0430\u0442\u0446\u0445 \ud83d\udc1f",prompt_catch:"\u041a\u0430\u043a\u0432\u0430 \u0432\u0440\u0441\u0442\u0430 \u0443\u043b\u043e\u0432\u0430?",transport:"\u0422\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442 \ud83d\udea2",landing:"\u0421\u043b\u0435\u0442\u0430\u045a\u0435 \u2693",sale:"\u041f\u0440\u043e\u0434\u0430\u0458\u0430  \ud83d\udcb0"}}),L=function(){return A.map(function(e){return{value:e,label:D[e]}})},B={savedLanguage:"NEMO_LANGUAGE"},N=function(e){return{value:e,label:D[e]}},x=["prompt_landing","add_landingDisposition","prompt_landingConfirm","prompt_confirmData","add_confirmData","prompt_checkConfirm","prompt_anotherOne"],F=function(){return[{id:"prompt_landing",hideInput:!0},{id:"add_landingDisposition",options:["inprogress","finished"].map(N)},{id:"prompt_landingConfirm",component:r.a.createElement("div",null,D.prompt_landingConfirm,r.a.createElement("hr",null),r.a.createElement("table",null,r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"\ud83d\udcc5"),r.a.createElement("td",null,D.date),r.a.createElement("td",null,"2016-12-14")),r.a.createElement("tr",null,r.a.createElement("td",null,"\u231a"),r.a.createElement("td",null,D.time),r.a.createElement("td",null,"11:33:00.125+08:00")),r.a.createElement("tr",null,r.a.createElement("td",null,"\ud83d\udea2"),r.a.createElement("td",null," ",D.container),r.a.createElement("td",null,"f5c5ab8f-8bcf-446a-8dea-4cb625316ffd")),r.a.createElement("tr",null,r.a.createElement("td",null,"\ud83d\udccd"),r.a.createElement("td",null,D.geoLocation),r.a.createElement("td",null,"geo:22.58425,120.31815")))))},{id:"prompt_confirmData",hideInput:!0},{id:"add_confirmData",hideInput:!0,options:["dataIsAccurate","dataIsInaccurate"].map(N)},{id:"prompt_checkConfirm",hideInput:!0,message:function(e){return"dataIsInaccurate"===e.previousValue?D.prompt_errorReported:"\u2714"}}].map(function(e,n){return H(e,n,x)})},W=["prompt_catch","add_catch","prompt_quantity","add_quantity","prompt_preservation","add_preservation","prompt_catchCongrat","prompt_anotherOne"],q=function(){return[{id:"prompt_catch",hideInput:!0},{id:"add_catch",component:r.a.createElement(T,null),hideInput:!0,replace:!1,waitAction:!0},{id:"prompt_quantity",hideInput:!0},{id:"add_quantity",user:!0,validator:function(e){return!(isNaN(e)||e<=0)||"It should be a number greater than 0!"}},{id:"prompt_preservation",hideInput:!0},{id:"add_preservation",hideInput:!0,options:["chilled","salted","fresh"].map(N)},{id:"prompt_catchCongrat",component:r.a.createElement(E.a,{ref:function(e){return e.rewardMe()},type:"emoji",config:{emoji:["\ud83d\udc1f","\ud83e\udd90","\ud83d\udc19","\ud83e\udd80","\ud83d\udc33","\ud83d\udc0b","\ud83d\udc2c","\ud83e\udd91","\ud83d\udc21","\ud83e\udd88"]}},r.a.createElement("div",null,D.prompt_catchCongrat))}].map(function(e,n){return H(e,n,W)})},H=function(e,n,t){var a=t[n+1];return e.options?e.options=e.options.map(function(e){return e.trigger=a,e}):(e.trigger=a,!e.hideInput||e.waitAction||e.message||(e.message=D[e.id])),e};function z(){var e=Object(s.a)(["\n  width: 9em;\n  margin-right: 2em;\n\n  .select-control {\n    border-radius: 2em;\n    background: #eee;\n  }\n\n  .select-input {\n    margin-left: 0.5em;\n  }\n  \n  .select-label {\n      color: #000;\n  }\n"]);return z=function(){return e},e}function G(){var e=Object(s.a)(["\n  height: 3.6em;\n  background: ",";\n  color: ",";\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-direction: row;\n\n  h1 {\n    font-size: 1.8em;\n    margin-left: 2em;\n  }\n"]);return G=function(){return e},e}var M=g.default.div(G(),function(e){return e.theme.headerBgColor},function(e){return e.theme.headerFontColor}),R=Object(g.default)(_.a)(z()),P=function(e){var n=e.language,t=e.onLanguageChanged;return r.a.createElement(M,null,r.a.createElement("h1",null,"Nemo"),r.a.createElement(R,{value:n,options:S,classes:{selectControl:"select-control",selectInput:"select-input"},valueRenderer:function(e){var n=e.value,t=e.label;return r.a.createElement("div",null,r.a.createElement(b.a,{code:n,svg:!0})," ",r.a.createElement("span",{className:"select-label"},t))},onChange:function(e){t(e)}}))},U={background:"#f5f8fb",headerBgColor:"#00b0ff",headerFontColor:"#fff",botBubbleColor:"#00b0ff",botFontColor:"#fff",userBubbleColor:"#fff",userFontColor:"#4a4a4a"};function V(){var e=Object(s.a)(["\n  width: 4em;\n  height: 4em;\n  border-radius: 50%;\n  position: absolute;\n  border: none;\n  bottom: 5em;\n  z-index: 1000;\n  background: ",";\n  color: ",";\n  button:focus {\n    outline: none;\n  }\n"]);return V=function(){return e},e}function Y(){var e=Object(s.a)(["\n  width: 90%;\n  height: 90%;\n  .rsc-os-options {\n    display: flex;\n    flex-flow: wrap;\n    flex-direction: row-reverse;\n  }\n"]);return Y=function(){return e},e}function J(){var e=Object(s.a)(["\n  width: 100vw;\n  height: 100vh;\n  justify-content: space-evenly;\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n"]);return J=function(){return e},e}var X=g.default.div(J()),Z=Object(g.default)(h.a)(Y()),K=g.default.button(V(),function(e){return e.theme.headerBgColor},function(e){return e.theme.headerFontColor}),$=function(){return r.a.createElement(K,null,r.a.createElement(f.a,{onClick:function(){return window.location.reload()}}))},Q=function(e){function n(){var e,t;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(t=Object(u.a)(this,(e=Object(p.a)(n)).call.apply(e,[this].concat(r)))).state={language:localStorage.getItem(B.savedLanguage)||S[0].value,hasEnded:!1},t.handleLanguageChanged=function(e){localStorage.setItem(B.savedLanguage,e),localStorage.removeItem("rsc_cache"),window.location.reload()},t.handleEnd=function(e){e.steps,e.values;t.setState({hasEnded:!0})},t}return Object(d.a)(n,e),Object(c.a)(n,[{key:"render",value:function(){D.setLanguage(this.state.language);var e=[{id:"prompt_welcome",hideInput:!0,message:function(){return D.prompt_welcome},trigger:"prompt_initial"},{id:"prompt_initial",hideInput:!0,message:function(){return D.prompt_initial},trigger:"prompt_events"},{id:"prompt_anotherOne",hideInput:!0,message:function(){return D.prompt_anotherOne},trigger:"prompt_events"},{id:"prompt_nothing",hideInput:!0,message:function(){return D.prompt_nothing},trigger:"prompt_end"},{id:"prompt_events",hideInput:!0,options:["catch","transport","landing","sale","nothing"].map(function(e){return{value:e,label:"".concat(D[e]),trigger:"prompt_".concat(e)}})}].concat(Object(C.a)(["transport","sale"].map(function(e){return{id:"prompt_".concat(e),message:function(){return D.prompt_unavailable},trigger:"prompt_end"}})),Object(C.a)(q()),Object(C.a)(F()),[{id:"prompt_end",hideInput:!0,message:function(){return D.prompt_end},end:!0}]);return r.a.createElement(g.ThemeProvider,{theme:U},r.a.createElement(X,null,this.state.hasEnded&&r.a.createElement($,null),r.a.createElement(Z,Object.assign({},this.props,{headerComponent:r.a.createElement(P,{language:this.state.language,onLanguageChanged:this.handleLanguageChanged}),botAvatar:"assets/avatar.png",hideUserAvatar:!0,cache:!0,userAvatar:"assets/captain.png",placeholder:D.placeholder,userDelay:0,steps:e,handleEnd:this.handleEnd}))))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(Q,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[35,1,2]]]);
//# sourceMappingURL=main.76a89332.chunk.js.map