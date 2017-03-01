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
          .attr("width", r * 2)
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
          .attr("dy", ".35em")
          .text(function(d, i) { if(dataValues[d].value > 0) { return dataValues[d].label + '(' + dataValues[d].count + ') -- ' + dataValues[d].value + '%'; }});
};

var graphTable = function (selector, top5, rankName) {
    var table = d3.select(selector).append("table"),
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

var formatPercentage = function(ratio) {
    return Math.round(ratio * 100 * 10)/ 10;
};

var checkIfValueExists = function(value) {
    return value || 0;
};

d3.json("https://raw.githubusercontent.com/jlstrater/gr8ladies-d3/master/src/assets/data/data.json", function(error, data) {
    totalWomen = _.sum(_.pluck(data, 'totalWomen'));
    totalMen = _.sum(_.pluck(data, 'totalMen'));
    totalNonBinary = _.sum(_.pluck(data, 'totalNonBinary'));
    totalEmployees = totalWomen + totalMen + totalNonBinary;
    totalWomenInLeadership = _.sum(_.pluck(data, 'leadershipWomen'));
    totalMenInLeadership = _.sum(_.pluck(data, 'leadershipMen'));
    totalNonBinaryInLeadership = _.sum(_.pluck(data, 'leadershipNonBinary'));
    totalInLeadership = totalMenInLeadership + totalWomenInLeadership + totalNonBinaryInLeadership;
    femaleDevelopers = _.sum(_.pluck(data, 'developersWomen'));
    maleDevelopers = _.sum(_.pluck(data, 'developersMen'));
    nonBinaryDevelopers = _.sum(_.pluck(data, 'developersNonBinary'));
    totalDevelopers = maleDevelopers + femaleDevelopers + nonBinaryDevelopers;
    femaleQA = _.sum(_.pluck(data, 'qaWomen'));
    maleQA = _.sum(_.pluck(data, 'qaMen'));
    nonBinaryQA = _.sum(_.pluck(data, 'nonBinaryQA'));
    totalQA = maleQA + femaleQA + nonBinaryQA;

    totals = [{"label": "Women", "value":  formatPercentage(totalWomen/totalEmployees), "count": totalWomen},
      {"label": "Men", "value": Math.round(totalMen/totalEmployees * 100 * 10) / 10, "count": totalMen},
      {"label": "Non-binary Gender Identity", "value": formatPercentage(totalNonBinary/totalEmployees), "count": totalNonBinary}];

    leadershipTotals = [{"label": "Women", "value":  formatPercentage(totalWomenInLeadership/totalInLeadership), "count": totalWomenInLeadership},
      {"label": "Men", "value": formatPercentage(totalMenInLeadership/totalInLeadership), "count": totalMenInLeadership},
      {"label": "Non-binary Gender Identity", "value": formatPercentage(totalNonBinaryInLeadership/totalInLeadership), "count": totalNonBinaryInLeadership}];

    developerTotals =  [{"label": "Women", "value": formatPercentage(femaleDevelopers/totalDevelopers), "count": femaleDevelopers},
      {"label": "Men", "value": formatPercentage(maleDevelopers/totalDevelopers), "count": maleDevelopers},
      {"label": "Non-binary Gender Identity", "value": formatPercentage(nonBinaryDevelopers/totalDevelopers), "count": nonBinaryDevelopers}];

    qaTotals =  [{"label": "Women", "value":  formatPercentage(femaleQA/totalQA), "count": femaleQA},
      {"label": "Men", "value": formatPercentage(maleQA/totalQA), "count": maleQA},
      {"label": "Non-binary Gender Identity", "value": formatPercentage(nonBinaryQA/totalQA), "count": nonBinaryQA}];

    graphPieChart('#pieChartTotals', totals);
    graphPieChart('#pieChartLeadership', leadershipTotals);
    graphPieChart('#pieChartDevelopers', developerTotals);
    graphPieChart('#pieChartQA', qaTotals);

    _.each(data, function (company) {
        var totalEmployees = checkIfValueExists(company.totalWomen) + checkIfValueExists(company.totalMen) + checkIfValueExists(company.totalNonBinary);
        company.totalPercentageWomen = totalEmployees ? formatPercentage(checkIfValueExists(company.totalWomen) /
                (totalEmployees)) : 0;
        var totalLoadership = checkIfValueExists(company.leadershipWomen) + checkIfValueExists(company.leadershipMen) + checkIfValueExists(company.leadershipNonBinary);
        company.leadershipPercentageWomen = totalLoadership ? formatPercentage(checkIfValueExists(company.leadershipWomen) /
                (totalLoadership)) : 0;
        var totalDevelopers = checkIfValueExists(company.developersWomen) + checkIfValueExists(company.developersMen) + checkIfValueExists(company.developersNonBinary);
        company.developersPercentageWomen = totalDevelopers ? formatPercentage(checkIfValueExists(company.developersWomen) /
                (totalDevelopers)) : 0;
        var totalQA = checkIfValueExists(company.qaWomen) + checkIfValueExists(company.qaMen) + checkIfValueExists(company.qaNonBinary);
        company.qaPercentageWomen = totalQA ? formatPercentage(checkIfValueExists(company.qaWomen) /
                (totalQA)) : 0;
    });

    if(_.compact(_.pluck(data, 'totalPercentageWomen')).length < 5) {
        d3.select('#tableTotals').text('Fewer than 5 Companies Reporting. Please consider contributing.');
    } else {
        var topFiveTotalWomen = _.sortByOrder(data, 'totalPercentageWomen', 'desc').slice(0, 5);
        graphTable('#tableTotals', topFiveTotalWomen, 'totalPercentageWomen');
    }
    if(_.compact(_.pluck(data, 'leadershipPercentageWomen')).length < 5) {+
        d3.select('#tableLeadership').text('Fewer than 5 Companies Reporting. Please consider contributing.');
    } else {
        var topFiveLeadershipWomen = _.sortByOrder(data, 'leadershipPercentageWomen', 'desc').slice(0,5);
        graphTable('#tableLeadership', topFiveLeadershipWomen, 'leadershipPercentageWomen');
    }
    if(_.compact(_.pluck(data, 'developersPercentageWomen')).length < 5) {
        d3.select('#tableDevelopers').text('Fewer than 5 Companies Reporting. Please consider contributing.');
    } else {
        var topFiveDevelopersWomen = _.sortByOrder(data, 'developersPercentageWomen', 'desc').slice(0,5);
        graphTable('#tableDevelopers', topFiveDevelopersWomen, 'developersPercentageWomen');
    }
    if(_.compact(_.pluck(data, 'qaPercentageWomen')).length < 5) {
        d3.select('#tableQA').text('Fewer than 5 Companies Reporting. Please consider contributing.');
    } else {
        var topFiveQaWomen = _.sortByOrder(data, 'qaPercentageWomen', 'desc').slice(0,5);
        graphTable('#tableQA', topFiveQaWomen, 'qaPercentageWomen');
    }
});

d3.json("https://raw.githubusercontent.com/jlstrater/gr8ladies-d3/master/src/assets/data/opensource_data.json", function(error, data) {
    totalWomen = _.sum(_.pluck(data, 'totalWomen'));
    totalMen = _.sum(_.pluck(data, 'totalMen'));
    totalNonBinary = _.sum(_.pluck(data, 'totalNonBinary'));
    totalContributors = totalWomen + totalMen + totalNonBinary;
    totalWomenInLeadership = _.sum(_.pluck(data, 'leadershipWomen'));
    totalMenInLeadership = _.sum(_.pluck(data, 'leadershipMen'));
    totalNonBinaryInLeadership = _.sum(_.pluck(data, 'leadershipNonBinary'));
    totalInLeadership = totalMenInLeadership + totalWomenInLeadership + totalNonBinaryInLeadership;
    commitsFromWomen = _.sum(_.pluck(data, 'commitsFromWomen'));
    commitsFromMen = _.sum(_.pluck(data, 'commitsFromMen'));
    commitsFromNonBinary = _.sum(_.pluck(data, 'commitsFromNonBinary'));
    totalCommits = maleDevelopers + femaleDevelopers + nonBinaryDevelopers;

    totals = [{"label": "Women", "value":  formatPercentage(totalWomen/totalContributors), "count": totalWomen},
        {"label": "Men", "value": Math.round(totalMen/totalContributors * 100 * 10) / 10, "count": totalMen},
        {"label": "Non-binary Gender Identity", "value": formatPercentage(totalNonBinary/totalContributors), "count": totalNonBinary}];

    leadershipTotals = [{"label": "Women", "value":  formatPercentage(totalWomenInLeadership/totalInLeadership), "count": totalWomenInLeadership},
        {"label": "Men", "value": formatPercentage(totalMenInLeadership/totalInLeadership), "count": totalMenInLeadership},
        {"label": "Non-binary Gender Identity", "value": formatPercentage(totalNonBinaryInLeadership/totalInLeadership), "count": totalNonBinaryInLeadership}];

    developerTotals =  [{"label": "Women", "value": formatPercentage(commitsFromWomen/totalCommits), "count": commitsFromWomen},
        {"label": "Men", "value": formatPercentage(commitsFromMen/totalCommits), "count": commitsFromMen},
        {"label": "Non-binary Gender Identity", "value": formatPercentage(commitsFromNonBinary/totalCommits), "count": commitsFromNonBinary}];

    graphPieChart('#pieChartTotalForProjects', totals);
    graphPieChart('#pieChartLeadershipProjects', leadershipTotals);
    graphPieChart('#pieChartCommits', developerTotals);

    _.each(data, function (project) {
        var totalContributors = checkIfValueExists(project.totalWomen) + checkIfValueExists(project.totalMen) + checkIfValueExists(project.totalNonBinary);
        project.totalPercentageWomen = totalContributors ? formatPercentage(checkIfValueExists(project.totalWomen) /
            (totalContributors)) : 0;
        var totalLoadership = checkIfValueExists(project.leadershipWomen) + checkIfValueExists(project.leadershipMen) + checkIfValueExists(project.leadershipNonBinary);
        project.leadershipPercentageWomen = totalLoadership ? formatPercentage(checkIfValueExists(project.leadershipWomen) /
            (totalLoadership)) : 0;
        var totalCommits = checkIfValueExists(project.commitsFromWomen) + checkIfValueExists(project.commitsFromMen) + checkIfValueExists(project.commitsFromNonBinary);
        project.commitsPercentageWomen = totalCommits ? formatPercentage(checkIfValueExists(project.commitsFromWomen) /
            (totalCommits)) : 0;
    });

    var message = 'Fewer than 5 projects reporting non-zero numbers. Please consider contributing.';

    // if(_.compact(_.pluck(data, 'totalPercentageWomen')).length < 5) {
    //     d3.select('#tableTotalForProjects').text(message);
    // } else {
        var topFiveTotalWomen = _.sortByOrder(data, 'totalPercentageWomen', 'desc').slice(0, 5);
        graphTable('#tableTotalForProjects', topFiveTotalWomen, 'totalPercentageWomen');
    // }
    // if(_.compact(_.pluck(data, 'leadershipPercentageWomen')).length < 5) {+
    //     d3.select('#tableLeadershipProjects').text(message);
    // } else {
        var topFiveLeadershipWomen = _.sortByOrder(data, 'leadershipPercentageWomen', 'desc').slice(0,5);
        graphTable('#tableLeadershipProjects', topFiveLeadershipWomen, 'leadershipPercentageWomen');
    // }
    // if(_.compact(_.pluck(data, 'developersPercentageWomen')).length < 5) {
    //     d3.select('#tableCommits').text(message);
    // } else {
        var topFiveDevelopersWomen = _.sortByOrder(data, 'developersPercentageWomen', 'desc').slice(0,5);
        graphTable('#tableCommits', topFiveDevelopersWomen, 'developersPercentageWomen');
    // }
});
