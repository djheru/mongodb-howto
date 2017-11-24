

### Getting started with the Aggregation Framework

#### Aggregate

`db.myCollection.aggregate(op1, op2, op3)`

- Takes a series of pipeline operators
- Each pipeline operator sees the docs that are fed to it from the previous operator
- Passes the output to the next operator 
- Pipeline operators operate in stages
- Break down tranformation into stages
- 

#### $group

- Group documents based on a common key
- Collect elements based on a shared characteristic
- The group by key is designated by "_id"
	- The value you pass is what it will be grouped by.
	- If you want the entire result set to be the group, pass a constant, e.g. "all"
- The field names can be any scalar
- You cannot use subdocuments or nested structures in the query


```javascript
// simple count all documents
const g1 = { $group: { _id: "all", sum: { "$sum": 1 } } };
// "all" is just a dummy id. Not needed in the aggregate function
// "sum" is the property name we're making up. 
// "$sum" adds one for each document encountered
```

```javascript
// Average of all documents
const g2 = { $group: { _id: "all", avg: { $avg: "$qty" } } };
// result is a document with a property "avg" that has the average ($avg) value
// of the field "qty" (denoted by "$qty")
// You can use dot notation for this (e.g. "$item.qty")
// output: { result: [ { _id: "all", avg: 7.98 } ], ok: 1 }
```

```javascript of all documents
// Minimum Value
const g3 = { $group: { _id: "all", min: { $min: "$qty" } } };
// output: { result: [ { _id: "all", min: 1 } ], ok: 1 }
```

```javascript of all documents
// Maximum Value
const g4 = { $group: { _id: "all", max: { $max: "$qty" } } };
// output: { result: [ { _id: "all", max: 100 } ], ok: 1 }
```

```javascript of all documents
// Combine operations
const g5 = {
	$group: {
		_id: "all",
		sum: { "$sum": 1 },
		avg: { $avg: "$qty" },
		min: { $min: "$qty" },
		max: { $max: "$qty" }
	}
};
/* Result
{
	result: [
		{
			_id: "all",
			sum: 1033,
			avg: 8.4,
			min: 1,
			max: 14
		}
	],
	ok: 1
}
 */
```

```javascript
// Group by a field
const g6 = { $group: { _id: '$sku', sum: { $sum: 1 } } };

// output: { result: [{_id: 'sku1', sum: 15}, {_id: 'sku2', sum: 35}, {_id: 'sku3', sum: 51}, ], ok: 1 }
```

```javascript
const g5 = {
	$group: {
		_id: "$sku",
		sum: { "$sum": 1 },
		avg: { $avg: "$qty" },
		min: { $min: "$qty" },
		max: { $max: "$qty" }
	}
};
/* Result
{
	result: [
		{
			_id: 'sku001',
			sum: 233,
			avg: 5.4,
			min: 1,
			max: 19
		},
		{
			_id: 'sku002',
			sum: 932,
			avg: 8.2,
			min: 1,
			max: 13
		},
		{
			_id: 'sku003',
			sum: 735,
			avg: 7.4,
			min: 1,
			max: 17
		},
	],
	ok: 1
}
 */
```

#### $unwind

- Transforms an array document field into multiple single documents, one for each element in the array
- e.g
```angular2html
{ key1: 'foo', key2: 'bar', key3: ['baz', 'faz']}}
// unwound to 
{ key1: 'foo', key2: 'bar', key3: 'baz'}}
{ key1: 'foo', key2: 'bar', key3: 'faz'}}
```

#### $project
- Get a subset of a document by reshaping it
- Pluck the fields you want, rename field names, etc

#### $limit
- Limit number of documents 

#### $skip 
- Skip the first x documents

#### $sort 
- Sorts them

#### $match 
- Filters incoming documents 

#### $geoNear
- Match based on a geoloc point and distance
- Features similar to $project, $match, $limit with geodata


