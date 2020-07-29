import React from 'react';
import NumberFormat from 'react-number-format';
import slug from 'slug';

import FlagIcon from '../components/FlagIcon';
import getCountryCode from '../js/getCountryCode';
import StyledCountryDataTable from '../styles/StyledCountryDataTable';
import { colorfor } from '../graph/colors';

function percentFormat(num) {
  // num = Math.round((val / stats_total) * 1000) / 10;
  let ndigits = 1;
  if (num) {
    if (num < 0.01) ndigits = 3;
    if (num < 0.0001) ndigits = 6;
  }
  return Number(num).toLocaleString(undefined, {
    style: 'percent',
    minimumFractionDigits: ndigits,
    maximumFractionDigits: ndigits,
  });
}

const Rows = (props) => {
  const { items, nslices } = props;
  const rows = items.map((country, index) => {
    const { Country_Region, propValue, propPercent } = country;
    const slugKey = `tr-${slug(Country_Region).toLowerCase()}`;
    const countryCode = getCountryCode(Country_Region);
    let style = null;
    if (index < nslices - 1) {
      const color = colorfor(index);
      style = { backgroundColor: color };
    } else if (nslices > 0) {
      const color = colorfor(nslices - 1);
      style = { backgroundColor: color };
    }
    return (
      <tr key={slugKey}>
        <td className="region">
          {countryCode ? <FlagIcon code={countryCode.toLowerCase()} /> : null}
          {Country_Region}
        </td>
        <td className="value">
          <NumberFormat
            value={propValue}
            displayType={'text'}
            thousandSeparator={true}
          />
        </td>
        <td className="percent" style={style}>
          {percentFormat(propPercent)}
        </td>
      </tr>
    );
  });
  return rows;
};

const CountryDataTable = (props) => {
  const { items, propTitle, pie_data } = props;
  const pieslices = pie_data[0].slices;
  console.log('pieslices.length', pieslices.length);
  // const { items } = props;
  // console.log('CountryDataTable items', items);
  return (
    <StyledCountryDataTable>
      <thead>
        <tr>
          {/* <th width="60%">Region</th> */}
          <th>Region</th>
          <th>{propTitle}</th>
          <th width="10%">Percent</th>
        </tr>
      </thead>
      <tbody>
        <Rows items={items} nslices={pieslices.length} />
      </tbody>
    </StyledCountryDataTable>
  );
};

export default CountryDataTable;
