// let arr=[12,4,1,2,23,90,11];
// arr.sort((a,b)=>b-a)
// // let arr=["one","One","two","Two","TWO","three"]
// console.log(arr)

/*
12,4 -> 8 -> 4,12,1,2
12,1 -> 11 -> 4,1,12,2,23
12,2 -> 10 -> 4,1,2,12,23
12,23 -> -11 -> 4,1,2,12,23,90,11
23,90 -> -ve -> 4,1,2,12,23,90,11
90,11 -> 4,1,2,12,23,11,90

4,1 -> +ve -> 1,4,2,
4,2 -> +ve -> 1,2,4,12
4,12 -> -ve -> 1,2,4,12,23,11,90
12,23 -> -ve
23,11-> +ve -> 1,2,4,12,11,23,90
23,90 -> -ve

1,2 -> -ve
2,4 -> -ve 
4,12 -> -ve
12,11 -> +ve -> 1,2,4,11,12,23,90
12,23 -> -ve
23,90 -> -ve 

*/

// let arr = [1, 2, [3, 4], 5, [6, 7, 8], [[9, 10, 11]]];
// console.log(arr.flat(2));

//address=base_address+sizeof(element)*index

//10,20,30,40
//1000,4,3
//1000+4*3=1012


const tokensArray=arr.map(e=>e.token)
console.log(tokensArray.join(","))
// for(let {token} of arr)
//     console.log(token)

