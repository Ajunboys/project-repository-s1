# Linux Applications(http://www.macs.hw.ac.uk/~hwloidl/Courses/LinuxIntro/x967.html)

 This section discusses some commonly used Linux applications and how they can be used from the command-line. The material in this section focusses on tools needed in courses such as F21CN Computer Network Security, and is in no way complete. For all applications, use the command line options -? or --help to get help, and check the man page (man prgname) or the info page (info prgname) for more detail.

Note	Further reading on applications
 	

For further reading, the book A Practical Guide to Linux Commands, Editors and Shell Programming, by Mark G. Sobell, Prentice Hall, 2012 (ISBN 978-0133085044), covers in Part VI a large number of Linux tools you might find useful when going beyond the basics of Linux usage.
Editors

There is some discussion on editors in the Section called Editing Files. Check the Accessoires section in the top-level menu of your window-manager for a list of available tools.

As a very short overview, to pick the right editor for the right job:

    gedit a simple editor with graphical interface; easy-to-use, part of the Gnome infrastructure;

    emacs the most powerful editor available, with many add-ons from supporting programming language source code, to stand-alone applications, such as an embedded web browser; for serious work this is the editor to use; (see this quick-reference card for emacs)

    vim a simple, very flexible text editor, with a lot of add-ons;

    pico a minimalistic text editor, good for small memory usage, or on slow connections;

    nano a pico clone and GNU software.

    jEdit a powerful graphical editor, with a very active developer community, and excellent integration of external tools (more an IDE than a simple text editor); 

Hex-Editors

In some cases (e.g. in CW1 of F21CN) you may want to edit a non-ASCII file, i.e. a file that contains binary data outside the range of values used to encode letters, digits and such. For this purpose you can use one of the following hex-editors.

As a very short overview, to pick the right editor for the right job:

    emacs can be used as a hex-editor as well. In the editor type M-x hexl-find-file and enter the file name. You will see a screen with the hex-contents of the file. Use your cursor to move to a position that you want to edit. To insert a hex value do C-M-x value or use the Hexl menu. Use C-x C-s to save the file and C-x C-c to exit the editor.

    ghex2 is a simple GUI-based hex editor, available on the Linux machines. The full path is /usr/bin/ghex2.

    shed is a simple hex editor, available on the Linux machines. Call it with the filename to edit as argument, e.g. shed pic_cipher.bmp. Use your cursor to move to a file position and the SPACE key insert a value. Prefix with a number to edit that many bytes. Documentation is available via a man-page, i.e. man shed. The full path is /usr/bin/shed. 

GNU Coreutils

GNU coreutils is a selection of basic utilities for working with text, files and other operating system concepts (such as processes). For more information on all the tools provided by this package, type info coreutils or refer to the online documentation.
Compilers

Gnu C compiler collection

The GNU versions of compilers for the languages C, C++, Objective-C, and Fortran all come with the GCC compiler collection. Some information on basic GCC usage is given on these slides. For details see the GCC documentation.

For example, to compile a C program hello.c and generate an executable hello do the following (-O turns on optimisation, which you want in most cases):


$ gcc -O -o hello hello.c

Now you can execute the program like this:


$ ./hello

The GHC Haskell compiler

For compiling Haskell programs, use ghc. For details see the GHC documentation.

For example, to compile a Haskell program hello.hs and generate an executable hello do the following (-O turns on optimisation, which you want in most cases):


$ ghc -O -o hello hello.c

Now you can execute the program like this:


$ ./hello

To try out some Haskell programs, you can use the Haskell interpreter ghci, which gives you an interactive shell:


$ ghci 
GHCi, version 7.0.4: http://www.haskell.org/ghc/  :? for help
Loading package ghc-prim ... linking ... done.
Loading package integer-gmp ... linking ... done.
Loading package base ... linking ... done.
Prelude> sum [1..5]
15
Prelude> :quit
$

Python

There are two versions of the Python interpreter available, python2 and python3, matching the Versions 2.6.6 and 3.3.5 of the language. Start one of them like this:


$ python3

For interactive usage, the ipython is more convenient, providing interactive help and colour highlighting:


$ ipython 
Python 2.6.6 (r266:84292, Jan 22 2014, 09:42:36) 
Type "copyright", "credits" or "license" for more information.

IPython 0.13.2 -- An enhanced Interactive Python.
?         -> Introduction and overview of IPython's features.
%quickref -> Quick reference.
help      -> Python's own help system.
object?   -> Details about 'object', use 'object??' for extra details.

In [1]: 

Gnu Debugger

A powerful tool for debugging C programs is gdb. In order to use it, you must compile the C program with option -g and then prefix the call of the binary with gdb, i.e.


$ gcc -g -o hello_dbg hello.c
$ gdb hello_dbg 

Basic gdb usage is described on these slides and details can be in the gdb documentation. 