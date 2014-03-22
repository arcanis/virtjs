#pragma once

#include <vector>

#include "Line.hh"

class Block {

public:

                           Block ( void );

public:

                      void add   ( Line const & line );

public:

              virtual void begin ( void )              { }
              virtual void end   ( bool isLast )       { }

protected:

              virtual void print ( Line const & line ) { }

public:

    enum { PRINT, BUFFER } m_Mode;
       std::vector< Line > m_Buffer;

};
