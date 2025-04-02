(()=>{"use strict";var e={n:s=>{var t=s&&s.__esModule?()=>s.default:()=>s;return e.d(t,{a:t}),t},d:(s,t)=>{for(var n in t)e.o(t,n)&&!e.o(s,n)&&Object.defineProperty(s,n,{enumerable:!0,get:t[n]})},o:(e,s)=>Object.prototype.hasOwnProperty.call(e,s)};const s=window.wp.domReady;var t=e.n(s);const n=window.wp.element,a=window.wp.components,i=window.ReactJSXRuntime,l=()=>(0,i.jsxs)("details",{children:[(0,i.jsx)("summary",{children:(0,i.jsx)("strong",{children:credit.links})}),(0,i.jsxs)("span",{className:"span1Style",children:[(0,i.jsxs)("div",{children:[credit.plugin_version," |",(0,i.jsx)("a",{className:"aStyle",href:credit.faq,target:"_blank",rel:"noopener noreferrer",children:"FAQ"})," | ",(0,i.jsx)("a",{className:"aStyle",href:credit.support,target:"_blank",rel:"noopener noreferrer",children:"Support Forums"})," | ",(0,i.jsx)("a",{className:"aStyle",href:credit.review,target:"_blank",rel:"noopener noreferrer",children:"Reviews"})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("a",{className:"aStyle",href:credit.translate,target:"_blank",rel:"noopener noreferrer",children:credit.translate_text})," | ",(0,i.jsx)("a",{className:"aStyle",href:credit.facebook,target:"_blank",rel:"noopener noreferrer",children:(0,i.jsx)("span",{class:"dashicons dashicons-facebook"})})," | ",(0,i.jsx)("a",{className:"aStyle",href:credit.twitter,target:"_blank",rel:"noopener noreferrer",children:(0,i.jsx)("span",{class:"dashicons dashicons-twitter"})})," | ",(0,i.jsx)("a",{className:"aStyle",href:credit.youtube,target:"_blank",rel:"noopener noreferrer",children:(0,i.jsx)("span",{class:"dashicons dashicons-video-alt3"})})]}),(0,i.jsxs)("div",{className:"boxStyle",children:[(0,i.jsx)("h3",{children:credit.donate_text}),(0,i.jsxs)("div",{className:"divStyle",children:[(0,i.jsx)("span",{className:"span2Style",children:"Plugin Author"})," ",(0,i.jsx)("span",{className:"span1Style",children:"Katsushi Kawamori"})]}),(0,i.jsx)(a.Button,{className:"button button-large",href:credit.donate,target:"_blank",children:credit.donate_button})]})]})]}),r=window.wp.i18n,o=window.wp.apiFetch;var c=e.n(o);const d=e=>{let s=Math.round(e.p_count/e.max_count*100);const t=[];t.push((0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("progress",{value:s,max:"100"}),"  ",e.p_count," / ",e.max_count,"  |  ",s," %"]}));const n=[];return n.push((0,i.jsx)(i.Fragment,{children:t})),100==s&&n.push((0,i.jsx)(a.Notice,{status:"success",onRemove:()=>{window.location.reload()},children:e.text})),(0,i.jsx)("div",{children:n})},p=()=>{const e=JSON.parse(pluswebpgenerate_data.post_ids),[s,t]=(0,n.useState)(0),[l,o]=(0,n.useState)(!1),p=e.length,h=(0,n.useRef)(!0);(0,n.useEffect)((()=>{if(h.current)h.current=!1;else try{(async()=>{for(let s=0;s<p;s++)await c()({path:"rf/plus-webp-generate_api/token",method:"POST",data:{post_id:e[s],count:s+1,max_count:p,generate:l}}).then((e=>{e.generate?t(s+1):window.location.reload()}))})()}catch(e){console.log(e)}}),[l]);const g=[],u=[],m=[],x=[],_=[];return l?(u.push((0,i.jsx)(d,{p_count:s,max_count:p,text:(0,r.__)("Generation has been completed.","plus-webp"),updatecurrentProgress:t,updatecurrentSubmit:o})),0<s&&s<p&&x.push((0,i.jsx)(a.Button,{className:"button button-large",onClick:()=>{o(!1)},children:(0,r.__)("Stop","plus-webp")}))):p!==s?(g.push((0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("p",{className:"description",children:pluswebpgenerate_data.generate_description}),(0,i.jsx)("p",{className:"description",children:pluswebpgenerate_data.non_generate_description})]})),m.push((0,i.jsx)(a.Button,{className:"button button-large",onClick:()=>{o(!0)},children:(0,r.__)("Generate","plus-webp")}))):g.push((0,i.jsx)("p",{className:"description",children:(0,r.__)("Cannot find any media that can be generated.","plus-webp")})),_.push((0,i.jsx)(a.Button,{className:"button button-large",onClick:()=>{window.location.reload()},children:(0,r.__)("Check","plus-webp")})),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("h2",{children:(0,r.__)("Bulk Generate","plus-webp")}),(0,i.jsx)("b",{children:(0,i.jsx)("li",{children:(0,r.__)("Notified by email with details of the generate results.","plus-webp")})}),(0,i.jsx)("b",{children:(0,i.jsx)("li",{children:(0,r.__)('To perform "Bulk Generate" after changing the following settings, press "Check" and then press "Generate".',"plus-webp")})}),(0,i.jsx)("b",{children:(0,i.jsx)("li",{children:(0,r.__)("WP-CLI commands are available. If you have a large number of files, WP-CLI commands is more reliable. Command line option allows the user to specify whether to send e-mail, the media ID of the sender and the settings.","plus-webp")})}),(0,i.jsxs)("div",{className:"settings",children:[(0,i.jsx)("strong",{children:"WP-CLI"}),(0,i.jsx)("code",{children:"wp pluswebpavif"})]}),g,m,"    ",x,"    ",_,u]})},h=()=>{const e=JSON.parse(pluswebpsettings_data.settings),[s,t]=(0,n.useState)(e);(0,n.useEffect)((()=>{c()({path:"rf/plus-webp-settings_api/token",method:"POST",data:{output_mime:s.output_mime,quality:s.quality,types:s.types,replace:s.replace,addext:s.addext}}).then((e=>{}))}),[s]);const l=[];void 0!==s&&l.push((0,i.jsx)(a.RadioControl,{selected:s.output_mime,options:[{label:"WebP",value:"image/webp"},{label:"AVIF",value:"image/avif"}],onChange:e=>{s.output_mime=e;let n=Object.assign({},s);t(n)}}));const o=[];void 0!==s&&o.push((0,i.jsx)(a.RangeControl,{__nextHasNoMarginBottom:!0,__next40pxDefaultSize:!0,max:100,min:1,value:s.quality,className:"range_width",onChange:e=>{s.quality=e;let n=Object.assign({},s);t(n)}}));const d=[];if(void 0!==s){let e=!1;s.types.includes("image/jpeg")&&(e=!0),d.push((0,i.jsx)("div",{className:"line-margin",children:(0,i.jsx)(a.ToggleControl,{__nextHasNoMarginBottom:!0,label:"image/jpeg",checked:e,onChange:e=>{if(e)s.types.push("image/jpeg");else{let e="image/jpeg",t=s.types.indexOf(e);s.types.splice(t,1)}let n=Object.assign({},s);t(n)}})}));let n=!1;s.types.includes("image/png")&&(n=!0),d.push((0,i.jsx)("div",{className:"line-margin",children:(0,i.jsx)(a.ToggleControl,{__nextHasNoMarginBottom:!0,label:"image/png",checked:n,onChange:e=>{if(e)s.types.push("image/png");else{let e="image/png",t=s.types.indexOf(e);s.types.splice(t,1)}let n=Object.assign({},s);t(n)}})}));let l=!1;s.types.includes("image/bmp")&&(l=!0),d.push((0,i.jsx)("div",{className:"line-margin",children:(0,i.jsx)(a.ToggleControl,{__nextHasNoMarginBottom:!0,label:"image/bmp",checked:l,onChange:e=>{if(e)s.types.push("image/bmp");else{let e="image/bmp",t=s.types.indexOf(e);s.types.splice(t,1)}let n=Object.assign({},s);t(n)}})}));let r=!1;s.types.includes("image/gif")&&(r=!0),d.push((0,i.jsx)("div",{className:"line-margin",children:(0,i.jsx)(a.ToggleControl,{__nextHasNoMarginBottom:!0,label:"image/gif",checked:r,onChange:e=>{if(e)s.types.push("image/gif");else{let e="image/gif",t=s.types.indexOf(e);s.types.splice(t,1)}let n=Object.assign({},s);t(n)}})}))}const p=[];void 0!==s&&p.push((0,i.jsx)(a.ToggleControl,{__nextHasNoMarginBottom:!0,label:(0,r.__)("Apply","plus-webp"),checked:s.addext,onChange:e=>{s.addext=e;let n=Object.assign({},s);t(n)}}));const h=[];return void 0!==s&&h.push((0,i.jsx)(a.ToggleControl,{__nextHasNoMarginBottom:!0,label:(0,r.__)("Apply","plus-webp"),checked:s.replace,onChange:e=>{s.replace=e;let n=Object.assign({},s);t(n)}})),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("h2",{children:(0,r.__)("Settings","plus-webp")}),(0,i.jsxs)("div",{className:"settings",children:[(0,i.jsx)("h3",{children:(0,r.__)("Generated images","plus-webp")}),(0,i.jsxs)("div",{className:"settings2",children:[l,(0,i.jsx)("p",{className:"description",children:(0,r.__)("Specifies the file type to be output after conversion.","plus-webp")})]})]}),(0,i.jsxs)("div",{className:"settings",children:[(0,i.jsx)("h3",{children:(0,r.__)("Quality","plus-webp")}),(0,i.jsxs)("div",{className:"settings2",children:[o,(0,i.jsx)("p",{className:"description",children:(0,r.__)("Specifies the quality of generated images. The higher the number, the better the quality and the larger the file size.","plus-webp")})]})]}),(0,i.jsxs)("div",{className:"settings",children:[(0,i.jsx)("h3",{children:(0,r.__)("Type","plus-webp")}),(0,i.jsxs)("div",{className:"settings2",children:[d,(0,i.jsx)("p",{className:"description",children:(0,r.__)("Check the type of source image to be converted.","plus-webp")})]})]}),(0,i.jsxs)("div",{className:"settings",children:[(0,i.jsx)("h3",{children:(0,r.__)("Append the generated images extension(webp,avif) to the original filename","plus-webp")}),(0,i.jsxs)("div",{className:"settings2",children:[p,(0,i.jsx)("p",{className:"description",children:(0,r.__)("Checking this setting, the generated images extension(webp,avif) will be appended to the name of the file, including the extension. Not checking, only the extension is changed.","plus-webp")})]})]}),(0,i.jsxs)("div",{className:"settings",children:[(0,i.jsx)("h3",{children:(0,r.__)("WebP or AVIF replacement of images and contents","plus-webp")}),(0,i.jsxs)("div",{className:"settings2",children:[h,(0,i.jsxs)("p",{className:"description",children:[(0,r.__)("Checking this setting will replace image files with WebP or AVIF when adding new media, and delete the original image file. Also, when generating all images, the original image file ID will be overwritten as WebP or AVIF and the original image file will be deleted. All URLs in the content are also replaced.","plus-webp"),(0,r.__)('If you want to replace other databases besides content, use the "plus_webp_advanced_change_db" filter hook.',"plus-webp"),(0,i.jsx)(a.Button,{href:(0,r.__)("https://wordpress.org/plugins/plus-webp/","plus-webp"),variant:"secondary",target:"_blank",children:(0,r.__)('"plus_webp_advanced_change_db" filter hook',"plus-webp")})]})]})]})]})},g=()=>(0,i.jsxs)("div",{className:"wrap",children:[(0,i.jsx)("h2",{children:"Plus WebP or AVIF"}),(0,i.jsx)(l,{}),(0,i.jsx)("hr",{}),(0,i.jsx)(p,{}),(0,i.jsx)("hr",{}),(0,i.jsx)(h,{})]});t()((()=>{(0,n.createRoot)(document.getElementById("plus-webp-page")).render((0,i.jsx)(g,{}))}))})();