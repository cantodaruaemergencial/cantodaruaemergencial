if(!self.define){let e,a={};const n=(n,c)=>(n=new URL(n+".js",c).href,a[n]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=a,document.head.appendChild(e)}else e=n,importScripts(n),a()})).then((()=>{let e=a[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,s)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(a[i])return;let t={};const r=e=>n(e,i),o={module:{uri:i},exports:t,require:r};a[i]=Promise.all(c.map((e=>o[e]||r(e)))).then((e=>(s(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/cantodaruaemergencial/_next/static/chunks/208-bf8113f0a2e591fb.js",revision:"bf8113f0a2e591fb"},{url:"/cantodaruaemergencial/_next/static/chunks/285-dff3aceda8c444b7.js",revision:"dff3aceda8c444b7"},{url:"/cantodaruaemergencial/_next/static/chunks/313-ebe8a4d4f757f495.js",revision:"ebe8a4d4f757f495"},{url:"/cantodaruaemergencial/_next/static/chunks/338-d37f8a49bdea87bb.js",revision:"d37f8a49bdea87bb"},{url:"/cantodaruaemergencial/_next/static/chunks/3fff1979-f0e768309a6184f1.js",revision:"f0e768309a6184f1"},{url:"/cantodaruaemergencial/_next/static/chunks/432-514320241c416403.js",revision:"514320241c416403"},{url:"/cantodaruaemergencial/_next/static/chunks/538-56974a472ffc6235.js",revision:"56974a472ffc6235"},{url:"/cantodaruaemergencial/_next/static/chunks/547-c1c787f5d56f9682.js",revision:"c1c787f5d56f9682"},{url:"/cantodaruaemergencial/_next/static/chunks/575-ff52ac3c727b825a.js",revision:"ff52ac3c727b825a"},{url:"/cantodaruaemergencial/_next/static/chunks/701-109d5d137a036d59.js",revision:"109d5d137a036d59"},{url:"/cantodaruaemergencial/_next/static/chunks/711-e87c5cd3fd2b9873.js",revision:"e87c5cd3fd2b9873"},{url:"/cantodaruaemergencial/_next/static/chunks/733-a95ae0db64231d78.js",revision:"a95ae0db64231d78"},{url:"/cantodaruaemergencial/_next/static/chunks/797-c9bfcd2b6e0d72a9.js",revision:"c9bfcd2b6e0d72a9"},{url:"/cantodaruaemergencial/_next/static/chunks/82-6f8159c5d982d316.js",revision:"6f8159c5d982d316"},{url:"/cantodaruaemergencial/_next/static/chunks/874-05f2263d64a981ad.js",revision:"05f2263d64a981ad"},{url:"/cantodaruaemergencial/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/cantodaruaemergencial/_next/static/chunks/main-e07a432f6b23d511.js",revision:"e07a432f6b23d511"},{url:"/cantodaruaemergencial/_next/static/chunks/pages/_app-c6a92486d87eecd3.js",revision:"c6a92486d87eecd3"},{url:"/cantodaruaemergencial/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/cantodaruaemergencial/_next/static/chunks/pages/dashboard-a13922f9bbb5ccba.js",revision:"a13922f9bbb5ccba"},{url:"/cantodaruaemergencial/_next/static/chunks/pages/index-e3d65926ad82e484.js",revision:"e3d65926ad82e484"},{url:"/cantodaruaemergencial/_next/static/chunks/pages/login-b9b02c9de906ab80.js",revision:"b9b02c9de906ab80"},{url:"/cantodaruaemergencial/_next/static/chunks/pages/pessoas-f781a7a60f21ddff.js",revision:"f781a7a60f21ddff"},{url:"/cantodaruaemergencial/_next/static/chunks/pages/pessoas/cadastro/%5B%5B...pessoaId%5D%5D-2a58843c49ce45ad.js",revision:"2a58843c49ce45ad"},{url:"/cantodaruaemergencial/_next/static/chunks/pages/relatorios-f91fce2541e46cf3.js",revision:"f91fce2541e46cf3"},{url:"/cantodaruaemergencial/_next/static/chunks/pages/servicos-63ed6dddd4b1c6d5.js",revision:"63ed6dddd4b1c6d5"},{url:"/cantodaruaemergencial/_next/static/chunks/pages/servicos/cadastro-9902ba8c3dbe27d7.js",revision:"9902ba8c3dbe27d7"},{url:"/cantodaruaemergencial/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/cantodaruaemergencial/_next/static/chunks/webpack-77f9ec91e67e601a.js",revision:"77f9ec91e67e601a"},{url:"/cantodaruaemergencial/_next/static/m2SMLONDVy-hvHXIOI1Eo/_buildManifest.js",revision:"5fe7b3a3361dfa823fb5fae26433665d"},{url:"/cantodaruaemergencial/_next/static/m2SMLONDVy-hvHXIOI1Eo/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/cantodaruaemergencial/icons/android-chrome-192x192.png",revision:"7b0bd67f4124b377026ad0522fa7649d"},{url:"/cantodaruaemergencial/icons/apple-touch-icon.png",revision:"9ef0cd8a7a7d640b207558e8a9b254c2"},{url:"/cantodaruaemergencial/icons/favicon.ico",revision:"4e9412411759521b4a785cc04dee8b70"},{url:"/cantodaruaemergencial/icons/icon-512x512.png",revision:"1715680c81be4002ee18c3458a98ba78"},{url:"/cantodaruaemergencial/images/flag.png",revision:"fd241e3b4dc50be8ad9b91e8e6afb718"},{url:"/cantodaruaemergencial/images/googleIcon.png",revision:"5385b0351f9a0787d773c90c701b84c4"},{url:"/cantodaruaemergencial/images/helpingHand.png",revision:"27299b111911e527eb13de68ad8ffe95"},{url:"/cantodaruaemergencial/images/logo.png",revision:"f53c40b62711d24c1a9fcd02b33c4cdd"},{url:"/cantodaruaemergencial/manifest.json",revision:"3e3ef07db19df90aa9bb84f21cef7be0"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/cantodaruaemergencial",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:n,state:c})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
