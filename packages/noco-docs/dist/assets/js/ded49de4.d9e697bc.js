"use strict";(self.webpackChunknoco_docs=self.webpackChunknoco_docs||[]).push([[9868],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>c});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function d(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var o=r.createContext({}),p=function(e){var t=r.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},m=function(e){var t=p(e.components);return r.createElement(o.Provider,{value:t},e.children)},s="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,l=e.originalType,o=e.parentName,m=d(e,["components","mdxType","originalType","parentName"]),s=p(a),f=n,c=s["".concat(o,".").concat(f)]||s[f]||u[f]||l;return a?r.createElement(c,i(i({ref:t},m),{},{components:a})):r.createElement(c,i({ref:t},m))}));function c(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=a.length,i=new Array(l);i[0]=f;var d={};for(var o in t)hasOwnProperty.call(t,o)&&(d[o]=t[o]);d.originalType=e,d[s]="string"==typeof e?e:n,i[1]=d;for(var p=2;p<l;p++)i[p]=a[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}f.displayName="MDXCreateElement"},34654:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>d,toc:()=>p});var r=a(87462),n=(a(67294),a(3905));const l={title:"Date Time",description:"This article explains how to create & work with a Date Time field.",tags:["Fields","Field types","Date & Time"],keywords:["Fields","Field types","Date & Time","Create date time field"]},i=void 0,d={unversionedId:"fields/field-types/date-time-based/date-time",id:"fields/field-types/date-time-based/date-time",title:"Date Time",description:"This article explains how to create & work with a Date Time field.",source:"@site/docs/070.fields/040.field-types/070.date-time-based/010.date-time.md",sourceDirName:"070.fields/040.field-types/070.date-time-based",slug:"/fields/field-types/date-time-based/date-time",permalink:"/fields/field-types/date-time-based/date-time",draft:!1,editUrl:"https://github.com/nocodb/nocodb/tree/develop/packages/noco-docs/docs/docs/070.fields/040.field-types/070.date-time-based/010.date-time.md",tags:[{label:"Fields",permalink:"/tags/fields"},{label:"Field types",permalink:"/tags/field-types"},{label:"Date & Time",permalink:"/tags/date-time"}],version:"current",sidebarPosition:10,frontMatter:{title:"Date Time",description:"This article explains how to create & work with a Date Time field.",tags:["Fields","Field types","Date & Time"],keywords:["Fields","Field types","Date & Time","Create date time field"]},sidebar:"tutorialSidebar",previous:{title:"Conditional expressions",permalink:"/fields/field-types/formula/conditional-expressions"},next:{title:"Date",permalink:"/fields/field-types/date-time-based/date"}},o={},p=[{value:"Create a date time field",id:"create-a-date-time-field",level:2},{value:"Supported date formats",id:"supported-date-formats",level:3},{value:"Supported time formats",id:"supported-time-formats",level:3},{value:"Related fields",id:"related-fields",level:2}],m={toc:p},s="wrapper";function u(e){let{components:t,...l}=e;return(0,n.kt)(s,(0,r.Z)({},m,l,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"Date Time")," field type is used to store both date and time values in a single field."),(0,n.kt)("h2",{id:"create-a-date-time-field"},"Create a date time field"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"Click on ",(0,n.kt)("inlineCode",{parentName:"li"},"+")," icon to the right of ",(0,n.kt)("inlineCode",{parentName:"li"},"Fields header")),(0,n.kt)("li",{parentName:"ol"},"On the dropdown modal, enter the field name (Optional)."),(0,n.kt)("li",{parentName:"ol"},"Select the field type as ",(0,n.kt)("inlineCode",{parentName:"li"},"DateTime")," from the dropdown."),(0,n.kt)("li",{parentName:"ol"},"Configure ",(0,n.kt)("inlineCode",{parentName:"li"},"Date Format")),(0,n.kt)("li",{parentName:"ol"},"Configure ",(0,n.kt)("inlineCode",{parentName:"li"},"Time Format")),(0,n.kt)("li",{parentName:"ol"},"Configure default value (Optional)"),(0,n.kt)("li",{parentName:"ol"},"Click on ",(0,n.kt)("inlineCode",{parentName:"li"},"Save Field")," button.")),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"image",src:a(60658).Z,width:"2876",height:"1494"})),(0,n.kt)("h3",{id:"supported-date-formats"},"Supported date formats"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Format"),(0,n.kt)("th",{parentName:"tr",align:null},"Example"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"YYYY-MM-DD"),(0,n.kt)("td",{parentName:"tr",align:null},"2023-09-22")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"YYYY/MM/DD"),(0,n.kt)("td",{parentName:"tr",align:null},"2023/09/22")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"DD-MM-YYYY"),(0,n.kt)("td",{parentName:"tr",align:null},"22-09-2023")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"MM-DD-YYYY"),(0,n.kt)("td",{parentName:"tr",align:null},"09-22-2023")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"DD/MM/YYYY"),(0,n.kt)("td",{parentName:"tr",align:null},"22/09/2023")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"MM/DD/YYYY"),(0,n.kt)("td",{parentName:"tr",align:null},"09/22/2023")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"DD MM YYYY"),(0,n.kt)("td",{parentName:"tr",align:null},"22 09 2023")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"MM DD YYYY"),(0,n.kt)("td",{parentName:"tr",align:null},"09 22 2023")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"YYYY MM DD"),(0,n.kt)("td",{parentName:"tr",align:null},"2023 09 22")))),(0,n.kt)("h3",{id:"supported-time-formats"},"Supported time formats"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Format"),(0,n.kt)("th",{parentName:"tr",align:null},"Example"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"HH:mm:ss"),(0,n.kt)("td",{parentName:"tr",align:null},"12:45:30")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"HH:mm"),(0,n.kt)("td",{parentName:"tr",align:null},"14:20")))),(0,n.kt)("h2",{id:"related-fields"},"Related fields"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/fields/field-types/date-time-based/date"},"Date")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/fields/field-types/date-time-based/time"},"Time")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/fields/field-types/date-time-based/duration"},"Duration"))))}u.isMDXComponent=!0},60658:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/datetime-b83c4ad4a6b314544003b8b721c323a2.png"}}]);