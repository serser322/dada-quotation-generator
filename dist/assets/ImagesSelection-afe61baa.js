import{_ as P,r as m,c as C,X as T,y as U,Y as j,o,a as n,d as l,w as i,v as c,j as g,b as a,M as u,F as H,C as b,k as x,H as y,$ as L,p as q,m as z}from"./index-75b4512f.js";import{u as X}from"./quotationData-26310ad5.js";import{B as D}from"./BaseLoader-119d9d0f.js";import{B as Y,a as V,b as A}from"./BaseButton-23548e43.js";const p=_=>(q("data-v-0f9ece12"),_=_(),z(),_),G=p(()=>a("h2",{for:""}," 請選擇此名言圖的立繪： ",-1)),J=["onClick"],K=["src"],O=["onClick"],W=["src"],Z={class:"btn__group"},ee=p(()=>a("span",{class:"material-symbols-outlined"}," arrow_back ",-1)),ae=p(()=>a("span",{class:"material-symbols-outlined"}," arrow_forward ",-1)),se={__name:"ImagesSelection",setup(_){const f=m(0),h=m(0),v=C(()=>f.value===6),S=C(()=>h.value===10),E=()=>{f.value++},F=()=>{h.value++},d=m([{imageName:"vts-2023-04-06_01h59_42.png",isSelected:!1},{imageName:"vts-2023-04-06_17h45_46.png",isSelected:!1},{imageName:"vts-2023-04-06_17h47_23.png",isSelected:!1},{imageName:"vts-2023-04-06_17h40_52.png",isSelected:!1},{imageName:"vts-2023-04-06_17h42_42.png",isSelected:!1},{imageName:"vts-2022-11-02_06h44_01.png",isSelected:!1},{imageName:"vts-2022-11-02_06h54_15.png",isSelected:!1},{imageName:"vts-2022-11-02_06h49_12.png",isSelected:!1},{imageName:"vts-2022-11-02_06h48_44.png",isSelected:!1},{imageName:"vts-2022-02-22_01h03_51.png",isSelected:!1},{imageName:"vts-2022-01-24_06h58_47.png",isSelected:!1},{imageName:"vts-2021-10-30_20h51_41.png",isSelected:!1},{imageName:"vts-2021-11-15_18h23_24.png",isSelected:!1},{imageName:"vts-2021-12-25_22h52_13.png",isSelected:!1},{imageName:"vts-2021-12-24_04h22_39.png",isSelected:!1},{imageName:"vts-2021-12-26_13h12_24.png",isSelected:!1}]),N=X(),I=s=>{d.value.forEach(r=>{r.isSelected=!1}),s.isSelected=!0,N.setImage(s.imageName),t.value=!0},{image:k}=T(N);U(()=>{d.value.forEach(s=>{s.isSelected=s.imageName===k.value})});const t=m(!0),Q=()=>{t.value=!!k.value},w=j(),R=()=>{w.push({name:"QuotationInput"})},$=()=>{Q(),t.value&&w.push({name:"SourceInput"})},B=function(s){const r="../assets/images/"+s;return new URL(r,import.meta.url).href};return(s,r)=>(o(),n("main",null,[l(A,{page:"imagesSelection"}),i(l(D,null,null,512),[[c,!v.value]]),i(l(Y,null,{default:g(()=>[G,a("div",{class:u(["invalid__text",t.value?"hidden":"showHint"])}," 提示：需選擇一張立繪 ",2),a("div",{class:u(["images",{invalid__border:!t.value,invalid__border__space:t.value}])},[(o(!0),n(H,null,b(d.value.slice(0,6),(e,M)=>(o(),n("div",{key:e,class:u(["image",{selected:e.isSelected}]),onClick:te=>I(e)},[a("img",y({src:B(e.imageName),alt:""},L({load:E},!0)),null,16,K)],10,J))),128)),a("div",null,[i(l(D,null,null,512),[[c,!S.value]])]),(o(!0),n(H,null,b(d.value.slice(6),e=>i((o(),n("div",{key:e,class:u(["image",{selected:e.isSelected}]),onClick:M=>I(e)},[a("img",y({src:B(e.imageName),alt:""},L({load:F},!0)),null,16,W)],10,O)),[[c,S.value]])),128))],2)]),_:1},512),[[c,v.value]]),i(a("div",Z,[l(V,{onClick:R},{default:g(()=>[ee,x(" 上一步 ")]),_:1}),l(V,{onClick:$},{default:g(()=>[x(" 下一步 "),ae]),_:1})],512),[[c,v.value]])]))}},ce=P(se,[["__scopeId","data-v-0f9ece12"]]);export{ce as default};