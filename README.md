# hitomi-chan-server
Backend server that caches hitomi.la galleries to local database.

## Environment
Server: NodeJS + Express
  
Database: MongoDB
  
Cilent: React + Redux

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
* Provides a client for reading manga in a browser.

## Planned
* Caching gallery data automatically every interval hours.
* Returning total search count w. pagination.
* Provide video player. (I didn't know hitomi contains anime-type galleries too)

## How to use
### Initial setup
Firstly, you need to download the source codes (duh) by either cloning using git or simply downloading from [here](https://github.com/jerryrox/hitomi-chan-server)
```
git clone https://github.com/jerryrox/hitomi-chan-server
```
  
Then you must install some dependencies as well.
  Building the client application is optional, but it's recommended if you're going to use it.
```
(Go into your hitomi-chan-server directory)
cd YOUR_HITOMI_CHAN_DIRECTORY

(Install dependencies)
yarn install

(Setup hitomi-chan-utility)
git submodule update --init

(Go to client application)
cd client

(Install client dependencies)
yarn install

(Build the client)
yarn build
```

### Starting the server
There are two scripts in package.json; one for normal startup and other with debug flag enabled. The debug mode outputs more logs while performing certain tasks.
  
Start with normal options
```
yarn start
```
  
  Start with debug options
```
yarn startDev
```
  
  Building the client application
```
From the hitomi-chan-server root directory:
cd client
yarn build
```
  
### Customizing database
By default, the server only indexes manga "id"s, which makes searching for other fields inefficient. You can change that behavior either manually through mongodb, or editing a portion of the code.
  
To edit the code, simply navigate to /src/models/gallery.js, and edit the following code to your needs.
```
schema.index({
    id: -1
});
```
  
For the other method, you can easily do it by using other programs such as MongoDB Compass.
  
### REST API
```
/* Query details for /api/gallery route */
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
/* Routes */
(Client) Reading a manga with specified id.
/gallery/read/{id}
(Client) Watching a video with specified id.
/gallery/watch/{id}

(Server) Starting the caching process. Will be removed in future releases.
/api/cache/ecchi
(Server) Searching for a list of entries that matches the specified query. See above for more details about the query.
/api/gallery?{query}
(Server) Returns a JSON containing the original url to the manga of specified id.
/api/original/{id}
(Server) Returns a JSON containing the original url to the video of specified id.
/api/original/anime/{id}
(Server) Returns the cover page thumbnail of the manga of specified id.
/api/thumbs/big/{id}
(Server) Returns the large thumbnail of the manga of specified id and image file name.
/api/thumbs/big/{id}/{imageName}
(Server) Returns the small thumbnail of the manga of specified id and image file name.
/api/thumbs/small/{id}/{imageName}
(Server) Returns a JSON containing a list of page infos of the manga of specified id.
/api/page/list/{id}
(Server) Returns the original sized image of the manga's page of specified id and image file name.
/api/page/{id}/{imageName}
(Server) Returns the original movie file of the video of specified id.
/api/video/{id}
```
