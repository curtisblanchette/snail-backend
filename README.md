# snail-backend
Backend RESTful API for Snail problem


## Problem 

A snail is at the bottom of a 6-foot well and wants to climb to the top. The snail can climb 3 feet
while the sun is up, but slides down 1 foot at night while sleeping. The snail has a fatigue factor
of 10%, which means that on each successive day the snail climbs 10% * 3 = 0.3 feet less than
it did the previous day. (The distance lost to fatigue is always 10% of the first day's climbing
distance.) On what day does the snail leave the well, i.e., what is the first day during which the
snail's height exceeds 6 feet? (A day consists of a period of sunlight followed by a period of
darkness.) As you can see from the following table, the snail leaves the well during the third
day.

| Day | Initial Height | Distance Climbed | Height After Climbing | Height After Sliding |
|-----|----------------|------------------|----------------------|----------------------|
| 1   | 0'             | 3'               | 3'                   | 2'                   |
| 2   | 2'             | 2.7'             | 4.7'                 | 3.7'                 |
| 3   | 3.7'           | 2.4'             | 6.1'                 | -                    |

Your job is to solve this problem in general. Depending on the parameters of the problem, the
snail will eventually either leave the well or slide back to the bottom of the well. (In other words,
the snail's height will exceed the height of the well or become negative.) You must find out
which happens first and on what day.

### Installation

`npm install`

### Run Server

`npm run start`

### Documentation

#### Results API
`GET /results` - get all snail results items

`POST /results` - save a new result item

`GET /results/aggregate` - get aggregated metrics report

#### Logs API
`GET /logs` - get all request logs

`POST /logs` - save a new request item
