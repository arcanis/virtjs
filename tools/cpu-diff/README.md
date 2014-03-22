# cpu-diff

    $> cpu-diff [--exclude <addresses>] <data file> <control file>

## Description

The `cpu-diff` utility is used to compare two CPU execution logs, formatted as such :

    word1 word2 word3 word4
    word1 word2 word3 word4
    word1 word2 word3 word4
    word1 word2 word3 word4
    word1 word2 word3 word4

## Example

Let's assume the following two text files :

### execution.log

    word1 word2 word3 word4
    word1 word2 word3 word4
    word1 word2 word6 word4
    word1 word2 word3 word4
    word1 word2 word3 word4

### control.log

    word1 word2 word3 word4
    word1 word2 word3 word4
    word1 word2 word3 word4
    word1 word2 word3 word4
    word1 word2 word3 word4

### cpu-diff output

![](http://i.imgur.com/5zjYy1c.png)

Compare this two the output of [diff](http://sprunge.us/IBYU) or [wdiff](http://sprunge.us/eiYG), I personally find cpu-diff more attractive.

## Syncing

But ! We're talkin about CPU diff here, and it sometimes involves clock management. The emulator system and the control system may be sometimes desynced. In such case, it can be very hard to resync the two of them in a standard diff. cpu-diff doesn't do miracles, but tries to prevent this as much as possible. In order to do this, it simply looks for the next line watching perfectly **when the second column doesn't match anymore** (not the first one, the second one). Here is an exemple :

### execution.log

[Click here](http://sprunge.us/NcUN)

### control.log

[Click here](http://sprunge.us/dSjK)

### cpu-diff output

![](http://i.imgur.com/UQhKWqn.png)

Again, look at the output of [diff](http://sprunge.us/haEM) and [wdiff](http://sprunge.us/HOVB). I still give my voice to cpu-diff.

## Exclude addresses

Sometimes, you want to completely ignore some addresses. In order to do this, the command line accepts a `--exclude` option, which takes a comma-separated string as parameter. Each 'address' contained in this list will be plainly ignored in the diff (including while desyncing / syncing the two files).
