/* Hello world program in C */
#include <stdio.h>
#include <unistd.h>

int main(){
	char  name[80];
	gethostname(name, 80);
	printf("Hello world! \n This is running on machine %s \n", name);
	return 0;
}