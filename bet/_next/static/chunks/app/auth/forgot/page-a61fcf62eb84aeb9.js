(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3281],{39301:function(e,t,r){Promise.resolve().then(r.t.bind(r,25250,23)),Promise.resolve().then(r.bind(r,80268))},47907:function(e,t,r){"use strict";var n=r(15313);r.o(n,"useParams")&&r.d(t,{useParams:function(){return n.useParams}}),r.o(n,"usePathname")&&r.d(t,{usePathname:function(){return n.usePathname}}),r.o(n,"useRouter")&&r.d(t,{useRouter:function(){return n.useRouter}})},80268:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return h}});var n=r(57437),s=r(82670),o=r(41991),a=r(87957),u=r(47907),i=r(32635),c=r(49222),l=r(79228),m=r(2265),d=r(61157),f=r(16541);function h(){let{t:e}=(0,i.$G)(),t=(0,u.useRouter)(),[r,h]=(0,m.useState)(!1),[p,g]=(0,m.useState)(!1),v=(0,m.useMemo)(()=>o.Ry({username:o.Z_().required(e("required-username"))}),[e]),{setError:y,register:x,handleSubmit:b,formState:{errors:w}}=(0,s.cI)({resolver:(0,a.X)(v)}),k=async r=>{try{h(!0),await f.O.forgot({username:r.username}),g(!0),setTimeout(()=>{t.push("/")},5e3)}catch(t){(null==t?void 0:t.data.message)==="User has no email registered"?y("username",{message:e("user-has-no-email"),type:"error"}):(null==t?void 0:t.status)===404?y("username",{message:e("username-not-registered"),type:"error"}):(y("username",{message:e("something-went-wrong"),type:"error"}),console.error(t))}finally{h(!1)}};return p?(0,n.jsx)("p",{className:"text-center text-green-500 font-semibold text-sm",children:e("check-your-email")}):(0,n.jsxs)("form",{className:"w-full",onSubmit:b(k),children:[(0,n.jsxs)("div",{className:"mb-4",children:[(0,n.jsx)(c.Z,{type:"text",id:"username",placeholder:e("username"),...x("username")}),w.username?(0,n.jsx)(d.Z,{children:w.username.message}):null]}),(0,n.jsx)(l.Z,{className:"w-full",isLoading:r,type:"submit",children:e("recover-password")})]})}},79228:function(e,t,r){"use strict";r.d(t,{Z:function(){return u}});var n=r(57437),s=r(2265),o=r(42022),a=r(72522);function u(e){let{children:t,isLoading:r,variant:u="primary",paddingClassName:i="px-3 md:px-5 py-2 md:py-3",info:c,onClick:l,...m}=e,[d,f]=(0,s.useState)(!1);return(0,a.$)({setShow:f,show:d}),(0,n.jsxs)("button",{onClick:e=>{l&&l(e),c&&f(!d)},...m,className:"\n          rounded-lg text-xs md:text-sm font-bold flex \n          justify-center items-center disabled:opacity-40 \n          transition ".concat(i," relative\n          ").concat({primary:"bg-custom-yellow hover:bg-custom-dark-yellow active:bg-custom-yellow text-custom-dark-violet-2",outlined:"bg-custom-violet hover:text-gray-300 border border-custom-violet hover:border-custom-yellow",secondary:"bg-custom-light-violet hover:bg-violet-600 hover:text-gray-200 text-white",success:"bg-custom-green hover:opacity-80 active:opacity-70",error:"bg-custom-red hover:opacity-80 active:opacity-70"}[u]," ").concat(m.className,"\n      "),children:[t," ",r&&(0,n.jsx)(o.Z,{color:"primary"===u?"dark":"light",className:"ml-2"}),c&&d&&(0,n.jsx)("div",{className:"\n              absolute bg-custom-violet \n              rounded-lg p-2 text-white\n              z-20 text-xs font-normal opacity-100\n              top-10 border border-custom-border\n          ",children:c})]})}},49222:function(e,t,r){"use strict";var n=r(57437);let s=r(2265).forwardRef(function(e,t){let{bgColor:r,...s}=e;return(0,n.jsx)("input",{...s,ref:t,className:"text-xs h-full md:text-sm rounded-lg \n        ".concat(r||"bg-custom-dark-violet-2"," focus:outline \n        focus:outline-custom-yellow block w-full \n          px-4 py-2 md:py-3 ").concat(e.className,"\n        ")})});t.Z=s},61157:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});var n=r(57437);function s(e){let{children:t,...r}=e;return(0,n.jsx)("div",{...r,className:"text-xs md:text-sm text-red-500 mt-1 ".concat(r.className),children:t})}r(2265)},42022:function(e,t,r){"use strict";r.d(t,{Z:function(){return o}});var n=r(57437),s=r(36852);function o(e){let{color:t="dark",size:r=16,...o}=e;return(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:r,height:r,viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid",...o,children:(0,n.jsx)("circle",{cx:"50",cy:"50",fill:"none",stroke:"dark"===t?s.jq:s.zC,strokeWidth:"10",r:"35",strokeDasharray:"164.93361431346415 56.97787143782138",children:(0,n.jsx)("animateTransform",{attributeName:"transform",type:"rotate",repeatCount:"indefinite",dur:"1s",values:"0 50 50;360 50 50",keyTimes:"0;1"})})})}},72522:function(e,t,r){"use strict";r.d(t,{$:function(){return s}});var n=r(2265);let s=e=>{let{setShow:t,show:r}=e;(0,n.useEffect)(()=>{let e=()=>{r&&t(!1)};return document.addEventListener("click",e),()=>{document.removeEventListener("click",e)}},[t,r])}},98339:function(e,t,r){"use strict";r.d(t,{E7:function(){return u},GV:function(){return c},ki:function(){return i}});var n=r(59317),s=r(71126);n.Z.defaults.baseURL="https://api.betcointoken.com";let o=null,a=e=>e.data;n.Z.interceptors.request.use(async e=>(o||(o=await (0,s.getSession)()),(null==o?void 0:o.accessToken)&&(e.headers.Authorization="Bearer ".concat(o.accessToken)),e)),n.Z.interceptors.response.use(async e=>e,e=>{if(!e.response)return Promise.reject(e);let{status:t}=e.response;return 401===t&&(0,s.signOut)({callbackUrl:"/"}),Promise.reject(e.response)});let u={get:(e,t,r)=>n.Z.get(e,{...r,params:{...t}}).then(a),post:(e,t)=>n.Z.post(e,t).then(a),put:(e,t)=>n.Z.put(e,t).then(a),delete:e=>n.Z.delete(e).then(a),postForm:(e,t)=>n.Z.post(e,t,{headers:{"Content-Type":"multipart/form-data"}}).then(a)},i=e=>{let t=new FormData;for(let r in e)t.append(r,e[r]);return t},c=(e,t)=>{let r=new FormData;for(let n=0;n<t.length;n++)for(let s in t[n])void 0!=t[n][s]&&null!=t[n][s]&&r.append("".concat(e,"[").concat(n,"][").concat(s,"]"),t[n][s]);return r}},16541:function(e,t,r){"use strict";r.d(t,{O:function(){return s}});var n=r(98339);let s={forgot:e=>n.E7.post("auth/forgot",e),reset:e=>n.E7.post("auth/reset",e),forgotUsername:e=>n.E7.post("auth/forgot-username",e),resetByPhone:e=>n.E7.post("auth/reset-by-phone",e)}},36852:function(e,t,r){"use strict";r.d(t,{O9:function(){return o},jq:function(){return n},zC:function(){return s}});let n="#170D1C",s="#9747FF",o={violet:"#230e2f",darkViolet:"#130516",darkViolet2:n,lightViolet:s,yellow:"#ffd200",darkYellow:"#D2AC03",white:"#FFFFFF",darkVioletTransparent:"#130516F2",lightViolet2:"#440073",lightGray:"#9CA3AF",red:"#FF006B",green:"#00FF66",ligthGray:"#949494"}}},function(e){e.O(0,[9648,9317,5342,5250,2971,8069,1744],function(){return e(e.s=39301)}),_N_E=e.O()}]);