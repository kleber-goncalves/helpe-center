import{_ as e,a as t,c as n,d as r,f as i,h as a,i as o,l as s,m as c,n as l,o as u,p as d,r as f,s as p,u as m}from"./seo-07S9mH5V.js";import{T as h,a as g,b as _,o as v,w as y,x as b}from"./ui-Bn6Ee605.js";import{t as x}from"./external-link-1iIpYfFB.js";import{C as S,D as C,S as w,T,_ as E,g as ee,i as D,n as te,o as O,t as ne,u as k,v as A,w as j}from"./index-eVUDoCZ8.js";var M={name:`arrow-left`,size:24,node:[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]};M.node;var re=h(M),N={name:`download`,size:24,node:[[`path`,{d:`M12 15V3`,key:`m9g1x1`}],[`path`,{d:`M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`,key:`ih7n3h`}],[`path`,{d:`m7 10 5 5 5-5`,key:`brsn70`}]]};N.node;var P=h(N),F={name:`lightbulb`,size:24,node:[[`path`,{d:`M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5`,key:`1gvzjb`}],[`path`,{d:`M9 18h6`,key:`x1upvd`}],[`path`,{d:`M10 22h4`,key:`ceow96`}]]};F.node;var ie=h(F),I={name:`list-video`,size:24,node:[[`path`,{d:`M21 5H3`,key:`1fi0y6`}],[`path`,{d:`M10 12H3`,key:`1ulcyk`}],[`path`,{d:`M10 19H3`,key:`108z41`}],[`path`,{d:`M15 12.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z`,key:`ms4nik`}]]};I.node;var ae=h(I),L={name:`loader-circle`,size:24,node:[[`path`,{d:`M21 12a9 9 0 1 1-6.219-8.56`,key:`13zald`}]],aliases:[`loader-2`]};L.node;var R=h(L),z={name:`maximize-2`,size:24,node:[[`path`,{d:`M15 3h6v6`,key:`1q9fwt`}],[`path`,{d:`m21 3-7 7`,key:`1l2asr`}],[`path`,{d:`m3 21 7-7`,key:`tjx5ai`}],[`path`,{d:`M9 21H3v-6`,key:`wtvkvv`}]]};z.node;var oe=h(z),B={name:`trash`,size:24,node:[[`path`,{d:`M10 11v6`,key:`nco0om`}],[`path`,{d:`M14 11v6`,key:`outv1u`}],[`path`,{d:`M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6`,key:`miytrc`}],[`path`,{d:`M3 6h18`,key:`d0wm0j`}],[`path`,{d:`M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2`,key:`e791ji`}]],aliases:[`trash-2`]};B.node;var V=h(B),H=e(a(),1),U=c();function se(e){if(typeof e!=`string`)return null;let t=e.split(/[?#]/,1)[0];return t.startsWith(`/`)?`public/${t.slice(1)}`:null}function ce({src:e,poster:t,title:n=`Vídeo do tutorial`,captions:r,className:i=``,wrapperClassName:a=``,width:o,height:s,preload:c=`metadata`,...l}){let u=S.images[se(t)]??null,d=o??u?.width,f=s??u?.height;return(0,U.jsxs)(`video`,{className:[`mx-auto block h-auto w-full rounded-lg border border-line`,a,i].filter(Boolean).join(` `),width:d,height:f,controls:!0,preload:c,playsInline:!0,poster:t,"aria-label":n,...l,children:[(0,U.jsx)(`source`,{src:e,type:`video/mp4`}),r&&(0,U.jsx)(`track`,{kind:`captions`,src:r,srcLang:`pt-BR`,label:`Português`,default:!0}),`Seu navegador não suporta a reprodução deste vídeo.`]})}function W({video:e,poster:t,title:n=`Vídeo do tutorial`,captions:r}){return(0,U.jsxs)(`figure`,{className:`bg-background p-3 sm:p-5`,children:[(0,U.jsx)(ce,{src:e,poster:t,title:n,captions:r,wrapperClassName:`mx-auto w-full max-w-3xl`}),(0,U.jsx)(`figcaption`,{className:`mx-auto mt-2 max-w-3xl text-xs leading-5 text-muted-foreground`,children:n})]})}function le({stepNumber:e,loaded:t,total:n,progress:r}){return(0,U.jsx)(`div`,{className:`grid min-h-[420px] place-items-center`,role:`status`,"aria-label":`Carregando materiais do passo ${e}`,children:(0,U.jsxs)(`div`,{className:`w-full max-w-md px-6 text-center`,children:[(0,U.jsxs)(`p`,{className:`text-xs font-bold tracking-[0.16em] text-muted-foreground`,children:[`PASSO `,String(e).padStart(2,`0`)]}),(0,U.jsx)(`h2`,{className:`mt-3 text-2xl font-bold text-ink`,children:`Preparando o conteúdo`}),(0,U.jsx)(`p`,{className:`mt-3 text-sm leading-6 text-muted-ink`,children:`Estamos carregando as imagens e vídeos deste passo.`}),(0,U.jsxs)(`div`,{className:`mt-8`,children:[(0,U.jsxs)(`div`,{className:`flex items-center justify-between text-xs font-semibold text-muted-foreground`,children:[(0,U.jsxs)(`span`,{children:[t,` de `,n,` materiais`]}),(0,U.jsxs)(`span`,{children:[r,`%`]})]}),(0,U.jsx)(`div`,{className:`mt-2 h-1.5 overflow-hidden rounded-full bg-mist`,role:`progressbar`,"aria-valuemin":`0`,"aria-valuemax":`100`,"aria-valuenow":r,"aria-label":`Carregamento do passo: ${r}%`,children:(0,U.jsx)(`div`,{className:`h-full rounded-full bg-coral transition-[width] duration-300 ease-out motion-reduce:transition-none`,style:{width:`${r}%`}})})]})]})})}function ue({src:e,alt:t,children:n}){let[r,i]=(0,H.useState)(!1),[a,o]=(0,H.useState)(!1),s=k(),c=(0,H.useRef)(null),l=(0,H.useRef)(null),u=(0,H.useRef)(null),d=(0,H.useId)(),f=()=>{o(!1),i(!0)},p=()=>{if(!a){if(s){i(!1);return}o(!0),j.timeline({onComplete:()=>{i(!1),o(!1)}}).to(u.current,{autoAlpha:0,x:12,duration:.2,ease:`power2.in`}).to(l.current,{autoAlpha:0,scale:.94,y:8,duration:.28,ease:`power2.in`},`<`).to(c.current,{autoAlpha:0,duration:.22,ease:`power2.in`},`<0.08`)}};(0,H.useEffect)(()=>{if(!r)return;let e=document.activeElement,t=document.body.style.overflow;document.body.style.overflow=`hidden`;let n=e=>{if(e.key===`Escape`){p();return}e.key===`Tab`&&(e.preventDefault(),u.current?.focus())};if(document.addEventListener(`keydown`,n),s)u.current?.focus();else{let r=j.context(()=>{j.fromTo(c.current,{autoAlpha:0},{autoAlpha:1,duration:.28,ease:`power2.out`}),j.fromTo(l.current,{autoAlpha:0,scale:.88,y:12},{autoAlpha:1,scale:1,y:0,duration:.48,ease:`power3.out`,delay:.02}),j.fromTo(u.current,{autoAlpha:0},{autoAlpha:1,duration:.32,ease:`power2.out`,delay:.16})},c);return requestAnimationFrame(()=>{u.current?.focus()}),()=>{r.revert(),document.removeEventListener(`keydown`,n),document.body.style.overflow=t,e instanceof HTMLElement&&e.focus()}}return()=>{document.removeEventListener(`keydown`,n),document.body.style.overflow=t,e instanceof HTMLElement&&e.focus()}},[r,s]);let m=H.Children.only(n),h=(0,H.cloneElement)(m,{onClick:e=>{m.props.onClick?.(e)},onKeyDown:e=>{m.props.onKeyDown?.(e),!e.defaultPrevented&&(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),f())},role:`button`,tabIndex:0,"aria-haspopup":`dialog`,"aria-expanded":r,"aria-label":`Ampliar imagem: `+t});return(0,U.jsxs)(U.Fragment,{children:[(0,U.jsxs)(`div`,{className:`group relative cursor-zoom-in`,onClick:f,children:[h,(0,U.jsx)(`span`,{className:`
                        
                        absolute
                        right-3
                        top-3
                        z-10
                        flex
                        size-9
                        items-center
                        cursor-zoom-in
                        justify-center
                        rounded-lg
                        bg-mist
                        border
                        text-searchPesq
                        opacity-90
                        shadow-soft
                        transition-[opacity,background-color,transform]
                        duration-400
                        group-hover:scale-105
                        group-hover:bg-coral/80
                        group-hover:text-background
                        sm:size-10
                        motion-reduce:transition-none
                    `,"aria-hidden":`true`,children:(0,U.jsx)(oe,{className:`size-4 sm:size-5`})})]}),r&&(0,U.jsxs)(`div`,{onClick:p,ref:c,className:`fixed cursor-zoom-out inset-0 z-[200] grid place-items-center bg-black p-4 sm:p-6`,role:`dialog`,"aria-modal":`true`,"aria-labelledby":d,onMouseDown:e=>{e.target===e.currentTarget&&p()},children:[(0,U.jsx)(`div`,{className:`sr-only`,id:d,children:t}),(0,U.jsxs)(`div`,{className:`
                            flex
                            max-h-[92vh]
                            max-w-[96vw]
                            
                            justify-center
                            gap-3
                            sm:gap-4
                        `,children:[(0,U.jsx)(`img`,{ref:l,src:e,alt:t,className:`
                                max-h-[88vh]
                                max-w-[calc(100vw-5rem)]
                                object-contain
                                sm:max-w-[calc(92vw-4rem)]
                            `,draggable:`false`}),(0,U.jsx)(`button`,{ref:u,type:`button`,onClick:p,"aria-label":`Fechar imagem ampliada`,title:`Fechar imagem ampliada`,className:`
                                flex
                                size-10
                                shrink-0
                                cursor-pointer
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-line
                                bg-black/80
                                text-white
                                shadow-soft
                                transition-[background-color,transform]
                                duration-200
                                hover:scale-105
                                hover:bg-black/90
                                hover:border-coral
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-white
                                focus-visible:ring-offset-2
                                focus-visible:ring-offset-black
                                motion-reduce:transform-none
                            `,children:(0,U.jsx)(b,{className:`size-5`,"aria-hidden":`true`})})]}),(0,U.jsx)(`p`,{className:`sr-only`,children:`Pressione Esc ou use o botão fechar para sair da imagem ampliada.`})]})]})}var de=1500,G=new Set,K=new Map;function fe(e){let t=[],n=[];e?.image&&t.push(e.image),e?.video&&n.push(e.video),e?.poster&&t.push(e.poster);for(let r of e?.examples??[])r.image&&t.push(r.image),r.poster&&t.push(r.poster),r.video&&n.push(r.video);return{images:[...new Set(t)],videos:[...new Set(n)]}}function pe(e){return new Promise(t=>{setTimeout(t,e)})}function me(e){let t=`image:${e}`;if(G.has(t))return Promise.resolve();if(K.has(t))return K.get(t);let n=new Promise(n=>{let r=new Image,i=()=>{G.add(t),K.delete(t),n()};r.onload=i,r.onerror=i,r.src=e});return K.set(t,n),n}function he(e){let t=`video:${e}`;if(G.has(t))return Promise.resolve();if(K.has(t))return K.get(t);let n=new Promise(n=>{let r=document.createElement(`video`),i=!1,a=()=>{i||(i=!0,r.removeEventListener(`canplay`,a),r.removeEventListener(`error`,a),G.add(t),K.delete(t),r.removeAttribute(`src`),r.load(),n())};r.preload=`auto`,r.muted=!0,r.playsInline=!0,r.addEventListener(`canplay`,a,{once:!0}),r.addEventListener(`error`,a,{once:!0}),r.src=e,r.load()});return K.set(t,n),n}function ge(e){let{images:t,videos:n}=fe(e),r=[...t.map(e=>({type:`image`,src:e,key:`image:${e}`})),...n.map(e=>({type:`video`,src:e,key:`video:${e}`}))],i=r.length,[a,o]=(0,H.useState)(()=>r.filter(e=>G.has(e.key)).length);(0,H.useEffect)(()=>{let e=!1;if(i===0)return;let t=performance.now(),n=r.filter(e=>G.has(e.key)).length;async function a(){let a=r.map(async t=>{G.has(t.key)||(t.type===`image`?await me(t.src):await he(t.src),n+=1,e||o(n))});await Promise.all(a);let s=performance.now()-t;await pe(Math.max(0,de-s)),e||o(i)}return a(),()=>{e=!0}},[e,i]);let s=i===0||a>=i;return{loaded:a,total:i,progress:i>0?Math.round(a/i*100):100,isReady:s}}function _e({step:e,index:t}){let n=k(),{loaded:r,total:i,progress:a,isReady:o}=ge(e);return o?(0,U.jsxs)(`section`,{id:`passo-${t+1}`,"aria-labelledby":`passo-titulo-${t+1}`,className:`
                py-10 first:pt-0
                ${n?``:`animate-[tutorial-step-in_450ms_ease-out]`}
            `,children:[(0,U.jsxs)(`p`,{className:`text-xs font-bold tracking-[0.16em] text-muted-foreground`,children:[`PASSO `,String(t+1).padStart(2,`0`)]}),(0,U.jsx)(`h2`,{id:`passo-titulo-${t+1}`,tabIndex:`-1`,className:`mt-3 text-2xl font-bold text-ink sm:text-3xl`,children:e.title}),(0,U.jsx)(`p`,{className:`mt-3 max-w-3xl leading-7 text-muted-ink`,children:e.description}),e.examples?.length>0&&(0,U.jsx)(`div`,{className:`mt-8 space-y-8`,children:e.examples.map((r,i)=>(0,U.jsxs)(`article`,{className:`
                                overflow-hidden rounded-xl border border-line bg-background
                                ${n?``:`transition-[transform,box-shadow,border-color] duration-300  hover:border-coral/30 hover:shadow-soft`}
                            `,children:[(0,U.jsxs)(`div`,{className:`border-b border-line bg-mist px-4 py-4`,children:[(0,U.jsx)(`h3`,{className:`font-display text-base font-bold text-ink`,children:r.title}),r.description&&(0,U.jsx)(`p`,{className:`mt-1 text-sm leading-6 text-muted-ink`,children:r.description})]}),r.image&&(0,U.jsx)(`div`,{className:`bg-background p-3 sm:p-5`,children:(0,U.jsx)(ue,{src:r.image,alt:r.alt??`Exemplo do passo ${t+1}: ${r.title}`,children:(0,U.jsx)(w,{src:r.image,alt:r.alt??`Exemplo do passo ${t+1}: ${r.title}`,loading:`eager`,decoding:`async`,wrapperClassName:`mx-auto w-full max-w-3xl cursor-zoom-in rounded-lg`,sizes:`(min-width: 1024px) 768px, calc(100vw - 2.5rem)`,className:`object-contain`})})}),r.video&&(0,U.jsx)(W,{video:r.video,poster:r.poster}),!r.image&&!r.video&&(0,U.jsx)(`div`,{className:`grid min-h-48 place-items-center bg-mist px-6 py-12 text-center`,children:(0,U.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Este exemplo ainda não possui imagem ou vídeo.`})})]},`${e.title}-${r.title}-${i}`))}),e.video&&(0,U.jsx)(W,{video:e.video,poster:e.poster}),e.tip&&(0,U.jsxs)(`aside`,{"aria-label":`Dica`,className:`
                        mt-6 flex gap-3 rounded-lg border border-line bg-mist p-4
                        ${n?``:`transition-transform duration-200 `}
                    `,children:[(0,U.jsx)(ie,{className:`mt-0.5 size-5 shrink-0 text-coral`,"aria-hidden":`true`}),(0,U.jsxs)(`div`,{children:[(0,U.jsx)(`p`,{className:`text-sm font-bold text-ink`,children:`Dica`}),(0,U.jsx)(`p`,{className:`mt-1 text-sm leading-6 text-muted-ink`,children:e.tip})]})]})]}):(0,U.jsx)(`section`,{id:`passo-${t+1}`,"aria-labelledby":`passo-titulo-${t+1}`,className:`py-10 first:pt-0`,children:(0,U.jsx)(le,{stepNumber:t+1,loaded:r,total:i,progress:a})})}var ve=`hauy-conecta-tutorial-package-v1-`,ye=`hauy-conecta-offline`,be=1,q=`tutorial-packages`,xe=3;function J(e){return typeof e!=`string`||!e.startsWith(`/`)||e.startsWith(`//`)?null:e.split(/[?#]/,1)[0]||null}function Se(e,t={images:{}}){let n=new Set;function r(e){let r=J(e);if(!r)return;n.add(r);let i=t?.images?.[`public`+r]?.responsive??[];for(let e of i){let t=J(e?.src);t&&n.add(t)}}for(let t of e??[]){r(t?.image),r(t?.poster);for(let e of t?.examples??[])r(e?.image),r(e?.poster)}return[...n].sort()}function Y(){if(typeof indexedDB>`u`||typeof caches>`u`)throw Error(`O armazenamento offline não está disponível neste navegador.`)}function X(){return Y(),new Promise((e,t)=>{let n=indexedDB.open(ye,be);n.onupgradeneeded=()=>{let e=n.result;e.objectStoreNames.contains(q)||e.createObjectStore(q,{keyPath:`tutorialId`})},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error??Error(`Não foi possível abrir o banco de dados offline.`)),n.onblocked=()=>t(Error(`O banco de dados offline está bloqueado por outra aba.`))})}async function Z(e){let t=await X();try{return await new Promise((n,r)=>{let i=t.transaction(q,`readonly`).objectStore(q).get(e);i.onsuccess=()=>n(i.result??null),i.onerror=()=>r(i.error??Error(`Não foi possível consultar o pacote offline.`))})}finally{t.close()}}async function Ce(e){let t=await X();try{await new Promise((n,r)=>{let i=t.transaction(q,`readwrite`);i.objectStore(q).put(e),i.oncomplete=n,i.onerror=()=>r(i.error??Error(`Não foi possível salvar os dados do pacote offline.`)),i.onabort=()=>r(i.error??Error(`A gravação do pacote offline foi cancelada.`))})}finally{t.close()}}async function we(e){let t=await X();try{await new Promise((n,r)=>{let i=t.transaction(q,`readwrite`);i.objectStore(q).delete(e),i.oncomplete=n,i.onerror=()=>r(i.error??Error(`Não foi possível remover o pacote offline.`)),i.onabort=()=>r(i.error??Error(`A remoção do pacote offline foi cancelada.`))})}finally{t.close()}}async function Te(e){let t=await Z(e);if(!t)return null;if(!await caches.has(t.cacheName))return{...t,status:`incomplete`};let n=await caches.open(t.cacheName),r=[];for(let e of t.resources??[])await n.match(e)||r.push(e);return{...t,status:r.length===0?`saved`:`incomplete`,missingResources:r}}function Ee(e){let t=String(e).replace(/[^a-zA-Z0-9_-]/g,`-`),n=typeof crypto<`u`&&crypto.randomUUID?crypto.randomUUID():String(Date.now())+`-`+String(Math.random()).slice(2);return ve+t+`-`+n}function Q(){return new DOMException(`O download do tutorial foi cancelado.`,`AbortError`)}async function De({tutorialId:e,title:t,steps:n,imageMetadata:r,onProgress:i,signal:a}){if(!e)throw Error(`O identificador do tutorial é obrigatório.`);if(typeof window>`u`||!window.location?.origin)throw Error(`O download offline precisa ser iniciado em uma página do aplicativo.`);if(!navigator.onLine)throw Error(`Conecte-se à internet para salvar este tutorial.`);Y();let o=Se(n,r),s=window.location.origin,c=o.map(e=>new URL(e,s).href),l=await Z(e),u=Ee(e),d=await caches.open(u),f=new AbortController,p=()=>f.abort();a?.aborted?f.abort():a?.addEventListener(`abort`,p,{once:!0});let m=0,h=0,g=null;i?.({completed:h,total:c.length});async function _(){for(;!g&&!f.signal.aborted;){let e=m;if(m+=1,e>=c.length)return;let t=c[e];try{let e=await fetch(t,{cache:`reload`,signal:f.signal}),n=e.headers.get(`content-type`)??``;if(!e.ok||!n.toLowerCase().startsWith(`image/`))throw Error(`Não foi possível baixar uma imagem necessária do tutorial.`);await d.put(t,e.clone()),h+=1,i?.({completed:h,total:c.length})}catch(e){g||=e,f.abort();return}}}try{let n=Array.from({length:Math.min(xe,Math.max(c.length,1))},()=>_());if(await Promise.allSettled(n),g)throw g;if(f.signal.aborted)throw Q();let r={tutorialId:e,title:t,cacheName:u,resources:c,version:1,savedAt:Date.now()};return await Ce(r),l?.cacheName&&l.cacheName!==u&&await caches.delete(l.cacheName).catch(()=>!1),r}catch(e){throw await caches.delete(u),f.signal.aborted&&e?.name!==`AbortError`?Q():e}finally{a?.removeEventListener(`abort`,p)}}async function Oe(e){let t=await Z(e);t?.cacheName&&await caches.delete(t.cacheName),await we(e)}function ke({tutorial:e,steps:t}){let[n,r]=(0,H.useState)(`checking`),[i,a]=(0,H.useState)(()=>typeof navigator>`u`||navigator.onLine),[o,s]=(0,H.useState)({completed:0,total:0}),[c,l]=(0,H.useState)(``),u=(0,H.useRef)(null);(0,H.useEffect)(()=>{let t=!0,n=()=>a(!0),i=()=>a(!1);return window.addEventListener(`online`,n),window.addEventListener(`offline`,i),Te(e.id).then(e=>{t&&r(e?.status===`saved`?`saved`:e?.status===`incomplete`?`incomplete`:`idle`)}).catch(()=>{t&&(r(`error`),l(`Não foi possível verificar o armazenamento offline deste dispositivo.`))}),()=>{t=!1,window.removeEventListener(`online`,n),window.removeEventListener(`offline`,i),u.current?.abort()}},[e.id]);async function d(){if(!i||n===`downloading`||n===`removing`)return;let a=new AbortController;u.current=a,s({completed:0,total:0}),l(``),r(`downloading`);try{await De({tutorialId:e.id,title:e.title,steps:t,imageMetadata:S,signal:a.signal,onProgress(e){s(e)}}),r(`saved`)}catch(e){e?.name===`AbortError`?(r(`idle`),l(`Download cancelado. Nenhum pacote incompleto foi mantido.`)):(r(`error`),l(e?.message||`Não foi possível salvar o tutorial. Verifique sua conexão e o espaço disponível.`))}finally{u.current=null}}async function f(){if(n!==`removing`&&n!==`downloading`){r(`removing`),l(``);try{await Oe(e.id),r(`idle`)}catch(e){r(`error`),l(e?.message||`Não foi possível remover o pacote offline.`)}}}function p(){u.current?.abort()}let m=o.total>0?Math.round(o.completed/o.total*100):0;return(0,U.jsxs)(`div`,{className:`mt-7 border-t border-line pt-6`,children:[(0,U.jsxs)(`div`,{className:`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`,children:[(0,U.jsxs)(`div`,{className:`max-w-2xl`,children:[(0,U.jsx)(`p`,{className:`text-xs font-bold tracking-[0.16em] text-muted-foreground`,children:`ACESSO OFFLINE`}),(0,U.jsx)(`h3`,{className:`mt-2 text-lg font-bold text-ink`,children:`Leve este tutorial com você`}),(0,U.jsx)(`p`,{className:`mt-2 text-sm leading-6 text-muted-ink`,children:`Salve o conteúdo, as imagens e os pôsteres para consultar este tutorial sem internet neste dispositivo. Os vídeos e links externos continuam exigindo conexão.`})]}),n===`checking`&&(0,U.jsxs)(v,{type:`button`,variant:`outline`,disabled:!0,children:[(0,U.jsx)(R,{className:`size-4 animate-spin`,"aria-hidden":`true`}),`Verificando...`]}),n===`idle`&&(0,U.jsxs)(v,{type:`button`,variant:`coral`,onClick:d,disabled:!i,children:[(0,U.jsx)(P,{className:`size-4`,"aria-hidden":`true`}),`Salvar tutorial offline`]}),n===`downloading`&&(0,U.jsxs)(v,{type:`button`,variant:`outline`,disabled:!0,children:[(0,U.jsx)(R,{className:`size-4 animate-spin`,"aria-hidden":`true`}),`Preparando...`]}),n===`incomplete`&&(0,U.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[(0,U.jsxs)(v,{type:`button`,variant:`coral`,onClick:d,disabled:!i,children:[(0,U.jsx)(P,{className:`size-4`,"aria-hidden":`true`}),`Reparar pacote`]}),(0,U.jsxs)(v,{type:`button`,variant:`outline`,onClick:f,children:[(0,U.jsx)(V,{className:`size-4`,"aria-hidden":`true`}),`Remover pacote`]})]}),n===`saved`&&(0,U.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[(0,U.jsxs)(v,{type:`button`,variant:`outline`,onClick:d,disabled:!i,children:[(0,U.jsx)(P,{className:`size-4`,"aria-hidden":`true`}),`Atualizar pacote`]}),(0,U.jsxs)(v,{type:`button`,variant:`outline`,onClick:f,children:[(0,U.jsx)(V,{className:`size-4`,"aria-hidden":`true`}),`Remover`]})]}),n===`removing`&&(0,U.jsxs)(v,{type:`button`,variant:`outline`,disabled:!0,children:[(0,U.jsx)(R,{className:`size-4 animate-spin`,"aria-hidden":`true`}),`Removendo...`]}),n===`error`&&(0,U.jsxs)(v,{type:`button`,variant:`coral`,onClick:d,disabled:!i,children:[(0,U.jsx)(P,{className:`size-4`,"aria-hidden":`true`}),`Tentar novamente`]})]}),n===`downloading`&&(0,U.jsxs)(`div`,{className:`mt-4 max-w-xl`,children:[(0,U.jsxs)(`div`,{className:`flex items-center justify-between gap-3 text-xs text-muted-foreground`,children:[(0,U.jsx)(`span`,{children:`Baixando imagens e pôsteres...`}),(0,U.jsxs)(`span`,{className:`tabular-nums`,children:[o.completed,` / `,o.total]})]}),(0,U.jsx)(`div`,{className:`mt-2 h-2 overflow-hidden rounded-full bg-background`,role:`progressbar`,"aria-label":`Progresso do pacote offline`,"aria-valuemin":`0`,"aria-valuemax":o.total||1,"aria-valuenow":o.completed,children:(0,U.jsx)(`div`,{className:`h-full rounded-full bg-coral transition-[width] duration-200`,style:{width:m+`%`}})}),(0,U.jsx)(v,{type:`button`,variant:`outline`,className:`mt-3 min-h-9 px-3 text-xs`,onClick:p,children:`Cancelar download`})]}),n===`incomplete`&&(0,U.jsx)(`p`,{className:`mt-3 text-sm text-muted-foreground`,role:`status`,children:`Parte dos arquivos não está mais disponível no armazenamento. Repare o pacote enquanto estiver conectado ou remova-o.`}),n===`saved`&&(0,U.jsxs)(`p`,{className:`mt-3 flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-400`,role:`status`,children:[(0,U.jsx)(y,{className:`size-4 shrink-0`,"aria-hidden":`true`}),`Este tutorial está disponível offline neste dispositivo.`]}),!i&&n!==`saved`&&(0,U.jsx)(`p`,{className:`mt-3 text-sm text-muted-foreground`,role:`status`,children:`Conecte-se à internet para salvar este tutorial.`}),c&&(0,U.jsx)(`p`,{className:`mt-3 text-sm text-coral`,role:`alert`,children:c})]})}function Ae({externalLearning:e=[],tutorial:t,steps:n=[]}){return(0,U.jsxs)(`section`,{className:`
                mt-8
                max-w-4xl
                rounded-xl
                border
                border-line
                bg-mist
                p-6
                sm:p-7
            `,"aria-labelledby":`tutorial-completion-title`,children:[(0,U.jsx)(`p`,{className:`text-xs font-bold tracking-[0.16em] text-muted-foreground`,children:`PRONTO!`}),(0,U.jsx)(`h2`,{id:`tutorial-completion-title`,className:`mt-2 text-2xl font-bold text-ink`,children:`Você concluiu este tutorial.`}),(0,U.jsx)(`p`,{className:`mt-2 text-sm leading-6 text-muted-ink`,children:`Se precisar, volte aos passos e faça com calma.`}),t&&(0,U.jsx)(ke,{tutorial:t,steps:n},t.id),e.length>0&&(0,U.jsxs)(`div`,{className:`mt-7 border-t border-line pt-6`,children:[(0,U.jsxs)(`div`,{className:`max-w-2xl`,children:[(0,U.jsx)(`p`,{className:`text-xs font-bold tracking-[0.16em] text-muted-foreground`,children:`CONTINUE APRENDENDO`}),(0,U.jsx)(`h3`,{className:`mt-2 text-xl font-bold text-ink`,children:`Quer se aprofundar?`}),(0,U.jsx)(`p`,{className:`mt-2 text-sm leading-6 text-muted-ink`,children:`Confira uma videoaula ou playlist completa para continuar estudando este assunto.`})]}),(0,U.jsx)(`div`,{className:`mt-5 grid gap-3`,children:e.map(e=>{let t=e.type===`playlist`,n=t?ae:O,r=t?`Playlist completa`:`Videoaula completa`,i=t?`Abrir playlist`:`Assistir videoaula`;return(0,U.jsxs)(`a`,{href:e.url,target:`_blank`,rel:`noreferrer noopener`,"aria-label":`${e.title} — abrir em nova aba`,className:`
                                        group
                                        flex
                                        flex-col
                                        md:flex-row
                                        items-start
                                        md:items-center
                                        gap-4
                                        rounded-xl
                                        border
                                        border-line
                                        !bg-background
                                        p-4
                                        transition-[border-color,background-color,transform]
                                        duration-200
                                        hover:border-coral/40!
                                        focus-visible:outline-none
                                        focus-visible:ring-2
                                        focus-visible:ring-coral
                                        focus-visible:ring-offset-2
                                        focus-visible:ring-offset-mist
                                        motion-reduce:transform-none
                                    `,children:[(0,U.jsx)(`span`,{className:`
                                            flex
                                            size-11
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            text-coral
                                        `,"aria-hidden":`true`,children:(0,U.jsx)(n,{className:`size-11`})}),(0,U.jsxs)(`span`,{className:`min-w-0 flex-1`,children:[(0,U.jsx)(`span`,{className:`block text-xs font-bold tracking-[0.12em] text-muted-foreground`,children:r}),(0,U.jsx)(`span`,{className:`mt-1 block text-sm font-bold text-ink`,children:e.title}),e.description&&(0,U.jsx)(`span`,{className:`mt-1 block text-sm leading-5 text-muted-ink`,children:e.description})]}),(0,U.jsx)(`span`,{className:`transition-transform
                                        duration-200
                                        group-hover:translate-x-0.5
                                        group-hover:text-coral
                                        motion-reduce:transition-none hidden shrink-0 text-xs font-bold text-muted-foreground sm:inline`,children:i}),(0,U.jsx)(x,{className:`
                                        size-4
                                        shrink-0
                                        text-muted-foreground
                                        transition-transform
                                        duration-200
                                        group-hover:translate-x-0.5
                                        group-hover:text-coral
                                        motion-reduce:transition-none
                                    `,"aria-hidden":`true`})]},`${e.type}-${e.url}`)})})]})]})}function je({steps:e,activeStep:t,onNavigate:n}){let r=k(),i=e.length,a=i>0?(t+1)/i*100:0;return(0,U.jsxs)(`nav`,{"aria-label":`Etapas do tutorial`,className:`lg:sticky lg:top-28 lg:self-start`,children:[(0,U.jsxs)(`div`,{className:`hidden lg:block`,children:[(0,U.jsxs)(`div`,{className:`mb-5`,children:[(0,U.jsxs)(`div`,{className:`flex items-end justify-between gap-4`,children:[(0,U.jsxs)(`div`,{children:[(0,U.jsx)(`p`,{className:`text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground`,children:`Passos`}),(0,U.jsxs)(`p`,{className:`mt-1 text-sm text-muted-ink`,children:[(0,U.jsx)(`span`,{className:`font-bold text-ink`,children:t+1}),` de `,i]})]}),(0,U.jsxs)(`span`,{className:`text-xs font-semibold text-muted-foreground`,children:[Math.round(a),`%`]})]}),(0,U.jsx)(`div`,{className:`mt-3 h-1.5 overflow-hidden rounded-full bg-mist`,"aria-hidden":`true`,children:(0,U.jsx)(`div`,{className:_(`h-full origin-left rounded-full bg-coral`,!r&&`transition-[width] duration-500 ease-out`),style:{width:`${a}%`}})})]}),(0,U.jsx)(`ol`,{className:`relative space-y-1 border-l border-line pl-4`,children:e.map((e,i)=>{let a=i===t,o=i<t;return(0,U.jsx)(`li`,{children:(0,U.jsxs)(`button`,{type:`button`,onClick:()=>n(i),"aria-current":a?`step`:void 0,className:_(`group relative flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left`,`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-background`,!r&&`transition-[background-color,color,transform] duration-200`,a?`bg-coral-soft text-ink`:`text-muted-foreground hover:bg-mist hover:text-ink`),children:[(0,U.jsx)(`span`,{className:_(`absolute -left-[21px] top-1/2 flex  size-3 -translate-y-1/2 items-center justify-center rounded-full border-2 border-background`,!r&&`transition-transform duration-300`,a?`scale-125 bg-coral ring-4 ring-coral/15`:o?`bg-coral`:`bg-line`),"aria-hidden":`true`}),(0,U.jsx)(`span`,{className:_(`mt-0.5 shrink-0 text-xs font-bold tabular-nums`,a?`text-coral`:`text-muted-foreground`),children:String(i+1).padStart(2,`0`)}),(0,U.jsx)(`span`,{className:_(`min-w-0 text-sm leading-5`,a?`font-bold`:`font-semibold`),children:e.title})]})},`${e.title}-${i}`)})})]}),(0,U.jsxs)(`div`,{className:`lg:hidden`,children:[(0,U.jsxs)(`div`,{className:`mb-4 flex items-center justify-between`,children:[(0,U.jsxs)(`p`,{className:`text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground`,children:[`Passo `,String(t+1).padStart(2,`0`),` de `,String(i).padStart(2,`0`)]}),(0,U.jsxs)(`span`,{className:`text-xs font-semibold text-muted-foreground`,children:[Math.round(a),`%`]})]}),(0,U.jsx)(`div`,{className:`-mx-1 overflow-x-auto px-1 pb-2`,children:(0,U.jsx)(`ol`,{className:`flex min-w-max gap-2`,children:e.map((e,i)=>{let a=i===t;return(0,U.jsx)(`li`,{children:(0,U.jsx)(`button`,{type:`button`,onClick:()=>n(i),"aria-current":a?`step`:void 0,"aria-label":`Passo ${i+1}: ${e.title}`,className:_(`whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-bold`,`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-background`,!r&&`transition-[background-color,border-color,color,transform] duration-200`,a?`border-coral cursor-default bg-coral text-white`:`border-line cursor-pointer bg-background text-muted-foreground hover:border-coral/50 hover:text-ink`),children:String(i+1).padStart(2,`0`)})},`${e.title}-${i}`)})})})]})]})}function $(e,t){return typeof window>`u`||typeof window.gtag!=`function`?!1:(window.gtag(`event`,e,{tutorial_id:t.id,tutorial_category:t.category}),!0)}function Me(){let{tutorialId:e}=C(),a=ne(e),[c,h]=(0,H.useState)(0),_=(0,H.useRef)(!1),b=(0,H.useRef)(!1);if((0,H.useEffect)(()=>{a&&!_.current&&(_.current=$(`tutorial_begin`,a))},[a]),(0,H.useEffect)(()=>{if(!a){let e=`Tutorial não encontrado | ${l}`;return d(e),i(`robots`,`noindex, follow`),()=>{n(),p(`robots`)}}let e=`${a.title} | ${l}`,c=a.description||`Aprenda ${a.title.toLowerCase()} com um passo a passo simples na Hauy Conecta.`,h=`${f}/tutoriais/${a.id}`;d(e),i(`description`,c),i(`robots`,`index, follow`),s(h),r(`og:title`,e),r(`og:description`,c),r(`og:type`,`article`),r(`og:url`,h),r(`twitter:card`,`summary`),r(`twitter:title`,e),r(`twitter:description`,c);let g=D.find(e=>e.id===a.category),_={"@context":`https://schema.org`,"@type":`Article`,headline:a.title,description:c,url:h,inLanguage:`pt-BR`,articleSection:g?.name??a.category,author:{"@type":`Organization`,name:l},publisher:{"@type":`Organization`,name:l},mainEntityOfPage:{"@type":`WebPage`,"@id":h}};return m(_),()=>{n(),p(`description`),p(`robots`),u(`og:title`),u(`og:description`),u(`og:type`),u(`og:url`),u(`twitter:card`),u(`twitter:title`),u(`twitter:description`),o(),t()}},[a]),!a)return(0,U.jsxs)(`main`,{className:`mx-auto max-w-4xl px-5 py-14`,children:[(0,U.jsx)(`h1`,{className:`text-3xl font-bold text-ink`,children:`Tutorial não encontrado`}),(0,U.jsx)(T,{className:`mt-5 inline-block font-bold text-muted-foreground`,to:`/tutoriais`,children:`Ver tutoriais`})]});let x=D.find(e=>e.id===a.category),S=a.icon,w=x.icon,O=te.filter(e=>e.category===a.category&&e.id!==a.id).slice(0,2),k=a.steps??Pe(a),j=k[c]??k[0]??null;if(!j)return(0,U.jsxs)(`main`,{className:`mx-auto max-w-4xl px-5 py-14`,children:[(0,U.jsx)(`h1`,{className:`text-3xl font-bold text-ink`,children:`Este tutorial ainda não possui passos.`}),(0,U.jsx)(T,{className:`mt-5 inline-block font-bold text-muted-foreground`,to:`/tutoriais`,children:`Ver tutoriais`})]});function M(e){h(e),window.scrollTo({top:0,behavior:`smooth`}),requestAnimationFrame(()=>{document.getElementById(`passo-titulo-${e+1}`)?.focus({preventScroll:!0})})}function N(){if(c>=k.length-1)return;let e=c+1;e===k.length-1&&!b.current&&(b.current=$(`tutorial_complete`,a)),M(e)}function P(){c<=0||M(c-1)}return(0,U.jsx)(`main`,{className:`bg-background`,children:(0,U.jsxs)(`div`,{className:`mx-auto max-w-7xl px-5 py-10 lg:px-8`,children:[(0,U.jsxs)(`nav`,{"aria-label":`Navegação do tutorial`,className:`flex flex-wrap items-center gap-2 text-sm text-muted-ink`,children:[(0,U.jsxs)(T,{to:`/tutoriais`,className:`
                            inline-flex
                            items-center
                            gap-2
                            font-semibold
                            text-ink
                            transition-colors
                            hover:text-coral
                        `,children:[(0,U.jsx)(re,{className:`size-4`,"aria-hidden":`true`}),`Todos os tutoriais`]}),(0,U.jsx)(E,{className:`size-4 shrink-0 text-muted-ink`,"aria-hidden":`true`}),(0,U.jsx)(T,{to:`/categorias/${a.category}`,className:`
                            font-semibold
                            text-muted-ink
                            transition-colors
                            hover:text-ink
                        `,children:x?.name??a.category})]}),(0,U.jsxs)(`div`,{className:`
                        mt-10
                        grid
                        gap-8
                        lg:grid-cols-[240px_minmax(0,1fr)]
                        lg:gap-12
                    `,children:[(0,U.jsx)(je,{steps:k,activeStep:c,onNavigate:M}),(0,U.jsxs)(`article`,{"data-reader-content":!0,className:`min-w-0`,children:[c===0&&(0,U.jsxs)(U.Fragment,{children:[(0,U.jsxs)(`header`,{children:[(0,U.jsxs)(g,{className:`py-1 flex w-fit items-center gap-1.5 `,children:[(0,U.jsx)(`span`,{className:`flex `,children:(0,U.jsx)(w,{className:`size-5`,strokeWidth:1.75,"aria-hidden":`true`})}),x?.name??a.category]}),(0,U.jsx)(`h1`,{className:`
                                            mt-4
                                            max-w-4xl
                                            text-4xl
                                            font-bold
                                            tracking-tight
                                            text-ink
                                            sm:text-5xl
                                        `,children:a.title}),(0,U.jsx)(`p`,{className:`
                                            mt-4
                                            max-w-3xl
                                            text-lg
                                            leading-7
                                            text-muted-ink
                                        `,children:a.description}),(0,U.jsxs)(`div`,{className:`mt-5 flex flex-wrap gap-2`,children:[(0,U.jsxs)(g,{className:` ${a.cor_difficulty} text-xs font-semibold`,children:[(0,U.jsx)(`span`,{className:`flex mb-2 `,children:(0,U.jsx)(S,{className:`size-5`,strokeWidth:1.75,"aria-hidden":`true`})}),(0,U.jsx)(`span`,{children:a.difficulty})]}),(0,U.jsxs)(g,{className:`flex gap-1 shrink-0 items-center text-xs leading-6 text-muted-ink`,children:[(0,U.jsx)(ee,{className:`h-3.5 w-3.5`}),a.duration]})]})]}),(0,U.jsxs)(`section`,{className:`
                                        mt-10
                                        max-w-4xl
                                        rounded-xl
                                        bg-mist
                                        p-6
                                    `,children:[(0,U.jsx)(`h2`,{className:`text-lg font-bold text-ink`,children:`O que você vai aprender?`}),(0,U.jsx)(`ul`,{className:`mt-4 grid gap-3 sm:grid-cols-2`,children:a.learning.map(e=>(0,U.jsxs)(`li`,{className:`
                                                        flex
                                                        items-start
                                                        gap-2
                                                        text-sm
                                                        text-ink
                                                    `,children:[(0,U.jsx)(y,{className:`
                                                            mt-0.5
                                                            size-4
                                                            shrink-0
                                                            text-coral
                                                        `,"aria-hidden":`true`}),(0,U.jsx)(`span`,{children:e})]},e))})]})]}),(0,U.jsx)(`div`,{className:`mt-10 max-w-4xl`,children:(0,U.jsx)(_e,{step:j,index:c},`${j.title}-${c}`)}),(0,U.jsxs)(`div`,{className:`
                                mt-10
                                flex
                                max-w-4xl
                                items-center
                                justify-between
                                gap-4
                                border-t
                                border-line
                                pt-6
                            `,children:[(0,U.jsxs)(v,{type:`button`,variant:`coral`,onClick:P,disabled:c===0,className:`group`,children:[(0,U.jsx)(A,{className:`
                                        size-4
                                        transition-transform
                                        duration-200
                                        group-hover:-translate-x-0.5
                                        motion-reduce:transition-none
                                    `,"aria-hidden":`true`}),`Passo anterior`]}),c<k.length-1?(0,U.jsxs)(v,{type:`button`,variant:`coral`,onClick:N,className:`group min-w-36`,children:[`Próximo passo`,(0,U.jsx)(E,{className:`
                                            size-4
                                            transition-transform
                                            duration-200
                                            group-hover:translate-x-0.5
                                            motion-reduce:transition-none
                                        `,"aria-hidden":`true`})]}):(0,U.jsx)(`span`,{className:`
                                        text-sm
                                        font-semibold
                                        text-muted-foreground
                                    `,"aria-current":`step`,children:`Último passo`})]}),c===k.length-1&&(0,U.jsx)(Ae,{externalLearning:a.externalLearning,tutorial:a,steps:k}),c===k.length-1&&O.length>0&&(0,U.jsxs)(`section`,{className:`mt-12 max-w-4xl`,children:[(0,U.jsx)(`h2`,{className:`text-2xl font-bold text-ink`,children:`Você também pode gostar de`}),(0,U.jsx)(`div`,{className:`mt-5 grid gap-4 sm:grid-cols-2`,children:O.map(e=>(0,U.jsxs)(T,{to:`/tutoriais/${e.id}`,className:`
                                                        rounded-xl
                                                        border
                                                        border-line
                                                        bg-mist
                                                        p-5
                                                        font-bold
                                                        text-ink
                                                        transition-colors
                                                        hover:bg-mist2
                                                    `,children:[e.title,(0,U.jsx)(E,{className:`
                                                            float-right
                                                            size-5
                                                            text-muted-ink
                                                        `,"aria-hidden":`true`})]},e.id))})]}),(0,U.jsx)(`div`,{className:`
                                mt-12
                                flex
                                justify-between
                                border-t
                                border-line
                                pt-6
                            `,children:(0,U.jsxs)(T,{to:`/tutoriais`,className:`
                                    inline-flex
                                    items-center
                                    gap-1
                                    text-sm
                                    font-bold
                                    text-muted-foreground
                                    transition-colors
                                    hover:text-ink
                                `,children:[(0,U.jsx)(A,{className:`size-4`,"aria-hidden":`true`}),`Todos os tutoriais`]})})]})]})]})})}function Ne(){let{tutorialId:e}=C();return(0,U.jsx)(Me,{},e)}function Pe(e){return[{title:`Abra a ferramenta ou arquivo que você vai usar.`,description:`Comece abrindo o programa ou o arquivo relacionado a “${e.title}”. Se ainda não estiver com ele salvo, escolha uma pasta que você consiga encontrar depois.`,examples:[],tip:null,video:null},{title:e.learning[0],description:`Siga esta etapa com atenção. Faça uma alteração por vez para conferir se tudo ficou como você espera.`,examples:[],tip:null,video:null},{title:e.learning[1]??`Revise o resultado`,description:`Antes de terminar, confira as informações e salve seu trabalho. Assim, você evita perder o que fez.`,examples:[],tip:null,video:null}]}export{Ne as TutorialRoute};