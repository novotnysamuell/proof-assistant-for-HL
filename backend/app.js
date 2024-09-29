const express = require("express")
const PORT = 8000
const cors = require("cors")
const { exec } = require("child_process")


let app = express()
app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.send(`Hello World`)
})


// code for appending strings used in first tests - not bulletproof; many possible edge cases
// function appendString(string) {
//     console.log(string.length)
//     let middleParts = string.replace(/"/g, '').replace(/ = /g, " == ")
//     middleParts = middleParts.split("=>").map(p => p.split(" ").map(c => c == "true" ? "True" : c).map(d => d == "false" ? "False" : d).join(" "))
//     let result = appendAndNotOr(middleParts[0]) + '=> ' + appendAndNotOr(middleParts[1])
//     return '" ' + result + '"'
// }

// function appendAndNot(string) {
//     let conditions = string.split("and");
//     console.log(conditions)
//     if (conditions.length === 1) {
//         if (conditions[0].includes("not")) {
//             conditions[0] = conditions[0].replace("not", "")
//             conditions[0] = `Not( ${conditions[0]}) `
//             return conditions[0]
//         }
//         return string
//     }
//     for (x in conditions) {
//         if (conditions[x].includes("(") && !conditions[x].includes(")")) {
//             let count = 0;
//             while (!conditions[x].includes(")")) {
//                 count++
//                 x++
//             }

//         }
//     }

//     for (x in conditions) {
//         if (conditions[x].includes("not")) {
//             let count = (conditions[x].match(/not/g) || []).length;
//             if (count % 2 === 0) {
//                 conditions[x] = conditions[x].replaceAll("not", "")
//             } else {
//                 conditions[x] = conditions[x].replaceAll("not", "")
//                 conditions[x] = `Not(${conditions[x]}) `
//             }

//         }
//     }
//     let joinedConditions = conditions.join(",");
//     return `And( ${joinedConditions}) `;
// }


// function appendAndNotOr(string) {
//     let conditions = string.split("or");
//     if (conditions.length === 1) {
//         return appendAndNot(string)
//     }

//     for (x in conditions) {
//         if (conditions[x].includes("and")) {
//             conditions[x] = conditions[x].replace("and", ",")
//             if (conditions[x].includes("not")) {
//                 console.log("vojde")
//                 let splitNot = conditions[x].split(",")
//                 for (y in splitNot) {
//                     if (splitNot[y].includes("not")) {
//                         splitNot[y] = splitNot[y].replace("not", "")
//                         splitNot[y] = `Not(${splitNot[y]}) `
//                     }
//                 }
//                 conditions[x] = splitNot.join(",");
//             }
//             conditions[x] = `And( ${conditions[x]}) `
//             console.log(conditions[x])
//         } else if (conditions[x].includes("not")) {
//             conditions[x] = conditions[x].replace("not", "")
//             conditions[x] = `Not(${conditions[x]}) `
//             console.log(conditions[x])
//         }
//     }

//     let joinedConditions = conditions.join(",");
//     return `Or( ${joinedConditions}) `;
// }




// UNSAT ======= IMPLIKUJE
// SAT ======= NEIMPLIKUJE

// testing code for string
// app.get("/solve", async (req, res) => {
//     //let nehehe = ' " Or ( And ( ( And ( j  == 3   , k  == 4   ) )  , x  == x   )  ,  Not( p  == p   )  )  => j == 3 " '
//     //nehehe = appendString(nehehe)

//     const { stdout, stderr } = await new Promise((resolve, reject) => {
//         exec("python theoremProver.py " + nehehe, (error, stdout, stderr) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve({ stdout, stderr });
//             }
//         });
//     });

//     if (stderr) {
//         res.status(500).send(`An error occurred: ${stderr}`);
//         return;
//     }
//     const result = stdout;
//     console.log(result);

//     res.send(`Hello World`)
// })


app.post("/solve", async (req, res) => {
    let body = req.body;
    console.log(body)
    let string = '" ' + body.userInput + ' "'
    console.log(string)

    exec("python theoremProver.py " + string, (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal server error");
            return;
        }

        if (stderr) {
            res.status(500).send(`An error occurred: ${stderr}`);
            return;
        }


        const result = stdout.trim();
        console.log(result);
        res.json({ result })
    });
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})