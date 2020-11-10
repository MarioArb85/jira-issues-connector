const { Router } = require('express');
const router = Router();

var JiraClient = require("jira-connector");

var jira = new JiraClient({
  host: 'project_url',
  basic_auth: {
    base64: 'user:pass'
  },
  strictSSL: false
});

/*
router.get("/", (req, res) => {
	jira.issue
    	.getIssue({issueKey: "OMS-443"})
    	.then(issue => {
    		res.status(200).json(issue);
    	})
    	.catch(error => {
    		const errorCode = error.statusCode || 400;
    		res.status(errorCode).json(error);
      		throw error;
    	});
});
*/

router.post("/get-jira-issues", (req, res) => {
	const jiraQuery = req.body;

    jira.search
    	.search(jiraQuery)
    	.then(issues => {
			res.status(200).json(issues);
    	})
    	.catch(error => {
    		const errorCode = error.statusCode || 400;
    		res.status(errorCode).json(error);
      		throw error;
    	});
});

module.exports = router;
