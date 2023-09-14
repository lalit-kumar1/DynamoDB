import fs from "fs";
import util from "util";
import csvParser from "csv-parser";
import csv from "fast-csv";

// Define the path to your CSV file
const csvFilePath = `${__dirname}/results5.csv`;
const readFileAsync = util.promisify(fs.readFile);

// Create a ReadableStream to read the CSV file
const fileStream = fs.createReadStream(csvFilePath);

// Use the csv-parser library to parse the CSV data

function groupBy(objectArray: any, property: any) {
	return objectArray.reduce((acc: any, obj: any) => {
		const key = obj[property];
		if (!acc[key]) {
			acc[key] = [];
		}
		// Add object to list for given key's value
		acc[key].push(obj);
		return acc;
	}, {});
}

(async () => {
	console.log(`${__dirname}/results.csv`);
	const items: any = [];
	fileStream
		.pipe(csvParser())
		.on("data", (row) => {
			if (new Date(row.completion_date).getDate() === 5) {
				// console.log(row);
				items.push(row);
			}
		})
		.on("end", () => {
			console.log("CSV file reading finished.");
		});

	await new Promise((resolve) => setTimeout(resolve, 5000));

	console.log(items.length);

	const groupedPeople: any = groupBy(items, "wbn");
	const keys = Object.keys(groupedPeople);
	let finalArray: any = [];
	for (let i = 0; i < keys.length; i++) {
		groupedPeople[keys[i]].sort(function (prev: any, next: any) {
			return next.action_date - prev.action_date;
		});
		finalArray.push(groupedPeople[keys[i]][0]);
	}
	console.log(finalArray.length);
})();
