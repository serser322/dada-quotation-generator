import{_ as V,r as v,c as q,X as D,y as E,Y as Q,o as b,a as I,d as _,w as n,v as e,j as c,b as a,M as S,K as A,k as w,p as M,m as R}from"./index-fe427250.js";import{u as T}from"./quotationData-71a3b485.js";import{B}from"./BaseLoader-3f55ea23.js";import{B as j,a as y,b as z}from"./BaseButton-e37d0134.js";const F="/dada-quotation-generator/assets/vts-2023-04-06_01h59_42-c5663766.png",K="/dada-quotation-generator/assets/vts-2023-04-06_17h45_46-1a507555.png",X="/dada-quotation-generator/assets/vts-2023-04-06_17h47_23-0581d88c.png",Y="/dada-quotation-generator/assets/vts-2023-04-06_17h40_52-0111cae2.png",G="/dada-quotation-generator/assets/vts-2023-04-06_17h42_42-cf76b3f6.png",J="/dada-quotation-generator/assets/vts-2022-11-02_06h44_01-6b6b330d.png",O="/dada-quotation-generator/assets/vts-2022-11-02_06h54_15-a4635a7a.png",P="/dada-quotation-generator/assets/vts-2022-11-02_06h49_12-5f0daff6.png",U="/dada-quotation-generator/assets/vts-2022-11-02_06h48_44-1fc29b73.png",W="/dada-quotation-generator/assets/vts-2022-02-22_01h03_51-9b9b2ee7.png",Z="/dada-quotation-generator/assets/vts-2022-01-24_06h58_47-23267ef3.png",$="/dada-quotation-generator/assets/vts-2021-10-30_20h51_41-0cc83506.png",aa="/dada-quotation-generator/assets/vts-2021-11-15_18h23_24-30982c05.png",sa="/dada-quotation-generator/assets/vts-2021-12-25_22h52_13-d9d18db7.png",ta="/dada-quotation-generator/assets/vts-2021-12-24_04h22_39-7ff4658d.png",oa="/dada-quotation-generator/assets/vts-2021-12-26_13h12_24-87253d52.png";const p=m=>(M("data-v-92110bac"),m=m(),R(),m),na=p(()=>a("h2",{for:""}," 請選擇此名言圖的立繪： ",-1)),ea={key:0,class:"img__loader"},ia={class:"btn__group"},la=p(()=>a("span",{class:"material-symbols-outlined"}," arrow_back ",-1)),da=p(()=>a("span",{class:"material-symbols-outlined"}," arrow_forward ",-1)),ra={__name:"ImagesSelection",setup(m){const f=v(0),L=v(0),u=q(()=>f.value===6),i=q(()=>L.value===10),d=()=>{f.value++},l=()=>{L.value++},k=T(),o=g=>{document.querySelectorAll(".image").forEach(s=>{s.classList.remove("selected")}),g.target.parentElement.classList.add("selected"),k.setImage(g.target.dataset.img),r.value=!0},{image:C}=D(k);E(()=>{document.querySelectorAll(".image").forEach(g=>{g.firstChild.dataset.img===C.value&&g.classList.add("selected")})});const r=v(!0),x=()=>{r.value=!!C.value},h=Q(),H=()=>{h.push({name:"QuotationInput"})},N=()=>{x(),r.value&&h.push({name:"SourceInput"})};return(g,s)=>(b(),I("main",null,[_(z,{page:"imagesSelection"}),n(_(B,null,null,512),[[e,!u.value]]),n(_(j,null,{default:c(()=>[na,a("div",{class:S(["invalid__text",r.value?"hidden":"showHint"])}," 提示：需選擇一張立繪 ",2),a("div",{class:S(["images",{invalid__border:!r.value,invalid__border__space:r.value}])},[a("div",{class:"image",onClick:s[0]||(s[0]=t=>o(t))},[a("img",{src:F,alt:"","data-img":"vts-2023-04-06_01h59_42.png",onLoad:d},null,32)]),a("div",{class:"image",onClick:s[1]||(s[1]=t=>o(t))},[a("img",{src:K,alt:"","data-img":"vts-2023-04-06_17h45_46.png",onLoad:d},null,32)]),a("div",{class:"image",onClick:s[2]||(s[2]=t=>o(t))},[a("img",{src:X,alt:"","data-img":"vts-2023-04-06_17h47_23.png",onLoad:d},null,32)]),a("div",{class:"image",onClick:s[3]||(s[3]=t=>o(t))},[a("img",{src:Y,alt:"","data-img":"vts-2023-04-06_17h40_52.png",onLoad:d},null,32)]),a("div",{class:"image",onClick:s[4]||(s[4]=t=>o(t))},[a("img",{src:G,alt:"","data-img":"vts-2023-04-06_17h42_42.png",onLoad:d},null,32)]),a("div",{class:"image",onClick:s[5]||(s[5]=t=>o(t))},[a("img",{src:J,alt:"","data-img":"vts-2022-11-02_06h44_01.png",onLoad:d},null,32)]),i.value?A("",!0):(b(),I("div",ea,[_(B)])),n(a("div",{class:"image",onClick:s[6]||(s[6]=t=>o(t))},[a("img",{src:O,alt:"","data-img":"vts-2022-11-02_06h54_15.png",onLoad:l},null,32)],512),[[e,i.value]]),n(a("div",{class:"image",onClick:s[7]||(s[7]=t=>o(t))},[a("img",{src:P,alt:"","data-img":"vts-2022-11-02_06h49_12.png",onLoad:l},null,32)],512),[[e,i.value]]),n(a("div",{class:"image",onClick:s[8]||(s[8]=t=>o(t))},[a("img",{src:U,alt:"","data-img":"vts-2022-11-02_06h48_44.png",onLoad:l},null,32)],512),[[e,i.value]]),n(a("div",{class:"image",onClick:s[9]||(s[9]=t=>o(t))},[a("img",{src:W,alt:"","data-img":"vts-2022-02-22_01h03_51.png",onLoad:l},null,32)],512),[[e,i.value]]),n(a("div",{class:"image",onClick:s[10]||(s[10]=t=>o(t))},[a("img",{src:Z,alt:"","data-img":"vts-2022-01-24_06h58_47.png",onLoad:l},null,32)],512),[[e,i.value]]),n(a("div",{class:"image",onClick:s[11]||(s[11]=t=>o(t))},[a("img",{src:$,alt:"","data-img":"vts-2021-10-30_20h51_41.png",onLoad:l},null,32)],512),[[e,i.value]]),n(a("div",{class:"image",onClick:s[12]||(s[12]=t=>o(t))},[a("img",{src:aa,alt:"","data-img":"vts-2021-11-15_18h23_24.png",onLoad:l},null,32)],512),[[e,i.value]]),n(a("div",{class:"image",onClick:s[13]||(s[13]=t=>o(t))},[a("img",{src:sa,alt:"","data-img":"vts-2021-12-25_22h52_13.png",onLoad:l},null,32)],512),[[e,i.value]]),n(a("div",{class:"image",onClick:s[14]||(s[14]=t=>o(t))},[a("img",{src:ta,alt:"","data-img":"vts-2021-12-24_04h22_39.png",onLoad:l},null,32)],512),[[e,i.value]]),n(a("div",{class:"image",onClick:s[15]||(s[15]=t=>o(t))},[a("img",{src:oa,alt:"","data-img":"vts-2021-12-26_13h12_24.png",onLoad:l},null,32)],512),[[e,i.value]])],2)]),_:1},512),[[e,u.value]]),n(a("div",ia,[_(y,{onClick:H},{default:c(()=>[la,w(" 上一步 ")]),_:1}),_(y,{onClick:N},{default:c(()=>[w(" 下一步 "),da]),_:1})],512),[[e,u.value]])]))}},va=V(ra,[["__scopeId","data-v-92110bac"]]);export{va as default};
