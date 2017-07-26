package git.ajunboys.project.java8.example;

public class HelloWorld {
	@SuppressWarnings("static-access")
	public static void main(String[] args) {
		Runnable runnable = () -> {
			int i = 0;
			while (i < 10) {
				
				System.out.println("["+System.currentTimeMillis() + "]:Hello world");
				
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
}
