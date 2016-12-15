import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.zip.CRC32;
import java.util.zip.CheckedOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
 




import com.vvwork.client.net.basic.rest.user.UserResource;
import com.vvwork.common.VvWorkClientException;
import com.vvwork.common.utils.TimestampUtil;

public class ZipService {
	
	List<UserResource> filelist = null;
	
	public List<UserResource> getFiles(File driveFile, File dir) {
        File[] files = dir.listFiles();
        if (files != null && files.length > 0) {
        	for (File file : files) {
        		if (file.isDirectory()) { 
                	getFiles(driveFile, file); 
                } else if (file.isFile()) { 
                	if(filelist != null){
                		String path = file.getAbsolutePath().substring(driveFile.getAbsolutePath().length(), file.getAbsolutePath().length());
                		filelist.add(new UserResource(path, file.getName()));
                	}
                } else {
                    continue;
                }
			}
        }
        return filelist;
    }
	
	public void zipDataBackUp(String dataSourceDir, String targetDir) throws IOException{
		final byte[] UTF8_BOM = {(byte)0xEF, (byte)0xBB, (byte)0xBF};
		File targetDirFile = new File(targetDir);
		if (!targetDirFile.exists()) {
			targetDirFile.mkdirs();
		}
		String targetFile = "vvwork_db_" + TimestampUtil.getTimeInTime() + ".zip";
		OutputStream output = new FileOutputStream(targetFile);
		ZipOutputStream zipOutputStream = new ZipOutputStream(output );
		zipOutputStream.putNextEntry(new ZipEntry("vvwork_db"));
		
		BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(zipOutputStream);
	}
	
   static final int BUFFER = 8192;     
   static final byte[] UTF8_BOM = {(byte)0xEF, (byte)0xBB, (byte)0xBF};
    private File zipFile;     
    
    public DBDataBackUpService(String pathname){
    	File zipFileDir = new File(pathname);
    	if (!zipFileDir.exists()) {
			zipFileDir.mkdir();
		}
    	File readMe = new File(zipFileDir.getAbsolutePath() + File.separator + "README.txt");
    	if (!readMe.exists()) {
			try {
				FileOutputStream fileOutputStream = new FileOutputStream(readMe);
				BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream);
				bufferedOutputStream.write(("如果有需要数据恢复, 请拷贝解压后的文件夹vvwork_db覆盖掉现有的数据文件所在目录:安装目录\\data_db\\vvwork_db").getBytes("UTF-8"));
				bufferedOutputStream.flush();
				bufferedOutputStream.close();
				fileOutputStream.close();
			} catch (FileNotFoundException e) {
			} catch (UnsupportedEncodingException e) {
			} catch (IOException e) {
			}
			
		}
    	String zipFilePath = zipFileDir.getAbsolutePath() + File.separator + "vvwork_db_" + TimestampUtil.getTimeInTime() + ".zip";
    	zipFile = new File(zipFilePath);
    	
    }
       
    @SuppressWarnings("null")
	public void compress(String... pathName) throws VvWorkClientException {   
        ZipOutputStream out = null;     
        try {    
            FileOutputStream fileOutputStream = new FileOutputStream(zipFile);     
            CheckedOutputStream cos = new CheckedOutputStream(fileOutputStream,     
                    new CRC32());     
//            pathName[pathName.length] = zipFile.getParentFile().getAbsolutePath() + File.separator + "README.txt";
            String basedir = "";   
            for (int i = 1; i < pathName.length; i++){  
            	System.err.println(pathName[i]);
                compress(new File(pathName[i]), out, basedir);     
            }  
            out.flush();
			out.finish();
			out.close();
        } catch (Exception e) {     
            throw new VvWorkClientException(e);     
        }   
    }     
    public void compress(String srcPathName) throws VvWorkClientException {     
        File file = new File(srcPathName);     
        if (!file.exists())     
            throw new VvWorkClientException(srcPathName + "不存在！");     
        try {     
            FileOutputStream fileOutputStream = new FileOutputStream(zipFile);     
            CheckedOutputStream cos = new CheckedOutputStream(fileOutputStream,     
                    new CRC32());     
            ZipOutputStream out = new ZipOutputStream(cos);     
            String basedir = "";     
            compress(file, out, basedir);     
            out.close();     
        } catch (Exception e) {     
            throw new VvWorkClientException(e);     
        }     
    }     
    
    private void compress(File file, ZipOutputStream out, String basedir) throws VvWorkClientException {     
       if (file.isDirectory()) {         
            this.compressDirectory(file, out, basedir);     
        } else {        
            this.compressFile(file, out, basedir);     
        }     
    }     

   
    private void compressDirectory(File dir, ZipOutputStream out, String basedir) throws VvWorkClientException {     
        if (!dir.exists())     
            return;     
    
        File[] files = dir.listFiles();     
        for (int i = 0; i < files.length; i++) {     
            compress(files[i], out, basedir + dir.getName() + "/");     
        }     
    }     

   
    private void compressFile(File file, ZipOutputStream out, String basedir) throws VvWorkClientException {     
        if (!file.exists()) {     
            return;     
        }     
        try {     
            BufferedInputStream bis = new BufferedInputStream(     
                    new FileInputStream(file));     
            ZipEntry entry = new ZipEntry(basedir + file.getName());     
            out.putNextEntry(entry);     
            int count;     
            byte data[] = new byte[BUFFER];     
            while ((count = bis.read(data, 0, BUFFER)) != -1) {     
                out.write(data, 0, count);     
            }     
            bis.close();     
            out.closeEntry();
        } catch (Exception e) {     
            throw new VvWorkClientException(e);     
        }     
    } 
    
    public static void main(String[] args) {
    	String targetPath = "C:\\zip\\data_db";
    	String resourcePath = "C:\\mysql\\data_db\\vvwork_db";
    	ZipService zipService = new ZipService(targetPath);
		try {
			zipService.compress(resourcePath);
		} catch (VvWorkClientException e) {
			 
		}
	}

}
