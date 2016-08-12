# pi-dashboard

This project is for my home-dashboard being built out of a raspberry pi.  Inspiration for this build is coming from: http://www.instructables.com/id/Raspberry-Pi-Wall-Mounted-Calender-and-Notificatio/


## Components

### Calendar

This component will use an iframe to load up a URL IF the src prop is filled.  Otherwise, it will load up a React Calendar based the config icals, and the ical service.

### FacebookImages

This component relys on my seperate project, node-facebook-photo-scraper to be running.

### Header

This component is not built out to well...

### Quote

This component utilizes a free api to get a Daily Quote.. Note the API has a rate limit, so try not to refresh the page to much...

### Reddit

This component utilizes the reddit server route.  It will access the reddit api and display results from what-ever subreddit you provide.

### Time

This widget is a simple time keeper, which will display time and date.

### Weather

This component will use an iframe to load up a URL IF the src prop is filled.  Otherwise, it will genreate a custom HTML to mimic the widget located on the main page of forecast.io