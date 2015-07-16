# gr8ladies-d3
Data Visualization Project for Gr8Ladies Data

See the charts at [http://jlstrater.github.io/gr8ladies-d3/](http://jlstrater.github.io/gr8ladies-d3/)

The goal of this project is to visualize the gender gap data for the Groovy community.  If your company uses Groovy, Grails, Griffon, Gradle, or a related Groovy based technology, please consider contributing.

## Contributions

To contribute, please submit a pull request(PR) with your company's data added to the [`data.json`](/src/assets/data/data.json) file in `/src/assets/data`.  You don't need to fork, clone, etc the repository, you can add to the file via the github text editor.  When viewing the file, click the pencil icon on the right hand side of the page or go directly [here](https://github.com/jlstrater/gr8ladies-d3/edit/master/src/assets/data/data.json).  At the bottom of the page, there are prompts to setup a PR directly from the editor.

### Example
Not all fields are required, but it should look something like this.
```
{
    "name": "Company A", 
    "totalMen": 20,
    "totalWomen": 5,
    "leadershipMen": 3,
    "leadershipWomen": 1,
    "developersMen": 3,
    "developersWomen": 2,
    "qaMen": 1,
    "qaWomen": 1,
    "lastUpdated": "08-JUL-2015",
    "source": "Company A Employee",
    "country": "USA"
  }
```

###Details, Questions, and FAQ
If you don't feel comfortable submitting the company's name, you can submit under an anonymous name (please verify it isn't already listed) or email jenn@gr8ladies.org and I'll submit it anonymously from my github account.

Only the name field is required. The other fields are optional and based on what you are able to contribute.  Also, if you or someone at your company does not identify as male or female, I am happy to modify the code to include a new field name of your choosing.

- totalMen/totalWomen includes all employees of your organization(or department) who identify as men, women, etc.
- leadership includes anyone who manages other employees
- developers can include anyone who writes code, but the company should be doing something Groovy related (Groovy, Grails, Griffon, Gradle, etc).
- QA includes both manual QA and test engineers. Please note that this means that test engineers fit into both Developer and QA roles and the numbers may or may not line up with the total of the organization.

### Important!
It is very important to submit your data even if your company doesn't have any women.  The charts are based on aggregate data so it's important to have everyone accounted for or the numbers will be skewed. 
