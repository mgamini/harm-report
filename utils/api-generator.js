const _  = require('lodash');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const apiDir = 'public/api';

// const allFilesSync = (dir, fileList = []) => {
//   fs.readdirSync(dir).forEach(file => {
//     const filePath = path.join(dir, file)

// 		if (fs.statSync(filePath).isDirectory()) {
// 			fileList.push({[file]: allFilesSync(filePath)})
// 		} else if (file !== '.DS_Store') {
// 			fileList.push(file)
// 		}
//   })
//   return fileList
// }

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

module.exports = function apiGenerator(source) {
	const dateDir = apiDir + '/date';
	const reportDir = apiDir + '/report';
	let reports = walkSync(source);
	let dates = [];

	try {
		walkDelete(apiDir)
	}	catch(e) {
		console.warn('!! API dir not found, proceeding.')
	}

	fs.mkdirSync(apiDir);
	fs.mkdirSync(dateDir);
	fs.mkdirSync(reportDir);

	reports = processReports(reports);
	dates = generateDates(reports);

	writeDateFiles(dates, dateDir);

	return true;


	// console.log(routes);

	// output = routes.map((route) => {
	// 	if (!_.get(route, 'preprocessor')) {
	// 		return new Promise((res, rej) => res(route));
	// 	}

	// 	return preprocessors[route.preprocessor](route)
	// })

	// return Promise.all(output)
};

function processReports(reports) {
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

function generateDates(reports) {
	let dates = {};

	reports.forEach((report) => {
		if (!_.has(dates, report.date)) dates[report.date] = [];
		dates[report.date].push(report.data)
	})

	return dates;
}

function writeDateFiles(dates, dateDir) {
	_.keys(dates).forEach((dateKey) => {
		console.log(dateDir + '/' + dateKey + '.json')
		fs.writeFile(dateDir + '/' + dateKey + '.json', JSON.stringify(dates[dateKey]))
	})
}


function generateIds(data) {
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

function generateDateRoutes(data) {

}


let preprocessors = {};
preprocessors.reports = function(report) {

	return new Promise((res, rej) => {
		let x = new xhr.XMLHttpRequest();
		x.addEventListener('load', function() {
			// console.log(this.responseText)
			let result = JSON.parse(this.responseText);

			result = generateIds(result);



			console.log(result)
			console.log('--------------EOR');
			res(true);
		});

		const b = report.data.reports.split(' ');
		x.open(b[0],b[1])
		x.send();
	})
}


