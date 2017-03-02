
d3.json("https://raw.githubusercontent.com/jlstrater/gr8ladies-d3/master/src/assets/data/opensource_data.json", function(error, data) {
    totalWomen = _.sum(_.pluck(data, 'totalWomen'));
    totalMen = _.sum(_.pluck(data, 'totalMen'));
    totalNonBinary = _.sum(_.pluck(data, 'totalNonBinary'));
    totalUnknown = _.sum(_.pluck(data, 'UnknownOrCompany'));
    totalContributors = totalWomen + totalMen + totalNonBinary + totalUnknown;

    conservativeTotals = [{"label": "Women", "value":  formatPercentage(totalWomen/totalContributors), "count": totalWomen},
        {"label": "Men", "value": Math.round(totalMen/totalContributors * 100 * 10) / 10, "count": totalMen},
        {"label": "Unknown or Company", "value": formatPercentage(totalUnknown/totalContributors), "count": totalUnknown}
    ];

    highEstimateTotals = [{"label": "Women", "value":  formatPercentage((totalWomen+totalUnknown)/totalContributors), "count": (totalWomen + totalUnknown)},
        {"label": "Men", "value": Math.round(totalMen/totalContributors * 100 * 10) / 10, "count": totalMen},
        {"label": "Non-binary Gender Identity", "value": formatPercentage(totalNonBinary/totalContributors), "count": totalNonBinary}];

    graphPieChart('#pieChartTotalForProjects', conservativeTotals);
    graphPieChart('#pieChartTotalForProjectsHigh', highEstimateTotals);

    projectsWithWomenContributors = _.size(_.filter(data, function(o) {
       return o.totalWomen > 0
    }));
    totalProjects = _.size(data);
    projectsWithoutWomenContributors = totalProjects - projectsWithWomenContributors;

    percentageOfProjectsWithWomenContributors = [{"label": "Projects With Women", "value":  formatPercentage(projectsWithWomenContributors/totalProjects), "count": projectsWithWomenContributors},
        {"label": "Projects Without Women", "value": Math.round(projectsWithoutWomenContributors/totalProjects * 100 * 10) / 10, "count": projectsWithoutWomenContributors},
        {"label": "Projects that Might Have Women Contributors", "value": 0, "count": 0}];

    graphPieChart('#pieChartProjectsPercentage', percentageOfProjectsWithWomenContributors);

    data = _.sortByOrder(data, 'name');

    _.each(data, function (project) {
        var totalContributors = checkIfValueExists(project.totalWomen) + checkIfValueExists(project.totalMen) + checkIfValueExists(project.UnknownOrCompany);
        project.totalContributorsWithUnknown = totalContributors;
        project.totalPercentageWomen = totalContributors ? formatPercentage(checkIfValueExists(project.totalWomen) /
            (totalContributors)) : 0;
        project.totalPercentageWomenHigh = checkIfValueExists(project.UnknownOrCompany) ?
            formatPercentage( (checkIfValueExists(project.totalWomen) + checkIfValueExists(project.UnknownOrCompany)) /
                ( totalContributors + checkIfValueExists(project.UnknownOrCompany))) : project.totalPercentageWomen;
    });

    var topFiveTotalWomen = _.sortByOrder(data, 'totalPercentageWomen', 'desc').slice(0, 5);
    graphTable('#tableTotalForProjects', topFiveTotalWomen, 'totalPercentageWomen');

    var topFiveTotalWomenHigh = _.sortByOrder(data, 'totalPercentageWomenHigh', 'desc').slice(0, 5);
    graphTable('#tableTotalForProjectsHigh', topFiveTotalWomenHigh, 'totalPercentageWomenHigh');

    var allProjects = _.sortByOrder(data, 'totalPercentageWomen', 'desc');
    graphTableWithCounts('#tableAllProjects', allProjects, 'totalWomen', 'totalMen', 'totalContributorsWithUnknown', 'totalPercentageWomen');
});
