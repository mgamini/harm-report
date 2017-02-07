const _  = require('lodash');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const apiDir = 'public/api';
const chalk = require('chalk');

const walkDelete = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        walkDelete(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
	}
}

const walkSync = (dir, filelist = []) => {
   fs.readdirSync(dir).forEach(file => {
		if (file === '.DS_Store') return;

    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
	return filelist;
}

const processReports = (reports) => {
	console.log('Processing reports...');
	return reports.map((report) => {
		const split = report.split('/');
		const date = moment()
			.year(split[1])
			.month(split[2])
			.date(split[3]);

		let processed = {
			_url: report,
			id: date.format('YYYYMMDD') + split[4].match(/^[\w|\d]*/)[0],
			date: date.format('MM-DD-YYYY'),
			filename: date.format('YYYYMMDD') + split[4],
		};

		processed.data = JSON.parse(fs.readFileSync(processed._url, 'utf8'));
		processed.data.id = processed.id;

		return processed;
	})
}

const generateDates = (reports) => {
	console.log('Generating dates...');
	let datesObj = {};
	let dates = [];

	reports.forEach((report) => {
		if (!_.has(datesObj, report.date)) datesObj[report.date] = [];
		datesObj[report.date].push(report.data);
	})

	let keys = _.keys(datesObj);
	keys.forEach((date, idx) => {
		dates.push({
			date,
			data: datesObj[date],
			prev: keys[idx - 1] ? keys[idx - 1] : "",
			next: keys[idx + 1] ? keys[idx + 1] : ""
		});
	})

	return dates;
}

const writeReportFiles = (reports, reportDir) => {
	console.log(`Writing ${chalk.green(reports.length)} report files to ${reportDir}...`);
	reports.forEach((report) => {
		fs.writeFile(reportDir + '/' + report.filename, JSON.stringify(report))
	})
}

const writeDateFiles = (dates, dateDir) => {
	console.log(`Writing ${chalk.green(dates.length)} date files to ${dateDir}...`);

	dates.forEach((date) => {
		console.log
		fs.writeFile(dateDir + '/' + date.date + '.json', JSON.stringify(date))
	})
}

const generateIds = (data) => {
	return data.map((reportSet) => {
		return {
			date: reportSet.date,
			reports: reportSet.reports.map((report, idx) => {
				report.id = reportSet.date.replace(/-/g, '') + idx;
				return report;
			})
		}
	})
}

module.exports = function apiGenerator(source) {
	console.log(chalk.bgWhite('                          '))
	console.log(chalk.green('Initializing report generation...'));

	const dateDir = apiDir + '/date';
	const reportDir = apiDir + '/report';
	let reports = walkSync(source);
	let dates = [];

	console.log(`Scan complete, detected ${chalk.green(reports.length)} reports.`);

	console.log('..');
	try {
		walkDelete(apiDir)
	}	catch(e) {
		console.warn(chalk.bgRed('!! API dir not found, proceeding.'))
	}

	console.log('..');
	fs.mkdirSync(apiDir);
	fs.mkdirSync(dateDir);
	fs.mkdirSync(reportDir);

	console.log('..');
	reports = processReports(reports);
	console.log('..');
	dates = generateDates(reports);

	console.log('..');
	writeReportFiles(reports, reportDir);
	console.log('..');
	writeDateFiles(dates, dateDir);

	console.log('..');
	const sorted = dates.sort((a, b) => {
		return new Date(a.date) < new Date(b.date);
	})[0]

	console.log(`Most recent date is: ${chalk.green(sorted.date)}.`);
	console.log('..');
	console.log(`Writing ${chalk.green('latest.json')}...`);
	fs.writeFile(apiDir + '/latest.json', JSON.stringify(sorted));

	console.log('..');
	console.log(chalk.cyan('Process complete!'));
	console.log(chalk.bgWhite('                          '))

	return true;
};
