public class Solution{
    public static void repeatNumberedAlphabet(String str){
        String s = str.toLowerCase(); 
        for (int i=0; i < s.length(); i++){
            if (s.charAt(i) == ' '){
                System.out.println(); 
                System.out.println(); 
            }
            else {
                int repeat = s.charAt(i) -'a'; 
                System.out.println(repeat+1);
                for (int j=0; j <= repeat; j++){
                    System.out.print(str.charAt(i));
                }
                System.out.println();
            }
        }
        System.out.println(); 
        System.out.println(); 
    }
    
    public static void main(String[] args) { 
        repeatNumberedAlphabet("Foundary Spatial"); 
        repeatNumberedAlphabet("Intro Python Algo"); 
    } 
}




