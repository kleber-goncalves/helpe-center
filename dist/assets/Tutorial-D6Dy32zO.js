import{D as e,S as t,T as n,a as r,c as i,d as a,f as o,g as s,i as c,l,m as u,n as d,o as f,p,r as m,s as h,u as g}from"./seo-BiD9DEyO.js";import{D as _,M as v,O as y,S as b,f as x,i as S,j as C,k as w,n as T,p as E,s as D,t as O}from"./index-XLU0qX7K.js";var k={name:`lightbulb`,size:24,node:[[`path`,{d:`M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5`,key:`1gvzjb`}],[`path`,{d:`M9 18h6`,key:`x1upvd`}],[`path`,{d:`M10 22h4`,key:`ceow96`}]]};k.node;var A=v(k),j=e(n(),1),M=u();function N({video:e,poster:t,title:n=`Vídeo do tutorial`,captions:r}){return(0,M.jsxs)(`figure`,{className:`bg-background p-3 sm:p-5`,children:[(0,M.jsxs)(`video`,{className:`mx-auto block h-auto w-full max-w-3xl rounded-lg border border-line`,controls:!0,preload:`metadata`,playsInline:!0,poster:t,"aria-label":n,children:[(0,M.jsx)(`source`,{src:e,type:`video/mp4`}),r&&(0,M.jsx)(`track`,{kind:`captions`,src:r,srcLang:`pt-BR`,label:`Português`,default:!0}),`Seu navegador não suporta a reprodução deste vídeo.`]}),(0,M.jsx)(`figcaption`,{className:`mx-auto mt-2 max-w-3xl text-xs leading-5 text-muted-foreground`,children:n})]})}function P({stepNumber:e,loaded:t,total:n,progress:r}){return(0,M.jsx)(`div`,{className:`grid min-h-[420px] place-items-center`,role:`status`,"aria-label":`Carregando materiais do passo ${e}`,children:(0,M.jsxs)(`div`,{className:`w-full max-w-md px-6 text-center`,children:[(0,M.jsxs)(`p`,{className:`text-xs font-bold tracking-[0.16em] text-muted-foreground`,children:[`PASSO `,String(e).padStart(2,`0`)]}),(0,M.jsx)(`h2`,{className:`mt-3 text-2xl font-bold text-ink`,children:`Preparando o conteúdo`}),(0,M.jsx)(`p`,{className:`mt-3 text-sm leading-6 text-muted-ink`,children:`Estamos carregando as imagens e vídeos deste passo.`}),(0,M.jsxs)(`div`,{className:`mt-8`,children:[(0,M.jsxs)(`div`,{className:`flex items-center justify-between text-xs font-semibold text-muted-foreground`,children:[(0,M.jsxs)(`span`,{children:[t,` de `,n,` materiais`]}),(0,M.jsxs)(`span`,{children:[r,`%`]})]}),(0,M.jsx)(`div`,{className:`mt-2 h-1.5 overflow-hidden rounded-full bg-mist`,role:`progressbar`,"aria-valuemin":`0`,"aria-valuemax":`100`,"aria-valuenow":r,"aria-label":`Carregamento do passo: ${r}%`,children:(0,M.jsx)(`div`,{className:`h-full rounded-full bg-coral transition-[width] duration-300 ease-out motion-reduce:transition-none`,style:{width:`${r}%`}})})]})]})})}var F=1500,I=new Set,L=new Map;function R(e){let t=[],n=[];e?.image&&t.push(e.image),e?.video&&n.push(e.video),e?.poster&&t.push(e.poster);for(let r of e?.examples??[])r.image&&t.push(r.image),r.poster&&t.push(r.poster),r.video&&n.push(r.video);return{images:[...new Set(t)],videos:[...new Set(n)]}}function z(e){return new Promise(t=>{setTimeout(t,e)})}function B(e){let t=`image:${e}`;if(I.has(t))return Promise.resolve();if(L.has(t))return L.get(t);let n=new Promise(n=>{let r=new Image,i=()=>{I.add(t),L.delete(t),n()};r.onload=i,r.onerror=i,r.src=e});return L.set(t,n),n}function V(e){let t=`video:${e}`;if(I.has(t))return Promise.resolve();if(L.has(t))return L.get(t);let n=new Promise(n=>{let r=document.createElement(`video`),i=!1,a=()=>{i||(i=!0,r.removeEventListener(`canplay`,a),r.removeEventListener(`error`,a),I.add(t),L.delete(t),r.removeAttribute(`src`),r.load(),n())};r.preload=`auto`,r.muted=!0,r.playsInline=!0,r.addEventListener(`canplay`,a,{once:!0}),r.addEventListener(`error`,a,{once:!0}),r.src=e,r.load()});return L.set(t,n),n}function H(e){let{images:t,videos:n}=R(e),r=[...t.map(e=>({type:`image`,src:e,key:`image:${e}`})),...n.map(e=>({type:`video`,src:e,key:`video:${e}`}))],i=r.length,[a,o]=(0,j.useState)(()=>r.filter(e=>I.has(e.key)).length);(0,j.useEffect)(()=>{let e=!1;if(i===0)return;let t=performance.now(),n=r.filter(e=>I.has(e.key)).length;async function a(){let a=r.map(async t=>{I.has(t.key)||(t.type===`image`?await B(t.src):await V(t.src),n+=1,e||o(n))});await Promise.all(a);let s=performance.now()-t;await z(Math.max(0,F-s)),e||o(i)}return a(),()=>{e=!0}},[e,i]);let s=i===0||a>=i;return{loaded:a,total:i,progress:i>0?Math.round(a/i*100):100,isReady:s}}function U({step:e,index:t}){let n=D(),{loaded:r,total:i,progress:a,isReady:o}=H(e);return o?(0,M.jsxs)(`section`,{id:`passo-${t+1}`,"aria-labelledby":`passo-titulo-${t+1}`,className:`
                py-10 first:pt-0
                ${n?``:`animate-[tutorial-step-in_450ms_ease-out]`}
            `,children:[(0,M.jsxs)(`p`,{className:`text-xs font-bold tracking-[0.16em] text-muted-foreground`,children:[`PASSO `,String(t+1).padStart(2,`0`)]}),(0,M.jsx)(`h2`,{id:`passo-titulo-${t+1}`,tabIndex:`-1`,className:`mt-3 text-2xl font-bold text-ink sm:text-3xl`,children:e.title}),(0,M.jsx)(`p`,{className:`mt-3 max-w-3xl leading-7 text-muted-ink`,children:e.description}),e.examples?.length>0&&(0,M.jsx)(`div`,{className:`mt-8 space-y-8`,children:e.examples.map((r,i)=>(0,M.jsxs)(`article`,{className:`
                                overflow-hidden rounded-xl border border-line bg-background
                                ${n?``:`transition-[transform,box-shadow,border-color] duration-300  hover:border-coral/30 hover:shadow-soft`}
                            `,children:[(0,M.jsxs)(`div`,{className:`border-b border-line bg-mist px-4 py-4`,children:[(0,M.jsx)(`h3`,{className:`font-display text-base font-bold text-ink`,children:r.title}),r.description&&(0,M.jsx)(`p`,{className:`mt-1 text-sm leading-6 text-muted-ink`,children:r.description})]}),r.image&&(0,M.jsx)(`div`,{className:`bg-background p-3 sm:p-5`,children:(0,M.jsx)(`img`,{src:r.image,alt:r.alt??`Exemplo do passo ${t+1}: ${r.title}`,loading:`eager`,decoding:`async`,draggable:`false`,className:`mx-auto block h-auto w-full max-w-3xl rounded-lg object-contain`})}),r.video&&(0,M.jsx)(N,{video:r.video,poster:r.poster}),!r.image&&!r.video&&(0,M.jsx)(`div`,{className:`grid min-h-48 place-items-center bg-mist px-6 py-12 text-center`,children:(0,M.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Este exemplo ainda não possui imagem ou vídeo.`})})]},`${e.title}-${r.title}-${i}`))}),e.video&&(0,M.jsx)(N,{video:e.video,poster:e.poster}),e.tip&&(0,M.jsxs)(`aside`,{"aria-label":`Dica`,className:`
                        mt-6 flex gap-3 rounded-lg border border-line bg-mist p-4
                        ${n?``:`transition-transform duration-200 `}
                    `,children:[(0,M.jsx)(A,{className:`mt-0.5 size-5 shrink-0 text-coral`,"aria-hidden":`true`}),(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`p`,{className:`text-sm font-bold text-ink`,children:`Dica`}),(0,M.jsx)(`p`,{className:`mt-1 text-sm leading-6 text-muted-ink`,children:e.tip})]})]})]}):(0,M.jsx)(`section`,{id:`passo-${t+1}`,"aria-labelledby":`passo-titulo-${t+1}`,className:`py-10 first:pt-0`,children:(0,M.jsx)(P,{stepNumber:t+1,loaded:r,total:i,progress:a})})}function W({steps:e,activeStep:t,onNavigate:n}){let r=D(),i=e.length,a=i>0?(t+1)/i*100:0;return(0,M.jsxs)(`nav`,{"aria-label":`Etapas do tutorial`,className:`lg:sticky lg:top-28 lg:self-start`,children:[(0,M.jsxs)(`div`,{className:`hidden lg:block`,children:[(0,M.jsxs)(`div`,{className:`mb-5`,children:[(0,M.jsxs)(`div`,{className:`flex items-end justify-between gap-4`,children:[(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`p`,{className:`text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground`,children:`Passos`}),(0,M.jsxs)(`p`,{className:`mt-1 text-sm text-muted-ink`,children:[(0,M.jsx)(`span`,{className:`font-bold text-ink`,children:t+1}),` de `,i]})]}),(0,M.jsxs)(`span`,{className:`text-xs font-semibold text-muted-foreground`,children:[Math.round(a),`%`]})]}),(0,M.jsx)(`div`,{className:`mt-3 h-1.5 overflow-hidden rounded-full bg-mist`,"aria-hidden":`true`,children:(0,M.jsx)(`div`,{className:b(`h-full origin-left rounded-full bg-coral`,!r&&`transition-[width] duration-500 ease-out`),style:{width:`${a}%`}})})]}),(0,M.jsx)(`ol`,{className:`relative space-y-1 border-l border-line pl-4`,children:e.map((e,i)=>{let a=i===t,o=i<t;return(0,M.jsx)(`li`,{children:(0,M.jsxs)(`button`,{type:`button`,onClick:()=>n(i),"aria-current":a?`step`:void 0,className:b(`group relative flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left`,`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-background`,!r&&`transition-[background-color,color,transform] duration-200`,a?`bg-coral-soft text-ink`:`text-muted-foreground hover:bg-mist hover:text-ink`),children:[(0,M.jsx)(`span`,{className:b(`absolute -left-[21px] top-1/2 flex size-3 -translate-y-1/2 items-center justify-center rounded-full border-2 border-background`,!r&&`transition-transform duration-300`,a?`scale-125 bg-coral ring-4 ring-coral/15`:o?`bg-coral`:`bg-line`),"aria-hidden":`true`}),(0,M.jsx)(`span`,{className:b(`mt-0.5 shrink-0 text-xs font-bold tabular-nums`,a?`text-coral`:`text-muted-foreground`),children:String(i+1).padStart(2,`0`)}),(0,M.jsx)(`span`,{className:b(`min-w-0 text-sm leading-5`,a?`font-bold`:`font-semibold`),children:e.title})]})},`${e.title}-${i}`)})})]}),(0,M.jsxs)(`div`,{className:`lg:hidden`,children:[(0,M.jsxs)(`div`,{className:`mb-4 flex items-center justify-between`,children:[(0,M.jsxs)(`p`,{className:`text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground`,children:[`Passo `,String(t+1).padStart(2,`0`),` de `,String(i).padStart(2,`0`)]}),(0,M.jsxs)(`span`,{className:`text-xs font-semibold text-muted-foreground`,children:[Math.round(a),`%`]})]}),(0,M.jsx)(`div`,{className:`-mx-1 overflow-x-auto px-1 pb-2`,children:(0,M.jsx)(`ol`,{className:`flex min-w-max gap-2`,children:e.map((e,i)=>{let a=i===t;return(0,M.jsx)(`li`,{children:(0,M.jsx)(`button`,{type:`button`,onClick:()=>n(i),"aria-current":a?`step`:void 0,"aria-label":`Passo ${i+1}: ${e.title}`,className:b(`whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-bold`,`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-background`,!r&&`transition-[background-color,border-color,color,transform] duration-200`,a?`border-coral bg-coral text-white`:`border-line bg-background text-muted-foreground hover:border-coral/50 hover:text-ink`),children:String(i+1).padStart(2,`0`)})},`${e.title}-${i}`)})})})]})]})}function G(){let{tutorialId:e}=t(),n=O(e),[u,v]=(0,j.useState)(0);if((0,j.useEffect)(()=>{if(!n){let e=`Tutorial não encontrado | ${d}`;return p(e),o(`robots`,`noindex, follow`),()=>{i(),h(`robots`)}}let e=`${n.title} | ${d}`,t=n.description||`Aprenda ${n.title.toLowerCase()} com um passo a passo simples na Hauy Conecta.`,s=`${m}/tutoriais/${n.id}`;p(e),o(`description`,t),o(`robots`,`index, follow`),l(s),a(`og:title`,e),a(`og:description`,t),a(`og:type`,`article`),a(`og:url`,s),a(`twitter:card`,`summary`),a(`twitter:title`,e),a(`twitter:description`,t);let u=S.find(e=>e.id===n.category),_={"@context":`https://schema.org`,"@type":`Article`,headline:n.title,description:t,url:s,inLanguage:`pt-BR`,articleSection:u?.name??n.category,author:{"@type":`Organization`,name:d},publisher:{"@type":`Organization`,name:d},mainEntityOfPage:{"@type":`WebPage`,"@id":s}};return g(_),()=>{i(),h(`description`),h(`robots`),f(`og:title`),f(`og:description`),f(`og:type`),f(`og:url`),f(`twitter:card`),f(`twitter:title`),f(`twitter:description`),c(),r()}},[n]),!n)return(0,M.jsxs)(`main`,{className:`mx-auto max-w-4xl px-5 py-14`,children:[(0,M.jsx)(`h1`,{className:`text-3xl font-bold text-ink`,children:`Tutorial não encontrado`}),(0,M.jsx)(s,{className:`mt-5 inline-block font-bold text-muted-foreground`,to:`/tutoriais`,children:`Ver tutoriais`})]});let b=S.find(e=>e.id===n.category),D=T.filter(e=>e.category===n.category&&e.id!==n.id).slice(0,2),k=n.steps??q(n),A=k[u]??k[0]??null;if(!A)return(0,M.jsxs)(`main`,{className:`mx-auto max-w-4xl px-5 py-14`,children:[(0,M.jsx)(`h1`,{className:`text-3xl font-bold text-ink`,children:`Este tutorial ainda não possui passos.`}),(0,M.jsx)(s,{className:`mt-5 inline-block font-bold text-muted-foreground`,to:`/tutoriais`,children:`Ver tutoriais`})]});function N(e){v(e),window.scrollTo({top:0,behavior:`smooth`}),requestAnimationFrame(()=>{document.getElementById(`passo-titulo-${e+1}`)?.focus({preventScroll:!0})})}function P(){u>=k.length-1||N(u+1)}function F(){u<=0||N(u-1)}return(0,M.jsx)(`main`,{className:`bg-background`,children:(0,M.jsxs)(`div`,{className:`mx-auto max-w-7xl px-5 py-10 lg:px-8`,children:[(0,M.jsxs)(`nav`,{"aria-label":`Navegação do tutorial`,className:`flex flex-wrap items-center gap-2 text-sm text-muted-ink`,children:[(0,M.jsxs)(s,{to:`/tutoriais`,className:`
                            inline-flex
                            items-center
                            gap-2
                            font-semibold
                            text-ink
                            transition-colors
                            hover:text-coral
                        `,children:[(0,M.jsx)(C,{className:`size-4`,"aria-hidden":`true`}),`Todos os tutoriais`]}),(0,M.jsx)(_,{className:`size-4 shrink-0 text-muted-ink`,"aria-hidden":`true`}),(0,M.jsx)(s,{to:`/categorias/${n.category}`,className:`
                            font-semibold
                            text-muted-ink
                            transition-colors
                            hover:text-ink
                        `,children:b?.name??n.category})]}),(0,M.jsxs)(`div`,{className:`
                        mt-10
                        grid
                        gap-8
                        lg:grid-cols-[240px_minmax(0,1fr)]
                        lg:gap-12
                    `,children:[(0,M.jsx)(W,{steps:k,activeStep:u,onNavigate:N}),(0,M.jsxs)(`article`,{"data-reader-content":!0,className:`min-w-0`,children:[u===0&&(0,M.jsxs)(M.Fragment,{children:[(0,M.jsxs)(`header`,{children:[(0,M.jsx)(x,{children:b?.name??n.category}),(0,M.jsx)(`h1`,{className:`
                                            mt-4
                                            max-w-4xl
                                            text-4xl
                                            font-bold
                                            tracking-tight
                                            text-ink
                                            sm:text-5xl
                                        `,children:n.title}),(0,M.jsx)(`p`,{className:`
                                            mt-4
                                            max-w-3xl
                                            text-lg
                                            leading-7
                                            text-muted-ink
                                        `,children:n.description}),(0,M.jsxs)(`div`,{className:`mt-5 flex flex-wrap gap-2`,children:[(0,M.jsx)(x,{children:n.difficulty}),(0,M.jsx)(x,{children:n.duration})]})]}),(0,M.jsxs)(`section`,{className:`
                                        mt-10
                                        max-w-4xl
                                        rounded-xl
                                        bg-mist
                                        p-6
                                    `,children:[(0,M.jsx)(`h2`,{className:`text-lg font-bold text-ink`,children:`O que você vai aprender?`}),(0,M.jsx)(`ul`,{className:`mt-4 grid gap-3 sm:grid-cols-2`,children:n.learning.map(e=>(0,M.jsxs)(`li`,{className:`
                                                        flex
                                                        items-start
                                                        gap-2
                                                        text-sm
                                                        text-ink
                                                    `,children:[(0,M.jsx)(w,{className:`
                                                            mt-0.5
                                                            size-4
                                                            shrink-0
                                                            text-coral
                                                        `,"aria-hidden":`true`}),(0,M.jsx)(`span`,{children:e})]},e))})]})]}),(0,M.jsx)(`div`,{className:`mt-10 max-w-4xl`,children:(0,M.jsx)(U,{step:A,index:u},`${A.title}-${u}`)}),(0,M.jsxs)(`div`,{className:`
                                mt-10
                                flex
                                max-w-4xl
                                items-center
                                justify-between
                                gap-4
                                border-t
                                border-line
                                pt-6
                            `,children:[(0,M.jsxs)(E,{type:`button`,variant:`coral`,onClick:F,disabled:u===0,className:`group`,children:[(0,M.jsx)(y,{className:`
                                        size-4
                                        transition-transform
                                        duration-200
                                        group-hover:-translate-x-0.5
                                        motion-reduce:transition-none
                                    `,"aria-hidden":`true`}),`Passo anterior`]}),u<k.length-1?(0,M.jsxs)(E,{type:`button`,variant:`coral`,onClick:P,className:`group min-w-36`,children:[`Próximo passo`,(0,M.jsx)(_,{className:`
                                            size-4
                                            transition-transform
                                            duration-200
                                            group-hover:translate-x-0.5
                                            motion-reduce:transition-none
                                        `,"aria-hidden":`true`})]}):(0,M.jsx)(`span`,{className:`
                                        text-sm
                                        font-semibold
                                        text-muted-foreground
                                    `,"aria-current":`step`,children:`Último passo`})]}),u===k.length-1&&(0,M.jsxs)(`section`,{className:`
                                    mt-8
                                    max-w-4xl
                                    rounded-xl
                                    border
                                    border-line
                                    bg-mist
                                    p-6
                                `,children:[(0,M.jsx)(`p`,{className:`
                                        text-xs
                                        font-bold
                                        tracking-[0.16em]
                                        text-muted-foreground
                                    `,children:`PRONTO!`}),(0,M.jsx)(`h2`,{className:`
                                        mt-2
                                        text-2xl
                                        font-bold
                                        text-ink
                                    `,children:`Você concluiu este tutorial.`}),(0,M.jsx)(`p`,{className:`
                                        mt-2
                                        text-sm
                                        text-muted-ink
                                    `,children:`Se precisar, volte aos passos e faça com calma.`})]}),u===k.length-1&&D.length>0&&(0,M.jsxs)(`section`,{className:`mt-12 max-w-4xl`,children:[(0,M.jsx)(`h2`,{className:`text-2xl font-bold text-ink`,children:`Você também pode gostar de`}),(0,M.jsx)(`div`,{className:`mt-5 grid gap-4 sm:grid-cols-2`,children:D.map(e=>(0,M.jsxs)(s,{to:`/tutoriais/${e.id}`,className:`
                                                        rounded-xl
                                                        border
                                                        border-line
                                                        bg-mist
                                                        p-5
                                                        font-bold
                                                        text-ink
                                                        transition-colors
                                                        hover:bg-mist2
                                                    `,children:[e.title,(0,M.jsx)(_,{className:`
                                                            float-right
                                                            size-5
                                                            text-muted-ink
                                                        `,"aria-hidden":`true`})]},e.id))})]}),(0,M.jsx)(`div`,{className:`
                                mt-12
                                flex
                                justify-between
                                border-t
                                border-line
                                pt-6
                            `,children:(0,M.jsxs)(s,{to:`/tutoriais`,className:`
                                    inline-flex
                                    items-center
                                    gap-1
                                    text-sm
                                    font-bold
                                    text-muted-foreground
                                    transition-colors
                                    hover:text-ink
                                `,children:[(0,M.jsx)(y,{className:`size-4`,"aria-hidden":`true`}),`Todos os tutoriais`]})})]})]})]})})}function K(){let{tutorialId:e}=t();return(0,M.jsx)(G,{},e)}function q(e){return[{title:`Abra a ferramenta ou arquivo que você vai usar.`,description:`Comece abrindo o programa ou o arquivo relacionado a “${e.title}”. Se ainda não estiver com ele salvo, escolha uma pasta que você consiga encontrar depois.`,examples:[],tip:null,video:null},{title:e.learning[0],description:`Siga esta etapa com atenção. Faça uma alteração por vez para conferir se tudo ficou como você espera.`,examples:[],tip:null,video:null},{title:e.learning[1]??`Revise o resultado`,description:`Antes de terminar, confira as informações e salve seu trabalho. Assim, você evita perder o que fez.`,examples:[],tip:null,video:null}]}export{K as TutorialRoute};