#pragma once

#include <list>
#include <memory>

#include "PartSet.hh"
#include "Stream.hh"
#include "String.hh"
#include "SyncInfo.hh"

class SyncSolver {

public:

                                SyncSolver        ( Stream & data, Stream & control );

public:

                           void exclude           ( std::vector< String > const & exclusionList );
                           void run               ( void );

protected:

                   // Called whenever the streams are desynced
                   virtual void desynced          ( int index, PartSet const & data, PartSet const & control, bool resynced ) { }

                   // Called whenever two a line can be compared
                   virtual void compare           ( int index, PartSet const & data, PartSet const & control ) { }

                   // Called whenever it won't be possible to perform any more comparison
                   virtual void close             ( void ) { }

private:

                           bool next              ( void );
                           bool resync            ( void );

private:

                           bool readParts         ( Stream & stream, PartSet & destination );
                           bool readBufferedParts ( std::list< PartSet > & buffer, Stream & stream, PartSet & destination );

private:

    std::unique_ptr< SyncInfo > getSyncInfo       ( std::list< PartSet > const & a, std::list< PartSet > const & b ) const;
    std::unique_ptr< SyncInfo > fetchSyncInfo     ( std::list< PartSet > & aBuffer, Stream & aStream, std::list< PartSet > & bBuffer, Stream & bStream );

private:

                            int m_LineIndex;

                       Stream & m_DataStream;
                       Stream & m_ControlStream;

           std::list< PartSet > m_DataBuffer;
           std::list< PartSet > m_ControlBuffer;

          std::vector< String > m_ExclusionList;

};
