//
import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

const FocusTab = (props) => {
  const {
    CountrySelect,
    showWorldAction,
    findFirstDate,
    findLastestDate,
    // showStatsJSON,
    uiprop,
    focusCountries,
    showCountryAction,
    focusIndex,
  } = props.actions;
  return (
    <Grid>
      <Grid.Row>Focus the graph on a selected region</Grid.Row>
      <Grid.Row>
        <Button size="mini" compact onClick={showWorldAction}>
          Focus World
        </Button>
        <CountrySelect />
        <Button
          size="mini"
          compact
          onClick={() => {
            showCountryAction(0);
          }}
          active={focusIndex === 0}
          style={{ marginLeft: 4 }}
        >
          {focusCountries[0]}
        </Button>
        <Button
          size="mini"
          compact
          onClick={() => {
            showCountryAction(1);
          }}
          active={focusIndex === 1}
        >
          {focusCountries[1]}
        </Button>
        <Button
          size="mini"
          compact
          onClick={() => {
            showCountryAction(2);
          }}
          active={focusIndex === 2}
        >
          {focusCountries[2]}
        </Button>
      </Grid.Row>
      <Grid.Row style={{ paddingTop: '0rem' }}>
        <Button size="mini" compact onClick={findFirstDate}>
          First {uiprop}
        </Button>
        Jump to date of first occurrence.
        {/* <Button size="mini" compact onClick={showStatsJSON}>
          Debug
        </Button> */}
      </Grid.Row>
      <Button size="mini" compact onClick={findLastestDate}>
        Latest
      </Button>
      Jump to latest date.
      <Grid.Row style={{ paddingTop: '0rem' }}></Grid.Row>
    </Grid>
  );
};

export default FocusTab;
