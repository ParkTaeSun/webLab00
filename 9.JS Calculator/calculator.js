"use strict"
var stack = [];
window.onload = function () {
    var displayVal = "0";
    var first_flag = 0;
    var dec_flag = 0;
    var error_flag = 0;

    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            if(first_flag == 0){
                first_flag = 1;
                $('expression').innerHTML = "0";
            }
            var value = $(this).innerHTML;
            
            if(0<=value && value<=9 && error_flag == 0){
                if(value == 0 && stack[stack.length-1]==")"){

                }
                else{
                    if(stack[stack.length-1]==")"){
                        stack.push("*");
                    }
                    stack.push(value);
                    if(displayVal != "0"){
                        displayVal = displayVal + value;
                        $('result').innerHTML = displayVal;
                        $('expression').innerHTML += value;
                    }
                    else{
                        displayVal = value;
                        $('result').innerHTML = displayVal;
                        if($('expression').innerHTML == "0"){
                            $('expression').innerHTML = value;    
                        }
                        else{
                            $('expression').innerHTML += value;       
                        }
                    }
                }
            }
            else if(value == "AC"){
                first_flag = 0;
                dec_flag = 0;
                error_flag = 0;
                displayVal = "0";
                stack = [];
                $('expression').innerHTML = "0";
                $('result').innerHTML = "0";
            }
            else if(value == "." && error_flag == 0){
                if(dec_flag == 0){
                    stack.push(value);
                    dec_flag = 1;
                    displayVal = displayVal + value;
                    $('result').innerHTML = displayVal;
                    $('expression').innerHTML += value;
                }
            }
            else if((value == "(" || value == ")") && error_flag == 0){
                dec_flag = 0;
                if(value == "(" && stack[stack.length-1] == 0){

                }
                else{
                    if(value == "("){
                        if((0<stack[stack.length-1] && stack[stack.length-1] <= 9) || stack[stack.length-1] == ")"){
                            var k;
                            var q = 0;
                            var w = "";
                            var e = stack.length;
                            while(q < e){
                                k = stack.pop();
                                if(0 <= k && k <= 9 || k == "."){
                                    w = k + w;
                                }
                                else{
                                    stack.push(k);
                                    break;
                                }
                                q++;
                            }
                            if(w != ""){
                                stack.push(w);    
                            }
                            stack.push("*");
                            stack.push(value);
                        }
                        else{
                            var k;
                            var q = 0;
                            var w = "";
                            var e = stack.length;
                            while(q < e){
                                k = stack.pop();
                                if(0 <= k && k <= 9 || k == "."){
                                    w = k + w;
                                }
                                else{
                                    stack.push(k);
                                    break;
                                }
                                q++;
                            }
                            if(w != ""){
                                stack.push(w);    
                            }
                            stack.push(value); 
                        }
                        if(displayVal != "0"){
                            $('expression').innerHTML += value;
                            displayVal = "0";
                            $('result').innerHTML = displayVal;
                            
                        }
                        else{
                            displayVal = value;
                            $('result').innerHTML = displayVal;
                            if($('expression').innerHTML == "0"){
                                $('expression').innerHTML = value;    
                            }
                            else{
                                $('expression').innerHTML += value;       
                            }
                            
                        }
                    }
                    else{
                        if(stack[stack.length-1] == "("){
                            var k;
                            var q = 0;
                            var w = "";
                            var e = stack.length;
                            while(q < e){
                                k = stack.pop();
                                if(0 <= k && k <= 9 || k == "."){
                                    w = k + w;
                                }
                                else{
                                    stack.push(k);
                                    break;
                                }
                                q++;
                            }
                            if(w != ""){
                                stack.push(w);    
                            }
                            stack.push("1");
                            stack.push(value);
                        }
                        else{

                            var k;
                            var q = 0;
                            var w = "";
                            var e = stack.length;
                            while(q < e){
                                k = stack.pop();
                                if(0 <= k && k <= 9 || k == "."){
                                    w = k + w;
                                }
                                else{
                                    stack.push(k);
                                    break;
                                }
                                q++;
                            }
                            if(w != ""){
                                stack.push(w);    
                            }
                            stack.push(value);
                        }

                        if(displayVal != "0"){
                            $('expression').innerHTML += value;
                            displayVal = "0";
                            $('result').innerHTML = displayVal;
                        }
                        else{
                            displayVal = value;
                            $('result').innerHTML = displayVal;
                            if($('expression').innerHTML == "0"){
                                $('expression').innerHTML = value;    
                            }
                            else{
                                $('expression').innerHTML += value;       
                            }
                        }
                    }
                }
            }
            else{
                if(value == "=" && error_flag == 0){
                    var k;
                    var q = 0;
                    var w = "";
                    var e = stack.length;
                    while(q < e){
                        k = stack.pop();
                        if(0 <= k && k <= 9 || k == "."){
                            w = k + w;
                        }
                        else{
                            stack.push(k);
                            break;
                        }
                        q++;
                    }
                    if(w != ""){
                        stack.push(w);    
                    }

                    var TF = isValidExpression(stack);
                    if(TF){
                        stack = infixToPostfix(stack);
                        displayVal = parseFloat(postfixCalculate(stack));
                        if(isNaN(displayVal)){      //     isNaN() : 숫자 아닐때 true
                            displayVal = "Error";
                            error_flag = 1;
                        }
                    }
                    else{
                        displayVal = "Error";
                        error_flag = 1;
                    }
                    $('result').innerHTML = displayVal;   
                    displayVal = "0";
                    $('expression').innerHTML = displayVal;
                    stack = [];
                }
                else{   //+, *, -, /
                    if(stack[stack.length-1] == null || stack[stack.length-1] == "+" || stack[stack.length-1] == "-" || stack[stack.length-1] == "*" || stack[stack.length-1] == "/"){
                    
                    }
                    else{
                        if(error_flag == 0){
                            var k;
                            var q = 0;
                            var w = "";
                            var e = stack.length;
                            while(q < e){
                                k = stack.pop();
                                if(0 <= k && k <= 9 || k == "."){
                                    w = k + w;
                                }
                                else{
                                    stack.push(k);
                                    break;
                                }
                                q++;
                            }
                            if(w != ""){
                                stack.push(w);    
                            }
                            stack.push(value);
                            
                            dec_flag = 0;
                            $('expression').innerHTML += value;
                            displayVal = "0";
                            $('result').innerHTML = displayVal; 
                        }
                    }   
                }
            }
        };
    }
}
function isValidExpression(s) {
    var open = 0;
    var close = 0;
    var a = s.length;
    var b;
    for(var i = 0; i < a; i++){
        b = s[i];
        if (b == "("){
            open++;
        }
        else if (b == ")"){
            close++;
        }
    }
    if (open == close){
        return true;
    }
    else{
        return false;
    }
}
function infixToPostfix(s) {
    var priority = {
        "+":0,
        "-":0,
        "*":1,
        "/":1
    };
    var tmpStack = [];
    var result = [];
    for(var i =0; i<stack.length ; i++) {
        if(/^[0-9]+$/.test(s[i])){
            result.push(s[i]);
        } else {
            if(tmpStack.length === 0){
                tmpStack.push(s[i]);
            } else {
                if(s[i] === ")"){
                    while (true) {
                        if(tmpStack.last() === "("){
                            tmpStack.pop();
                            break;
                        } else {
                            result.push(tmpStack.pop());
                        }
                    }
                    continue;
                }
                if(s[i] ==="(" || tmpStack.last() === "("){
                    tmpStack.push(s[i]);
                } else {
                    while(priority[tmpStack.last()] >= priority[s[i]]){
                        result.push(tmpStack.pop());
                    }
                    tmpStack.push(s[i]);
                }
            }
        }
    }
    for(var i = tmpStack.length; i > 0; i--){
        result.push(tmpStack.pop());
    }
    return result;
}
function postfixCalculate(s) {
    var tempstack = [];
    for(var q = 0; q < s.length; q++){
        tempstack[q] = s[q];
    }
    var pstack = [];
    var leng = tempstack.length;
    var temp;
    var a;
    var b;
    for(var i = 0; i < leng; i++){          //isNaN() // 숫자 아닐때 true
        pstack.push(tempstack.pop());       //tempstack : empty, pstack : reverse of s
    }
    for(var j = 0; j < leng; j++){          //isNaN() // 숫자 아닐때 true
        temp = pstack.pop();
        if(isNaN(temp)){
            a = parseFloat(tempstack.pop());
            b = parseFloat(tempstack.pop());
            if(temp == "+"){
                temp = b+a;
            }
            else if(temp == "-"){
                temp = b-a;
            }
            else if(temp == "*"){
                temp = b*a;
            }
            else if(temp == "/"){
                temp = b/a;
            }
            tempstack.push(temp);
        }
        else{
            tempstack.push(temp);
        }
    }
    return tempstack.pop();
}