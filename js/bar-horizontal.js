function barHorizontal(){const t={top:24,right:24,bottom:24,left:64};let a=0,n=0;const o=d3.select(".chart-lluvia-bar-horizontal"),e=o.select("svg"),c={};let r;function i(r){const i=o.node().offsetWidth;h=20*r.length,console.log(h),a=i-t.left-t.right,n=h-t.top-t.bottom,e.attr("width",i).attr("height",h);const s="translate("+t.left+","+t.top+")",l=e.select(".chart-lluvia-bar-horizontal-container");l.attr("transform",s),function(t,a){c.count.x.range([0,t]),c.count.y.range([a,0])}(a,n);const d=o.select(".area-container-chart-horizontal").selectAll(".bar-horizontal").data(r),u=d.enter().append("rect").attr("class","bar-horizontal");d.merge(u).attr("x",0).attr("y",t=>c.count.y(t.fecha)).attr("height",n/r.length-2).attr("width",t=>c.count.x(t.dias)),function(t){const a=d3.axisBottom(c.count.x).tickFormat(d3.format("d")).tickSize(-n);t.select(".axis-x").attr("transform","translate(0,"+n+")").call(a);const o=d3.axisLeft(c.count.y).ticks(1).tickFormat(d3.format("d"));t.select(".axis-y").call(o)}(l)}window.addEventListener("resize",function(){i(r)}),d3.csv("csv/dias-de-lluvia.csv",function(t,a){t?console.log(t):((r=a).forEach(t=>{t.fecha=t.fecha,t.dias_lluvia=t.dias}),r.sort(function(t,a){return t.dias_lluvia-a.dias_lluvia}),function(){const t=e.select(".chart-lluvia-bar-horizontal-container");t.append("g").attr("class","axis axis-x"),t.append("g").attr("class","axis axis-y"),t.append("g").attr("class","area-container-chart-horizontal")}(),function(){const t=d3.scaleLinear().domain([0,d3.max(r,t=>t.dias)]),a=d3.scaleBand().domain(r.map(t=>t.fecha)).paddingInner(.1).paddingOuter(.5);c.count={x:t,y:a}}(),i(r))})}barHorizontal();