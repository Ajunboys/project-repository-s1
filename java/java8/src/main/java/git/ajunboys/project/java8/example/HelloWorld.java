package git.ajunboys.project.java8.example;

public class HelloWorld {
	
	public static void runThreadUseInnerClass(){
		Runnable runnable = () -> {
			int i = 0;
			while (i < 10) {
				
				System.out.println("Inner Class:["+System.currentTimeMillis() + "]:Hello world");
				
				i++;
				
				try {
					Thread.currentThread().sleep(1000L);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

		};
		
		new Thread(runnable).start();
	}
	
	public static void runThreadUseLambda(){
		new Thread(() -> {
			int i = 0;
			while (i < 10) {
				
				System.out.println("Lambda Class:["+System.currentTimeMillis() + "]:Hello world");
				
				i++;
				
				try {
					Thread.currentThread().sleep(1000L);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

		}).start();
	}
	
	@SuppressWarnings("static-access")
	public static void main(String[] args) {
		HelloWorld.runThreadUseInnerClass();
		
		HelloWorld.runThreadUseLambda();
	}
}
