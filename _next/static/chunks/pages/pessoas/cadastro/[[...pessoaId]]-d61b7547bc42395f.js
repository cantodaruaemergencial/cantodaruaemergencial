(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[316],{1568:function(e,n,t){"use strict";var r=t(7294),o=t(3786);n.Z=(0,o.Z)(r.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7a.9959.9959 0 010-1.41c.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z"}),"CheckCircleRounded")},8781:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/pessoas/cadastro/[[...pessoaId]]",function(){return t(1843)}])},1843:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return v}});var r=t(5893),o=t(370),s=t(7297),u=t(8757),a=t(3832),c=t(880),l=t(7294),i=t(9521),d=t(4101),p=t(475),f=t(9932);function h(){let e=(0,s.Z)(["\n  && {\n    max-width: 600px;\n  }\n"]);return h=function(){return e},e}let m=(0,i.ZP)(a.Z).withConfig({componentId:"sc-cc5e292f-0"})(h()),C=e=>{let{personId:n,form:t}=e,o=(0,c.useRouter)(),[s,a]=(0,l.useState)({open:!1,person:null}),i=async e=>new Promise((t,r)=>{u.Z.savePerson(e,n).then(e=>{null!==n?(o.replace("/pessoas"),h(null==e?void 0:e.CardNumber),t("Cadastro atualizado com sucesso!")):(C(e),t(null))}).catch(()=>{r("Ocorreu um erro. Tente novamente.")})}),h=e=>o.replace("/pessoas?q=".concat(e)),C=e=>a({open:!0,person:e}),_=()=>{var e;a({...s,open:!1}),h((null===(e=s.person)||void 0===e?void 0:e.CardNumber)||"")};return(0,r.jsxs)(m,{children:[(0,r.jsx)(p.Z,{title:"Cadastro"}),t&&(0,r.jsx)(d.Z,{form:t,onSubmit:i}),(0,r.jsx)(f.Z,{...s,handleClose:_,newPerson:!0})]})};var _=t(1163);let Z=()=>{let[e,n]=(0,l.useState)(null),[t,s]=(0,l.useState)(),a=(0,_.useRouter)();return(0,l.useEffect)(()=>{let{pessoaId:e}=a.query,t=e?+e[0]:null;u.Z.getPersonForm(t).then(e=>{n(e),s(t)})},[]),(0,r.jsx)(o.Z,{title:"Cadastro - Canto da Rua",children:(0,r.jsx)(C,{form:e,personId:t})})};var v=Z},1163:function(e,n,t){e.exports=t(880)}},function(e){e.O(0,[169,585,575,24,711,432,874,733,313,774,888,179],function(){return e(e.s=8781)}),_N_E=e.O()}]);