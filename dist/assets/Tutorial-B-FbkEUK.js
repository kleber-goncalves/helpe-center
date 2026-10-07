import{_ as e,a as t,c as n,d as r,f as i,h as a,i as o,l as s,m as c,n as l,o as u,p as d,r as f,s as p,u as m}from"./seo-07S9mH5V.js";import{n as h,t as g}from"./maximize-2-VjCmmIS6.js";import{B as _,D as v,H as y,I as b,M as x,N as S,V as C,W as w,h as T,i as E,j as D,l as O,m as k,n as A,o as j,t as M,w as N,z as P}from"./index-DKkQ6a67.js";var F={name:`arrow-left`,size:24,node:[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]};F.node;var I=b(F),L={name:`lightbulb`,size:24,node:[[`path`,{d:`M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5`,key:`1gvzjb`}],[`path`,{d:`M9 18h6`,key:`x1upvd`}],[`path`,{d:`M10 22h4`,key:`ceow96`}]]};L.node;var R=b(L),z={name:`list-video`,size:24,node:[[`path`,{d:`M21 5H3`,key:`1fi0y6`}],[`path`,{d:`M10 12H3`,key:`1ulcyk`}],[`path`,{d:`M10 19H3`,key:`108z41`}],[`path`,{d:`M15 12.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z`,key:`ms4nik`}]]};z.node;var B=b(z),V=e(a(),1),H=c();function U(e){if(typeof e!=`string`)return null;let t=e.split(/[?#]/,1)[0];return t.startsWith(`/`)?`public/${t.slice(1)}`:null}function W({src:e,poster:t,title:n=`Vídeo do tutorial`,captions:r,className:i=``,wrapperClassName:a=``,width:o,height:s,preload:c=`metadata`,...l}){let u=_.images[U(t)]??null,d=o??u?.width,f=s??u?.height;return(0,H.jsxs)(`video`,{className:[`mx-auto block h-auto w-full rounded-lg border border-line`,a,i].filter(Boolean).join(` `),width:d,height:f,controls:!0,preload:c,playsInline:!0,poster:t,"aria-label":n,...l,children:[(0,H.jsx)(`source`,{src:e,type:`video/mp4`}),r&&(0,H.jsx)(`track`,{kind:`captions`,src:r,srcLang:`pt-BR`,label:`Português`,default:!0}),`Seu navegador não suporta a reprodução deste vídeo.`]})}function G({video:e,poster:t,title:n=`Vídeo do tutorial`,captions:r}){return(0,H.jsxs)(`figure`,{className:`bg-background p-3 sm:p-5`,children:[(0,H.jsx)(W,{src:e,poster:t,title:n,captions:r,wrapperClassName:`mx-auto w-full max-w-3xl`}),(0,H.jsx)(`figcaption`,{className:`mx-auto mt-2 max-w-3xl text-xs leading-5 text-muted-foreground`,children:n})]})}function K({stepNumber:e,loaded:t,total:n,progress:r}){return(0,H.jsx)(`div`,{className:`grid min-h-[420px] place-items-center`,role:`status`,"aria-label":`Carregando materiais do passo ${e}`,children:(0,H.jsxs)(`div`,{className:`w-full max-w-md px-6 text-center`,children:[(0,H.jsxs)(`p`,{className:`text-xs font-bold tracking-[0.16em] text-muted-foreground`,children:[`PASSO `,String(e).padStart(2,`0`)]}),(0,H.jsx)(`h2`,{className:`mt-3 text-2xl font-bold text-ink`,children:`Preparando o conteúdo`}),(0,H.jsx)(`p`,{className:`mt-3 text-sm leading-6 text-muted-ink`,children:`Estamos carregando as imagens e vídeos deste passo.`}),(0,H.jsxs)(`div`,{className:`mt-8`,children:[(0,H.jsxs)(`div`,{className:`flex items-center justify-between text-xs font-semibold text-muted-foreground`,children:[(0,H.jsxs)(`span`,{children:[t,` de `,n,` materiais`]}),(0,H.jsxs)(`span`,{children:[r,`%`]})]}),(0,H.jsx)(`div`,{className:`mt-2 h-1.5 overflow-hidden rounded-full bg-mist`,role:`progressbar`,"aria-valuemin":`0`,"aria-valuemax":`100`,"aria-valuenow":r,"aria-label":`Carregamento do passo: ${r}%`,children:(0,H.jsx)(`div`,{className:`h-full rounded-full bg-coral transition-[width] duration-300 ease-out motion-reduce:transition-none`,style:{width:`${r}%`}})})]})]})})}function q({src:e,alt:t,children:n}){let[r,i]=(0,V.useState)(!1),[a,o]=(0,V.useState)(!1),s=O(),c=(0,V.useRef)(null),l=(0,V.useRef)(null),u=(0,V.useRef)(null),d=(0,V.useId)(),f=()=>{o(!1),i(!0)},p=()=>{if(!a){if(s){i(!1);return}o(!0),C.timeline({onComplete:()=>{i(!1),o(!1)}}).to(u.current,{autoAlpha:0,x:12,duration:.2,ease:`power2.in`}).to(l.current,{autoAlpha:0,scale:.94,y:8,duration:.28,ease:`power2.in`},`<`).to(c.current,{autoAlpha:0,duration:.22,ease:`power2.in`},`<0.08`)}};(0,V.useEffect)(()=>{if(!r)return;let e=document.activeElement,t=document.body.style.overflow;document.body.style.overflow=`hidden`;let n=e=>{if(e.key===`Escape`){p();return}e.key===`Tab`&&(e.preventDefault(),u.current?.focus())};if(document.addEventListener(`keydown`,n),s)u.current?.focus();else{let r=C.context(()=>{C.fromTo(c.current,{autoAlpha:0},{autoAlpha:1,duration:.28,ease:`power2.out`}),C.fromTo(l.current,{autoAlpha:0,scale:.88,y:12},{autoAlpha:1,scale:1,y:0,duration:.48,ease:`power3.out`,delay:.02}),C.fromTo(u.current,{autoAlpha:0},{autoAlpha:1,duration:.32,ease:`power2.out`,delay:.16})},c);return requestAnimationFrame(()=>{u.current?.focus()}),()=>{r.revert(),document.removeEventListener(`keydown`,n),document.body.style.overflow=t,e instanceof HTMLElement&&e.focus()}}return()=>{document.removeEventListener(`keydown`,n),document.body.style.overflow=t,e instanceof HTMLElement&&e.focus()}},[r,s]);let m=V.Children.only(n),h=(0,V.cloneElement)(m,{onClick:e=>{m.props.onClick?.(e)},onKeyDown:e=>{m.props.onKeyDown?.(e),!e.defaultPrevented&&(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),f())},role:`button`,tabIndex:0,"aria-haspopup":`dialog`,"aria-expanded":r,"aria-label":`Ampliar imagem: `+t});return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(`div`,{className:`group relative cursor-zoom-in`,onClick:f,children:[h,(0,H.jsx)(`span`,{className:`
                        
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
                        text-white
                        opacity-90
                        shadow-soft
                        transition-[opacity,background-color,transform]
                        duration-400
                        group-hover:scale-105
                        group-hover:bg-coral/80
                        sm:size-10
                        motion-reduce:transition-none
                    `,"aria-hidden":`true`,children:(0,H.jsx)(g,{className:`size-4 sm:size-5`})})]}),r&&(0,H.jsxs)(`div`,{onClick:p,ref:c,className:`fixed cursor-zoom-out inset-0 z-[200] grid place-items-center bg-black p-4 sm:p-6`,role:`dialog`,"aria-modal":`true`,"aria-labelledby":d,onMouseDown:e=>{e.target===e.currentTarget&&p()},children:[(0,H.jsx)(`div`,{className:`sr-only`,id:d,children:t}),(0,H.jsxs)(`div`,{className:`
                            flex
                            max-h-[92vh]
                            max-w-[96vw]
                            
                            justify-center
                            gap-3
                            sm:gap-4
                        `,children:[(0,H.jsx)(`img`,{ref:l,src:e,alt:t,className:`
                                max-h-[88vh]
                                max-w-[calc(100vw-5rem)]
                                object-contain
                                sm:max-w-[calc(92vw-4rem)]
                            `,draggable:`false`}),(0,H.jsx)(`button`,{ref:u,type:`button`,onClick:p,"aria-label":`Fechar imagem ampliada`,title:`Fechar imagem ampliada`,className:`
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
                            `,children:(0,H.jsx)(v,{className:`size-5`,"aria-hidden":`true`})})]}),(0,H.jsx)(`p`,{className:`sr-only`,children:`Pressione Esc ou use o botão fechar para sair da imagem ampliada.`})]})]})}var J=1500,Y=new Set,X=new Map;function Z(e){let t=[],n=[];e?.image&&t.push(e.image),e?.video&&n.push(e.video),e?.poster&&t.push(e.poster);for(let r of e?.examples??[])r.image&&t.push(r.image),r.poster&&t.push(r.poster),r.video&&n.push(r.video);return{images:[...new Set(t)],videos:[...new Set(n)]}}function Q(e){return new Promise(t=>{setTimeout(t,e)})}function $(e){let t=`image:${e}`;if(Y.has(t))return Promise.resolve();if(X.has(t))return X.get(t);let n=new Promise(n=>{let r=new Image,i=()=>{Y.add(t),X.delete(t),n()};r.onload=i,r.onerror=i,r.src=e});return X.set(t,n),n}function ee(e){let t=`video:${e}`;if(Y.has(t))return Promise.resolve();if(X.has(t))return X.get(t);let n=new Promise(n=>{let r=document.createElement(`video`),i=!1,a=()=>{i||(i=!0,r.removeEventListener(`canplay`,a),r.removeEventListener(`error`,a),Y.add(t),X.delete(t),r.removeAttribute(`src`),r.load(),n())};r.preload=`auto`,r.muted=!0,r.playsInline=!0,r.addEventListener(`canplay`,a,{once:!0}),r.addEventListener(`error`,a,{once:!0}),r.src=e,r.load()});return X.set(t,n),n}function te(e){let{images:t,videos:n}=Z(e),r=[...t.map(e=>({type:`image`,src:e,key:`image:${e}`})),...n.map(e=>({type:`video`,src:e,key:`video:${e}`}))],i=r.length,[a,o]=(0,V.useState)(()=>r.filter(e=>Y.has(e.key)).length);(0,V.useEffect)(()=>{let e=!1;if(i===0)return;let t=performance.now(),n=r.filter(e=>Y.has(e.key)).length;async function a(){let a=r.map(async t=>{Y.has(t.key)||(t.type===`image`?await $(t.src):await ee(t.src),n+=1,e||o(n))});await Promise.all(a);let s=performance.now()-t;await Q(Math.max(0,J-s)),e||o(i)}return a(),()=>{e=!0}},[e,i]);let s=i===0||a>=i;return{loaded:a,total:i,progress:i>0?Math.round(a/i*100):100,isReady:s}}function ne({step:e,index:t}){let n=O(),{loaded:r,total:i,progress:a,isReady:o}=te(e);return o?(0,H.jsxs)(`section`,{id:`passo-${t+1}`,"aria-labelledby":`passo-titulo-${t+1}`,className:`
                py-10 first:pt-0
                ${n?``:`animate-[tutorial-step-in_450ms_ease-out]`}
            `,children:[(0,H.jsxs)(`p`,{className:`text-xs font-bold tracking-[0.16em] text-muted-foreground`,children:[`PASSO `,String(t+1).padStart(2,`0`)]}),(0,H.jsx)(`h2`,{id:`passo-titulo-${t+1}`,tabIndex:`-1`,className:`mt-3 text-2xl font-bold text-ink sm:text-3xl`,children:e.title}),(0,H.jsx)(`p`,{className:`mt-3 max-w-3xl leading-7 text-muted-ink`,children:e.description}),e.examples?.length>0&&(0,H.jsx)(`div`,{className:`mt-8 space-y-8`,children:e.examples.map((r,i)=>(0,H.jsxs)(`article`,{className:`
                                overflow-hidden rounded-xl border border-line bg-background
                                ${n?``:`transition-[transform,box-shadow,border-color] duration-300  hover:border-coral/30 hover:shadow-soft`}
                            `,children:[(0,H.jsxs)(`div`,{className:`border-b border-line bg-mist px-4 py-4`,children:[(0,H.jsx)(`h3`,{className:`font-display text-base font-bold text-ink`,children:r.title}),r.description&&(0,H.jsx)(`p`,{className:`mt-1 text-sm leading-6 text-muted-ink`,children:r.description})]}),r.image&&(0,H.jsx)(`div`,{className:`bg-background p-3 sm:p-5`,children:(0,H.jsx)(q,{src:r.image,alt:r.alt??`Exemplo do passo ${t+1}: ${r.title}`,children:(0,H.jsx)(P,{src:r.image,alt:r.alt??`Exemplo do passo ${t+1}: ${r.title}`,loading:`eager`,decoding:`async`,wrapperClassName:`mx-auto w-full max-w-3xl cursor-zoom-in rounded-lg`,sizes:`(min-width: 1024px) 768px, calc(100vw - 2.5rem)`,className:`object-contain`})})}),r.video&&(0,H.jsx)(G,{video:r.video,poster:r.poster}),!r.image&&!r.video&&(0,H.jsx)(`div`,{className:`grid min-h-48 place-items-center bg-mist px-6 py-12 text-center`,children:(0,H.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Este exemplo ainda não possui imagem ou vídeo.`})})]},`${e.title}-${r.title}-${i}`))}),e.video&&(0,H.jsx)(G,{video:e.video,poster:e.poster}),e.tip&&(0,H.jsxs)(`aside`,{"aria-label":`Dica`,className:`
                        mt-6 flex gap-3 rounded-lg border border-line bg-mist p-4
                        ${n?``:`transition-transform duration-200 `}
                    `,children:[(0,H.jsx)(R,{className:`mt-0.5 size-5 shrink-0 text-coral`,"aria-hidden":`true`}),(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`p`,{className:`text-sm font-bold text-ink`,children:`Dica`}),(0,H.jsx)(`p`,{className:`mt-1 text-sm leading-6 text-muted-ink`,children:e.tip})]})]})]}):(0,H.jsx)(`section`,{id:`passo-${t+1}`,"aria-labelledby":`passo-titulo-${t+1}`,className:`py-10 first:pt-0`,children:(0,H.jsx)(K,{stepNumber:t+1,loaded:r,total:i,progress:a})})}function re({externalLearning:e=[]}){return(0,H.jsxs)(`section`,{className:`
                mt-8
                max-w-4xl
                rounded-xl
                border
                border-line
                bg-mist
                p-6
                sm:p-7
            `,"aria-labelledby":`tutorial-completion-title`,children:[(0,H.jsx)(`p`,{className:`text-xs font-bold tracking-[0.16em] text-muted-foreground`,children:`PRONTO!`}),(0,H.jsx)(`h2`,{id:`tutorial-completion-title`,className:`mt-2 text-2xl font-bold text-ink`,children:`Você concluiu este tutorial.`}),(0,H.jsx)(`p`,{className:`mt-2 text-sm leading-6 text-muted-ink`,children:`Se precisar, volte aos passos e faça com calma.`}),e.length>0&&(0,H.jsxs)(`div`,{className:`mt-7 border-t border-line pt-6`,children:[(0,H.jsxs)(`div`,{className:`max-w-2xl`,children:[(0,H.jsx)(`p`,{className:`text-xs font-bold tracking-[0.16em] text-muted-foreground`,children:`CONTINUE APRENDENDO`}),(0,H.jsx)(`h3`,{className:`mt-2 text-xl font-bold text-ink`,children:`Quer se aprofundar?`}),(0,H.jsx)(`p`,{className:`mt-2 text-sm leading-6 text-muted-ink`,children:`Confira uma videoaula ou playlist completa para continuar estudando este assunto.`})]}),(0,H.jsx)(`div`,{className:`mt-5 grid gap-3`,children:e.map(e=>{let t=e.type===`playlist`,n=t?B:j,r=t?`Playlist completa`:`Videoaula completa`,i=t?`Abrir playlist`:`Assistir videoaula`;return(0,H.jsxs)(`a`,{href:e.url,target:`_blank`,rel:`noreferrer noopener`,"aria-label":`${e.title} — abrir em nova aba`,className:`
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
                                    `,children:[(0,H.jsx)(`span`,{className:`
                                            flex
                                            size-11
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            text-coral
                                        `,"aria-hidden":`true`,children:(0,H.jsx)(n,{className:`size-11`})}),(0,H.jsxs)(`span`,{className:`min-w-0 flex-1`,children:[(0,H.jsx)(`span`,{className:`block text-xs font-bold tracking-[0.12em] text-muted-foreground`,children:r}),(0,H.jsx)(`span`,{className:`mt-1 block text-sm font-bold text-ink`,children:e.title}),e.description&&(0,H.jsx)(`span`,{className:`mt-1 block text-sm leading-5 text-muted-ink`,children:e.description})]}),(0,H.jsx)(`span`,{className:`transition-transform
                                        duration-200
                                        group-hover:translate-x-0.5
                                        group-hover:text-coral
                                        motion-reduce:transition-none hidden shrink-0 text-xs font-bold text-muted-foreground sm:inline`,children:i}),(0,H.jsx)(h,{className:`
                                        size-4
                                        shrink-0
                                        text-muted-foreground
                                        transition-transform
                                        duration-200
                                        group-hover:translate-x-0.5
                                        group-hover:text-coral
                                        motion-reduce:transition-none
                                    `,"aria-hidden":`true`})]},`${e.type}-${e.url}`)})})]})]})}function ie({steps:e,activeStep:t,onNavigate:n}){let r=O(),i=e.length,a=i>0?(t+1)/i*100:0;return(0,H.jsxs)(`nav`,{"aria-label":`Etapas do tutorial`,className:`lg:sticky lg:top-28 lg:self-start`,children:[(0,H.jsxs)(`div`,{className:`hidden lg:block`,children:[(0,H.jsxs)(`div`,{className:`mb-5`,children:[(0,H.jsxs)(`div`,{className:`flex items-end justify-between gap-4`,children:[(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`p`,{className:`text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground`,children:`Passos`}),(0,H.jsxs)(`p`,{className:`mt-1 text-sm text-muted-ink`,children:[(0,H.jsx)(`span`,{className:`font-bold text-ink`,children:t+1}),` de `,i]})]}),(0,H.jsxs)(`span`,{className:`text-xs font-semibold text-muted-foreground`,children:[Math.round(a),`%`]})]}),(0,H.jsx)(`div`,{className:`mt-3 h-1.5 overflow-hidden rounded-full bg-mist`,"aria-hidden":`true`,children:(0,H.jsx)(`div`,{className:N(`h-full origin-left rounded-full bg-coral`,!r&&`transition-[width] duration-500 ease-out`),style:{width:`${a}%`}})})]}),(0,H.jsx)(`ol`,{className:`relative space-y-1 border-l border-line pl-4`,children:e.map((e,i)=>{let a=i===t,o=i<t;return(0,H.jsx)(`li`,{children:(0,H.jsxs)(`button`,{type:`button`,onClick:()=>n(i),"aria-current":a?`step`:void 0,className:N(`group relative flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left`,`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-background`,!r&&`transition-[background-color,color,transform] duration-200`,a?`bg-coral-soft text-ink`:`text-muted-foreground hover:bg-mist hover:text-ink`),children:[(0,H.jsx)(`span`,{className:N(`absolute -left-[21px] top-1/2 flex size-3 -translate-y-1/2 items-center justify-center rounded-full border-2 border-background`,!r&&`transition-transform duration-300`,a?`scale-125 bg-coral ring-4 ring-coral/15`:o?`bg-coral`:`bg-line`),"aria-hidden":`true`}),(0,H.jsx)(`span`,{className:N(`mt-0.5 shrink-0 text-xs font-bold tabular-nums`,a?`text-coral`:`text-muted-foreground`),children:String(i+1).padStart(2,`0`)}),(0,H.jsx)(`span`,{className:N(`min-w-0 text-sm leading-5`,a?`font-bold`:`font-semibold`),children:e.title})]})},`${e.title}-${i}`)})})]}),(0,H.jsxs)(`div`,{className:`lg:hidden`,children:[(0,H.jsxs)(`div`,{className:`mb-4 flex items-center justify-between`,children:[(0,H.jsxs)(`p`,{className:`text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground`,children:[`Passo `,String(t+1).padStart(2,`0`),` de `,String(i).padStart(2,`0`)]}),(0,H.jsxs)(`span`,{className:`text-xs font-semibold text-muted-foreground`,children:[Math.round(a),`%`]})]}),(0,H.jsx)(`div`,{className:`-mx-1 overflow-x-auto px-1 pb-2`,children:(0,H.jsx)(`ol`,{className:`flex min-w-max gap-2`,children:e.map((e,i)=>{let a=i===t;return(0,H.jsx)(`li`,{children:(0,H.jsx)(`button`,{type:`button`,onClick:()=>n(i),"aria-current":a?`step`:void 0,"aria-label":`Passo ${i+1}: ${e.title}`,className:N(`whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-bold`,`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-background`,!r&&`transition-[background-color,border-color,color,transform] duration-200`,a?`border-coral bg-coral text-white`:`border-line bg-background text-muted-foreground hover:border-coral/50 hover:text-ink`),children:String(i+1).padStart(2,`0`)})},`${e.title}-${i}`)})})})]})]})}function ae(){let{tutorialId:e}=w(),a=M(e),[c,h]=(0,V.useState)(0);if((0,V.useEffect)(()=>{if(!a){let e=`Tutorial não encontrado | ${l}`;return d(e),i(`robots`,`noindex, follow`),()=>{n(),p(`robots`)}}let e=`${a.title} | ${l}`,c=a.description||`Aprenda ${a.title.toLowerCase()} com um passo a passo simples na Hauy Conecta.`,h=`${f}/tutoriais/${a.id}`;d(e),i(`description`,c),i(`robots`,`index, follow`),s(h),r(`og:title`,e),r(`og:description`,c),r(`og:type`,`article`),r(`og:url`,h),r(`twitter:card`,`summary`),r(`twitter:title`,e),r(`twitter:description`,c);let g=E.find(e=>e.id===a.category),_={"@context":`https://schema.org`,"@type":`Article`,headline:a.title,description:c,url:h,inLanguage:`pt-BR`,articleSection:g?.name??a.category,author:{"@type":`Organization`,name:l},publisher:{"@type":`Organization`,name:l},mainEntityOfPage:{"@type":`WebPage`,"@id":h}};return m(_),()=>{n(),p(`description`),p(`robots`),u(`og:title`),u(`og:description`),u(`og:type`),u(`og:url`),u(`twitter:card`),u(`twitter:title`),u(`twitter:description`),o(),t()}},[a]),!a)return(0,H.jsxs)(`main`,{className:`mx-auto max-w-4xl px-5 py-14`,children:[(0,H.jsx)(`h1`,{className:`text-3xl font-bold text-ink`,children:`Tutorial não encontrado`}),(0,H.jsx)(y,{className:`mt-5 inline-block font-bold text-muted-foreground`,to:`/tutoriais`,children:`Ver tutoriais`})]});let g=E.find(e=>e.id===a.category),_=A.filter(e=>e.category===a.category&&e.id!==a.id).slice(0,2),v=a.steps??se(a),b=v[c]??v[0]??null;if(!b)return(0,H.jsxs)(`main`,{className:`mx-auto max-w-4xl px-5 py-14`,children:[(0,H.jsx)(`h1`,{className:`text-3xl font-bold text-ink`,children:`Este tutorial ainda não possui passos.`}),(0,H.jsx)(y,{className:`mt-5 inline-block font-bold text-muted-foreground`,to:`/tutoriais`,children:`Ver tutoriais`})]});function C(e){h(e),window.scrollTo({top:0,behavior:`smooth`}),requestAnimationFrame(()=>{document.getElementById(`passo-titulo-${e+1}`)?.focus({preventScroll:!0})})}function O(){c>=v.length-1||C(c+1)}function j(){c<=0||C(c-1)}return(0,H.jsx)(`main`,{className:`bg-background`,children:(0,H.jsxs)(`div`,{className:`mx-auto max-w-7xl px-5 py-10 lg:px-8`,children:[(0,H.jsxs)(`nav`,{"aria-label":`Navegação do tutorial`,className:`flex flex-wrap items-center gap-2 text-sm text-muted-ink`,children:[(0,H.jsxs)(y,{to:`/tutoriais`,className:`
                            inline-flex
                            items-center
                            gap-2
                            font-semibold
                            text-ink
                            transition-colors
                            hover:text-coral
                        `,children:[(0,H.jsx)(I,{className:`size-4`,"aria-hidden":`true`}),`Todos os tutoriais`]}),(0,H.jsx)(D,{className:`size-4 shrink-0 text-muted-ink`,"aria-hidden":`true`}),(0,H.jsx)(y,{to:`/categorias/${a.category}`,className:`
                            font-semibold
                            text-muted-ink
                            transition-colors
                            hover:text-ink
                        `,children:g?.name??a.category})]}),(0,H.jsxs)(`div`,{className:`
                        mt-10
                        grid
                        gap-8
                        lg:grid-cols-[240px_minmax(0,1fr)]
                        lg:gap-12
                    `,children:[(0,H.jsx)(ie,{steps:v,activeStep:c,onNavigate:C}),(0,H.jsxs)(`article`,{"data-reader-content":!0,className:`min-w-0`,children:[c===0&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(`header`,{children:[(0,H.jsx)(k,{children:g?.name??a.category}),(0,H.jsx)(`h1`,{className:`
                                            mt-4
                                            max-w-4xl
                                            text-4xl
                                            font-bold
                                            tracking-tight
                                            text-ink
                                            sm:text-5xl
                                        `,children:a.title}),(0,H.jsx)(`p`,{className:`
                                            mt-4
                                            max-w-3xl
                                            text-lg
                                            leading-7
                                            text-muted-ink
                                        `,children:a.description}),(0,H.jsxs)(`div`,{className:`mt-5 flex flex-wrap gap-2`,children:[(0,H.jsx)(k,{children:a.difficulty}),(0,H.jsx)(k,{children:a.duration})]})]}),(0,H.jsxs)(`section`,{className:`
                                        mt-10
                                        max-w-4xl
                                        rounded-xl
                                        bg-mist
                                        p-6
                                    `,children:[(0,H.jsx)(`h2`,{className:`text-lg font-bold text-ink`,children:`O que você vai aprender?`}),(0,H.jsx)(`ul`,{className:`mt-4 grid gap-3 sm:grid-cols-2`,children:a.learning.map(e=>(0,H.jsxs)(`li`,{className:`
                                                        flex
                                                        items-start
                                                        gap-2
                                                        text-sm
                                                        text-ink
                                                    `,children:[(0,H.jsx)(S,{className:`
                                                            mt-0.5
                                                            size-4
                                                            shrink-0
                                                            text-coral
                                                        `,"aria-hidden":`true`}),(0,H.jsx)(`span`,{children:e})]},e))})]})]}),(0,H.jsx)(`div`,{className:`mt-10 max-w-4xl`,children:(0,H.jsx)(ne,{step:b,index:c},`${b.title}-${c}`)}),(0,H.jsxs)(`div`,{className:`
                                mt-10
                                flex
                                max-w-4xl
                                items-center
                                justify-between
                                gap-4
                                border-t
                                border-line
                                pt-6
                            `,children:[(0,H.jsxs)(T,{type:`button`,variant:`coral`,onClick:j,disabled:c===0,className:`group`,children:[(0,H.jsx)(x,{className:`
                                        size-4
                                        transition-transform
                                        duration-200
                                        group-hover:-translate-x-0.5
                                        motion-reduce:transition-none
                                    `,"aria-hidden":`true`}),`Passo anterior`]}),c<v.length-1?(0,H.jsxs)(T,{type:`button`,variant:`coral`,onClick:O,className:`group min-w-36`,children:[`Próximo passo`,(0,H.jsx)(D,{className:`
                                            size-4
                                            transition-transform
                                            duration-200
                                            group-hover:translate-x-0.5
                                            motion-reduce:transition-none
                                        `,"aria-hidden":`true`})]}):(0,H.jsx)(`span`,{className:`
                                        text-sm
                                        font-semibold
                                        text-muted-foreground
                                    `,"aria-current":`step`,children:`Último passo`})]}),c===v.length-1&&(0,H.jsx)(re,{externalLearning:a.externalLearning}),c===v.length-1&&_.length>0&&(0,H.jsxs)(`section`,{className:`mt-12 max-w-4xl`,children:[(0,H.jsx)(`h2`,{className:`text-2xl font-bold text-ink`,children:`Você também pode gostar de`}),(0,H.jsx)(`div`,{className:`mt-5 grid gap-4 sm:grid-cols-2`,children:_.map(e=>(0,H.jsxs)(y,{to:`/tutoriais/${e.id}`,className:`
                                                        rounded-xl
                                                        border
                                                        border-line
                                                        bg-mist
                                                        p-5
                                                        font-bold
                                                        text-ink
                                                        transition-colors
                                                        hover:bg-mist2
                                                    `,children:[e.title,(0,H.jsx)(D,{className:`
                                                            float-right
                                                            size-5
                                                            text-muted-ink
                                                        `,"aria-hidden":`true`})]},e.id))})]}),(0,H.jsx)(`div`,{className:`
                                mt-12
                                flex
                                justify-between
                                border-t
                                border-line
                                pt-6
                            `,children:(0,H.jsxs)(y,{to:`/tutoriais`,className:`
                                    inline-flex
                                    items-center
                                    gap-1
                                    text-sm
                                    font-bold
                                    text-muted-foreground
                                    transition-colors
                                    hover:text-ink
                                `,children:[(0,H.jsx)(x,{className:`size-4`,"aria-hidden":`true`}),`Todos os tutoriais`]})})]})]})]})})}function oe(){let{tutorialId:e}=w();return(0,H.jsx)(ae,{},e)}function se(e){return[{title:`Abra a ferramenta ou arquivo que você vai usar.`,description:`Comece abrindo o programa ou o arquivo relacionado a “${e.title}”. Se ainda não estiver com ele salvo, escolha uma pasta que você consiga encontrar depois.`,examples:[],tip:null,video:null},{title:e.learning[0],description:`Siga esta etapa com atenção. Faça uma alteração por vez para conferir se tudo ficou como você espera.`,examples:[],tip:null,video:null},{title:e.learning[1]??`Revise o resultado`,description:`Antes de terminar, confira as informações e salve seu trabalho. Assim, você evita perder o que fez.`,examples:[],tip:null,video:null}]}export{oe as TutorialRoute};