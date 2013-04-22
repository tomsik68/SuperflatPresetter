<?php
    $file = fopen("http://minecraft-ids.grahamedgecombe.com/", "r");
    $line = "";
    $id = "";
    $name = "";
    $table = FALSE;
    while(!feof($file)){
        $line = fgets($file);
        if(stristr($line, '<table id="items">') != FALSE){
            $table = TRUE;
            continue;
        }
        if(stristr($line,"</table>") != FALSE){
            $table = FALSE;
            continue;
        }
        if(stristr($line,"<tr") != FALSE || stristr($line,"</tr>") != FALSE)
            continue;
        if($table == TRUE){
            $line = str_replace('</td>', '', $line);
            if(stristr($line,'<td class="id"') != FALSE){
                $id = str_replace('<td class="id">', '', $line);
                $id = str_replace(' ','',$id);  //remove whitespaces
                $id = str_replace(':','_',$id);
                $id = trim(preg_replace('/\s\s+/', ' ', $id));
            }
            if(stristr($line,'<td class="name">') != FALSE){
                $line = str_replace('</a>', '', $line);
                $name = "";
                $i = strlen($line) - 1;
                while($line[$i] != '>'){
                    $name = $line[$i] . $name;
                    --$i;
                }
                $name = trim(preg_replace('/\s\s+/', ' ', $name));
                echo '["' .$id .'","' .$name .'"],'; 
            }
            
        }
    }
    fclose($file);
?>