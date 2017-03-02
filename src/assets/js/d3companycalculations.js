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
