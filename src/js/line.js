const line = () => {
    //Estructura similar a la que utilizan en algunos proyectos de pudding.cool
    const margin = { top: 24, right: 24, bottom: 24, left: 24 };
    let width = 0;
    let height = 0;
    const chart = d3.select('.line-lluvia');
    const svg = chart.select('svg');
    const scales = {};
    let dataz;

    //Escala para los ejes X e Y
    const setupScales = () => {

        const countX = d3.scaleTime()
            .domain([1951, 2017]);

        const countY = d3.scaleLinear()
            .domain([0, 60]);

        scales.count = { x: countX,  y: countY };

    }

    //Seleccionamos el contenedor donde irán las escalas y en este caso el area donde se pirntara nuestra gráfica
    const setupElements = () => {

        const g = svg.select('.line-lluvia-container');

        g.append('g').attr('class', 'axis axis-x');

        g.append('g').attr('class', 'axis axis-y');

        g.append('g').attr('class', 'line-lluvia-container-dos');

    }

    //Actualizando escalas
    const updateScales = (width, height) => {
        scales.count.x.range([0, width]);
        scales.count.y.range([height, 0]);
    }

    //Dibujando ejes
    const drawAxes = (g) => {

        const axisX = d3.axisBottom(scales.count.x)
            .tickFormat(d3.format("d"))
            .ticks(13)

        g.select(".axis-x")
            .attr("transform", "translate(0," + height + ")")
            .call(axisX)

        const axisY = d3.axisLeft(scales.count.y)
            .tickFormat(d3.format("d"))
            .ticks(5)
            .tickSizeInner(-width)

        g.select(".axis-y")
            .call(axisY)
    }

    const updateChart = (dataz) => {
        const w = chart.node().offsetWidth;
        const h = 600;

        width = w - margin.left - margin.right;
        height = h - margin.top - margin.bottom;

        svg
            .attr('width', w)
            .attr('height', h);

        const translate = "translate(" + margin.left + "," + margin.top + ")";

        const g = svg.select('.line-lluvia-container')

        g.attr("transform", translate)

        const line = d3.line()
            .x(d => scales.count.x(d.fecha))
            .y(d => scales.count.y(d.dias));

        updateScales(width, height)

        const container = chart.select('.line-lluvia-container-dos')

        const layer = container.selectAll('.line')
               .data([dataz])

        const newLayer = layer.enter()
                .append('path')
                .attr('class', 'line')
                .attr('stroke-width', '1.5')

        const dots = container.selectAll('.circles')
            .data(dataz)

        const dotsLayer = dots.enter()
            .append("circle")
            .attr("class", "circles")
            .attr("fill", "#921d5d")

        layer.merge(newLayer)
            .attr('d', line)

        dots.merge(dotsLayer)
            .attr("cx", d => scales.count.x(d.fecha))
            .attr("cy", d => scales.count.y(d.dias_lluvia))
            .attr('r', 3)

        drawAxes(g)

    }

    const resize = () => {
        updateChart(dataz)
    }

    // LOAD THE DATA
    const loadData = () => {

        d3.csv('csv/dias-de-lluvia.csv', (error, data) => {
                if (error) {
                      console.log(error);
                } else {
                      dataz = data
                      dataz.forEach(d => {
                          d.fecha = d.fecha;
                          d.dias_lluvia = d.dias;
                      });
                      setupElements()
                      setupScales()
                      updateChart(dataz)
                }

        });
    }

    window.addEventListener('resize', resize)

    loadData()

}

line();
