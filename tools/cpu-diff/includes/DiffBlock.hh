#pragma once

#include <memory>

#include "Block.hh"
#include "Line.hh"
#include "PartSet.hh"
#include "String.hh"

class DiffBlock : public Block {

public:

                            DiffBlock ( Block * previous );

protected:

    virtual void            print     ( Line const & line );
    virtual void            end       ( bool isLast );

private:

    void                    printDiff ( String const & prefix, PartSet const & data, PartSet const & control, String const & color ) const;

private:

    std::unique_ptr< Line > m_StolenLine;
    String                  m_StoredPrefix;

};
