# COVID-19 Visualization

Visualization of COVID-19 statistics from

- "2019 Novel Coronavirus COVID-19 (2019-nCoV) Data Repository by Johns Hopkins CSSE"
- https://github.com/CSSEGISandData/COVID-19

## Links

- demo video:
  https://www.youtube.com/watch?v=pRV5CIoGmLE

- site:
  https://epvisual.com/covid19-dashboard

- documentation:
  https://epvisual.com/covid19-document

## Folders

- ./client : Browser app to view graphs of daily data

- ./client/public/stats : JSON stats from COVID-19-JHU site as static files

  - ./country/2020-01-22.json - daily summary stats by country
  - ...
  - ./country/2020-04-30.json

- ./docus : Docusaurus based documentation

- ./express/parse : nodejs code to convert CSV to JSON

- ./COVID-19-JHU : source git repo https://github.com/CSSEGISandData/COVID-19

- ./setup.md : Setup instructions to run locally client and express server

- ./express : express server to deliver JSON data dynamically
  Not used yet in the COVID-19 Public edition

## Other visualization sites:

- [arcgis.com](https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6)
- [appliedxl.com](https://health.appliedxl.com/#bar/all)
- [ncov2019](https://ncov2019.live/data)
- [cov19.cc](https://cov19.cc)

## Acknowledgements

- Shindy Melanie Johnson - concept inspiration
- Phil Sinatra - react UI and build framework setup
- EP Visual Design
