# reactive-hitomi-server
Backend server that caches hitomi.la galleries to local database.

## Environment
Server: NodeJS + Express
Database: MongoDB

## Motivation
There is currently no known public API to access data easily from hitomi. However, there are few methods on achieving this with a bit of 'hack'.
1. Get data from gallery json files.
  There are 20 json files on hitomi server, each weighing at least 10 megabytes. In countries where connection to hitomi takes a long time, this method is not ideal. Besides, it's not just the size of those files but there are more than 400k json objects (and still growing). It wouldn't be performance-wise to iterate through each of the objects on client-side, just to get a few search results.
2. Doing a GET request on hitomi pages and parse the HTML data.
  Surely, this method is much superior in terms of the aspects mentioned above. But what if one day, the page structure changes significantly? It would be a pain in the ass to edit the client codes and redistribute the build to all users (well... unless your hitomi client is a front-end web application).
  
  This backend application is programmed in hope to solve the issues mentioned above.

## Features
* Caching all galleries in hitomi server to local database.
* Providing a simple REST API that returns search results based on query strings.

## Planned
* Caching gallery data automatically every interval hours.
* Provide better query experience for REST API.

## How to use
### Starting the server
There are two scripts in package.json; one for normal startup and other with debug flag enabled. The debug mode simply outputs more verbose logs while performing certain tasks.
  
Start with normal options
```
yarn start
```
  
  Start with debug options
```
yarn startDev
```
  
### REST API
```
/* Route */
/gallery

/* Description */
Returns 30 objects sorted by gallery id, descending.

/* Supported queries */
page = (Used for pagination)
type = (Exact match, Types of gallery ("manga", "doujinshi", "gamecg", "artistcg"))
id = (Exact match, Gallery id)
c = (Inclusive match, Character name)
n = (Inclusive match, Gallery name)
p = (Inclusive match, Series name)
t = (Inclusive match, Tags)
g = (Inclusive match, Group name)
l = (Inclusive match, Language)
a = (Inclusive match, Artist name)
```
    
```
/* Route */
/cache/ecchi

/* Description */
Manually starts the gallery caching process.
You should take a look at the console to see current progress.
Start the server with developer flag enabled to see detailed logs.
```
