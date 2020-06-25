# COVID-19 Visualization

Visualization of COVID-19 stats data from

- "2019 Novel Coronavirus COVID-19 (2019-nCoV) Data Repository by Johns Hopkins CSSE"
- https://github.com/CSSEGISandData/COVID-19

## Folders

- ./client : Browser app to view graphs of daily data
- demo video :
  https://secure.medcampus.net/covid19/video/2020-05-26-covid19-visual.mov
- site:
  https://secure.medcampus.net/covid19/a0/

- ./express : express server to deliver JSON data

- ./client/public/stats : JSON stats from COVID-19-JHU site

  - ./country/2020-01-22.json - daily summary stats by country
  - ...
  - ./country/2020-04-30.json
  - ./detail/2020-01-22.json - daily details stats by regions within country
  - ...
  - ./detail/2020-04-30.json

- ./express/parse : nodejs code to convert CSV to JSON

- ./COVID-19-JHU : source git repo https://github.com/CSSEGISandData/COVID-19

- ./setup.md : Setup instructions to run locally client and express server

- TODO items for discussion

- Other visualization sites:
  - https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6
  - https://health.appliedxl.com/#bar/all
  - https://ncov2019.live/data
  - https://cov19.cc

## Acknowledgements

- Shindy Melanie Johnson - concept inspiration
- Phil Sinatra - react UI and build framework setup
- EP Visual Design
