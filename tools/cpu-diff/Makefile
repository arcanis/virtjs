BIN		= cpu-diff

SOURCES		= $(shell find sources -name '*.cc')
OBJECTS		= $(SOURCES:.cc=.o)

CXX		= clang++
CXXFLAGS	= -std=c++11 -Iincludes -O3 -g
LDFLAGS		= -lboost_program_options

all:	$(BIN)

$(BIN):	$(OBJECTS)
	$(CXX) $(LDFLAGS) -o $@ $^

%.o:	%.cc
	$(CXX) $(CXXFLAGS) -c -o $@ $^

clean:
	rm -f $(OBJECTS)

fclean: clean
	rm -f $(BIN)

re: fclean all

.PHONY: all clean fclean re
