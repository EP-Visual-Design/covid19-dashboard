import React from 'react';
import NumberFormat from 'react-number-format';
import slug from 'slug';

import FlagIcon from '../components/FlagIcon';
import getCountryCode from '../js/getCountryCode';
import StyledCountryDataTable from '../styles/StyledCountryDataTable';

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
  const { items } = props;
  const rows = items.map((country) => {
    const { Country_Region, propValue, propPercent } = country;
    const slugKey = `tr-${slug(Country_Region).toLowerCase()}`;
    const countryCode = getCountryCode(Country_Region);
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
        <td className="percent">{percentFormat(propPercent)}</td>
      </tr>
    );
  });
  return rows;
};

const CountryDataTable = (props) => {
  // const { items, propTitle } = props;
  const { items } = props;
  // console.log('CountryDataTable items', items);
  return (
    <StyledCountryDataTable>
      {/* <thead>
        <tr>
          <th>&nbsp;</th>
          <th>{propTitle}</th>
          <th>&nbsp;</th>
        </tr>
      </thead> */}
      <tbody>
        <Rows items={items} />
      </tbody>
    </StyledCountryDataTable>
  );
};

export default CountryDataTable;
