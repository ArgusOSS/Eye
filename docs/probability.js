
// program to find the factorial of a number
function facto(number){
    // checking if number is negative
    if (number < 0) {
        console.log('Error! Factorial for negative number does not exist.');
    }

    // if number is 0
    else if (number === 0) {
        return 1;
    }

    // if number is positive
    else {
        let fact = 1;
        for (i = 1; i <= number; i++) {
            fact *= i;
        }
        return fact;
    }
}
/* a function that gives out probability that our service will fail 'X' times in the next period of time.
    -The period of time for which the prediction is valid is defined by the average that you take. 
    -For example: if you input the average as : average failures per day is u=5 , 
    then the program will return the probability of desired failures 'x' in a given day.

    - Practical application:
        I get u = 6 failures per day on an average.
        Give me the probability that today I will get x = 0 failures.

        OR

        I get u = 20 failures per week on average.
        Give me the probability that this week I will get x = 10 failures
    
    Output is b/w 0 and 1 
*/
function findPoissonProb(u,x){
    const e = 2.71828; //euler's constant
    var poissonProb = (u**x)*(e**-u)/facto(x);
    return Math.round(poissonProb*10000)/10000;
}

