# hitomi-chan-server
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
* Search for galleries with a query string.
* Get galleries' original urls.
* Fetching big and small thumbnails using pipe.

## Planned
* Caching gallery data automatically every interval hours.
* Returning total search count w. pagination.
* Provide manga reader using server-side rendering.
* Provide video player. (I didn't know hitomi contains anime-type galleries too)

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
Returns whether the query was successful and entries filtered by queries, sorted by gallery id in descending order.

/* Supported queries */
id = (Gallery id)

page = (Used for pagination)
count = (Max number of entries to return in a single page. You can set the default, min, max values in src/routes/gallery.js)
type = (Types of gallery ("manga", "doujinshi", "gamecg", "artistcg"))
c = (Character name)
n = (Gallery name)
p = (Series name)
t = (Tags)
g = (Group name)
l = (Language)
a = (Artist name)

/* Query logics */
If "id" is specified {
  All other options are ignored.
  Only one entry with matching id will be returned.
}

If "page" is specified {
  The page'th group with at most "count" items will be returned.
}

If "count" is specified {
  The max "count" results will be returned in a single page.
}

If others are specified {
  All parameters are evaluated within an "and" condition.
  Each parameter can have multiple values, separated by '|' character.
  All values in the parameters must be encoded with encodeURIComponent function.
  All entries (paginated) matching the condition will be returned.
}

If no query is specifid {
  First page with defalut count of entries will be returned.
}
```
    
```
/* Route */
/cache/ecchi

/* Description */
Manually starts the gallery caching process.
You should take a look at the console to see current progress.
Start the server with developer flag enabled to see detailed logs.
```
