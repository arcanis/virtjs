ROM	= hell.gb
OBJECTS	= $(ROM:.gb=.o)
SOURCES	= $(OBJECTS:.o=.asm)

COMPILE	= $(shell find sources -name '*.js')
TESTS	= $(shell find sources/tests -type f)

all:		$(ROM)

$(ROM):		$(OBJECTS)
		rgblink -o $@ $^
		rgbfix -m 0 $@

%.o:		%.asm
		rgbasm -o $@ $^

hell.asm:	$(COMPILE) sources/prologue.jinja sources/epilogue.jinja $(TESTS)
		node sources/compile.js sources/prologue.jinja $(TESTS) sources/epilogue.jinja > $@

clean:
		rm -f $(SOURCES) $(OBJECTS)

fclean:		clean
		rm -f $(ROM)

re:		fclean all

.PHONY:		all clean fclean re
