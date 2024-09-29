export default function DrawTree(obj, count, parserCount, setZ3) {
    //console.log("COUNT ", count)
    //console.log(obj)

    let tree = "\\end{prooftree}"
    let color = ""
    let program = ""
    let lastStep = false

    if (count > parserCount) {
        count = parserCount
        lastStep = true
    }

    let leftArray = []
    let alreadyInputed = []

    for (let i = 1; i <= count; i++) {
        if (i < count) {
            let possible_left = false
            color = "black"
            if (("right" + (i - 1)) in obj) {
                if ("z3" + (i - 1) in obj) {
                    if ([obj["z3" + (i - 1)] === "right-sat"]) {
                        color = "red"
                        setZ3(true)
                    }
                }
                let right = obj["right" + (i - 1)]
                right = appendStringToLatex(right)
                right = "\\AxiomC{$\\color{" + color + "}{" + right + "}$}"
                tree = right.concat(tree)
                color = "black"
            }
            program = obj["string" + i]
            program = appendStringToLatex(program)
            program = "$\\color{" + color + "}{" + program + "}$}"
            let rule = getRuleName(i, obj, color)
            if (!rule.includes("AxiomC")) {
                possible_left = true
            }
            let result = rule.concat(program)
            tree = result.concat(tree)
            if (("left" + (i - 1)) in obj) {
                if (("z3" + (i - 1)) in obj) {
                    color = "red"
                    setZ3(true)
                }
                let left = obj["left" + (i - 1)]
                left = appendStringToLatex(left)
                left = "\\AxiomC{$\\color{" + color + "}{" + left + "}$}"
                if (possible_left) {
                    leftArray.push(left)
                } else {
                    tree = left.concat(tree)
                }
            }
            if ("left-side" + (i - 1) in obj) {
                let left = obj["left-side" + (i - 1)]
                left = appendStringToLatex(left)
                left = "\\AxiomC{$\\color{" + color + "}{" + left + "}$}"
                if (possible_left) {
                    leftArray.push(left)
                    alreadyInputed.push("left-side" + (i - 1))
                }
            }
        } else if (i === count) {
            color = "black"
            if ("right" + (i - 1) in obj) {
                if (("z3" + (i - 1)) in obj) {
                    color = "red"
                    setZ3(true)
                }
                let right = obj["right" + (i - 1)]
                right = appendStringToLatex(right)
                right = "\\AxiomC{$\\color{" + color + "}{" + right + "}$}"
                tree = right.concat(tree)
                color = "black"
            }
            program = obj["string" + i]
            program = appendStringToLatex(program)
            if (lastStep === true) {
                program = "$\\color{" + color + "}{" + program + "}$}"
                let rule = getRuleName(i, obj, color)
                let result = rule.concat(program)
                tree = result.concat(tree)
            } else {
                program = "\\AxiomC{$\\color{" + color + "}{" + program + "}$}"
                tree = program.concat(tree)
                if ("left-side" + (i - 1) in obj) {
                    let left = obj["left-side" + (i - 1)]
                    left = appendStringToLatex(left)
                    left = "\\AxiomC{$\\color{" + color + "}{" + left + "}$}"
                    tree = left.concat(tree)
                    alreadyInputed.push("left-side" + (i - 1))
                }
            }

            if (("left" + (i - 1)) in obj) {
                if ("z3" + (i - 1) in obj) {
                    color = "red"
                    setZ3(true)
                }
                let left = obj["left" + (i - 1)]
                left = appendStringToLatex(left)
                left = "\\AxiomC{$\\color{" + color + "}{" + left + "}$}"
                tree = left.concat(tree)
                color = "black"
            }

            if (leftArray.length > 0) {
                for (let j = leftArray.length - 1; j >= 0; j--) {
                    let inputCheck1 = true
                    let inputCheck2 = true
                    for (let k = 0; k < alreadyInputed.length; k++) {
                        let temp = alreadyInputed[k]
                        temp = appendStringToLatex(temp)
                        temp = "\\AxiomC{$\\color{" + color + "}{" + temp + "}$}"
                        if (obj[temp] === leftArray[j]) {
                            inputCheck1 = false
                            break
                        }
                    }
                    for (let k = i; k > 0; k--) {
                        let temp = obj["string" + k]
                        temp = appendStringToLatex(temp)
                        temp = "\\AxiomC{$\\color{" + color + "}{" + temp + "}$}"
                        if (temp === leftArray[j]) {
                            inputCheck2 = false
                            break
                        }
                    }
                    if (inputCheck1 && inputCheck2) {
                        tree = leftArray[j].concat(tree)
                    }
                }
            }

            for (let j = (i - 1); j > 0; j--) {
                if ("left-side" + j in obj) {
                    if (!alreadyInputed.includes("left-side" + j)) {
                        let included = false;
                        for (let k = 1; k <= i; k++) {
                            if (obj["string" + k] === obj["left-side" + j]) {
                                included = true
                                break
                            }
                        }
                        if (!included) {
                            let left = obj["left-side" + j]
                            left = appendStringToLatex(left)
                            left = "\\AxiomC{$\\color{" + color + "}{" + left + "}$}"
                            tree = left.concat(tree)
                        }
                    }
                }
            }
        }
    }
    let begin = "\\begin{prooftree}";
    tree = begin.concat(tree);
    //console.log(tree)
    return tree
}

function removeDoubleSpaces(str) {
    return str.replace(/\s+/g, " ");
}

function appendStringToLatex(str) {
    str = str.replaceAll('==', '=')
    str = str.replaceAll('{', ' \\{ ')
    str = str.replaceAll('}', ' \\} ')
    str = str.replaceAll(' and ', ' \\wedge ')
    str = str.replaceAll(' => ', ' \\Rightarrow ')
    str = str.replaceAll(' or ', ' \\lor ')
    str = str.replaceAll('not', '\\neg')
    str = str.replaceAll(' >= ', ' \\geq ')
    str = str.replaceAll(' <= ', ' \\leq ')
    str = str.replaceAll(' - ', ' {-} ')
    str = removeDoubleSpaces(str)
    str = str.replaceAll(' ', ' \\; ')
    return str
}


function getRuleName(num, obj, color) {
    switch (obj["rule" + num]) {
        case 1:
            return "\\AxiomC{}\\RL{$\\color{" + color + "}{1_{AS}}$}\\UIC{"
        case 2:
            return "\\AxiomC{}\\RL{$\\color{" + color + "}{2_{AS}}$}\\UIC{"
        case 3:
            return "\\RL{$\\color{" + color + "}{3_{AS}}$}\\BIC{"
        case 4:
            return "\\RL{$\\color{" + color + "}{4_{AS}}$}\\BIC{"
        case 5:
            return "\\RL{$\\color{" + color + "}{5_{AS}}$}\\UIC{"
        case 6:
            return checkConseq(obj, num, color)
        default:
            break;
    }
}

function checkConseq(obj, i, color) {
    if (("left" + i) in obj && ("right" + i) in obj) {
        return "\\RL{$\\color{" + color + "}{CONSEQ}$}\\TIC{"
    } else if (("left" + i) in obj) {
        return "\\RL{$\\color{" + color + "}{L\\;CONSEQ}$}\\BIC{"
    } else {
        return "\\RL{$\\color{" + color + "}{R\\;CONSEQ}$}\\BIC{"
    }
}