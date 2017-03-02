var w = 200;
var h = 200;
var r = h/2;
var color = d3.scale.ordinal()
                .range(["#FF66CC", "#66CCFF", "#CCFF66"]);

var data,
    totalWomen,
    totalMen,
    totalNonBinary,
    totalEmployees,
    totalWomenInLeadership,
    totalMenInLeadership,
    totalNonBinaryInLeadership,
    totalInLeadership,
    femaleDevelopers,
    maleDevelopers,
    nonBinaryDevelopers,
    totalDevelopers,
    femaleQA,
    maleQA,
    totalQA,
    nonBinaryQA;

var totals,
    leadershipTotals,
    developerTotals,
    qaTotals;

var graphPieChart = function(selector, dataValues) {

    var vis = d3.select(selector).append("svg:svg").data([dataValues]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
    var pie = d3.layout.pie().value(function(d){return d.value;});

    // declare an arc generator function
    var arc = d3.svg.arc().outerRadius(r);

    // select paths, use arc generator to draw
    var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
    arcs.append("svg:path")
        .attr("fill", function(d, i){
            return color(i);
        })
        .attr("d", function (d) {
            return arc(d);
        });

    var legend = d3.select(selector).append("svg")
          .attr("class", "legend")
          .attr("width", r * 3)
          .attr("height", r * 2)
        .selectAll("g")
          .data(color.domain().slice().reverse())
        .enter().append("g")
          .attr("transform", function(d, i) { if(dataValues[i].value > 0 ) { return "translate(0," + i * 20 + ")"; }});

      legend.append("rect")
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

      legend.append("text")
          .attr("x", 24)
          .attr("y", 9)
          .attr("dy", ".20em")
          .text(function(d, i) { if(dataValues[d].value > 0) { return dataValues[d].label + '(' + dataValues[d].count + ') -- ' + dataValues[d].value + '%'; }});
};

var graphTable = function (selector, top5, rankName) {
    var table = d3.select(selector).append("table").attr('class', 'table'),
        thead = table.append("thead"),
        tbody = table.append("tbody");

    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(['Name','Percentage Women'])
        .enter()
        .append("th")
        .text(function(column) { return column; });

    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(top5)
        .enter()
        .append("tr");

    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
           return [{ column: 'name', value: row['name']},
               { column: 'percentage', value: row[rankName] }];
        })
        .enter()
        .append("td")
        .attr("style", "font-family: Courier") // sets the font style
        .html(function(d) { return d.value; });

    return table;
};

var graphTableWithCounts = function (selector, top5, column1, column2, column3, column4) {
    var table = d3.select(selector).append("table").attr('class', 'table'),
        thead = table.append("thead"),
        tbody = table.append("tbody");

    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(['Name', 'Women', 'Men', 'Total', 'Percentage Women'])
        .enter()
        .append("th")
        .text(function(column) { return column; });

    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(top5)
        .enter()
        .append("tr");

    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
           return [{ column: 'name', value: row['name']},
               { column: 'count', value: row[column1] },
               { column: 'count', value: row[column2] },
               { column: 'count', value: row[column3] },
               { column: 'count', value: row[column4] }];
        })
        .enter()
        .append("td")
        .attr("style", "font-family: Courier") // sets the font style
        .html(function(d) { return d.value; });

    return table;
};

var formatPercentage = function(ratio) {
    return Math.round(ratio * 100 * 10)/ 10;
};

var checkIfValueExists = function(value) {
    return value || 0;
};
