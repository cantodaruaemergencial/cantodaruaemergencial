"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[285],{8043:function(n,e,t){var r=t(7297),a=t(5893),i=t(253),s=t(6598),l=t(2318),o=t(6010);t(7294);var u=t(9521);function c(){let n=(0,r.Z)(["\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 1.5rem;\n  width: 100%;\n"]);return c=function(){return n},n}function d(){let n=(0,r.Z)(["\n  && {\n    font-weight: 700;\n    font-size: 0.9rem;\n\n    &.contrast {\n      color: ",";\n      opacity: 0.8;\n    }\n  }\n"]);return d=function(){return n},n}function p(){let n=(0,r.Z)([""]);return p=function(){return n},n}let m=(0,u.ZP)(i.Z)(c()),f=(0,s.Z)((0,u.ZP)(l.Z)(d(),n=>{let{theme:e}=n;return e.palette.primary.contrastText})),Z=(0,s.Z)((0,u.ZP)(l.Z)(p())),x=n=>{let{title:e,description:t,contrast:r=!1,sideComponent:s,className:l}=n;return(0,a.jsxs)(m,{className:l,children:[(0,a.jsxs)(i.Z,{children:[(0,a.jsx)(f,{color:"textPrimary",className:(0,o.Z)({contrast:r}),children:e}),t&&(0,a.jsx)(Z,{variant:"caption",children:t})]}),s]})};e.Z=x},6285:function(n,e,t){t.d(e,{Z:function(){return nD}});var r=t(7297),a=t(5893),i=t(7265),s=t(6598),l=t(253),o=t(9659),u=t(3832),c=t(1810),d=t(2778),p=t(7294),m=t(9521),f=t(475),Z=t(6050),x=t(8043),g=t(6182),h=t(8769),b=t(8920),j=t(1590),y=t(2682),v=t(1224);let P={labels:[],datasets:[{label:"",borderColor:"#fff",borderJoinStyle:"miter",pointHoverRadius:5,fill:!0,pointHoverBackgroundColor:"rgba(75,192,192,1)",pointHoverBorderColor:"rgba(220,220,220,1)",pointHoverBorderWidth:2,pointRadius:0,pointHitRadius:10,borderWidth:1,data:[]}]},k=(n,e)=>({maintainAspectRatio:!1,layout:{padding:{left:24,right:24,top:24,bottom:24}},scales:{xAxes:[{barPercentage:1,ticks:{display:!1,padding:0},gridLines:{display:!1,drawTicks:!1,drawBorder:!1}}],yAxes:[{ticks:{display:!1,padding:0},gridLines:{display:!1,drawTicks:!1,drawBorder:!1}}]},legend:{display:!1},tooltips:{callbacks:{title:e||((n,e)=>{let t=n[0].xLabel;return t||e.labels[n[0].index]}),label:(e,t)=>{let r=t.datasets[e.datasetIndex],a="".concat(r.label,": ")||0,i=v.V.format(e.yLabel,n);return a+i}}}}),w=n=>{let{type:e="bar",labels:t=[],dataset:r={},options:i={},format:s=y.E.number,tooltipCallbacksTitle:l}=n,o=(0,b.Z)(),u=()=>{let n="".concat(o.palette.primary.main,"C2");return{borderColor:n,pointBackgroundColor:n,pointHoverBackgroundColor:n,pointHoverBorderColor:n,backgroundColor:n}},c=()=>{let n=u(),e=[{...P.datasets[0],...n,...r}];return{...P,labels:t,datasets:e}},d={...k(s,l),...i};switch(e){case"doughnut":return(0,a.jsx)(j.$I,{data:c,options:d});case"bar":return(0,a.jsx)(j.$Q,{data:c,options:d});default:return(0,a.jsx)(j.x1,{data:c,options:d})}};function C(){let n=(0,r.Z)(["\n  flex: 1;\n"]);return C=function(){return n},n}let T=(0,m.ZP)(l.Z)(C()),N=n=>{let{values:e,horizontal:t=!1,format:r=y.E.number,className:i}=n,s=t?"y":"x";return(0,a.jsx)(T,{className:i,children:(0,a.jsx)(h.Z,{children:(0,a.jsx)(w,{type:"bar",format:r,labels:e.map(n=>n.name),dataset:{data:e.map(n=>n.total),maxBarThickness:32,borderRadius:4},options:{indexAxis:s,layout:{padding:0},plugins:{legend:{display:!1}},scales:{[s]:{display:!0,grid:{display:!1},ticks:{autoSkipPadding:24,maxRotation:0}},[t?"x":"y"]:{display:!1}}}})})})},B=p.memo(N,(n,e)=>n.values===e.values);function E(){let n=(0,r.Z)(["\n  && {\n    padding: 2rem;\n    display: flex;\n    flex-direction: column;\n  }\n"]);return E=function(){return n},n}function S(){let n=(0,r.Z)(["\n  display: flex;\n  justify-content: space-between;\n"]);return S=function(){return n},n}function H(){let n=(0,r.Z)(["\n  flex: 1;\n  min-height: 100px;\n  width: 100%;\n"]);return H=function(){return n},n}let M=(0,m.ZP)(Z.Z)(E()),R=(0,m.ZP)(l.Z)(S()),_=(0,m.ZP)(B)(H()),z=n=>{let{label:e,description:t,values:r,average:i,format:s=y.E.number,horizontal:l=!1,className:o}=n;return(0,a.jsxs)(M,{className:o,children:[(0,a.jsx)(R,{children:(0,a.jsx)(x.Z,{title:e,description:t,sideComponent:null!=i&&(0,a.jsx)(g.Z,{value:i||0,label:"m\xe9dia",small:!0,inline:!0})})}),r&&(0,a.jsx)(_,{values:r,format:s,horizontal:l})]})};var L=t(6010),Y=t(381),A=t.n(Y);function D(){let n=(0,r.Z)(["\n  flex: 1;\n"]);return D=function(){return n},n}let F=(0,m.ZP)(l.Z)(D()),I=n=>{let{values:e,format:t=y.E.number,className:r}=n,i=n=>A()(n).format("MMMM YYYY"),s=n=>i(n[0].xLabel);return(0,a.jsx)(F,{className:r,children:(0,a.jsx)(h.Z,{children:(0,a.jsx)(w,{type:"line",format:t,labels:e.map(n=>i(n.date)),dataset:{data:e.map(n=>({x:n.date,y:n.value})),maxBarThickness:32,tension:.2},options:{layout:{padding:0},plugins:{legend:{display:!1}},scales:{y:{display:!1},x:{display:!1}}},tooltipCallbacksTitle:s})})})},V=p.memo(I,(n,e)=>n.values===e.values);function W(){let n=(0,r.Z)(["\n  && {\n    padding: 0;\n  }\n"]);return W=function(){return n},n}function $(){let n=(0,r.Z)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  padding: 2rem;\n\n  "," {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  &.alignCenter {\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n    height: 100%;\n  }\n"]);return $=function(){return n},n}function J(){let n=(0,r.Z)(["\n  && {\n    margin-bottom: 0.5rem;\n  }\n"]);return J=function(){return n},n}function Q(){let n=(0,r.Z)(["\n  flex: 1;\n  height: 100px;\n  width: 100%;\n"]);return Q=function(){return n},n}function U(){let n=(0,r.Z)(["\n  display: grid;\n  grid-template-columns: 1fr;\n  justify-items: flex-end;\n\n  "," {\n    grid-template-columns: 1fr 1fr;\n    justify-items: flex-start;\n    grid-gap: 0.75rem;\n    margin-top: 1rem;\n  }\n"]);return U=function(){return n},n}function q(){let n=(0,r.Z)([""]);return q=function(){return n},n}let G=(0,m.ZP)(Z.Z)(W()),K=(0,s.Z)((0,m.ZP)(l.Z)($(),n=>{let{theme:e}=n;return e.breakpoints.down("xs")})),O=(0,m.ZP)(x.Z)(J()),X=(0,m.ZP)(V)(Q()),nn=(0,s.Z)((0,m.ZP)(l.Z)(U(),n=>{let{theme:e}=n;return e.breakpoints.down("xs")})),ne=(0,m.ZP)(g.Z)(q()),nt=n=>{let{label:e,value:t,format:r=y.E.number,primary:i=!1,alignCenter:s=!1,otherValues:o,historicalValues:u,className:c}=n,d=n=>(0,a.jsx)(ne,{format:r,value:n.value,label:n.label,small:!0,inline:!0},n.label);return(0,a.jsxs)(G,{className:c,primary:i,children:[(0,a.jsxs)(K,{className:(0,L.Z)({alignCenter:s}),children:[(0,a.jsxs)(l.Z,{children:[(0,a.jsx)(O,{title:e,contrast:i}),(0,a.jsx)(g.Z,{format:r,value:t,light:i,alignCenter:s})]}),o&&(0,a.jsx)(nn,{children:o.map(d)})]}),u&&(0,a.jsx)(X,{values:u,format:r})]})};function nr(){let n=(0,r.Z)(["\n  flex: 1;\n"]);return nr=function(){return n},n}let na=(0,m.ZP)(l.Z)(nr()),ni=n=>{let{values:e,format:t=y.E.number,className:r}=n,i=(0,b.Z)(),s=n=>{let t=(e.length-n)/e.length,r=(Math.round(255*t)+65536).toString(16).substr(-2).toUpperCase();return r};return(0,a.jsx)(na,{className:r,children:(0,a.jsx)(h.Z,{children:(0,a.jsx)(w,{type:"doughnut",format:t,labels:e.map(n=>n.name),dataset:{data:e.map(n=>n.total),backgroundColor:e.map((n,e)=>i.palette.primary.main+s(e)),borderColor:"transparent"},options:{layout:{padding:0},plugins:{legend:{display:!1}},scales:{y:{display:!1},x:{display:!1}}}})})})},ns=p.memo(ni,(n,e)=>n.values===e.values);function nl(){let n=(0,r.Z)(["\n  && {\n    padding: 2rem;\n    display: flex;\n    flex-direction: column;\n  }\n"]);return nl=function(){return n},n}function no(){let n=(0,r.Z)(["\n  flex: 1;\n  min-height: 100px;\n  width: 100%;\n"]);return no=function(){return n},n}let nu=(0,m.ZP)(Z.Z)(nl()),nc=(0,m.ZP)(ns)(no()),nd=n=>{let{label:e,values:t,format:r=y.E.number,className:i}=n;return(0,a.jsxs)(nu,{className:i,children:[(0,a.jsx)(x.Z,{title:e}),t&&(0,a.jsx)(nc,{values:t,format:r})]})};var np=t(450),nm=t(1872),nf=t(3490);function nZ(){let n=(0,r.Z)(["\n  && {\n    width: 5rem;\n    height: 5rem;\n    margin-right: 1.5rem;\n  }\n"]);return nZ=function(){return n},n}function nx(){let n=(0,r.Z)(["\n  && {\n    display: flex;\n    align-items: center;\n    margin-bottom: 2rem;\n  }\n"]);return nx=function(){return n},n}function ng(){let n=(0,r.Z)(["\n  display: grid;\n  grid-gap: 1.5rem;\n  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;\n  grid-template-areas:\n    'people entrances entrances attendances attendances'\n    'services services services services services'\n    'genders ages ages schoolTrainings schoolTrainings'\n    'skinColors homelessness homelessness schoolTrainings schoolTrainings';\n\n  "," {\n    grid-template-columns: 1fr 1fr;\n    grid-template-areas:\n      'people people'\n      'entrances attendances'\n      'services services'\n      'genders ages'\n      'skinColors homelessness'\n      'schoolTrainings schoolTrainings';\n  }\n\n  "," {\n    grid-template-columns: 1fr 1fr;\n    grid-template-areas:\n      'people people'\n      'entrances entrances'\n      'attendances attendances'\n      'services services'\n      'genders skinColors'\n      'ages ages'\n      'homelessness homelessness'\n      'schoolTrainings schoolTrainings';\n  }\n"]);return ng=function(){return n},n}function nh(){let n=(0,r.Z)(["\n  grid-area: people;\n"]);return nh=function(){return n},n}function nb(){let n=(0,r.Z)(["\n  grid-area: attendances;\n"]);return nb=function(){return n},n}function nj(){let n=(0,r.Z)(["\n  grid-area: entrances;\n"]);return nj=function(){return n},n}function ny(){let n=(0,r.Z)(["\n  grid-area: services;\n"]);return ny=function(){return n},n}function nv(){let n=(0,r.Z)(["\n  grid-area: genders;\n"]);return nv=function(){return n},n}function nP(){let n=(0,r.Z)(["\n  grid-area: ages;\n"]);return nP=function(){return n},n}function nk(){let n=(0,r.Z)(["\n  grid-area: skinColors;\n"]);return nk=function(){return n},n}function nw(){let n=(0,r.Z)(["\n  grid-area: homelessness;\n"]);return nw=function(){return n},n}function nC(){let n=(0,r.Z)(["\n  grid-area: schoolTrainings;\n  min-height: 420px;\n"]);return nC=function(){return n},n}let nT=(0,m.ZP)(i.Z)(nZ()),nN=m.ZP.span(nx()),nB=(0,s.Z)((0,m.ZP)(l.Z)(ng(),n=>{let{theme:e}=n;return e.breakpoints.down("sm")},n=>{let{theme:e}=n;return e.breakpoints.down("xs")})),nE=(0,m.ZP)(nt)(nh()),nS=(0,m.ZP)(nt)(nb()),nH=(0,m.ZP)(nt)(nj()),nM=(0,m.ZP)(np.Z)(ny()),nR=(0,m.ZP)(nd)(nv()),n_=(0,m.ZP)(z)(nP()),nz=(0,m.ZP)(nd)(nk()),nL=(0,m.ZP)(z)(nw()),nY=(0,m.ZP)(z)(nC()),nA=()=>{let{isLogged:n}=(0,nm.F_)(),[e,t]=(0,p.useState)();if((0,p.useEffect)(()=>{nf.Z.getDashboardData().then(n=>{t(n)})},[]),!e)return(0,a.jsx)(a.Fragment,{});let{people:r,entrances:i,serviceAttendances:s,services:l,genders:m,skinColors:Z,schoolTrainings:x,ages:g,homelessness:h}=e;return(0,a.jsxs)(u.Z,{children:[(0,a.jsx)(f.Z,{title:n?"Dashboard":(0,a.jsxs)(nN,{children:[(0,a.jsx)(nT,{src:"/images/logo.png"}),"Canto da Rua",(0,a.jsx)(o.Z,{href:"https://www.instagram.com/cantodaruaemergencial/",target:"_blank",style:{float:"left"},children:(0,a.jsx)(c.Z,{})}),(0,a.jsx)(o.Z,{href:"https://www.facebook.com/comunidadecantodarua",target:"_blank",children:(0,a.jsx)(d.Z,{})})]})}),(0,a.jsxs)(nB,{children:[(0,a.jsx)(nE,{...r,primary:!0,alignCenter:!0}),(0,a.jsx)(nH,{...i}),(0,a.jsx)(nS,{...s}),(0,a.jsx)(nM,{...l}),(0,a.jsx)(nR,{...m}),(0,a.jsx)(n_,{...g}),(0,a.jsx)(nz,{...Z}),(0,a.jsx)(nL,{...h}),(0,a.jsx)(nY,{...x,horizontal:!0})]})]})};var nD=nA},450:function(n,e,t){t.d(e,{Z:function(){return _}});var r=t(7297),a=t(5893),i=t(6598),s=t(253),l=t(7294),o=t(9521),u=t(6050),c=t(8043),d=t(4768),p=t(9475),m=t(9592),f=t(1059),Z=t(8118),x=t(2164);let g=n=>{let{icon:e}=n;switch(e){case"work":return(0,a.jsx)(d.Z,{});case"restaurant":return(0,a.jsx)(p.Z,{});case"wc":return(0,a.jsx)(m.Z,{});case"local-hospital":return(0,a.jsx)(f.Z,{});case"local-laundry-service":return(0,a.jsx)(Z.Z,{});case"bathtub":return(0,a.jsx)(x.Z,{});default:return null}};var h=t(282),b=t(6010);function j(){let n=(0,r.Z)(["\n  border: 1px solid ",";\n  border-radius: 16px;\n"]);return j=function(){return n},n}function y(){let n=(0,r.Z)(["\n  && {\n    font-size: 0.7rem;\n    font-weight: 700;\n    border-right: 1px solid;\n    border-radius: 0;\n    padding: 4px 12px;\n    color: ",";\n\n    &:first-child {\n      border-radius: 16px 0 0 16px;\n    }\n\n    &:last-child {\n      border-right: none;\n      border-radius: 0 16px 16px 0;\n    }\n\n    &.active {\n      background-color: ",";\n      color: #fff;\n    }\n  }\n"]);return y=function(){return n},n}let v=(0,i.Z)((0,o.ZP)(s.Z)(j(),n=>{let{theme:e}=n;return"".concat(e.palette.primary.main,"c2")})),P=(0,i.Z)((0,o.ZP)(h.Z)(y(),n=>{let{theme:e}=n;return"".concat(e.palette.primary.main,"c2")},n=>{let{theme:e}=n;return"".concat(e.palette.primary.main,"c2")})),k=n=>{let{inititalValue:e,options:t,onSelect:r,className:i}=n,[s,o]=(0,l.useState)(e),u=n=>{o(n),r(n)},c=n=>(0,a.jsx)(P,{onClick:()=>u(n),className:(0,b.Z)({active:n.id===s.id}),children:n.label},n.id);return(0,a.jsx)(v,{className:i,children:t.map(c)})};var w=t(6182);function C(){let n=(0,r.Z)(["\n  display: grid;\n  column-gap: 1rem;\n  row-gap: 4rem;\n  grid-template-columns: repeat(4, 1fr);\n  padding: 2rem 0;\n\n  "," {\n    grid-template-columns: repeat(3, 1fr);\n  }\n\n  "," {\n    grid-template-columns: repeat(2, 1fr);\n  }\n"]);return C=function(){return n},n}function T(){let n=(0,r.Z)(["\n  display: flex;\n  align-items: center;\n"]);return T=function(){return n},n}function N(){let n=(0,r.Z)(["\n  && {\n    margin-right: 1rem;\n    background-color: ",";\n    width: 48px;\n    height: 48px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 50%;\n    flex: 0 0 auto;\n  }\n"]);return N=function(){return n},n}function B(){let n=(0,r.Z)(["\n  && {\n    font-size: 0.7rem;\n\n    .MuiTypography-colorTextSecondary {\n      font-size: 0.8rem;\n      line-height: 1.3;\n      margin-top: 4px;\n    }\n  }\n"]);return B=function(){return n},n}let E=(0,i.Z)((0,o.ZP)(s.Z)(C(),n=>{let{theme:e}=n;return e.breakpoints.down("sm")},n=>{let{theme:e}=n;return e.breakpoints.down("xs")})),S=(0,o.ZP)(s.Z)(T()),H=(0,i.Z)((0,o.ZP)(s.Z)(N(),n=>{let{theme:e}=n;return"".concat(e.palette.primary.main,"30")})),M=(0,o.ZP)(w.Z)(B()),R=n=>{let{values:e,className:t}=n,[r,i]=(0,l.useState)("total"),s=n=>(0,a.jsxs)(S,{children:[(0,a.jsx)(H,{children:(0,a.jsx)(g,{icon:n.icon})}),(0,a.jsx)(M,{value:+(n[r]||0),label:n.name})]},n.name);return(0,a.jsxs)(u.Z,{className:t,children:[(0,a.jsx)(c.Z,{title:"Servi\xe7os",sideComponent:(()=>{let n=[{id:0,label:"Semana",value:"weekTotal"},{id:1,label:"M\xeas",value:"monthTotal"},{id:2,label:"Total",value:"total"}],e=n=>i(n.value);return(0,a.jsx)(k,{options:n,onSelect:e,inititalValue:n[2]})})()}),(0,a.jsx)(E,{children:e&&e.map(s)})]})};var _=R}}]);