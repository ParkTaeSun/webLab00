<!DOCTYPE html>
<html>
<head>
    <title>Course list</title>
    <meta charset="utf-8" />
    <link href="courses.css" type="text/css" rel="stylesheet" />
</head>
<body>
<div id="header">
    <h1>Courses at CSE</h1>
<!-- Ex. 1: File of Courses -->
    <?php
        $filename = "courses.tsv";
        $lines = file("courses.tsv");
    ?>
    <p>
        Course list has <?= count($lines)?> total courses
        and
        size of <?= filesize($filename)?> bytes.
    </p>
    
</div>
<div class="article">
    <div class="section">
        <h2>Today's Courses</h2>
<!-- Ex. 2: Today’s Courses & Ex 6: Query Parameters -->
        <?php
            function getCoursesByNumber($listOfCourses, $numberOfCourses){
                $resultArray = array();
//                implement here.
                shuffle($listOfCourses);
                for ($i=0; $i < $numberOfCourses; $i++) { 
                    $resultArray[] = array_pop($listOfCourses);
                }
                return $resultArray;
            }
            $todaysCourses = getCoursesByNumber($lines, 3);
        ?>
        <ol>
            <?php
            foreach ($todaysCourses as $line) {
                print "<li>$line</li>\n";
            }
            ?>
        </ol>
    </div>
    <div class="section">
        <h2>Searching Courses</h2>
<!-- Ex. 3: Searching Courses & Ex 6: Query Parameters -->
        <?php
            function getCoursesByCharacter($listOfCourses, $startCharacter){
                $resultArray = array();
//                implement here.
                for ($i=0; $i < count($listOfCourses); $i++) { 
                    if (substr($listOfCourses[$i], 0, 1) == $startCharacter){
                        $resultArray[] = $listOfCourses[$i];
                    }
                }
                return $resultArray;
            }
            $searchedCourses = getCoursesByCharacter($lines, "C");
        ?>
        <p>
            Courses that started by <strong>'C'</strong> are followings :
        </p>
        <ol>
            <?php
            foreach ($searchedCourses as $line) {
                print "<li>$line</li>\n";
            }
            ?>
        </ol>
    </div>
    <div class="section">
        <h2>List of Courses</h2>
<!-- Ex. 4: List of Courses & Ex 6: Query Parameters -->
        <?php
            function getCoursesByOrder($listOfCourses, $orderby){
                $resultArray = $listOfCourses;
//                implement here.
                if($orderby == 1){
                    sort($resultArray);
                }
                else if($orderby == 2){
                    rsort($resultArray);
                }
                else
                    print "error for ordering. please choose 1 or 2.";
                
                return $resultArray;
            }
            $orderedCourses = getCoursesByOrder($lines, 1);
        ?>
        <p>
            All of courses ordered by <strong>
            <?php
            $order = 1;
            if ($order ==1){
                print "alphabet order";
            }
            else if($order == 2){
                print "alphabet reverse order";
            }
            ?>
        </strong> are followings :
        </p>
        <ol>
            <?php
            foreach ($orderedCourses as $line) {
                print "<li>$line</li>\n";
            }
            ?>
        </ol>
    </div>
    <div class="section">
        <h2>Adding Courses</h2>
<!-- Ex. 5: Adding Courses & Ex 6: Query Parameters -->
        <p>Input course or code of the course doesn't exist.</p>
        <?php
            $newCourse = "ddddd";
            $codeOfCourse = "1231231";
            if(is_null($newCourse) || is_null($codeOfCourse)){
                print "Input course or code of the course doesn't exist.";
            }
            else{
                file_put_contents("courses.tsv", $newCourse, FILE_APPEND);
                file_put_contents("courses.tsv", $codeOfCourse, FILE_APPEND);    
                print "Adding a course is success!";
            }
            
        ?>
    </div>
</div>
<div id="footer">
    <a href="http://validator.w3.org/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-html.png" alt="Valid HTML5" />
    </a>
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-css.png" alt="Valid CSS" />
    </a>
</div>
</body>
</html>