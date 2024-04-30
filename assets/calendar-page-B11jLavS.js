import{r as a,w as Ce,x as O,y as re,z as q,G as Ue,D as fe,H as Ve,J as xe,K as te,L as Z,M as Be,N as Ge,O as Ze,Q as ze,U as We,u as A,W as U,X as b,Y as L,j as t,Z as Se,$ as pe,a0 as f,a1 as Je,a2 as Ke,R as w,a3 as ae,a4 as Y,a5 as se,f as R,a6 as oe,a7 as le,a8 as ve,a as ie,d as E,a9 as y,aa as Q,ab as ce,ac as Qe,ad as X,ae as Xe,af as Ee,ag as qe,ah as et,F as z,ai as ye,aj as tt,ak as Ie,al as nt,g as je,am as at,an as st,ao as rt}from"./index-Fy_PeeUM.js";var ot=10,lt=20;function it(e){var i=e.fullscreen,o=e.validRange,r=e.generateConfig,l=e.locale,s=e.prefixCls,n=e.value,c=e.onChange,h=e.divRef,u=r.getYear(n||r.getNow()),d=u-ot,g=d+lt;o&&(d=r.getYear(o[0]),g=r.getYear(o[1])+1);for(var m=l&&l.year==="年"?"年":"",v=[],j=d;j<g;j++)v.push({label:"".concat(j).concat(m),value:j});return a.createElement(re,{size:i?void 0:"small",options:v,value:u,className:"".concat(s,"-year-select"),onChange:function(D){var p=r.setYear(n,D);if(o){var _=q(o,2),M=_[0],P=_[1],F=r.getYear(p),N=r.getMonth(p);F===r.getYear(P)&&N>r.getMonth(P)&&(p=r.setMonth(p,r.getMonth(P))),F===r.getYear(M)&&N<r.getMonth(M)&&(p=r.setMonth(p,r.getMonth(M)))}c(p)},getPopupContainer:function(){return h.current}})}function ct(e){var i=e.prefixCls,o=e.fullscreen,r=e.validRange,l=e.value,s=e.generateConfig,n=e.locale,c=e.onChange,h=e.divRef,u=s.getMonth(l||s.getNow()),d=0,g=11;if(r){var m=q(r,2),v=m[0],j=m[1],T=s.getYear(l);s.getYear(j)===T&&(g=s.getMonth(j)),s.getYear(v)===T&&(d=s.getMonth(v))}for(var D=n.shortMonths||s.locale.getShortMonths(n.locale),p=[],_=d;_<=g;_+=1)p.push({label:D[_],value:_});return a.createElement(re,{size:o?void 0:"small",className:"".concat(i,"-month-select"),value:u,options:p,onChange:function(P){c(s.setMonth(l,P))},getPopupContainer:function(){return h.current}})}function dt(e){var i=e.prefixCls,o=e.locale,r=e.mode,l=e.fullscreen,s=e.onModeChange;return a.createElement(Ue,{onChange:function(c){var h=c.target.value;s(h)},value:r,size:l?void 0:"small",className:"".concat(i,"-mode-switch")},a.createElement(fe,{value:"month"},o.month),a.createElement(fe,{value:"year"},o.year))}function ut(e){var i=e.prefixCls,o=e.fullscreen,r=e.mode,l=e.onChange,s=e.onModeChange,n=a.useRef(null),c=a.useContext(Ce),h=a.useMemo(function(){return O(O({},c),{isFormItemInput:!1})},[c]),u=O(O({},e),{onChange:l,fullscreen:o,divRef:n});return a.createElement("div",{className:"".concat(i,"-header"),ref:n},a.createElement(Ce.Provider,{value:h},a.createElement(it,O({},u)),r==="month"&&a.createElement(ct,O({},u))),a.createElement(dt,O({},u,{onModeChange:s})))}function mt(e){function i(s,n){return s&&n&&e.getYear(s)===e.getYear(n)}function o(s,n){return i(s,n)&&e.getMonth(s)===e.getMonth(n)}function r(s,n){return o(s,n)&&e.getDate(s)===e.getDate(n)}var l=function(n){var c=n.prefixCls,h=n.className,u=n.style,d=n.dateFullCellRender,g=n.dateCellRender,m=n.monthFullCellRender,v=n.monthCellRender,j=n.headerRender,T=n.value,D=n.defaultValue,p=n.disabledDate,_=n.mode,M=n.validRange,P=n.fullscreen,F=P===void 0?!0:P,N=n.onChange,V=n.onPanelChange,B=n.onSelect,W=a.useContext(Ve),$=W.getPrefixCls,S=W.direction,J=$("picker",c),I="".concat(J,"-calendar"),de=e.getNow(),ke=xe(function(){return T||e.getNow()},{defaultValue:D,value:T}),ue=q(ke,2),H=ue[0],we=ue[1],Ae=xe("month",{value:_}),me=q(Ae,2),G=me[0],Fe=me[1],K=a.useMemo(function(){return G==="year"?"month":"date"},[G]),Ne=a.useCallback(function(x){var C=M?e.isAfter(M[0],x)||e.isAfter(x,M[1]):!1;return C||!!(p!=null&&p(x))},[p,M]),he=function(C,k){V==null||V(C,k)},Le=function(C){we(C),r(C,H)||((K==="date"&&!o(C,H)||K==="month"&&!i(C,H))&&he(C,G),N==null||N(C))},ge=function(C){Fe(C),he(H,C)},ee=function(C){Le(C),B==null||B(C)},He=function(){var C=n.locale,k=O(O({},ze),C);return k.lang=O(O({},k.lang),(C||{}).lang),k},Ye=a.useCallback(function(x){return d?d(x):a.createElement("div",{className:te("".concat(J,"-cell-inner"),"".concat(I,"-date"),Z({},"".concat(I,"-date-today"),r(de,x)))},a.createElement("div",{className:"".concat(I,"-date-value")},Be(String(e.getDate(x)),2,"0")),a.createElement("div",{className:"".concat(I,"-date-content")},g&&g(x)))},[d,g]),$e=a.useCallback(function(x,C){if(m)return m(x);var k=C.shortMonths||e.locale.getShortMonths(C.locale);return a.createElement("div",{className:te("".concat(J,"-cell-inner"),"".concat(I,"-date"),Z({},"".concat(I,"-date-today"),o(de,x)))},a.createElement("div",{className:"".concat(I,"-date-value")},k[e.getMonth(x)]),a.createElement("div",{className:"".concat(I,"-date-content")},v&&v(x)))},[m,v]);return a.createElement(Ge,{componentName:"Calendar",defaultLocale:He},function(x){return a.createElement("div",{className:te(I,Z(Z(Z({},"".concat(I,"-full"),F),"".concat(I,"-mini"),!F),"".concat(I,"-rtl"),S==="rtl"),h),style:u},j?j({value:H,type:G,onChange:ee,onTypeChange:ge}):a.createElement(ut,{prefixCls:I,value:H,generateConfig:e,mode:G,fullscreen:F,locale:x.lang,validRange:M,onChange:ee,onModeChange:ge}),a.createElement(Ze,{value:H,prefixCls:J,locale:x.lang,generateConfig:e,dateRender:Ye,monthCellRender:function(k){return $e(k,x.lang)},onSelect:ee,mode:K,picker:K,disabledDate:Ne,hideHeader:!0}))})};return l}const Te=mt(We),ht=({trainings:e})=>{const i=A(),[o,r]=a.useState(U()),l=c=>{r(c),i(f.setDate({date:b({date:c,format:L.ISO_DATE})})),i(f.setOpenPopoverId({openPopoverId:"create-modal"}))},s=e.filter(c=>b({date:c.date,format:"YYYY-MM-DD"})===b({date:o,format:L.ISO_DATE})),n=c=>{const h=b({date:c,format:L.ISO_DATE});return e.find(({date:d})=>b({date:d,format:L.ISO_DATE})===h)?t.jsx("div",{className:Je.cellTrainingDay}):null};return t.jsxs("div",{children:[t.jsx(Te,{locale:Se,fullscreen:!1,onSelect:l,dateCellRender:n}),pe.createPortal(t.jsx(Pe,{trainings:s,date:o,id:"create-modal",idChooseModal:"choose-modal"}),document.body),pe.createPortal(t.jsx(be,{trainings:s,date:o,prevModalId:"create-modal",idChooseModal:"choose-modal",isMobile:!0}),document.body)]})},gt=e=>a.createElement("svg",{width:32,height:32,viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e},a.createElement("path",{opacity:.8,fillRule:"evenodd",clipRule:"evenodd",d:"M6.42498 5.99513C6.75404 4.30445 7.06027 3.25181 7.34317 2.8368C8.12662 1.68817 9.20984 2.3133 9.44013 2.40284C10.2491 2.71823 9.98608 0.642787 10.6802 0.220923C11.1428 -0.0601851 11.5232 0.283436 11.8217 1.25179C12.086 0.348369 12.4888 -0.0654281 13.03 0.00837784C13.842 0.120095 14.1261 4.57709 15.2419 3.60148C16.3578 2.62547 17.726 2.40243 18.3104 3.85274C18.4367 4.16652 18.4851 3.67972 19.3442 2.01767C20.2033 0.355225 21.06 -0.377188 22.8175 0.590759C23.6165 1.03037 24.2737 2.22215 24.7896 4.16571C24.7896 6.93969 26.0453 8.58197 28.5562 9.09135C32.323 9.85563 29.3992 16.4373 24.7896 18.3647C20.1798 20.2925 9.56669 21.3331 3.80738 16.4627C-0.0321543 13.2164 0.840377 9.72697 6.42473 5.99513H6.42498Z",fill:"url(#paint0_linear_8163_12468)"}),a.createElement("path",{d:"M15.8701 30.5085C19.7058 30.5085 22.8153 29.3388 22.8153 27.8959C22.8153 26.4529 19.7058 25.2832 15.8701 25.2832C12.0343 25.2832 8.9248 26.4529 8.9248 27.8959C8.9248 29.3388 12.0343 30.5085 15.8701 30.5085Z",fill:"url(#paint1_linear_8163_12468)"}),a.createElement("path",{opacity:.675,fillRule:"evenodd",clipRule:"evenodd",d:"M27.5957 31.1555C22.3736 33.2842 4.549 30.8494 2.65182 29.7375C1.72841 29.1958 0.896083 28.1775 0.155076 26.682C0.072141 26.5148 0.020011 26.3128 0.00471015 26.0995C-0.0105907 25.8862 0.0115622 25.6702 0.0686088 25.4764C0.125655 25.2827 0.215267 25.1191 0.32709 25.0047C0.438912 24.8902 0.56838 24.8295 0.700533 24.8296H31.8481C32.4946 27.6278 31.0771 29.7363 27.5957 31.1555Z",fill:"url(#paint2_linear_8163_12468)"}),a.createElement("path",{d:"M21.1998 20.8939L18.8247 16.3801C18.7685 16.2724 18.6987 16.1856 18.62 16.1258C18.5414 16.0659 18.4557 16.0343 18.3688 16.0332H13.2617C13.0865 16.0332 12.92 16.1639 12.8058 16.3801L10.4307 20.8939V23.3719H21.1998V20.8939Z",fill:"url(#paint3_linear_8163_12468)"}),a.createElement("path",{d:"M20.5267 23.4632L18.4478 19.5317C18.3976 19.4389 18.3356 19.3647 18.2662 19.3142C18.1967 19.2638 18.1214 19.2382 18.0453 19.2393H13.5849C13.4318 19.2393 13.2821 19.3425 13.1824 19.5317L11.1035 23.4632V25.6225H20.5267V23.4632Z",fill:"url(#paint4_linear_8163_12468)"}),a.createElement("path",{d:"M21.1998 26.2115C21.1998 26.5556 21.1045 26.8649 20.9542 27.0722L20.9236 27.1125C20.8044 27.2594 20.6588 27.3387 20.5092 27.3384H11.1215C11.0367 27.3384 10.9555 27.3134 10.8806 27.2674L10.8434 27.2432C10.7205 27.1544 10.6162 27.0097 10.543 26.8265C10.4697 26.6433 10.4307 26.4296 10.4307 26.2111V20.9209H13.0435C13.3322 20.9209 13.5647 21.3069 13.5647 21.7751V21.7812C13.5647 22.2498 13.7999 22.6277 14.0885 22.6277H17.5419C17.6807 22.6275 17.8137 22.538 17.9119 22.3787C18.0101 22.2194 18.0654 22.0034 18.0658 21.7779C18.0658 21.3077 18.2986 20.9209 18.5869 20.9209H21.2001L21.1998 26.2115Z",fill:"url(#paint5_linear_8163_12468)"}),a.createElement("defs",null,a.createElement("linearGradient",{id:"paint0_linear_8163_12468",x1:16.5476,y1:14.9024,x2:16.5476,y2:-3.52231,gradientUnits:"userSpaceOnUse"},a.createElement("stop",{stopColor:"#DEDEDE",stopOpacity:0}),a.createElement("stop",{offset:1,stopColor:"#A9A9A9",stopOpacity:.3})),a.createElement("linearGradient",{id:"paint1_linear_8163_12468",x1:15.1464,y1:30.5085,x2:15.1464,y2:25.2832,gradientUnits:"userSpaceOnUse"},a.createElement("stop",{stopColor:"white",stopOpacity:0}),a.createElement("stop",{offset:1,stopColor:"#96A1C5",stopOpacity:.373})),a.createElement("linearGradient",{id:"paint2_linear_8163_12468",x1:16,y1:31.9998,x2:16,y2:23.4188,gradientUnits:"userSpaceOnUse"},a.createElement("stop",{stopColor:"white",stopOpacity:0}),a.createElement("stop",{offset:1,stopColor:"#919191",stopOpacity:.15})),a.createElement("linearGradient",{id:"paint3_linear_8163_12468",x1:15.8152,y1:16.0332,x2:15.8152,y2:19.3319,gradientUnits:"userSpaceOnUse"},a.createElement("stop",{stopColor:"#5389F5"}),a.createElement("stop",{offset:1,stopColor:"#416FDC"})),a.createElement("linearGradient",{id:"paint4_linear_8163_12468",x1:17.0726,y1:25.6225,x2:17.0726,y2:18.8999,gradientUnits:"userSpaceOnUse"},a.createElement("stop",{stopColor:"#DCE9FF"}),a.createElement("stop",{offset:1,stopColor:"#B6CFFF"})),a.createElement("linearGradient",{id:"paint5_linear_8163_12468",x1:15.8154,y1:20.9209,x2:15.8154,y2:27.3384,gradientUnits:"userSpaceOnUse"},a.createElement("stop",{stopColor:"#7CA5F7"}),a.createElement("stop",{offset:1,stopColor:"#C4D6FC"})))),_e=()=>t.jsx(Ke,{description:null,image:t.jsx(gt,{width:32,height:32})}),Oe=e=>{const{isEditable:i=!1,trainings:o,idChooseModal:r}=e,l=A(),s=a.useId(),n=h=>{const{name:u,exercises:d,_id:g}=h;l(f.setExercises({trainingType:u,exercises:d})),l(f.setSelectedTraining({training:u})),l(f.setTrainingId({trainingId:g})),l(f.setOpenPopoverId({openPopoverId:r}))},c=(h,u)=>u==null?void 0:u.map((d,g)=>h?t.jsxs(w,{justify:"space-between",onClick:()=>n(d),children:[t.jsx(ae,{text:t.jsx(Y.Text,{disabled:d.isImplementation,children:d.name}),color:se[d.name]}),t.jsx(R,{"data-test-id":`modal-update-training-edit-button${g}`,disabled:d.isImplementation,icon:t.jsx(oe,{style:d.isImplementation?void 0:{color:"var(--primary-light-6)"}})})]},`editable-${s}`):t.jsx(w,{children:t.jsx(ae,{text:t.jsx(Y.Text,{disabled:d.isImplementation,children:d.name}),color:se[d.name]})},`non-editable-${s}`));return o.length===0?t.jsx(_e,{}):c(i,o)},Ct=({date:e,allTrainings:i})=>{const o=A(),r=b({date:e,format:L.ISO_DATE}),l=`create-modal-${r}`,s=`choose-modal-${r}`,n=()=>{o(f.setDate({date:r})),o(f.setOpenPopoverId({openPopoverId:l})),o(f.setIsDrawerAddExercisesOpen({isOpen:!1}))},c=i.filter(h=>b({date:h.date,format:L.ISO_DATE})===r);return t.jsxs(le,{onClick:n,className:ve.cellCalendar,children:[t.jsx(w,{justify:"end",children:b({date:e,format:"DD"})}),t.jsxs("div",{className:ve.cellContent,children:[c.length!==0&&t.jsx(Oe,{idChooseModal:s,trainings:c}),t.jsx(Pe,{trainings:c,date:e,idChooseModal:s,id:l}),t.jsx(be,{trainings:c,date:e,idChooseModal:s,prevModalId:l})]})]})},ne="0",Me="50%",ft=0,De=e=>{const{xs:i}=ie(),o=e.day()===ft;let r=ne,l,s,n;return i?(r=Me,l=Me,n="translate(-50%, -50%)"):o?s=ne:l=ne,{top:r,left:l,right:s,transform:n}},Pe=e=>{const{date:i,idChooseModal:o,id:r,trainings:l}=e,s=A(),n=E(y.openPopoverId),c=E(y.trainingsList),{top:h,transform:u,left:d,right:g}=De(i),m=n===r,v=i.isSame(U(),"day")||i.isBefore(U(),"day"),j=()=>{s(f.setOpenPopoverId({openPopoverId:o})),s(f.setSelectedTraining({training:""}))},T=()=>{s(f.setOpenPopoverId({openPopoverId:""}))},D=l.length===c.length;return t.jsx(Re,{top:h,left:d,right:g,transform:u,width:312,isOpen:m,children:t.jsxs(le,{dataTestId:"modal-create-exercise",onClick:p=>p.stopPropagation(),children:[t.jsxs(w,{"data-test-id":"modal-create-training",justify:"space-between",align:"top",onClick:p=>p.stopPropagation(),style:{marginBottom:"var(--gap-xl)"},children:[t.jsxs(Q,{children:[t.jsx(Q,{children:t.jsx(Y.Text,{strong:!0,children:`Тренировка на: ${b({date:i,format:L.ISO_DATE})}`})}),t.jsx(Q,{children:l.length===0&&t.jsx(Y.Text,{type:"secondary",children:"Нет активных тренировок"})})]}),t.jsx(Q,{children:t.jsx(R,{icon:t.jsx(ce,{}),onClick:T,"data-test-id":"modal-create-training-button-close"})})]}),t.jsx(Oe,{idChooseModal:o,isEditable:!0,trainings:l}),t.jsx(R,{style:{marginTop:"var(--gap-l)"},type:"primary",block:!0,disabled:v||D,onClick:j,children:v||l.length===0||D||l.length===4?"Создать тренировку":"Добавить тренировку"})]})})},xt=({exercises:e})=>{const i=A(),o=a.useId(),r=E(y.selectedTraining),l=()=>{e.length>0&&i(f.setExercises({trainingType:r,exercises:e})),i(f.setIsDrawerAddExercisesOpen({isOpen:!0})),i(f.setIsEditedExercises({isEdited:!0}))};return e.length>0?e.map((s,n)=>t.jsxs(w,{justify:"space-between",children:[t.jsx(Y.Text,{type:"secondary",children:s.name}),t.jsx(R,{"data-test-id":`modal-update-training-edit-button${n}`,onClick:l,icon:t.jsx(oe,{style:{color:"var(--primary-light-6)"}})})]},`exercises-${o}`)):t.jsx(_e,{})},be=e=>{const{date:i,idChooseModal:o,prevModalId:r,trainings:l,isMobile:s=!1}=e,n=A(),{top:c,transform:h,left:u,right:d}=De(i),g=E(y.trainingsList),m=E(y.selectedTraining),v=E(y.exercises),j=E(y.openPopoverId),T=E(y.isLoadingSave),D=E(y.isEditedExercise),p=E(y.trainingId),_=j===o,M=i.isSame(U(),"day")||i.isBefore(U(),"day"),P=m.length>0?m:"Выбор типа тренировки",F=Qe(g,l),N=S=>{n(f.setSelectedTraining({training:S}))},V=()=>{n(f.setOpenPopoverId({openPopoverId:r}))},B=()=>{n(f.setIsDrawerAddExercisesOpen({isOpen:!0}))},W=()=>{const S={name:m,date:i.toISOString(),isImplementation:M,exercises:v[m]};n(D?qe({trainingId:p,payload:S,isMobile:s}):et(S)),n(f.clearExercises())},$=v[m]?v[m].filter(S=>(S==null?void 0:S.name)&&S.name.length>0):[];return t.jsx(Re,{top:c,left:u,right:d,transform:h,width:264,isOpen:_,children:t.jsxs(le,{"data-test-id":X.modalCreateExercise,onClick:S=>S.stopPropagation(),children:[t.jsxs(w,{children:[t.jsx(R,{"data-test-id":X.modalExerciseTrainingButtonClose,icon:t.jsx(Xe,{}),onClick:V}),t.jsx(re,{defaultValue:P,dropdownMatchSelectWidth:!1,bordered:!1,style:{width:"85%",textAlign:"start"},onChange:N,options:F,"data-test-id":X.modalCreateExerciseSelect})]}),t.jsx("div",{className:Ee.exercisesListContainer,children:t.jsx(xt,{exercises:$})}),t.jsxs(w,{justify:"center",gutter:[0,8],children:[t.jsx(R,{type:"text",className:Ee.addExercisesButton,onClick:B,disabled:!m,children:"Добавить упражнения"}),t.jsx(R,{type:"link",disabled:($==null?void 0:$.length)===0,onClick:W,loading:T,children:M?"Сохранить изменения":"Сохранить"})]})]})})},Re=e=>{const{isOpen:i,top:o,left:r,right:l,bottom:s,width:n,height:c,transform:h,children:u}=e;if(!i)return null;const d={position:"absolute",content:"",top:o&&o,left:r&&r,right:l&&l,bottom:s&&s,width:n&&`${n}px`,height:c&&`${c}px`,background:"#fff",border:"1px solid #ccc",padding:"16px 12px",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.2)",transform:h&&h,zIndex:10};return t.jsx("div",{style:d,children:u})},pt=()=>{const e=A(),[i]=z.useForm(),[o,r]=a.useState([]),l=E(y.selectedTraining),s=E(y.exercises),n=E(y.isDrawerAddExercisesOpen);a.useEffect(()=>{i.resetFields()},[n]);const c=s&&Object.keys(s)[0]==="empty"?[ye]:s[l],h=(u,d)=>{const g=d.items.flatMap((v,j)=>v.checked?j:[]);r(g);const m=d.items.map(({checked:v,...j})=>j);e(f.setExercises({trainingType:l,exercises:m}))};return t.jsx(z,{form:i,onValuesChange:h,initialValues:{items:c==null?void 0:c.map(u=>({...u,checked:!1}))},children:t.jsx(z.List,{name:"items",children:(u,{add:d,remove:g})=>t.jsxs(a.Fragment,{children:[u==null?void 0:u.map(m=>t.jsx(tt,{field:m},`AddExercisesFormList${m.key}`)),t.jsxs(w,{justify:"center",style:{marginTop:"var(--gap-xl)"},children:[t.jsx(z.Item,{children:t.jsx(R,{onClick:()=>d(ye),icon:t.jsx(Ie,{}),type:"link",children:"Добавить ещё"})}),t.jsx(z.Item,{children:t.jsx(R,{onClick:()=>g(o),icon:t.jsx(ce,{}),disabled:(o==null?void 0:o.length)===0,type:"text",children:"Удалить"})})]})]})})})},vt=()=>{const e=A(),{xs:i}=ie(),o=E(y.selectedTraining),r=E(y.isDrawerAddExercisesOpen),l=E(y.isEditedExercise),s=E(y.date),n=b({date:s,format:L.EURO_DATE}),c=()=>{e(f.setIsDrawerAddExercisesOpen({isOpen:!1}))};return t.jsxs(nt,{mask:!1,width:i?"100%":408,title:l?"Редактирование":"Добавление упражнений",placement:"right",destroyOnClose:!0,closeIcon:l?t.jsx(oe,{}):t.jsx(Ie,{}),open:r,extra:t.jsx(R,{onClick:c,"data-test-id":X.modalDrawerRightButtonClose,icon:t.jsx(ce,{})}),"data-test-id":"modal-drawer-right",children:[t.jsxs(w,{justify:"space-between",children:[t.jsx(ae,{text:t.jsx(Y.Text,{type:"secondary",children:o}),color:se[o]}),t.jsx(Y.Text,{type:"secondary",children:n})]}),t.jsx("div",{style:{marginTop:"var(--gap-xl)"},children:t.jsx(pt,{})})]})};const yt=()=>{const e=A(),{xs:i}=ie(),o=E(y.trainings),r=E(y.isErrorOpened),l=E(y.isErrorSave);a.useEffect(()=>{e(je()),e(at({goToPath:null}))},[e]);const s=()=>{e(f.setIsErrorSaveTraining({isError:!1})),e(f.setIsErrorOpened({isError:!1}))},n=()=>{e(je())},[c,h]=a.useState(U().month()),u=m=>!(m.month()===c),d=m=>{h(m.month())},g=m=>t.jsx(Ct,{date:m,allTrainings:o});return t.jsxs(st,{isWithHeader:!1,isWithFooter:!1,children:[i?t.jsx(ht,{trainings:o}):t.jsx(Te,{locale:Se,disabledDate:u,onPanelChange:d,onSelect:d,dateFullCellRender:g}),t.jsx(vt,{}),t.jsx(rt,{clearError:s,isErrorSaving:l,isErrorOpened:r,onRetry:n})]})};export{yt as default};