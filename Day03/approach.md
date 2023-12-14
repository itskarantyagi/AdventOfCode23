# My Approach
## Part 1
Step 1 -> Convert the String into a 2D array. 
Step 2 -> Iterate through to find anything other than "." and not integer. If so, look in all the directions to find a number. If coordinates not in set `seen` then look for the number. 
Step 3 -> If number found adjacent to a symbol then go left and right to get the complete number and parse it as an Int. Also, add the coordinates that have been visited and have a number to the set `seen`
Step 4-> Add that number to the totalSum

## part 2
Similar to above just updated the methods to add the number returned by `getCompleteNumber` to an array and then see if the length is 2 then multiply and add to sum. 
