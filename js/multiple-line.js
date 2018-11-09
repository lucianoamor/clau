const multipleLine=()=>{const t=24,e=24,a=24,s=24;let n=0,l=0;const c=d3.select(".multiline-lluvia"),i=c.select("svg"),o={};const d=d=>{const r=c.node().offsetWidth;n=r-s-e,l=600-t-a,i.attr("width",r).attr("height",600);const u="translate("+s+","+t+")",m=i.select(".multiline-lluvia-container");m.attr("transform",u),((t,e)=>{o.count.x.range([0,t]),o.count.y.range([e,0])})(n,l);const x=d3.nest().key(t=>t.puesto).entries(d),v=c.select(".multiline-lluvia-container-dos"),p=d3.scaleOrdinal(["#b114c0","#9C1B12","#759CA7","#CEBAC6","#2D3065"]),f=d3.line().x(t=>o.count.x(t.fecha)).y(t=>o.count.y(t.cantidad));lines=v.selectAll(".line").remove().exit().data(x),x.forEach(t=>{v.append("path").attr("class","line "+t.key).style("stroke",()=>t.color=p(t.key)).attr("d",f(t.values))}),(t=>{const e=d3.axisBottom(o.count.x).tickFormat(d3.format("d"));t.select(".axis-x").attr("transform","translate(0,"+l+")").call(e);const a=d3.axisLeft(o.count.y).tickFormat(d3.format("d")).ticks(5).tickSizeInner(-n);t.select(".axis-y").call(a)})(m)};window.addEventListener("resize",()=>{d3.csv("csv/data-line-puestos.csv",(t,e)=>{t?console.log(t):d(e)})}),d3.csv("csv/data-line-puestos.csv",(t,e)=>{t?console.log(t):(e.forEach(t=>{t.fecha=t.fecha,t.cantidad=+t.cantidad}),(()=>{const t=i.select(".multiline-lluvia-container");t.append("g").attr("class","axis axis-x"),t.append("g").attr("class","axis axis-y"),t.append("g").attr("class","multiline-lluvia-container-dos")})(),(()=>{const t=d3.scaleTime().domain([2008,2017]),e=d3.scaleLinear().domain([0,650]);o.count={x:t,y:e}})(),d(e))})};multipleLine();