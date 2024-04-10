(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3411],{33318:function(e,t,r){Promise.resolve().then(r.t.bind(r,25250,23)),Promise.resolve().then(r.bind(r,10602))},47907:function(e,t,r){"use strict";var n=r(15313);r.o(n,"useParams")&&r.d(t,{useParams:function(){return n.useParams}}),r.o(n,"usePathname")&&r.d(t,{usePathname:function(){return n.usePathname}}),r.o(n,"useRouter")&&r.d(t,{useRouter:function(){return n.useRouter}})},10602:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return b}});var n=r(57437),o=r(82670),s=r(41991),a=r(87957),i=r(47907),u=r(32635),c=r(79228),l=r(2265),d=r(61157),h=r(16541),m=r(80554),p=r(43726),f=r(87470);function b(){let{t:e}=(0,u.$G)(),t=(0,i.useRouter)(),[r,b]=(0,l.useState)(!1),[g,v]=(0,l.useState)(p.Z8),{setError:y,handleSubmit:x,setValue:k,formState:{errors:w}}=(0,o.cI)({resolver:(0,a.X)(s.Ry({phone:s.Z_().required(e("required-phone")).test("isPhoneNumberValid",e("invalid-phone"),function(e){return(0,f.r)(e,g)})}))}),C=(0,l.useCallback)(async r=>{try{b(!0);let e=await h.O.forgotUsername({phone:r.phone});t.push("/auth/reset-by-phone/".concat(e.verificationToken))}catch(t){(null==t?void 0:t.data.message)==="No customers"?y("phone",{message:e("phone-number-not-registered"),type:"error"}):(y("phone",{message:e("something-went-wrong"),type:"error"}),console.error(t))}finally{b(!1)}},[t,y,e]);return(0,n.jsxs)("form",{className:"w-full",onSubmit:x(C),children:[(0,n.jsxs)("div",{className:"mb-4",children:[(0,n.jsx)("div",{className:"mb-4 text-sm text-center",children:(0,n.jsxs)("label",{children:[e("enter-phone-number"),":"]})}),(0,n.jsx)(m.Z,{onChange:(e,t)=>{k("phone",e,{shouldValidate:!0}),v(t.countryCode.toUpperCase())}}),w.phone?(0,n.jsx)(d.Z,{children:w.phone.message}):null]}),(0,n.jsx)(c.Z,{className:"w-full",isLoading:r,disabled:r,type:"submit",children:e("recover")})]})}},79228:function(e,t,r){"use strict";r.d(t,{Z:function(){return i}});var n=r(57437),o=r(2265),s=r(42022),a=r(72522);function i(e){let{children:t,isLoading:r,variant:i="primary",paddingClassName:u="px-3 md:px-5 py-2 md:py-3",info:c,onClick:l,...d}=e,[h,m]=(0,o.useState)(!1);return(0,a.$)({setShow:m,show:h}),(0,n.jsxs)("button",{onClick:e=>{l&&l(e),c&&m(!h)},...d,className:"\n          rounded-lg text-xs md:text-sm font-bold flex \n          justify-center items-center disabled:opacity-40 \n          transition ".concat(u," relative\n          ").concat({primary:"bg-custom-yellow hover:bg-custom-dark-yellow active:bg-custom-yellow text-custom-dark-violet-2",outlined:"bg-custom-violet hover:text-gray-300 border border-custom-violet hover:border-custom-yellow",secondary:"bg-custom-light-violet hover:bg-violet-600 hover:text-gray-200 text-white",success:"bg-custom-green hover:opacity-80 active:opacity-70",error:"bg-custom-red hover:opacity-80 active:opacity-70"}[i]," ").concat(d.className,"\n      "),children:[t," ",r&&(0,n.jsx)(s.Z,{color:"primary"===i?"dark":"light",className:"ml-2"}),c&&h&&(0,n.jsx)("div",{className:"\n              absolute bg-custom-violet \n              rounded-lg p-2 text-white\n              z-20 text-xs font-normal opacity-100\n              top-10 border border-custom-border\n          ",children:c})]})}},80554:function(e,t,r){"use strict";r.d(t,{Z:function(){return l}});var n=r(57437),o=r(36852),s=r(20167),a=r.n(s),i=r(39249),u=r(32635);r(40561);var c=r(43726);function l(e){let{onChange:t,value:r,disabled:s,title:l,countryCodeEditable:d=!1}=e,{t:h}=(0,u.$G)();return(0,n.jsx)("div",{title:l,children:(0,n.jsx)(a(),{disabled:s,autoFormat:!1,countryCodeEditable:d,enableSearch:!0,searchPlaceholder:h("search"),containerClass:"custom-phone-input-container",containerStyle:{backgroundColor:o.O9.darkViolet2,borderRadius:8},inputStyle:{backgroundColor:o.O9.darkViolet2,width:"100%",border:"none"},dropdownStyle:{backgroundColor:o.O9.darkViolet2},buttonStyle:{backgroundColor:o.O9.darkViolet2,border:"none"},searchStyle:{backgroundColor:o.O9.darkViolet2,width:"80%",border:"none"},country:c.Z8.toLowerCase(),localization:i,onChange:t,value:r})})}},61157:function(e,t,r){"use strict";r.d(t,{Z:function(){return o}});var n=r(57437);function o(e){let{children:t,...r}=e;return(0,n.jsx)("div",{...r,className:"text-xs md:text-sm text-red-500 mt-1 ".concat(r.className),children:t})}r(2265)},42022:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});var n=r(57437),o=r(36852);function s(e){let{color:t="dark",size:r=16,...s}=e;return(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:r,height:r,viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid",...s,children:(0,n.jsx)("circle",{cx:"50",cy:"50",fill:"none",stroke:"dark"===t?o.jq:o.zC,strokeWidth:"10",r:"35",strokeDasharray:"164.93361431346415 56.97787143782138",children:(0,n.jsx)("animateTransform",{attributeName:"transform",type:"rotate",repeatCount:"indefinite",dur:"1s",values:"0 50 50;360 50 50",keyTimes:"0;1"})})})}},72522:function(e,t,r){"use strict";r.d(t,{$:function(){return o}});var n=r(2265);let o=e=>{let{setShow:t,show:r}=e;(0,n.useEffect)(()=>{let e=()=>{r&&t(!1)};return document.addEventListener("click",e),()=>{document.removeEventListener("click",e)}},[t,r])}},98339:function(e,t,r){"use strict";r.d(t,{E7:function(){return i},GV:function(){return c},ki:function(){return u}});var n=r(59317),o=r(71126);n.Z.defaults.baseURL="https://api.betcointoken.com";let s=null,a=e=>e.data;n.Z.interceptors.request.use(async e=>(s||(s=await (0,o.getSession)()),(null==s?void 0:s.accessToken)&&(e.headers.Authorization="Bearer ".concat(s.accessToken)),e)),n.Z.interceptors.response.use(async e=>e,e=>{if(!e.response)return Promise.reject(e);let{status:t}=e.response;return 401===t&&(0,o.signOut)({callbackUrl:"/"}),Promise.reject(e.response)});let i={get:(e,t,r)=>n.Z.get(e,{...r,params:{...t}}).then(a),post:(e,t)=>n.Z.post(e,t).then(a),put:(e,t)=>n.Z.put(e,t).then(a),delete:e=>n.Z.delete(e).then(a),postForm:(e,t)=>n.Z.post(e,t,{headers:{"Content-Type":"multipart/form-data"}}).then(a)},u=e=>{let t=new FormData;for(let r in e)t.append(r,e[r]);return t},c=(e,t)=>{let r=new FormData;for(let n=0;n<t.length;n++)for(let o in t[n])void 0!=t[n][o]&&null!=t[n][o]&&r.append("".concat(e,"[").concat(n,"][").concat(o,"]"),t[n][o]);return r}},16541:function(e,t,r){"use strict";r.d(t,{O:function(){return o}});var n=r(98339);let o={forgot:e=>n.E7.post("auth/forgot",e),reset:e=>n.E7.post("auth/reset",e),forgotUsername:e=>n.E7.post("auth/forgot-username",e),resetByPhone:e=>n.E7.post("auth/reset-by-phone",e)}},36852:function(e,t,r){"use strict";r.d(t,{O9:function(){return s},jq:function(){return n},zC:function(){return o}});let n="#170D1C",o="#9747FF",s={violet:"#230e2f",darkViolet:"#130516",darkViolet2:n,lightViolet:o,yellow:"#ffd200",darkYellow:"#D2AC03",white:"#FFFFFF",darkVioletTransparent:"#130516F2",lightViolet2:"#440073",lightGray:"#9CA3AF",red:"#FF006B",green:"#00FF66",ligthGray:"#949494"}},43726:function(e,t,r){"use strict";r.d(t,{IV:function(){return n},Z8:function(){return o},oT:function(){return s},vD:function(){return a}});let n=8,o="AR",s="jugalodos.com",a="betcoin.pro"},87470:function(e,t,r){"use strict";r.d(t,{r:function(){return s},s:function(){return a}});var n=r(14794);let o=r.n(n)().PhoneNumberUtil.getInstance(),s=(e,t)=>{let r=o.parseAndKeepRawInput(e,t);return o.isValidNumber(r)},a=e=>{let t=o.parseAndKeepRawInput("+"+e);return o.getRegionCodeForNumber(t)}}},function(e){e.O(0,[8760,9648,9317,5342,5250,816,2971,8069,1744],function(){return e(e.s=33318)}),_N_E=e.O()}]);