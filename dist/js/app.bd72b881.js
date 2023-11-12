(function(){"use strict";var e={287:function(e,t,n){var o=n(9242),a=(n(9773),n(8727)),u=n(708),i=n(8600),r=n(3396);const s={class:"app",id:"app"},l={class:"youtube-app-container"};function c(e,t,n,o,a,u){const i=(0,r.up)("youtube-configurator"),c=(0,r.up)("youtube-video");return(0,r.wg)(),(0,r.iD)("div",s,[(0,r._)("div",l,[(0,r.Wm)(i,{placeholder:a.placeholder,label:a.label,onOnSubmit:u.onSubmit,onToggleSwitch:u.onToggleSwitch,"prepend-icon":"$vuetify"},null,8,["placeholder","label","onOnSubmit","onToggleSwitch"]),(0,r.Wm)(c,{videoId:a.videoId,autoPause:a.autoPause},null,8,["videoId","autoPause"])])])}const d=e=>((0,r.dD)("data-v-462cae9a"),e=e(),(0,r.Cn)(),e),p={class:"youtube-player",tabindex:"-1"},h=d((()=>(0,r._)("div",{id:"player",tabindex:"-1"},null,-1))),f=[h];function y(e,t,n,o,a,u){return(0,r.wg)(),(0,r.iD)("div",p,f)}function v(){const e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";const t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}var b={name:"YoutubeVideo",data(){return{date:new Date,player:null}},props:{playerOptions:{type:Object,default:()=>{}},videoId:{type:String,default:"lxF31-mHLz0"},autoPause:{type:Boolean,default:!1}},mounted(){this.isYoutubeAPILoaded()?this.onYoutubeAPIReady():v(),window.onYouTubeIframeAPIReady=()=>{this.onYoutubeAPIReady()}},methods:{onYoutubeAPIReady(){const e={height:"500px",width:"500px",videoId:this.videoId,playerVars:{controls:1,rel:0,autoplay:0},events:{onReady:this.onPlayerReady,onStateChange:this.onPlayerStateChange}};this.player=new YT.Player("player",e)},isYoutubeAPILoaded(){return window.YT&&window.YT.loaded},unstoppable(){setInterval((()=>{this.player.playVideo()}),10)}},watch:{player(){v(),window.onYouTubeIframeAPIReady=()=>{this.onYoutubeAPIReady()}},videoId(){this.player.loadVideoById(this.videoId),this.autoPause&&this.player.stopVideo()}}},m=n(89);const w=(0,m.Z)(b,[["render",y],["__scopeId","data-v-462cae9a"]]);var g=w,I=n(7139);const O={class:"youtube-configurator"},S={class:"container"};function V(e,t,n,a,u,i){const s=(0,r.up)("shark-icon"),l=(0,r.up)("v-text-field"),c=(0,r.up)("v-switch");return(0,r.wg)(),(0,r.iD)("div",O,[(0,r._)("div",S,[(0,r.Wm)(l,{class:"input-style",label:n.label,placeholder:n.placeholder,onKeyup:(0,o.D2)(i.onSubmit,["enter"]),clearable:"","hide-details":"auto"},{default:(0,r.w5)((()=>[(0,r.Wm)(s)])),_:1},8,["label","placeholder","onKeyup"]),(0,r.Wm)(c,{class:(0,I.C_)(["switch-style",{activated:u.switchValue}]),modelValue:u.switchValue,"onUpdate:modelValue":t[0]||(t[0]=e=>u.switchValue=e),label:"Pause on load",color:"red"},null,8,["modelValue","class"])])])}var P=n(165),R=n(3104),_=n.p+"img/shark-icon.328bef1a.svg",A={components:{VTextField:P.h,VSwitch:R.G,SharkIcon:_},data(){return{switchValue:!1}},emits:["onSubmit","toggle-switch"],props:{placeholder:{type:String,default:""},label:{type:String,default:""}},computed:{},watch:{switchValue(){this.$emit("toggle-switch",this.switchValue)}},methods:{onSubmit(e){const t=e.srcElement._value;t&&t.replace(/\s/g,"").length&&this.$emit("onSubmit",t)}}};const L=(0,m.Z)(A,[["render",V],["__scopeId","data-v-0a663103"]]);var x=L;function D(e,t={}){if(T(e)&&11===e.length)return e;const n="www.",o="https://",a=e.includes(n)?e.indexOf(n)+n.length:0;let u=e.substring(a,e.indexOf("/",a));const i=["youtube.com","m.youtube.com","youtu.be"];u.includes(o)||(u=o+u);const r=new URL(u),s=r.hostname;let l=!1;i.every((e=>{if(s===e)return l=!0,!1})),l||console.error("not a certified youtube link 😶‍🌫️");let c=e;c.includes(n)||(c=n+c),c.includes(o)||(c=o+c);const d=new URL(c).searchParams,p=d.get("v");return p||console.log("no v="),p}function T(e){return e.includes(".com")||e.includes(".ca")||e.includes(".net")||e.includes(".gg")||e.includes(".txt")||e.includes(".gov")||e.includes(".io")||e.includes(".org")}const Y={GOOGLE_ERROR:"GOOGLE ERROR",INVALID:"INVALID",VALID:"VALID"},k="AIzaSyDC5m0zYh3K6erncCUBGw9AXhAAf4wV8o8";function E(e="16y1AkoZkmQ"){return new Promise((t=>{const n=e,o=new XMLHttpRequest;o.open("GET","https://www.googleapis.com/youtube/v3/videos?id="+n+"&key="+k,!0),o.onreadystatechange=e=>{if(o.readyState===o.DONE){const e=j(o);t(e)}},o.send()}))}function j(e){if(!e||200!==e.status)return Y.GOOGLE_ERROR;const t=JSON.parse(e.responseText);return t.items&&t.items.length?Y.VALID:Y.INVALID}var C={name:"App",components:{YoutubeVideo:g,YoutubeConfigurator:x},data(){return{videoId:"MpGsiRy8jUk",autoPause:!1,label:"Enter a URL or video ID",placeholder:"ex: https://www.youtube.com/watch?v=_83LZ79VMLg&ab_channel=MrMoMMusic"}},methods:{onSubmit(e){const t=D(e);E(t).then((e=>{e===Y.VALID&&(this.hornyBasket=t)}))},onToggleSwitch(e){this.autoPause=e}}};const G=(0,m.Z)(C,[["render",c],["__scopeId","data-v-40095ce2"]]);var M=G;const N=(0,o.ri)(M),B=(0,a.Rd)({vuetifyComponents:u,vuetifyDirectives:i});N.use(B),N.mount("#app")}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var u=t[o]={exports:{}};return e[o].call(u.exports,u,u.exports,n),u.exports}n.m=e,function(){var e=[];n.O=function(t,o,a,u){if(!o){var i=1/0;for(c=0;c<e.length;c++){o=e[c][0],a=e[c][1],u=e[c][2];for(var r=!0,s=0;s<o.length;s++)(!1&u||i>=u)&&Object.keys(n.O).every((function(e){return n.O[e](o[s])}))?o.splice(s--,1):(r=!1,u<i&&(i=u));if(r){e.splice(c--,1);var l=a();void 0!==l&&(t=l)}}return t}u=u||0;for(var c=e.length;c>0&&e[c-1][2]>u;c--)e[c]=e[c-1];e[c]=[o,a,u]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var a,u,i=o[0],r=o[1],s=o[2],l=0;if(i.some((function(t){return 0!==e[t]}))){for(a in r)n.o(r,a)&&(n.m[a]=r[a]);if(s)var c=s(n)}for(t&&t(o);l<i.length;l++)u=i[l],n.o(e,u)&&e[u]&&e[u][0](),e[u]=0;return n.O(c)},o=self["webpackChunkthe_center"]=self["webpackChunkthe_center"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(287)}));o=n.O(o)})();
//# sourceMappingURL=app.bd72b881.js.map