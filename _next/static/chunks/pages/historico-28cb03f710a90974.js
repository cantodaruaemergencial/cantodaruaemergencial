(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[18],{9918:function(e,n,t){"use strict";var o=t(4836),r=t(5263);n.Z=void 0;var i=r(t(7294)),l=(0,o(t(2108)).default)(i.createElement("path",{d:"M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm4 8h-3v3h-2v-3H8V8h3V5h2v3h3v2z"}),"AddLocation");n.Z=l},1714:function(e,n,t){"use strict";var o=t(4836),r=t(5263);n.Z=void 0;var i=r(t(7294)),l=(0,o(t(2108)).default)(i.createElement("path",{d:"M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"}),"DirectionsRun");n.Z=l},4485:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/historico",function(){return t(7640)}])},7640:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return eL}});var o=t(7297),r=t(5893),i=t(370),l=t(6598),a=t(3832),s=t(2318),c=t(253),d=t(9521),u=t(475),f=t(7294),h=t(6975),m=t(8757),p=t(6248),x=t(2904),g=t(4509);class Z{}Z.get=e=>g.V0.publicGet("person-history/".concat(e)).then(e=>e.data);var b=t(7083),v=t(3500),w=t(4673),C=t(7462),y=t(5987),j=t(6010),_=t(3871),N=t(1591),P=f.createContext({}),k=f.createContext({}),I=f.forwardRef(function(e,n){var t=e.classes,o=e.className,r=(0,y.Z)(e,["classes","className"]),i=f.useContext(P).align,l=f.useContext(k).classes;return f.createElement("div",(0,C.Z)({className:(0,j.Z)(t.root,(void 0===l?{}:l).oppositeContent,t["align".concat((0,_.Z)(void 0===i?"left":i))],o),ref:n},r))});I.muiName="TimelineOppositeContent";var E=(0,N.Z)(function(){return{root:{padding:"6px 16px",marginRight:"auto",textAlign:"right",flex:1},alignRight:{textAlign:"left"}}},{name:"MuiTimelineOppositeContent"})(I),R=f.forwardRef(function(e,n){var t=e.align,o=void 0===t?"left":t,r=e.classes,i=e.className,l=(0,y.Z)(e,["align","classes","className"]);return f.createElement(P.Provider,{value:{align:o}},f.createElement("ul",(0,C.Z)({className:(0,j.Z)(r.root,r["align".concat((0,_.Z)(o))],i),ref:n},l)))}),S=(0,N.Z)(function(){return{root:{display:"flex",flexDirection:"column",padding:"6px 16px",flexGrow:1},alignLeft:{},alignRight:{},alignAlternate:{}}},{name:"MuiTimeline"})(R),T=t(3711),A=f.forwardRef(function(e,n){var t=e.classes,o=e.className,r=(0,y.Z)(e,["classes","className"]),i=f.useContext(P).align,l=!1;return f.Children.forEach(e.children,function(e){(0,T.Z)(e,["TimelineOppositeContent"])&&(l=!0)}),f.createElement(k.Provider,{value:{classes:{content:t.content,oppositeContent:t.oppositeContent}}},f.createElement("li",(0,C.Z)({className:(0,j.Z)(t.root,t["align".concat((0,_.Z)(void 0===i?"left":i))],o,!l&&t.missingOppositeContent),ref:n},r)))}),M=(0,N.Z)(function(){return{root:{listStyle:"none",display:"flex",position:"relative",minHeight:70},alignLeft:{},alignRight:{flexDirection:"row-reverse"},alignAlternate:{"&:nth-child(even)":{flexDirection:"row-reverse","& $content":{textAlign:"right"},"& $oppositeContent":{textAlign:"left"}}},missingOppositeContent:{"&:before":{content:'""',flex:1,padding:"6px 16px"}},content:{},oppositeContent:{}}},{name:"MuiTimelineItem"})(A),z=f.forwardRef(function(e,n){var t=e.classes,o=e.className,r=(0,y.Z)(e,["classes","className"]);return f.createElement("div",(0,C.Z)({className:(0,j.Z)(t.root,o),ref:n},r))}),D=(0,N.Z)(function(){return{root:{display:"flex",flexDirection:"column",flex:0,alignItems:"center"}}},{name:"MuiTimelineSeparator"})(z),O=f.forwardRef(function(e,n){var t=e.classes,o=e.className,r=e.color,i=void 0===r?"grey":r,l=e.variant,a=(0,y.Z)(e,["classes","className","color","variant"]);return f.createElement("span",(0,C.Z)({className:(0,j.Z)(t.root,o,"inherit"!==i&&t["".concat(void 0===l?"default":l).concat((0,_.Z)(i))]),ref:n},a))}),H=(0,N.Z)(function(e){return{root:{display:"flex",alignSelf:"baseline",borderStyle:"solid",borderWidth:2,padding:4,borderRadius:"50%",boxShadow:e.shadows[2],marginTop:8,marginBottom:8},defaultGrey:{borderColor:"transparent",color:e.palette.grey[50],backgroundColor:e.palette.grey[400]},outlinedGrey:{boxShadow:"none",color:e.palette.grey.contrastText,borderColor:e.palette.grey[400],backgroundColor:"transparent"},defaultPrimary:{borderColor:"transparent",color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.main},outlinedPrimary:{boxShadow:"none",backgroundColor:"transparent",borderColor:e.palette.primary.main},defaultSecondary:{borderColor:"transparent",color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.main},outlinedSecondary:{boxShadow:"none",backgroundColor:"transparent",borderColor:e.palette.secondary.main}}},{name:"MuiTimelineDot"})(O),G=f.forwardRef(function(e,n){var t=e.classes,o=e.className,r=(0,y.Z)(e,["classes","className"]);return f.createElement("span",(0,C.Z)({className:(0,j.Z)(t.root,o),ref:n},r))}),L=(0,N.Z)(function(e){return{root:{width:2,backgroundColor:e.palette.grey[400],flexGrow:1}}},{name:"MuiTimelineConnector"})(G),Y=f.forwardRef(function(e,n){var t=e.classes,o=e.className,r=(0,y.Z)(e,["classes","className"]),i=f.useContext(P).align,l=f.useContext(k).classes;return f.createElement("div",(0,C.Z)({className:(0,j.Z)(t.root,(void 0===l?{}:l).content,t["align".concat((0,_.Z)(void 0===i?"left":i))],o),ref:n},r))}),V=(0,N.Z)(function(){return{root:{flex:1,padding:"6px 16px"},alignRight:{textAlign:"right"}}},{name:"MuiTimelineContent"})(Y),B=t(9918),F=t(1714),X=t(381),$=t.n(X),q=t(9344);let W=e=>[{label:"Telefonema",value:e.describe_needs_call},{label:"Alimenta\xe7\xe3o",value:e.describe_needs_food},{label:"Sa\xfade",value:e.describe_needs_health},{label:"Outras demandas",value:e.describe_needs_others},{label:"Trabalho",value:e.describe_needs_work,type:q.h.bool},{label:"Conversa/Escuta",value:e.needs_conversation,type:q.h.bool},{label:"Documentos",value:e.needs_documents,type:q.h.bool},{label:"Moradia",value:e.needs_house,type:q.h.bool},{label:"Cuidados de Higiene",value:e.needs_hygiene_care,type:q.h.bool},{label:"Abrigo/Albergue",value:e.needs_shelter,type:q.h.bool},{label:"Rep\xfablica",value:e.needs_temporary_home,type:q.h.bool},{label:"Observa\xe7\xf5es",value:e.comment}];function J(){let e=(0,o.Z)(["\n  display: grid;\n  grid-template-columns: 400px 1fr;\n\n  "," {\n    display: flex;\n    flex-direction: column;\n  }\n"]);return J=function(){return e},e}function K(){let e=(0,o.Z)(["\n  display: grid;\n  grid-gap: 1rem;\n  grid-template-columns: 1fr 1fr;\n  height: 100%;\n"]);return K=function(){return e},e}function Q(){let e=(0,o.Z)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 100%;\n  width: 100%;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  padding: 1.5rem 2rem;\n\n  "," {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  &:hover {\n    background-color: rgba(0, 0, 0, 0.05);\n  }\n"]);return Q=function(){return e},e}function U(){let e=(0,o.Z)(["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  width: 100%;\n"]);return U=function(){return e},e}function ee(){let e=(0,o.Z)(["\n  && {\n    font-weight: 600;\n    font-size: 24px;\n\n    "," {\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n  }\n"]);return ee=function(){return e},e}function en(){let e=(0,o.Z)(["\n  && {\n    font-weight: 500;\n    font-size: 18px;\n\n    "," {\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n  }\n"]);return en=function(){return e},e}function et(){let e=(0,o.Z)(["\n  display: flex;\n  flex-direction: column;\n\n  width: 100%;\n"]);return et=function(){return e},e}function eo(){let e=(0,o.Z)(["\n  min-height: 570px;\n\n  "," {\n    min-height: 100%;\n  }\n"]);return eo=function(){return e},e}function er(){let e=(0,o.Z)(["\n  min-height: 100px;\n\n  "," {\n    min-height: 100%;\n  }\n"]);return er=function(){return e},e}function ei(){let e=(0,o.Z)(["\n  grid-column: 1 / 3;\n  position: relative;\n  border-radius: 4px;\n"]);return ei=function(){return e},e}function el(){let e=(0,o.Z)(["\n  grid-column: auto;\n"]);return el=function(){return e},e}function ea(){let e=(0,o.Z)(["\n  && {\n    font-size: 0.7em;\n    font-weight: bold;\n    text-align: left;\n  }\n"]);return ea=function(){return e},e}function es(){let e=(0,o.Z)(["\n  && {\n    font-size: 1em;\n    max-width: 120px;\n    text-align: left;\n    display: -webkit-box;\n    -webkit-line-clamp: 10;\n    -webkit-box-orient: vertical;\n    overflow: hidden;\n\n    &.bigger {\n      font-weight: bold;\n      font-size: 2.5em;\n    }\n  }\n"]);return es=function(){return e},e}function ec(){let e=(0,o.Z)(["\n  && {\n    font-size: 1.5;\n    font-weight: bold;\n  }\n"]);return ec=function(){return e},e}function ed(){let e=(0,o.Z)(["\n  && {\n    font-size: 1em;\n  }\n"]);return ed=function(){return e},e}let eu=(0,l.Z)((0,d.ZP)(c.Z).withConfig({componentId:"sc-b45f2895-0"})(J(),e=>{let{theme:n}=e;return n.breakpoints.down("sm")})),ef=(0,d.ZP)(c.Z).withConfig({componentId:"sc-b45f2895-1"})(K()),eh=(0,l.Z)((0,d.ZP)(c.Z).withConfig({componentId:"sc-b45f2895-2"})(Q(),e=>{let{theme:n}=e;return n.breakpoints.down("xs")})),em=(0,d.ZP)(c.Z).withConfig({componentId:"sc-b45f2895-3"})(U()),ep=(0,l.Z)((0,d.ZP)(s.Z).withConfig({componentId:"sc-b45f2895-4"})(ee(),e=>{let{theme:n}=e;return n.breakpoints.down("xs")})),ex=(0,l.Z)((0,d.ZP)(s.Z).withConfig({componentId:"sc-b45f2895-5"})(en(),e=>{let{theme:n}=e;return n.breakpoints.down("xs")})),eg=(0,l.Z)((0,d.ZP)(S).withConfig({componentId:"sc-b45f2895-6"})(et())),eZ=(0,l.Z)((0,d.ZP)(M).withConfig({componentId:"sc-b45f2895-7"})(eo(),e=>{let{theme:n}=e;return n.breakpoints.down("sm")})),eb=(0,l.Z)((0,d.ZP)(M).withConfig({componentId:"sc-b45f2895-8"})(er(),e=>{let{theme:n}=e;return n.breakpoints.down("sm")})),ev=(0,l.Z)((0,d.ZP)(c.Z).withConfig({componentId:"sc-b45f2895-9"})(ei())),ew=(0,d.ZP)(ev).withConfig({componentId:"sc-b45f2895-10"})(el()),eC=(0,d.ZP)(s.Z).withConfig({componentId:"sc-b45f2895-11"})(ea()),ey=(0,d.ZP)(s.Z).withConfig({componentId:"sc-b45f2895-12"})(es()),ej=(0,d.ZP)(s.Z).withConfig({componentId:"sc-b45f2895-13"})(ec()),e_=(0,d.ZP)(b.ZP).withConfig({componentId:"sc-b45f2895-14"})(ed()),eN=e=>{let{item:n}=e,{attendances:t,entrances:o}=n,i=e=>$()(e).format("DD-MM-YYYY HH:mm:ss");return(0,r.jsxs)(eu,{children:[(0,r.jsx)(eh,{children:(0,r.jsxs)(em,{children:[(0,r.jsxs)(ep,{children:["Entradas (",o.length,")"]}),(0,r.jsx)(eg,{align:"alternate",children:0===o.length?(0,r.jsx)(ex,{children:"N\xe3o h\xe1 dados cadastrados"}):null==o?void 0:o.map((e,n)=>(0,r.jsxs)(eb,{children:[(0,r.jsxs)(D,{children:[(0,r.jsx)(H,{variant:n!==o.length-1?"default":"outlined",children:(0,r.jsx)(F.Z,{})}),n!==o.length-1&&(0,r.jsx)(L,{})]}),(0,r.jsx)(V,{children:i(e.date)})]}))})]})}),(0,r.jsx)(eh,{children:(0,r.jsxs)(em,{children:[(0,r.jsxs)(ep,{children:["Atendimentos (",t.length,")"]}),(0,r.jsx)(eg,{align:"alternate",children:0===t.length?(0,r.jsx)(ex,{children:"N\xe3o h\xe1 dados cadastrados"}):null==t?void 0:t.map((e,n)=>(0,r.jsxs)(eZ,{children:[(0,r.jsx)(E,{children:(0,r.jsx)(ej,{variant:"body2",children:i(e.service_attendance_date)})}),(0,r.jsxs)(D,{children:[(0,r.jsx)(H,{variant:n!==t.length-1?"default":"outlined",children:(0,r.jsx)(B.Z,{})}),n!==t.length-1&&(0,r.jsx)(L,{})]}),(0,r.jsx)(V,{children:(0,r.jsx)(ef,{children:W(e).map(e=>{var n,t;return(0,r.jsxs)(ew,{children:[(0,r.jsx)(eC,{children:e.label}),e.type===q.h.bool?e.value?(0,r.jsx)(v.Z,{color:"secondary"}):(0,r.jsx)(w.Z,{color:"error"}):(0,r.jsx)(e_,{title:(null===(n=e.value)||void 0===n?void 0:n.toString())||"",children:(0,r.jsx)(ey,{children:(null===(t=e.value)||void 0===t?void 0:t.toString())||"-"})})]})})},e.id)})]}))})]})})]})};var eP=t(2425),ek=t(1872),eI=t(3129);function eE(){let e=(0,o.Z)(["\n  && {\n    width: 100%;\n  }\n\n  "," {\n    max-width: 600px;\n  }\n"]);return eE=function(){return e},e}function eR(){let e=(0,o.Z)(["\n  margin-bottom: 8px;\n  font-weight: 600;\n"]);return eR=function(){return e},e}function eS(){let e=(0,o.Z)(["\n  flex: 1;\n  width: 100%;\n"]);return eS=function(){return e},e}function eT(){let e=(0,o.Z)(["\n  height: 220px;\n  margin: 32px 0px;\n"]);return eT=function(){return e},e}function eA(){let e=(0,o.Z)(["\n  flex: 1;\n"]);return eA=function(){return e},e}let eM=(0,l.Z)((0,d.ZP)(a.Z).withConfig({componentId:"sc-22ed0caf-0"})(eE(),e=>{let{theme:n}=e;return n.breakpoints.down("sm")})),ez=(0,d.ZP)(s.Z).withConfig({componentId:"sc-22ed0caf-1"})(eR()),eD=(0,d.ZP)(p.Z).withConfig({componentId:"sc-22ed0caf-2"})(eS()),eO=(0,d.ZP)(c.Z).withConfig({componentId:"sc-22ed0caf-3"})(eT()),eH=(0,d.ZP)(h.Z).withConfig({componentId:"sc-22ed0caf-4"})(eA()),eG=()=>{let[e,n]=(0,f.useState)(void 0),[t,o]=(0,f.useState)(void 0),[l,a]=(0,f.useState)({}),{userProfile:s}=(0,ek.F_)(),{enqueueSnackbar:c}=(0,eP.Ds)(),d=(e,n,t)=>m.Z.get(e,n,t);(0,f.useEffect)(()=>{t&&Z.get(null==t?void 0:t.id).then(e=>{n(e)}).catch(()=>{c("Ocorreu um erro.",{variant:"error"})})},[t]);let h=e=>a({nameOrCardNumber:e}),p=(e,n,i)=>(0,r.jsx)(x.Z,{item:e,isRowLoaded:n,props:i,selectedPerson:t,selectPerson:o});return(null==s?void 0:s.associations.some(e=>e.name.includes(eI.j.PastoralDeRua)))?(0,r.jsx)(i.Z,{title:"Hist\xf3rico de Pessoas",children:(0,r.jsxs)(eM,{children:[(0,r.jsx)(u.Z,{title:"Hist\xf3rico"}),(0,r.jsx)(ez,{children:"Busque e selecione a pessoa a ser consultada:"}),(0,r.jsx)(eD,{placeholder:"Nome ou cart\xe3o",onFilter:h}),(0,r.jsx)(eO,{children:(0,r.jsx)(eH,{fetchRows:d,rowRenderer:p,filter:l})}),t&&e&&(0,r.jsx)(eN,{item:e})]})}):(0,r.jsx)("h1",{children:"Sem permiss\xe3o para acessar a p\xe1gina"})};var eL=eG}},function(e){e.O(0,[29,970,937,682,859,650,774,888,179],function(){return e(e.s=4485)}),_N_E=e.O()}]);