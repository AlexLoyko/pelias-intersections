'use strict';

const through = require( 'through2' );

const peliasModel = require( 'pelias-model' );

/*
 * Create a stream of Documents from valid, cleaned CSV records
 */
function createDocumentStream(id_prefix, stats) {
  /**
   * Used to track the UID of individual records passing through the stream if
   * there is no HASH that can be used as a more unique identifier.  See
   * `peliasModel.Document.setId()` for information about UIDs.
   */

  return through.obj(
    function write( record, enc, next ){

      try {
        const addrDoc = new peliasModel.Document( 'openstreetmap', 'intersection', record.NodeID )
        .setName( 'default', (record.Street1 + ' & ' + record.Street2) )
        .setCentroid( { lon: record.LON, lat: record.LAT } );

//        addrDoc.setAddress( 'street', record.STREET );

        this.push( addrDoc );
      }
      catch ( ex ){
        stats.badRecordCount++;
      }

      next();
    }
  );
}

module.exports = {
  create: createDocumentStream
};
