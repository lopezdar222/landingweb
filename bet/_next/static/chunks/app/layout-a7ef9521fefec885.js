(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3185],{17620:function(e,a,r){Promise.resolve().then(r.bind(r,91845)),Promise.resolve().then(r.bind(r,12301)),Promise.resolve().then(r.bind(r,26016)),Promise.resolve().then(r.t.bind(r,85935,23)),Promise.resolve().then(r.t.bind(r,10385,23)),Promise.resolve().then(r.bind(r,30298)),Promise.resolve().then(r.t.bind(r,63385,23)),Promise.resolve().then(r.t.bind(r,88062,23)),Promise.resolve().then(r.bind(r,28300)),Promise.resolve().then(r.bind(r,23338))},20336:function(e,a,r){"use strict";r.d(a,{Z:function(){return s}});var o=r(57437),i=r(8792),n=r(79228);function s(e){let{children:a,href:r,target:s,...t}=e;return(0,o.jsx)(i.default,{href:r,target:s,className:t.className||"",children:(0,o.jsx)(n.Z,{...t,children:a})})}},28300:function(e,a,r){"use strict";r.r(a),r.d(a,{default:function(){return N}});var o=r(57437),i=r(32635),n=r(79228),s=r(71126),t=r(20336),d=r(47907),l=r(67169),c=r(84205),u=r(28167),m=r(36852),p=r(53329),g=r(80685),f=r(68418),h=r(6220),b=r(2265);function v(){let{t:e}=(0,i.$G)(),{socket:a}=(0,g.m)(),[r,n]=(0,b.useState)(),{data:t}=(0,s.useSession)(),d=(0,b.useCallback)(()=>{f.C.getMyBalance().then(e=>{let{balance:a}=e;"number"==typeof a&&n(a)})},[]);return((0,b.useEffect)(()=>{d()},[d]),(0,b.useEffect)(()=>(a&&(a.on("my-balance",e=>{(null==e?void 0:e.userId)===(null==t?void 0:t.user.userId)&&(null==e?void 0:e.balance)&&n(null==e?void 0:e.balance)}),a.on("fetch-notifications",()=>{d()})),()=>{a&&(a.removeAllListeners("my-balance"),a.removeAllListeners("fetch-notifications"))}),[null==t?void 0:t.user.userId,a,d]),"number"!=typeof r)?null:(0,o.jsx)(p.Z,{className:"mr-3 flex py-0 items-center",title:e("balance"),children:(0,o.jsx)("span",{className:"text-xs ml-2 md:text-sm font-bold whitespace-nowrap",children:(0,h.t)(r)})})}var x=r(54689),w=r(92794),y=r(68924);function C(){let{data:e}=(0,s.useSession)(),{t:a}=(0,i.$G)(),{cashier:r}=(0,x.j)();return(null==e?void 0:e.user.role)===w.cJ&&r?(0,o.jsxs)("div",{className:"text-sm flex items-center justify-center",children:[a("your-verified-agent"),(0,o.jsxs)("div",{className:"ml-2 flex items-center justify-center",children:[(0,o.jsx)("b",{className:"capitalize mr-2",children:r.username}),(0,o.jsx)(y.Z,{})]})]}):null}var q=r(18896);function j(){let e=[(0,o.jsx)(C,{},0)];return(0,o.jsx)("div",{className:"bg-custom-violet py-4 text-white flex justify-center",children:(0,o.jsx)(q.lr,{infiniteLoop:!0,showThumbs:!1,showStatus:!1,showIndicators:!1,autoPlay:!0,interval:5e3,transitionTime:1e3,className:"announcement-banner-carousel w-[100vw] lg:w-[50vw]",children:e})})}function N(){let{t:e}=(0,i.$G)(),{status:a}=(0,s.useSession)(),r=(0,d.usePathname)();return/^\/auth/.test(r)||/^\/dashboard/.test(r)?null:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(j,{}),(0,o.jsxs)("nav",{className:"\n        bg-custom-dark-violet-2 text-white py-3 \n          px-5 md:px-10 flex justify-between \n          items-center h-[68px]\n        ",children:[(0,o.jsx)(l.Z,{className:"w-[66px] md:w-[112px]"}),(0,o.jsx)("div",{className:"flex",children:"authenticated"===a?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(c.Z,{}),(0,o.jsx)(v,{}),(0,o.jsxs)(n.Z,{onClick:()=>(0,s.signOut)({callbackUrl:"/"}),children:[(0,o.jsx)(u.Z,{fill:m.O9.darkViolet2,className:"md:hidden"}),(0,o.jsx)("span",{className:"hidden md:inline",children:e("logout")})]})]}):(0,o.jsx)(t.Z,{href:"/auth/login",children:e("login")})})]})]})}},68924:function(e,a,r){"use strict";r.d(a,{Z:function(){return i}});var o=r(57437);function i(e){return(0,o.jsx)("svg",{width:"15",height:"16",viewBox:"0 0 15 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e,children:(0,o.jsx)("path",{d:"M6.01151 0.609683C5.50477 0.445784 4.95622 0.467764 4.46422 0.671681C3.97222 0.875597 3.56895 1.24811 3.32673 1.72243L2.7248 2.8994C2.65327 3.03952 2.53932 3.15348 2.39919 3.22501L1.22147 3.82694C0.747158 4.06916 0.374643 4.47242 0.170727 4.96442C-0.0331901 5.45642 -0.0551701 6.00498 0.108728 6.51171L0.516486 7.77009C0.564893 7.91961 0.564893 8.0806 0.516486 8.23012L0.109475 9.48849C-0.0544231 9.99523 -0.0324433 10.5438 0.171473 11.0358C0.37539 11.5278 0.747905 11.9311 1.22222 12.1733L2.39919 12.7752C2.53932 12.8467 2.65327 12.9607 2.7248 13.1008L3.32673 14.2785C3.56895 14.7528 3.97222 15.1254 4.46422 15.3293C4.95622 15.5332 5.50477 15.5552 6.01151 15.3913L7.26988 14.9835C7.4194 14.9351 7.58039 14.9351 7.72991 14.9835L8.98829 15.3905C9.49494 15.5545 10.0434 15.5326 10.5354 15.3288C11.0274 15.1251 11.4307 14.7527 11.6731 14.2785L12.275 13.1008C12.3465 12.9607 12.4605 12.8467 12.6006 12.7752L13.7783 12.174C14.2528 11.9318 14.6254 11.5284 14.8294 11.0362C15.0333 10.5441 15.0552 9.99533 14.8911 9.48849L14.4833 8.23012C14.4349 8.0806 14.4349 7.91961 14.4833 7.77009L14.8903 6.51171C15.0543 6.00506 15.0324 5.45658 14.8286 4.96459C14.6249 4.4726 14.2525 4.06928 13.7783 3.82694L12.6006 3.22501C12.4605 3.15348 12.3465 3.03952 12.275 2.8994L11.6738 1.72168C11.4316 1.2472 11.0282 0.87457 10.536 0.670642C10.0438 0.466714 9.49512 0.444837 8.98829 0.608936L7.72991 1.01669C7.58039 1.0651 7.4194 1.0651 7.26988 1.01669L6.01151 0.609683ZM3.58662 7.81863L4.64261 6.76264L6.75458 8.87536L10.9793 4.65067L12.036 5.70665L6.75458 10.9866L3.58662 7.81863Z",fill:e.fill||"#00FFFF"})})}},54689:function(e,a,r){"use strict";r.d(a,{f:function(){return d},j:function(){return t}});var o=r(57437),i=r(68418),n=r(2265);let s=(0,n.createContext)({cashier:void 0,setCashier:()=>{},isLoading:!0});function t(){return(0,n.useContext)(s)}function d(e){let{children:a}=e,[r,t]=(0,n.useState)(),[d,l]=(0,n.useState)(!0);return(0,n.useEffect)(()=>{i.C.getMyCashier().then(e=>{let{cashier:a}=e;return t(a)}).finally(()=>l(!1))},[]),(0,o.jsx)(s.Provider,{value:{cashier:r,setCashier:t,isLoading:d},children:a})}},23338:function(e,a,r){"use strict";r.r(a),r.d(a,{default:function(){return g}});var o=r(57437),i=r(71126),n=r(2265),s=r(92794),t=r(54689),d=r(505),l=r(80685);function c(e){let{children:a}=e,{status:r,data:n}=(0,i.useSession)();return"authenticated"!==r?(0,o.jsx)(o.Fragment,{children:a}):n.user.role===s.cJ?(0,o.jsx)(l.a,{children:(0,o.jsx)(t.f,{children:a})}):(0,o.jsx)(l.a,{children:(0,o.jsx)(d._,{children:a})})}var u=r(11505),m=r(32635),p=JSON.parse('{"login":"Iniciar sesi\xf3n","username-or-email":"Nombre de usuario o correo electr\xf3nico","password":"Contrase\xf1a","logout":"Cerrar sesi\xf3n","please-wait":"Por favor espera...","required-username":"Nombre de usuario es requerido","required-password":"Contrase\xf1a es requerida","something-went-wrong":"Algo sali\xf3 mal","min-password-length":"Debe tener al menos 6 caracteres","max-password-length":"Debe tener m\xe1ximo 32 caracteres","invalid-credentials":"Credenciales inv\xe1lidas","forgot-password":"\xbfOlvid\xf3 contrase\xf1a?","recover-password":"Recuperar contrase\xf1a","email":"Correo electr\xf3nico","invalid-email":"Debe ser un correo electr\xf3nico v\xe1lido","required-email":"Correo electr\xf3nico es requerido","email-not-registered":"Correo electr\xf3nico no registrado","check-your-email":"Revise su correo electr\xf3nico para restablecer la contrase\xf1a","reset-password":"Restablecer contrase\xf1a","new-password":"Nueva contrase\xf1a","password-reset-successfully":"Contrase\xf1a restablecida exitosamente","invalid-token":"Token inv\xe1lido","statistics":"Estad\xedsticas","users":"Usuarios","create-new-user":"Crear Nuevo Usuario","all":"Todos","cashiers":"Agentes","operators":"Operadores","username":"Nombre de usuario","record":"Registro","actions":"Acciones","search-user":"Buscar usuario","username-not-registered":"Nombre de usuario no registrado","select-role":"Seleccionar rol","first-name":"Nombre","last-name":"Apellido","assign-cashier":"Asignar agente","assign-operators":"Asignar operadores","select-platform":"Seleccionar plataforma","go-back":"Volver","create":"Crear","phone":"Tel\xe9fono","no-options":"No hay opciones","cashier":"Agente","operator":"Operador","user":"Usuario","account-holder":"Titular","alias":"Alias","required-first-name":"Nombre es requerido","required-last-name":"Apellido es requerido","required-phone":"Tel\xe9fono es requerido","required-platform":"Plataforma es requerida","cbu-length":"CBU debe tener una longitud de 22","cbu-only-numbers":"CBU debe contener solo n\xfameros","min-username-length":"Nombre de usuario debe tener al menos 3 caracteres","search":"Buscar","invalid-phone":"N\xfamero de tel\xe9fono inv\xe1lido","required-cashier":"Agente es requerido","only-alphanumeric":"Solo caracteres alfanum\xe9ricos","created-successfully":"creado con \xe9xito","username-already-registered":"Nombre de usuario ya registrado","cashier-created-successfully":"Agente creado exitosamente","operator-created-successfully":"Operador creado exitosamente","upload":"Cargar","withdraw":"Retirar","user-info":"Informaci\xf3n del usuario","edit-user":"Editar usuario","change-password":"Cambiar contrase\xf1a","ban-user":"Bloquear usuario","save":"Guardar","role":"Rol","edit-cashier":"Editar agente","edit-operator":"Editar operador","edit-admin":"Editar admin","user-updated-successfully":"Usuario actualizado exitosamente","admin-updated-successfully":"Admin actualizado exitosamente","cashier-updated-successfully":"Agente actualizado exitosamente","operator-updated-successfully":"Operador actualizado exitosamente","operator-info":"Informaci\xf3n del operador","cashier-info":"Informaci\xf3n del agente","continue":"Continuar","complete-register":"Completar registro","verify-phone-number":"Validar n\xfamero de tel\xe9fono","verify-phone-number-message":"Ingrese el c\xf3digo que hemos enviado a su n\xfamero de tel\xe9fono:","confirm-code":"C\xf3digo de confirmaci\xf3n","invalid-verification-token":"C\xf3digo de verificaci\xf3n inv\xe1lido","code-sent":"C\xf3digo enviado","confirm-code-length":"C\xf3digo debe tener 6 d\xedgitos","confirm-code-only-numbers":"C\xf3digo debe contener solo n\xfameros","invalid-code":"C\xf3digo inv\xe1lido","code-not-received":"\xbfC\xf3digo no recibido?","register-completed":"Registro completado con \xe9xito.","repeat-password":"Repetir contrase\xf1a","required-repeat-password":"Repetir contrase\xf1a es requerido","equal-password":"Debe ser igual a la contrase\xf1a","user-options":"Opciones de usuario","withdraw-chips":"Retirar fichas","load-chips":"Cargar fichas","request-panel":"Panel de solicitudes","chat-with-agent":"Chatear con agente","unlock-user":"Desbloquear usuario","report-agent":"Reportar agente","go-to-play":"Ir a jugar","welcome":"Bienvenido","old-password":"Contrase\xf1a anterior","repeat-new-password":"Repetir contrase\xf1a nueva","required-old-password":"Contrase\xf1a anterior es requerida","required-new-password":"Nueva contrase\xf1a es requerida","equal-new-password":"Debe ser igual a la nueva contrase\xf1a","invalid-password":"Contrase\xf1a inv\xe1lida","password-changed-successfully":"Tu cambio de contrase\xf1a fue realizado con \xe9xito.","go-back-home":"Volver al inicio","important":"IMPORTANTE","to-load-chips":"Para realizar la carga de fichas debes realizar una transferencia al siguiente CBU","copy-cbu":"Copiar CBU","cbu-copied":"CBU copiado","must-inform-amount":"Luego debes informar el importe que transferiste a continuaci\xf3n, y el titular de la cuenta.","enter-amount":"Ingresar importe","invalid-file-type":"Tipo de archivo inv\xe1lido, solo se permiten archivos .png, .jpg, .jpeg, .pdf","remember-check-amount":"Recuerda revisar que el importe ingresado sea correcto para evitar demoras a la hora de confirmar la carga.","send-request":"Enviar solicitud","chip-load-request":"Solicitud de carga de fichas","chip-withdraw-request":"Solicitud de retiro de fichas","to-withdraw-chips":"Para realizar el retiro de fichas debes ingresar tu CBU, titular y el importe. Una vez enviada la solicitud, tu agente la confirmar\xe1 y realizar\xe1 la transferencia al CBU informado.","enter-cbu":"Ingresar CBU","enter-account-holder":"Ingresar titular","enter-amount-to-withdraw":"Ingresar importe a retirar","remember-check-cbu":"Recuerda revisar que el CBU ingresado sea el correcto.","create-platform-user":"\xbfCrear usuario en la plataforma?","max-username-length":"Nombre de usuario debe tener m\xe1ximo 12 caracteres","lines":"L\xedneas","platform":"Plataforma","create-line":"Crear l\xednea","delete-line":"Eliminar l\xednea","edit-line":"Editar l\xednea","line-created-successfully":"L\xednea creada con \xe9xito","line-updated-successfully":"L\xednea actualizada con \xe9xito","line-deleted-successfully":"L\xednea eliminada con \xe9xito","no-cashier-cbu":"El agente no ha registrado su CBU","invalid-amount":"Importe inv\xe1lido","required-amount":"Importe requerido","required-proof":"Comprobante requerido","required-account-holder":"Titular es requerido","chip-load-request-successful":"Tu solicitud de carga fue realizada con \xe9xito. Un agente pronto confirmar\xe1 la operaci\xf3n y se te notificar\xe1. Puedes ver el estado de las solicitudes que realizaste visitando el","go-to-request-panel":"Ir al Panel de solicitudes","request-id":"ID de solicitud","date-and-time":"Fecha y hora","amount":"Importe","request-type":"Tipo","status":"Estado","load":"Carga","withdrawal":"Retiro","pending":"Pendiente","accepted":"Aceptada","rejected":"Rechazada","requests":"Solicitudes","proof":"Comprobante","view-proof":"Ver comprobante","download":"Descargar","accept-request":"Aceptar solicitud","reject-request":"Rechazar solicitud","request-accepted-successfully":"Solicitud aceptada con \xe9xito","request-rejected-successfully":"Solicitud rechazada con \xe9xito","all-s":"Todas","rejecteds":"Rechazadas","accepteds":"Aceptadas","pendings":"Pendientes","only-numbers":"Solo n\xfameros","tip-less-than-amount":"La propina debe ser menor al importe","tip":"Propina","other":"Otro","chip-withdrawal-request-successful":"Tu solicitud de retiro fue realizada con \xe9xito. Un agente pronto confirmar\xe1 la operaci\xf3n y se te notificar\xe1. Puedes ver el estado de las solicitudes que realizaste visitando el","paid":"Pagada","paids":"Pagadas","current-data":"DATOS ACTUALES","data-updated-successfully":"Datos actualizados con \xe9xito","my-data":"Mis Datos","contact-agent":"Contactar agente","registered-platform-line":"Ya tienes una l\xednea registrada para la plataforma seleccionada","cashier-registered-platform-line":"El agente ya tiene una l\xednea registrada para la plataforma seleccionada","no-registered-line":"No hay una l\xednea registrada","your-cashier-no-registered-line":"Tu agente no tiene una l\xednea registrada","platform-username-already-registered":"Nombre de usuario ya ha sido registrado para la plataforma seleccionada","update-password":"Actualizar contrase\xf1a","required-line":"L\xednea requerida","assign-line":"Asignar l\xednea","assign-cashiers":"Asignar agentes","insufficient-balance":"Balance insuficiente","generate-register-link":"Generar link de registro","generate-user-register-link":"Generar link de registro de usuario","copy":"Copiar","copied":"Copiado","register":"Registro","send":"Enviar","verify-email":"Validar correo electr\xf3nico","verify-email-message":"Ingrese el c\xf3digo que hemos enviado a su correo electr\xf3nico:","generate":"Generar","required-url-slug":"URL Slug requerido","min-length":"Debe tener al menos 3 caracteres","max-length":"Debe tener m\xe1ximo 12 caracteres","invalid-url-slug":"URL Slug inv\xe1lido","slug-already-registered":"URL Slug ya ha sido registrado","invalid-sign-up-invitation":"Invitaci\xf3n de registro inv\xe1lida","loads":"Cargas","withdrawals":"Retiros","betcoin-invalid-line":"betcoin.pro: l\xednea inv\xe1lida","chat":"Chat","load-chat-messages-error":"Error al intentar obtener los mensajes del chat","optional":"Opcional","your-username-on-betcointoken-is":"Su usuario en betcointoken.com es","your-username-on":"Su usuario en","is":"es","no":"No","yes":"Si","delete-line-confirmation":"\xbfEst\xe1 seguro de que desea eliminar la l\xednea","forgot-username-and-password":"\xbfOlvid\xf3 usuario y contrase\xf1a?","recover":"Recuperar","enter-phone-number":"Ingresar n\xfamero de tel\xe9fono","phone-number-not-registered":"N\xfamero de tel\xe9fono no registrado","reset-by-phone-text-1":"Enviamos un mensaje al n\xfamero de tel\xe9fono ingresado con un c\xf3digo de confirmaci\xf3n y su nombre de usuario.","reset-by-phone-text-2":"A continuaci\xf3n, ingrese el c\xf3digo de confirmaci\xf3n recibido y su nueva contrase\xf1a:","phone-already-registered":"Ya existe un usuario con ese n\xfamero de tel\xe9fono registrado","user-has-no-email":"No tiene un correo electr\xf3nico registrado","username-already-registered-on-platform":"El nombre de usuario ya est\xe1 registrado en la plataforma. Por favor, a\xf1ade 4 n\xfameros al final para crear un nombre \xfanico.","error-on-loading-chats":"Error al cargar los chats","today":"Hoy","send-message":"Enviar mensaje","delete-chat":"Eliminar chat","delete-chat-confirmation":"\xbfEst\xe1 seguro de que desea eliminar el chat?","invalid-route":"Ruta inv\xe1lida, no username","attach-image":"Adjuntar imagen","delete-image":"Eliminar imagen","max-file-size":"El archivo debe pesar menos de:","file":"Archivo","your-verified-agent":"Tu agente verificado","reload-requests":"Recargar solicitudes","notifications":"Notificaciones","fetch-notifications-error":"Error al consultar las notificaciones","the-user":"El usuario","made-new-load-request":"realiz\xf3 una nueva solicitud de carga","made-new-withdrawal-request":"realiz\xf3 una nueva solicitud de retiro","your-load-request-id":"Tu solicitud de carga ID","your-withdrawal-request-id":"Tu solicitud de retiro ID","was-rejected":"fue rechazada","was-accepted":"fue aceptada","was-paid":"fue pagada","no-notifications":"No hay notificaciones","create-player":"Crear Jugador","create-agent":"Crear Agente","create-operator":"Crear Operador","enable-bonus":"\xbfHabilitar bonificaci\xf3n?","bonus-percent":"Porcentaje de bonificaci\xf3n","max-bonus-amount":"Monto m\xe1ximo de bonificaci\xf3n","max-bonus-loads-amount":"Cantidad de cargas bonificadas x d\xeda","percent-limit":"Porcentaje debe estar entre 1 y 100","positive":"Debe ser positivo","integer":"Debe ser entero","percent-required":"Porcentaje es requerido","bonus":"Bonificaci\xf3n","bonus-registered":"Registrado bono de","max-bonus-load-reached":"Cantidad de cargas bonificadas x d\xeda alcanzada.","cannot-delete-line":"No se puede eliminar la l\xednea (o bonificiaci\xf3n) porque ya tiene cargas bonificadas asociadas.","bonus-2":"Bonus","max-withdrawal-amount":"Monto m\xe1ximo de retiro x usuario x d\xeda","max-withdrawals":"Cantidad m\xe1xima de retiros x usuario x d\xeda","max-withdrawals-reached":"Cantidad m\xe1xima de retiros por d\xeda alcanzada.","max-withdrawal-amount-reached":"Monto m\xe1ximo de retiro por d\xeda alcanzado.","banners":"Banners","invalid-image-file-type":"Tipo de archivo inv\xe1lido, solo se permiten archivos .png, .jpg, .jpeg","add-image":"Agregar imagen","fetch-banners-error":"Error al consultar los banners","banners-updated-successfully":"Banners actualizados con \xe9xito","link":"Link","messages":"Mensajes","no-messages":"No hay mensajes","added-by":"Agregado por","export-excel":"Exportar Excel","cbu-alias-destination":"CBU/ALIAS DESTINO","proof-id":"Comprobante ID","show":"Mostrar","customer":"Usuario","attach-proof":"Adjuntar comprobante","reports":"Reportes","general":"General","cashier,operator":"Agente u operador","line":"L\xednea","from-date":"Desde el","to-date":"Hasta el","from-time":"Desde las","to-time":"Hasta las","request-status":"Estados de las solicitudes","status-s":"Estados","min-line-select":"Debe seleccionar la menos una l\xednea","types":"Tipos","loads-number":"Cantidad de cargas","loads-total-amount":"Monto total cargado","withdrawals-number":"Cantidad de retiros","withdrawals-total-amount":"Monto total de retiros","invalid-date-range":"Rango de fecha inv\xe1lido","general-report":"Reporte general","proofs":"Comprobantes","date":"Fecha","amount-2":"Monto","one-letter-one-number":"Debe tener al menos una letra y un n\xfamero","search-proofs":"Buscar comprobantes","processing":"Procesando","user-not-created":"Usuario no creado","refer-amount":"Monto por referido","copy-referral-link":"Copiar link de referido","link-copied":"Link copiado","referral-charge":"Carga referido","referrals":"Referidos","assign-referral":"Asignar referido","assign":"Asignar","referral-assigned":"Referido asignado con \xe9xito","referral-already-assigned":"Referido ya est\xe1 asignado","referred-by":"Referido por","referred-user-created-at":"Usuario creado el","referred-load-amount":"Monto de carga del referido","balance":"Balance","chips":"Fichas","consult":"Consultar","no-socket":"No socket","your-request-was-accepted":"Tu solicitud fue aceptada y se acreditaron ","min-load-amount":"Monto m\xednimo de carga","min-withdrawal-amount":"Monto m\xednimo de retiro","min-load-amount-is":"El monto m\xednimo de carga es","min-withdrawal-amount-is":"El monto m\xednimo de retiro es","settings":"Ajustes","help-phone":"Tel\xe9fono de ayuda","settings-updated":"Ajustes actualizados","last-load-request-is-pending":"La \xfaltima solicitud de carga est\xe1 pendiente, por favor espere.","full-name-no-username":"Debe ser nombre completo, no ingrese el usuario.","you-made-the-transfer":"\xbfYa realiz\xf3 la transferencia?","should-make-the-transfer":"Debe realizar la transferencia antes de enviar la solicitud de carga.","registered-date":"Fecha de registro","loaded-total":"Total cargado","first-name-last-name":"Nombre y apellido","ask-us":"Si tenes dudas sobre como registrarte no dudes en consultarnos.","search-platform":"Buscar platforma","go-home":"Ir a inicio","enable-new-customer-bonus":"Habilitar bonificaci\xf3n para nuevos clientes","your-withdrawal-of":"Tu solicitud de retiro de","users-report":"Reporte usuarios","created-customers-quantity":"Cantidad de usuarios creados","load-customers-quantity":"Cantidad de cargas","loads-average":"Promedio de carga"}');u.ZP.use(m.Db).init({resources:{es:{translation:p}},lng:"es",interpolation:{escapeValue:!1}});var g=e=>{let{children:a}=e;return(0,n.useEffect)(()=>{"function"==typeof Notification&&"default"===Notification.permission&&Notification.requestPermission()},[]),(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(i.SessionProvider,{children:(0,o.jsx)(c,{children:a})})})}},63385:function(){}},function(e){e.O(0,[9648,9317,298,5250,2171,8209,8896,7119,3278,2971,8069,1744],function(){return e(e.s=17620)}),_N_E=e.O()}]);