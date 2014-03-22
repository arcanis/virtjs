#pragma once

#include "Block.hh"
#include "Line.hh"

class GoodBlock : public Block {

public:

                 GoodBlock ( Block * previous );

protected:

    virtual void print     ( Line const & line );
    virtual void end       ( bool isLast );

private:

            bool m_IsLinePrinted;

};
