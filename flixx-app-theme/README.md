# Flixx app aplication

### link to video demo: https://youtu.be/N7bCp9fs3Og

### link to live app : https://my-js-projects-37j9c.ondigitalocean.app/flixx-app-theme/index.html


## About my App:

Welcome to Flixx app, a vanilla java script app where you can search for any TV-show or movie that is available in the “Movie database API” (T M B D).
There are three major html pages in my app: index.html and shows.html where all of the most popular tv-shows and movies are displayed, and the search.html displays the search results of the user.

Even though this project has several html pages, it only has one single java script file with many abstract functions that can be used for different use cases, depending on the current web page the user watches. For example, the fetchData is one single function that serves other functions and it has one major task:retrieving data from the server. 


After making this project, I have a better understanding on how JS works behind the scenes. At his core, Js is synchronous ( also called single thread ). It means that every operation happened one at a time. It is also called “single thread of execution” . 

![freeCodeCamp-Cover-2](https://user-images.githubusercontent.com/113801007/233423053-ea78d04e-3aec-493e-8a34-189edbf62174.png)





Some of the operations like (fetch, setTimeout , setIntervals and many others) are not part of the core JS language. They are actually appended tools that come with the engine upon JS is running ( like v8 for instance). Those are asynchronous operations. So even though JS itself is synchronous, some of the code is still running asynchronously. During the project I use async and await to manage the asynchronous operations along the synchronous operations. I learned about TASK QUEUE and EVENT LOOP to get a better understanding of how JS works behind the scenes.


![144869840-33551e3d-49f0-47ee-b7c2-9d7ec300fad2](https://user-images.githubusercontent.com/113801007/233423391-7b519a5e-7230-4359-a117-8267bdf4defc.png)




## start to use the app

When opening the home page you can find a slider which shows the movies that are currently available in the Cinema. Down there you can find the most popular movies. You can also find in the tv-shows page with current most popular tv-shows. If you want to search for a specific film or series just type it in the search bar and then you can find all the search results with the pagination feature. You can get more details about each film or series by clicking on it and then a detail page will be shown with full details.

Thanks for watching my demo project !
In future projects I will use different kinds of tools to fetch a variety of types of data. Thanks for watching !

