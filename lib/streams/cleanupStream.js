var through2 = require( 'through2' );
var _ = require('lodash');

var cleanup = require( '../cleanup' );

/*
 * create a stream that performs any needed cleanup on a record
 */

function createCleanupStream() {
  return through2.obj(function( record, enc, next ) {
    record.Street1 = cleanup.streetName( record.Street1);
    record.Street2 = cleanup.streetName( record.Street2);

    // csvParse will only trim unquoted fields
    // so we have to do it ourselves to handle all whitespace
    Object.keys(record).forEach(function(key) {
      if (typeof record[key].trim === 'function') {
        record[key] = record[key].trim();
      }
    });

    next(null, record);
  });
}

module.exports = {
  create: createCleanupStream
};
