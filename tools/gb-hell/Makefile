ROM	= hell.gb
OBJECTS	= $(ROM:.gb=.o)
SOURCES	= $(OBJECTS:.o=.asm)

all:		$(ROM)

$(ROM):		$(OBJECTS)
		rgblink -o $@ $^
		rgbfix -m 0 $@

%.o:		%.asm
		rgbasm -o $@ $^

hell.asm:	hell.js hell.jinja
		node hell.js > $@

clean:
		rm -f $(SOURCES) $(OBJECTS)

fclean:		clean
		rm -f $(ROM)

re:		fclean all

.PHONY:		all clean fclean re
