# Instructions

  - **[CPU1]** The EI instruction effects are delayed from a few cycles, which mean that the interruption are actually triggered after executing the next instruction. It doesn't happen for DI and RETI, which are executed instantly.
  - **[CPU2]** The interrupts have a 20 cycle duration (not 16, like RST)

# GPU

  - **[GPU1]** When in VRAM mode, the GPU will reset the Ly register early - it will stay at the 153 value for a few cycles, before being reset to 0 for the remaining of the mode. That's why the environment has gpuLy **and** gpuLine : gpuLine is the actual processed line, and gpuLy is the reported line (available from $FF41).

# MMU

  - **[MMU1]** Even in CGB mode, the Gameboy allows to write (and read) from these registers. However, they are not used by the LCD display. Some games rely on this behavior; for example, Pokemon Gold palettes won't be correctly copied if you just drop the writes and return 0 everytime.

# Hard roms

These rom have been mentioned on #gbdev as being extremely difficult to get right, due to the use of hardware hacks.

  - Smurfs (Halt bug)
  - Gauntlet 2 (Speech)
  - Ant soldiers (graphics fuckup due to window)
  - Super Chase HQ (road not scrolling properly)
  - Mr Do (locked up after intro screen)
  - gejmboj (demo) (all sorts of fucked up things here)
  - Dr Franken (one scanline of corrupt graphics under "II" on title screen (window issue))
  - Fifa Soccer 97, Hercules, Road Rash, Q*bert 2 (interrupt things)
  - Chuck Rock, Montezuma's Return, and Reservoir Rat (same game engine, weird interrupt issues)
  - Hook (locks up on title screen)
  - Altered Space (lots of issues)
