# MMU

  - [MMU1] Even in CGB mode, the Gameboy allows to write (and read) from these registers. However, they are not used by the LCD display. Some games rely on this behavior; for example, Pokemon Gold palettes won't be correctly copied if you just drop the writes and return 0 everytime.
