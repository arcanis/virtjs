# gb-hell

## Description

Compiles a *hell.gb* file (GameBoy ROM) based on a template. This ROM test a large panel of instructions, and plays nicely with the [cpu-diff](https://github.com/arcanis/Virt.js/tree/master/tools/cpu-diff) utility. It doesn't print anything on screen, so you pretty much have to print the registers before each instruction, and use this output with a diff tool.

## Why ?

Blargg's tests are awesomes and much more comprehensives that this rom, but I wanted to be able to quickly see the differences between an expected output and the one that Virt.js was producing. Blargg's roms weren't able to do this due to some synchronicity issues - since it was using a graphical display, it was looping over some values which weren't perfectly synced between Virt.js and my reference emulator (gambatte), most notably the LY.

This rom is imo a good way to quickly find a large panel of bugs, before using Blargg's roms for thorough validations.
