var _ = require('lodash');

/*
 * Return true if a record has all of LON, LAT, NUMBER and STREET defined
 */
function isValidCsvRecord( record ){
  return hasAllProperties(record) &&
          !streetContainsExclusionaryWord(record);
}

/*
 * Return false if record.STREET contains literal word 'NULL', 'UNDEFINED',
 * or 'UNAVAILABLE' (case-insensitive)
*/
function streetContainsExclusionaryWord(record) {
  return (/\b(NULL|UNDEFINED|UNAVAILABLE)\b/i.test(record.Street1)
          && /\b(NULL|UNDEFINED|UNAVAILABLE)\b/i.test(record.Street2)); 
}

function hasAllProperties(record) {
  return [ 'LON', 'LAT','NodeID', 'Street1', 'Street2' ].every(function(prop) {
    return record[ prop ] && record[ prop ].length > 0;
  });
}

module.exports = isValidCsvRecord;
