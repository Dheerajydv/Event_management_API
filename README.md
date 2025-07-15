# Event_management_API

## Start Commands

### Command to start the server

Clone the repository and navigate into the directory
```shell
git clone https://github.com/Dheerajydv/Event_management_API.git
cd Event_management_API
```

Install the dependencies
```shell
pnpm install
```

Setting up Environment Variables 
```shell
cp .env .env.sample
```

Start the server
``` shell
pnpm run start
```

## API Description

### Create Event
To Create an Event navigate to ```http://localhost:8000/api/event/create``` and send a POST request
Sample Data
```json
{
    "title": "",
    "dateTime": "2025-07-17T10:30:00.000Z",
    "location": "",
    "capacity": 
}
```

### Get Event Details
To Create an Event navigate to ```http://localhost:8000/api/event/all``` and send a GET request


### Register for Events
To Create an Event navigate to ```http://localhost:8000/api/user/register``` and send a POST request
Sample Data
```json
{
    "name": "",
    "email": "",
    "eventTitle": ""
}
```

### Cancel Registration
To Create an Event navigate to ```http://localhost:8000/api/user/cancel``` and send a POST request
Sample Data
```json
{
    "name": "",
    "email": "",
    "eventTitle": ""
}
```

### List Upcoming Events
To Create an Event navigate to ```http://localhost:8000/api/user/cancel``` and send a GET request


### Event Stats
To Create an Event navigate to ```http://localhost:8000/api/user/cancel``` and send a GET request