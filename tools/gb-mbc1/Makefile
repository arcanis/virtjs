ROM	= mbc1.gb
OBJECTS	= $(ROM:.gb=.o)
SOURCES	= $(OBJECTS:.o=.asm)

COMPILE	= $(shell find sources -name '*.js')

all:		$(ROM)

$(ROM):		$(OBJECTS)
		rgblink -o $@ $^
		rgbfix -m 3 -r 3 $@

%.o:		%.asm
		rgbasm -o $@ $^

mbc1.asm:	$(COMPILE) sources/prologue.jinja sources/rom.jinja
		node sources/compile.js sources/prologue.jinja sources/rom.jinja > $@

clean:
		rm -f $(SOURCES) $(OBJECTS)

fclean:		clean
		rm -f $(ROM)

re:		fclean all

.PHONY:		all clean fclean re
