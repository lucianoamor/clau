const barVerticalTooltip=()=>{const t=24,a=24,e=24,c=24;let l=0,i=0;const s=d3.select(".chart-lluvia-bar-vertical-tooltip"),o=s.select("svg"),n={};let r;const d=s.append("div").attr("class","tooltip-container").style("opacity",1),p=r=>{const p=s.node().offsetWidth;l=p-c-a,i=600-t-e,o.attr("width",p).attr("height",600);const u="translate("+c+","+t+")",v=o.select(".chart-lluvia-bar-vertical-tooltip-container");v.attr("transform",u),((t,a)=>{n.count.x.range([0,t]),n.count.y.range([a,0])})(l,i);const m=s.select(".area-container-chart-vertical-tooltip").selectAll(".bar-vertical").data(r),h=m.enter().append("rect").attr("class","bar-vertical bar-bgc4");m.merge(h).on("mouseover",t=>{d.transition().duration(300).style("opacity",1),d.html('<div class="tooltip-lluvia-mes-container"><p class="tooltip-lluvia-mes">Lluvia acumulada en '+t.dias+'<span class="tooltip-lluvia-mes-total">: '+t.fecha+'mm</span><p/><p class="tooltip-lluvia-mes">Lluvia acumulada en '+t.precipitacion_anual+'<span class="tooltip-lluvia-mes-total">: '+t.fecha+"mm</span><p/></div>")}).on("mouseout",t=>{d.style("opacity",0)}).attr("width",l/r.length-1).attr("x",t=>n.count.x(t.fecha)).attr("y",t=>n.count.y(t.dias)).attr("height",t=>i-n.count.y(t.dias)),(t=>{const a=d3.axisBottom(n.count.x).tickFormat(d3.format("d"));t.select(".axis-x").attr("transform","translate(0,"+i+")").call(a);const e=d3.axisLeft(n.count.y).tickFormat(d3.format("d")).ticks(5).tickSize(-l);t.select(".axis-y").call(e)})(v)};window.addEventListener("resize",()=>{p(r)}),d3.csv("csv/dias-de-lluvia.csv",(t,a)=>{t?console.log(t):((r=a).forEach(t=>{t.fecha=t.fecha,t.dias_lluvia=t.dias}),(()=>{const t=o.select(".chart-lluvia-bar-vertical-tooltip-container");t.append("g").attr("class","axis axis-x"),t.append("g").attr("class","axis axis-y"),t.append("g").attr("class","area-container-chart-vertical-tooltip")})(),(()=>{const t=d3.scaleLinear().domain([d3.min(r,t=>t.fecha),d3.max(r,t=>t.fecha)]),a=d3.scaleLinear().domain([0,60]);n.count={x:t,y:a}})(),p(r))})};barVerticalTooltip();