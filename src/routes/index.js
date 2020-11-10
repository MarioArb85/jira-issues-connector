const { Router } = require('express');
const router = Router();

var JiraClient = require("jira-connector");

var jira = new JiraClient({
  host: process.env.JIRA_URL,
  basic_auth: {
    base64: process.env.JIRA_CREDENTIALS
  },
  strictSSL: false
});

router.get("/", (req, res) => {
  console.log('getIssue1');
  console.log(process.env.JIRA_URL);
	jira.issue
    	.getIssue({issueKey: "OMS-443"})
    	.then(issue => {
        console.log('getIssue2');
    		res.status(200).json(issue);
    	})
    	.catch(error => {
    		const errorCode = error.statusCode || 400;
    		res.status(errorCode).json(error);
      	throw error;
    	});
});

router.get("/endpoint-test", (req, res) => {
  res.status(200).send({message: 'Holi'});
});


router.post("/get-jira-issues", (req, res) => {
	const jiraQuery = req.body;
  console.log('search1');
  console.log(process.env.JIRA_URL);

    jira.search
    	.search(jiraQuery)
    	.then(issues => {
        console.log('search2');
        res.status(200).json(issues);
    	})
    	.catch(error => {
    		const errorCode = error.statusCode || 400;
    		res.status(errorCode).json(error);
      		throw error;
    	});
});

module.exports = router;
