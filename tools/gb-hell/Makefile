ROM	= hell.gb
OBJECTS	= $(ROM:.gb=.o)
SOURCES	= $(OBJECTS:.o=.asm)

TESTS	= $(shell find sources/tests -type f)

all:		$(ROM)

$(ROM):		$(OBJECTS)
		rgblink -o $@ $^
		rgbfix -m 0 $@

%.o:		%.asm
		rgbasm -o $@ $^

hell.asm:	sources/compile.js sources/prologue.jinja sources/epilogue.jinja $(TESTS)
		node sources/compile.js sources/prologue.jinja $(TESTS) sources/epilogue.jinja > $@

clean:
		rm -f $(SOURCES) $(OBJECTS)

fclean:		clean
		rm -f $(ROM)

re:		fclean all

.PHONY:		all clean fclean re
