#[Looking Around](http://linuxcommand.org/lc3_lts0030.php)
Now that you know how to move from working directory to working directory, we're going to take a tour of your Linux system and, along the way, learn some things about what makes it tick. But before we begin, I have to teach you some tools that will come in handy during our adventure. These are:

    ls (list files and directories)
    less (view text files)
    file (classify a file's contents)

ls

The ls command is used to list the contents of a directory. It is probably the most commonly used Linux command. It can be used in a number of different ways. Here are some examples:

Examples of the ls command 
<table cellpadding="8" border="" summary="Table containing examples of the ls command.">
	<caption>
		Examples of the ls command
	</caption>

	<tbody><tr>
		<th width="150" valign="top">
		<strong>Command</strong></th>

		<th><strong>Result</strong></th>
	</tr>

	<tr>
		<td><tt class="user">ls</tt></td>

		<td valign="top">
		<p>List the files in the working
		directory</p>
		</td>
	</tr>

	<tr>
		<td width="150" valign="top"><tt class="user">ls /bin</tt></td>

		<td valign="top">
		<p>List the files in the /bin directory (or
		any other directory you care to specify)</p>
		</td>
	</tr>

	<tr>
		<td width="150" valign="top"><tt class="user">ls -l</tt></td>

		<td valign="top">
		<p>List the files in the working directory in
		long format</p>
		</td>
	</tr>

	<tr>
		<td width="150" valign="top"><tt class="user">ls -l /etc /bin</tt></td>

		<td valign="top">
		<p>List the files in the /bin directory and
		the /etc directory in long format</p>
		</td>
	</tr>

	<tr>
		<td width="150" valign="top"><tt class="user">ls -la ..</tt></td>

		<td valign="top">
		<p>List all files (even ones with names
		beginning with a period character, which are
		normally hidden) in the parent of the working
		directory in long format</p>
		</td>
	</tr>
</tbody></table>

These examples also point out an important concept about commands. Most commands operate like this:

    command -options arguments

where command is the name of the command, -options is one or more adjustments to the command's behavior, and arguments is one or more "things" upon which the command operates.

In the case of ls, we see that ls is the name of the command, and that it can have one or more options, such as -a and -l, and it can operate on one or more files or directories.
A Closer Look At Long Format

If you use the -l option with ls, you will get a file listing that contains a wealth of information about the files being listed. Here's an example:


-rw-------   1 bshotts  bshotts       576 Apr 17  1998 weather.txt
drwxr-xr-x   6 bshotts  bshotts      1024 Oct  9  1999 web_page
-rw-rw-r--   1 bshotts  bshotts    276480 Feb 11 20:41 web_site.tar
-rw-------   1 bshotts  bshotts      5743 Dec 16  1998 xmas_file.txt

----------     -------  -------  -------- ------------ -------------
    |             |        |         |         |             |
    |             |        |         |         |         File Name
    |             |        |         |         |
    |             |        |         |         +---  Modification Time
    |             |        |         |
    |             |        |         +-------------   Size (in bytes)
    |             |        |
    |             |        +-----------------------        Group
    |             |
    |             +--------------------------------        Owner
    |
    +----------------------------------------------   File Permissions

File Name
    The name of the file or directory.
Modification Time
    The last time the file was modified. If the last modification occurred more than six months in the past, the date and year are displayed. Otherwise, the time of day is shown.
Size
    The size of the file in bytes.
Group
    The name of the group that has file permissions in addition to the file's owner.
Owner
    The name of the user who owns the file.
File Permissions
    A representation of the file's access permissions. The first character is the type of file. A "-" indicates a regular (ordinary) file. A "d" indicates a directory. The second set of three characters represent the read, write, and execution rights of the file's owner. The next three represent the rights of the file's group, and the final three represent the rights granted to everybody else. I'll discuss this in more detail in a later lesson.

less

less is a program that lets you view text files. This is very handy since many of the files used to control and configure Linux are human readable.
What is "text"?

There are many ways to represent information on a computer. All methods involve defining a relationship between the information and some numbers that will be used to represent it. Computers, after all, only understand numbers and all data is converted to numeric representation.

Some of these representation systems are very complex (such as compressed multimedia files), while others are rather simple. One of the earliest and simplest is called ASCII text. ASCII (pronounced "As-Key") is short for American Standard Code for Information Interchange. This is a simple encoding scheme that was first used on Teletype machines to map keyboard characters to numbers.

Text is a simple one-to-one mapping of characters to numbers. It is very compact. Fifty characters of text translates to fifty bytes of data. Throughout a Linux system, many files are stored in text format and there are many Linux tools that work with text files. Even the legacy operating systems recognize the importance of this format. The well-known NOTEPAD.EXE program is an editor for plain ASCII text files.

The less program is invoked by simply typing:

less text_file

This will display the file.
Controlling less

Once started, less will display the text file one page at a time. You may use the Page Up and Page Down keys to move through the text file. To exit less, type "q". Here are some commands that less will accept:

Keyboard commands for the less program 

<table cellpadding="8" border="" summary="Table containing summary of keyboard commands for the less program.">
	<caption>
		Keyboard commands for the less program
	</caption>

	<tbody><tr>
		<th valign="top"><strong>Command</strong></th>

		<th valign="top"><strong>Action</strong></th>
	</tr>

	<tr>
		<td valign="top">
		<p>Page Up or b</p>
		</td>

		<td valign="top">
		<p>Scroll back one page</p>
		</td>
	</tr>

	<tr>
		<td valign="top">
		<p>Page Down or space</p>
		</td>

		<td valign="top">
		<p>Scroll forward one page</p>
		</td>
	</tr>

	<tr>
		<td valign="top">
		<p>G</p>
		</td>

		<td valign="top">
		<p>Go to the end of the text file</p>
		</td>
	</tr>

	<tr>
		<td valign="top">
		<p>1G</p>
		</td>

		<td valign="top">
		<p>Go to the beginning of the text file</p>
		</td>
	</tr>

	<tr>
		<td valign="top">
		<p>/<i>characters</i></p>
		</td>

		<td valign="top">
		<p>Search forward in the text file for an
		occurrence of the specified
		<i>characters</i></p>
		</td>
	</tr>

	<tr>
		<td valign="top">
		<p>n</p>
		</td>

		<td valign="top">
		<p>Repeat the previous search</p>
		</td>
	</tr>

	<tr>
		<td valign="top">
		<p>h</p>
		</td>

		<td valign="top">
		<p>Display a complete list less commands and options</p>
		</td>
	</tr>
	
	<tr>
		<td valign="top">
		<p>q</p>
		</td>

		<td valign="top">
		<p>Quit</p>
		</td>
	</tr>
</tbody></table>

file

As you wander around your Linux system, it is helpful to determine what kind of data a file contains before you try to view it. This is where the file command comes in. file will examine a file and tell you what kind of file it is.

To use the file program, just type:

file name_of_file

The file program can recognize most types of files, such as:
<table cellpadding="8" border="" summary="Table describing various types of files.">
	<caption>
		Various kinds of files
	</caption>

	<tbody><tr>
		<th valign="top"><strong>File Type</strong></th>

		<th valign="top"><strong>Description</strong></th>

		<th valign="top"><strong>Viewable as
		text?</strong></th>
	</tr>

	<tr>
		<td valign="top">
		<p>ASCII text</p>
		</td>

		<td valign="top">
		<p>The name says it all</p>
		</td>

		<td valign="top">
		<p>yes</p>
		</td>
	</tr>

	<tr>
		<td valign="top">
		<p>Bourne-Again shell script text</p>
		</td>

		<td valign="top">
		<p>A <tt class="user">bash</tt> script</p>
		</td>

		<td valign="top">
		<p>yes</p>
		</td>
	</tr>

	<tr>
		<td valign="top">
		<p>ELF 32-bit LSB core file</p>
		</td>

		<td valign="top">
		<p>A core dump file (a program will create
		this when it crashes)</p>
		</td>

		<td valign="top">
		<p>no</p>
		</td>
	</tr>

	<tr>
		<td valign="top">
		<p>ELF 32-bit LSB executable</p>
		</td>

		<td valign="top">
		<p>An executable binary program</p>
		</td>

		<td valign="top">
		<p>no</p>
		</td>
	</tr>

	<tr>
		<td valign="top">
		<p>ELF 32-bit LSB shared object</p>
		</td>

		<td valign="top">
		<p>A shared library</p>
		</td>

		<td valign="top">
		<p>no</p>
		</td>
	</tr>

	<tr>
		<td valign="top">
		<p>GNU tar archive</p>
		</td>

		<td valign="top">
		<p>A tape archive file. A common way of
		storing groups of files.</p>
		</td>

		<td valign="top">
		<p>no, use <tt class="user">tar tvf</tt> to
		view listing.</p>
		</td>
	</tr>

	<tr>
		<td valign="top">
		<p>gzip compressed data</p>
		</td>

		<td valign="top">
		<p>An archive compressed with <tt class="user">gzip</tt></p>
		</td>

		<td valign="top">
		<p>no</p>
		</td>
	</tr>

	<tr>
		<td valign="top">
		<p>HTML document text</p>
		</td>

		<td valign="top">
		<p>A web page</p>
		</td>

		<td valign="top">
		<p>yes</p>
		</td>
	</tr>

	<tr>
		<td valign="top">
		<p>JPEG image data</p>
		</td>

		<td valign="top">
		<p>A compressed JPEG image</p>
		</td>

		<td valign="top">
		<p>no</p>
		</td>
	</tr>

	<tr>
		<td valign="top">
		<p>PostScript document text</p>
		</td>

		<td valign="top">
		<p>A PostScript file</p>
		</td>

		<td valign="top">
		<p>yes</p>
		</td>
	</tr>

	<tr>
		<td valign="top">
		<p>RPM</p>
		</td>

		<td valign="top">
		<p>A Red Hat Package Manager archive</p>
		</td>

		<td valign="top">
		<p>no, use <tt class="user">rpm -q</tt> to
		examine contents.</p>
		</td>
	</tr>

	<tr>
		<td valign="top">
		<p>Zip archive data</p>
		</td>

		<td valign="top">
		<p>An archive compressed with <tt class="user">zip</tt></p>
		</td>

		<td valign="top">
		<p>no</p>
		</td>
	</tr>
</tbody></table>


While it may seem that most files cannot be viewed as text, you will be surprised how many can. This is especially true of the important configuration files. You will also notice during our adventure that many features of the operating system are controlled by shell scripts. In Linux, there are no secrets!