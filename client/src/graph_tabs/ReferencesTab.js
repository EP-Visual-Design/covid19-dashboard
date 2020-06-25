//
import React from 'react';
import { Grid } from 'semantic-ui-react';

const ReferencesTab = () => {
  return (
    <Grid style={{ marginTop: '1rem' }}>
      <table>
        <tbody>
          <tr>
            <td
              style={{
                paddingTop: 20,
              }}
            >
              Data source:{' '}
              <a
                href="https://github.com/CSSEGISandData/COVID-19"
                target="_blank"
                rel="noopener noreferrer"
              >
                2019 Novel Coronavirus COVID-19 (2019-nCoV) Data Repository by
                Johns Hopkins CSSE
              </a>{' '}
              <p>
                "...data repository for the 2019 Novel Coronavirus Visual
                Dashboard operated by the Johns Hopkins University Center for
                Systems Science and Engineering (JHU CSSE)..."
              </p>
            </td>
          </tr>
          <tr>
            <td
              style={{
                paddingTop: 20,
              }}
            >
              <a
                href="https://comptroller.nyc.gov/reports/new-york-citys-frontline-workers/"
                target="_blank"
                rel="noopener noreferrer"
              >
                NYC Comptroller Report on Frontline Workers
              </a>{' '}
              <p>
                "...workers whom we trust with our health, our nourishment, our
                loved ones, and our lives are too often ignored, underpaid, and
                overworked..."
              </p>
            </td>
          </tr>
          <tr>
            <td
              style={{
                paddingTop: 20,
              }}
            >
              <a
                href="https://projects.thecity.nyc/covid-19-deaths/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Remembering the New Yorkers We’ve Lost to‌ COVID‑19
              </a>{' '}
              <p>
                ...This is a space to remember and honor every person who
                died...
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </Grid>
  );
};

export default ReferencesTab;
