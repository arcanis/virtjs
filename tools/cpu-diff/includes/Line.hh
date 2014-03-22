#pragma once

#include <tuple>

#include "PartSet.hh"
#include "String.hh"

using Line = std::tuple< String, PartSet, PartSet >;

#define GET_PREFIX( line )  std::get< 0 >( line )
#define GET_DATA( line )    std::get< 1 >( line )
#define GET_CONTROL( line ) std::get< 2 >( line )
