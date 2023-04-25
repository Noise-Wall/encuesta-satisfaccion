import{o as s,c,a as t,F as d,e as v,t as l,l as b,n as S,h as k,u as x,r as p,d as w,m as y,q as j,j as i,g as _,k as O,w as q,f as A}from"./index-2e079f12.js";import{g as E}from"./get-f30a68b2.js";import{i as V}from"./insert-9269597b.js";import{u as I}from"./update-93894906.js";import{l as N}from"./login-065b59a0.js";import{_ as P}from"./_plugin-vue_export-helper-c27b6911.js";import"./token-3b81b8e9.js";const R=["for"],F=["name","value"],T=["for"],B=["name","value"],W=["for"],z={name:"idCategoria"},H=["value","selected"],L=["for"],G=["checked"],M=["checked"],J={__name:"formPregunta",props:{currentState:Array,catData:Object},setup(e){return(a,u)=>(s(),c(d,null,[t("label",{for:e.currentState[0][0],class:"form-item"},"ID Pregunta",8,R),t("input",{type:"text",class:"form-item",name:e.currentState[0][0],value:e.currentState[0][1]},null,8,F),t("label",{for:e.currentState[1][0],class:"form-item"},"Contenido de la pregunta",8,T),t("input",{type:"text",class:"form-item",name:e.currentState[1][0],value:e.currentState[1][1],required:""},null,8,B),t("label",{for:e.currentState[2][0],class:"form-item"},"Categoría",8,W),t("select",z,[(s(!0),c(d,null,v(e.catData,r=>(s(),c("option",{value:r.idCategoria,selected:r.idCategoria===e.currentState[2][1]},l(r.contenidoCategoria),9,H))),256))]),t("label",{for:e.currentState[3][0],class:"form-item"},"Habilitar pregunta:",8,L),t("span",null,[t("input",{type:"radio",name:"deshabilitada",value:"0",checked:e.currentState[3][1]===0||e.currentState[3][1]==="",required:""},null,8,G),b(" Deshabilitada ")]),t("span",null,[t("input",{type:"radio",name:"deshabilitada",value:"1",checked:e.currentState[3][1]===1,required:""},null,8,M),b(" Habilitada ")])],64))}},K=["for"],Q=["name","value"],U=["for"],X=["name","value"],Y=["for"],Z=["name"],ee=["for"],te={name:"idEmpresa"},ae=["value","selected"],re={__name:"formEncuesta",props:{currentState:Array,empData:Array},setup(e){return(a,u)=>(s(),c(d,null,[t("label",{for:e.currentState[0][0],class:"form-item"},"ID Encuesta",8,K),t("input",{type:"text",class:"form-item",name:e.currentState[0][0],value:e.currentState[0][1]},null,8,Q),t("label",{for:e.currentState[1][0],class:"form-item"},"Fecha",8,U),t("input",{type:"date",class:"form-item",name:e.currentState[1][0],value:e.currentState[1][1],required:""},null,8,X),t("label",{for:e.currentState[2][0],class:"form-item"},"Comentarios",8,Y),t("textarea",{name:e.currentState[2][0],cols:"30",rows:"10"},l(e.currentState[2][1]),9,Z),t("label",{for:e.currentState[3][0],class:"form-item"},"Empresa",8,ee),t("select",te,[(s(!0),c(d,null,v(e.empData,r=>(s(),c("option",{value:r.idEmpresa,selected:r.idEmpresa===e.currentState[3][1]},l(r.nombreEmpresa),9,ae))),256))])],64))}},se=["for"],ne=["name","value","required","placeholder"],oe={__name:"form",props:{currentState:Array,titulos:Array},setup(e){return(a,u)=>(s(!0),c(d,null,v(e.currentState,(r,m)=>(s(),c(d,null,[t("label",{for:r[0],class:S("form-item")},l(e.titulos[m]),9,se),t("input",{type:"text",name:r[0],value:r[1],class:S("form-item"),required:!r[0].startsWith("id"),placeholder:r[0].startsWith("id")?"":"Campo obligatorio"},null,8,ne)],64))),256))}};const ce={key:0},ie={class:"form",id:"form"},le={__name:"EditView",setup(e){const a=k(),u=x(),r=p("false");w(()=>{a.fullPath.startsWith(N.validateRoute(a))?r.value=!0:u.push("/login")});const m=p("");let f;Object.entries(history.state).length<7?(m.value="Agregar",f=y(()=>{switch(a.params.categoria){case"empresa":return[["idEmpresa",""],["nombreEmpresa",""],["nombreContacto",""],["correo",""]];case"categoria":return[["idCategoria",""],["contenidoCategoria",""]];case"pregunta":return[["idPregunta",""],["contenidoPregunta",""],["idCategoria",""],["deshabilitada",""]];case"encuesta":return[["idEncuesta",""],["fecha",""],["comentarios",""],["idEmpresa",""]];case"respuesta":return[["idRespuesta",""],["valor",""]]}})):(m.value="Editar",f=Object.entries(history.state).splice(6,Object.entries(history.state).length));const g=p({});async function C(){a.params.categoria==="pregunta"?g.value=await E.getTabla("/categorias").catch(o=>o.message):a.params.categoria==="encuesta"&&(g.value=await E.getTabla("/empresas").catch(o=>o.message)),console.log(g.value)}C();async function D(){let o=Object.fromEntries(new FormData(document.querySelector("#form")).entries());if(Object.values(o)[0]==""&&(o=Object.fromEntries(Object.entries(o).filter((h,n)=>n!==0))),m.value==="Editar"){const h=`/${a.params.categoria}s/update/${a.params.id}`;await I.updateTabla(h,o).then(n=>{console.log(n),console.log("actualizado"),u.push("/admin")}).catch(n=>{console.log(n.message)})}else{const h=`/${a.params.categoria}s`;await V.insertTabla(h,o).then(n=>{console.log(n),console.log("insertado"),u.push("/admin")}).catch(n=>{console.log(n.message)})}}const $=y(()=>{switch(a.params.categoria){case"empresa":return["ID Empresa","Nombre de la empresa","Nombre contacto","Correo electrónico"];case"categoria":return["ID Categoría","Contenido de la categoría"];case"encuesta":return["ID Encuesta","Fecha de la encuesta","Comentarios","Empresa"];case"respuesta":return["ID Respuesta","Valor","idPregunta","idEncuesta"]}});return(o,h)=>{const n=j("router-link");return r.value?(s(),c("section",ce,[t("p",null,l(m.value)+" "+l(i(a).params.categoria),1),t("form",ie,[i(a).params.categoria==="pregunta"?(s(),_(J,{key:0,currentState:i(f),catData:Object.values(g.value)[0]},null,8,["currentState","catData"])):i(a).params.categoria==="encuesta"?(s(),_(re,{key:1,currentState:i(f),empData:Object.values(g.value)[0]},null,8,["currentState","empData"])):(s(),_(oe,{key:2,currentState:i(f),titulos:i($)},null,8,["currentState","titulos"]))]),t("button",{class:"boton",onClick:D}," Agregar "+l(i(a).params.categoria),1),t("p",null,[O(n,{to:"/admin"},{default:q(()=>[b("Regresar")]),_:1})])])):A("",!0)}}},_e=P(le,[["__scopeId","data-v-0ee16d97"]]);export{_e as default};
