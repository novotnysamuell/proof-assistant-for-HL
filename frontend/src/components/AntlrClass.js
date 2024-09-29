import antlr4 from "antlr4";
import GrammarLexer from "../ANTLR/GrammarLexer.js";
import GrammarParser from "../ANTLR/GrammarParser.js";
import Visitor from "../ANTLR/MyVisitor.js";
import StringVisitor from "../ANTLR/StringVisitor.js";
import BackendParser from "./BackendParser.js"


export default class Antlr {

    constructor(input) {
        this.chars = new antlr4.InputStream(input);
        this.lexer = new GrammarLexer(this.chars);
        this.tokens = new antlr4.CommonTokenStream(this.lexer);
        this.parser = new GrammarParser(this.tokens);
        this.parser.buildParseTrees = true;

        this.visitor = new Visitor();
        this.postcondition = {}
        this.precondition = {}
        this.program = {}

        this.stringVisitor = new StringVisitor();
        this.stringResult = ""
        this.stringPrecondition = ""
        this.stringProgram = ""
        this.treeDraw = {}
        this.counter = 0;
        this.invariant = ""
    }


    wrongInputCheck() {
        this.parser.removeErrorListeners();
        this.parser.addErrorListener({
            syntaxError: (recognizer, offendingSymbol, line, column, msg, err) => {
                throw { msg }
            },
        });
    }

    inputcheck() {
        this.wrongInputCheck()
        this.parser.program()
        this.reset()
    }

    parseStringForBackend(string) {
        let backendParser = new BackendParser(string)
        let result = backendParser.parseStringForBackend()
        return result
    }

    async parseWholeInput() {
        this.getStringVisitor();
        this.precondition = this.parseCondition();
        this.program = this.parsePrikaz();
        this.postcondition = this.parseCondition();

        let divide = { prepomienka: this.precondition, program: this.program, postpodmienka: this.postcondition };
        //console.log(divide);
        return await this.chooseRule(this.program);
        //return result;
    };


    parseCondition() {
        let tree = this.parser.condition();
        let result = this.visitor.visit(tree);
        let obj = result[1];
        return obj;
        //console.log(result);
    };


    parsePrikaz() {
        let tree = this.parser.statement()
        let result = this.visitor.visit(tree);
        return result;
    };


    getStringVisitor() {
        let tree = this.parser.program();
        this.stringResult = this.stringVisitor.visit(tree);
        this.reset();
        tree = this.parser.condition();
        this.stringPrecondition = this.stringVisitor.visit(tree);
        tree = this.parser.statement()
        this.stringProgram = this.stringVisitor.visit(tree)
        this.reset();
    }


    reset() {
        this.lexer.reset();
        const newTokens = new antlr4.CommonTokenStream(this.lexer);
        this.parser.setInputStream(newTokens);
    }


    removeDoubleSpaces(str) {
        return str.replace(/\s+/g, " ");
    }

    isAllLetters(variable) {
        if (typeof variable !== 'string') {
            return false;
        }
        return !!variable.match(/^[a-zA-Z]+$/); //Double Negation !! => convert the result of test to a boolean value.
    }

    traverseStatement(obj) {
        let result = "";

        if (obj.type === 'Parentheses') {
            let expr = "( " + this.traverseStatement(obj.expression) + " ) ";
            result = result.concat(expr);
        }

        if (obj.type === 'WhileStatement') {
            let expr = " while " + this.makeStringFromExpr(obj.condition) + " do "
            result = expr.concat(this.traverseStatement(obj.loopStatement))
        }

        if (obj.type === 'SequenceStatement') {
            result = result.concat(this.traverseStatement(obj.firstStatement)) + "; ";
            result = result.concat(this.traverseStatement(obj.secondStatement));
        }

        if (obj.type === "AssignStatement") {
            result = obj.variable + " := " + this.makeStringFromExpr(obj.expression);
        }
        return result
    }

    isWhileStatement() {
        this.precondition = this.parseCondition();
        this.program = this.parsePrikaz();
        this.reset()
        return this.hasWhile(this.program)
    }

    hasWhile(obj) {
        let count = 0;
        if (typeof obj === 'object' && obj !== null) {
            for (const key in obj) {
                if (key === "type" && obj.type === "WhileStatement") {
                    count++;
                }
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    if (this.hasWhile(obj[key])) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    makeStringFromExpr(expression) {

        if (expression === "true") {
            return " true "
        }
        if (expression === "false") {
            return " false "
        }

        if (typeof expression !== 'object') {
            return expression + " ";
        }

        if (expression.type === 'Parentheses') {
            return "( " + this.makeStringFromExpr(expression.expression) + " ) ";
        }

        if (expression.type === 'UnaryExpression') {
            let not = expression.operator;
            let notExpr = this.makeStringFromExpr(expression.operand);
            return not + " " + notExpr;
        }

        let leftExp = expression.left;
        let rightExp = expression.right;

        if (typeof leftExp === "object") {
            leftExp = this.makeStringFromExpr(expression.left);
        }

        if (typeof rightExp === "object") {
            rightExp = this.makeStringFromExpr(expression.right);
        }

        return leftExp + " " + expression.operator + " " + rightExp + " ";
    }

    makeWeakestprecondition(prikaz, postcondition) {
        while (prikaz.type === 'Parentheses') {
            prikaz = prikaz.expression
        }
        if (postcondition === true) {
            return " true "
        }
        if (postcondition === false) {
            return " false "
        }
        if (postcondition.type === 'UnaryExpression') {
            let not = postcondition.operator;
            let notExpr = this.makeWeakestprecondition(prikaz, postcondition.operand);
            return not + " " + notExpr;
        }

        if (postcondition.type === 'Parentheses') {
            return "( " + this.makeWeakestprecondition(prikaz, postcondition.expression) + " ) ";
        }

        let expr = this.makeStringFromExpr(prikaz.expression);
        let exprL, exprR, postVar1, postVar2;

        if (typeof postcondition.left == "object") {
            exprL = this.makeWeakestprecondition(prikaz, postcondition.left);
        }
        if (typeof postcondition.right == "object") {
            exprR = this.makeWeakestprecondition(prikaz, postcondition.right);
        }

        if (this.isAllLetters(postcondition.left)) {
            postVar1 = postcondition.left;
        }
        if (this.isAllLetters(postcondition.right)) {
            postVar2 = postcondition.right;
        }

        if (postVar1 === prikaz.variable) {
            exprL = expr;
            if (typeof exprR !== 'string') {
                exprR = postcondition.right;
            }
        } else if (typeof exprL !== "string") {
            exprL = postcondition.left;
        }

        if (postVar2 === prikaz.variable) {
            if (typeof exprL !== 'string') {
                exprL = postcondition.left;
            }
            exprR = expr;
        } else if (typeof exprR !== "string") {
            exprR = postcondition.right;
        }

        // console.log("string ktorý vracia")
        // console.log(exprL + " " + postcondition.operator + " " + exprR)
        return exprL + " " + postcondition.operator + " " + exprR + " ";
    }




    async assignRule() {
        let newCondition = "{ " + this.makeWeakestprecondition(this.program, this.postcondition) + " } ";
        newCondition = this.removeDoubleSpaces(newCondition);
        let oldCondition = this.removeDoubleSpaces(this.stringPrecondition)

        //console.log("ASSIGN ZAPIS DO STROMU")
        if (newCondition === oldCondition) {
            this.counter++;
            this.treeDraw["string" + this.counter] = this.removeDoubleSpaces(this.stringResult);
            this.treeDraw["rule" + this.counter] = 1;
        } else {
            //console.log("CONSEQ Z ASSIGN")
            var result = await this.ruleOfConsequence("left");
            //console.log("NÁVRAT Z ASSIGN - CONSEQUENCE")
            return result;
        }

    }

    skipRule() {
        //ked bude iba skip tak nič sa nerobí iba čiara 
        //zapísať do objektu string a rule 

        //ak sa prepomienka a postpodmienka rovnaju tak skip
        this.counter++;
        this.treeDraw["string" + this.counter] = this.stringResult; //ocekovat este ale tu by to malo byt good
        this.treeDraw["rule" + this.counter] = 2;

        return true;
    }

    async sequenceRule(firstStatement, secondStatement) {
        while (secondStatement.type === "SequenceStatement") { // typeof secondStatement == "SequenceStatement"
            secondStatement = this.secondStatement.left
        }
        let newCondition = ""
        let program = ""
        let rightInput = ""

        // prava strana
        if (secondStatement.type === "WhileStatement") {
            newCondition = "{ " + this.invariant + " } " //this.invariant[this.invariant.lenght - 1]
            program = this.traverseStatement(secondStatement)
            rightInput = newCondition + program + " { " + this.makeStringFromExpr(this.postcondition) + " } "
            rightInput = this.removeDoubleSpaces(rightInput)
            //console.log(rightInput)

        } else {
            newCondition = "{ " + this.makeWeakestprecondition(secondStatement, this.postcondition) + "} "
            program = this.traverseStatement(secondStatement);
            rightInput = newCondition + program + " { " + this.makeStringFromExpr(this.postcondition) + " } "
            rightInput = this.removeDoubleSpaces(rightInput)
            //console.log(rightInput)
        }
        // lava strana
        program = this.traverseStatement(firstStatement);
        let leftInput = "{ " + this.makeStringFromExpr(this.precondition) + " } " + program + newCondition
        leftInput = this.removeDoubleSpaces(leftInput)

        this.counter++;
        this.treeDraw["string" + this.counter] = this.removeDoubleSpaces(this.stringResult); //ocekovat este ale tu by to malo byt good
        this.treeDraw["rule" + this.counter] = 3;
        this.treeDraw["left-side" + this.counter] = leftInput
        //console.log("SEQUENCE - NAVRAT 2 INPUTOV")
        return { input1: rightInput, input2: leftInput };
    }

    conditionRule() { // IF  //KED TU BUDE WHILE NENI OSETRENE

        //LAVO { staraP and condition } thenStatement 
        let leftPrecondition = this.makeStringFromExpr(this.precondition) + " and " + this.makeStringFromExpr(this.program.condition);
        leftPrecondition = "{ " + leftPrecondition + "} "

        let program = this.traverseStatement(this.program.thenStatement)
        let leftInput = leftPrecondition + " " + program + "{ " + this.makeStringFromExpr(this.postcondition) + "} ";
        leftInput = this.removeDoubleSpaces(leftInput);

        //PRAVO {staraP and not condition } elseStatement
        let rightPrecondition = this.makeStringFromExpr(this.precondition) + " and not " + this.makeStringFromExpr(this.program.condition);
        rightPrecondition = "{ " + rightPrecondition + "} "
        program = this.traverseStatement(this.program.elseStatement)
        let rightInput = rightPrecondition + " " + program + "{ " + this.makeStringFromExpr(this.postcondition) + "} ";
        rightInput = this.removeDoubleSpaces(rightInput);

        this.counter++;
        this.treeDraw["string" + this.counter] = this.removeDoubleSpaces(this.stringResult);
        //console.log(this.treeDraw["string" + this.counter])
        this.treeDraw["rule" + this.counter] = 4;
        this.treeDraw["left-side" + this.counter] = leftInput

        //console.log("IF RULE - NAVRAT 2 INPUTY")
        return { input1: rightInput, input2: leftInput };
    }


    async loopRule() {
        //prepominka = invariant
        //postpodmienka => invariant and not condition

        let condition = this.makeStringFromExpr(this.program.condition)
        let precondition = this.makeStringFromExpr(this.precondition)
        let postcondition = this.makeStringFromExpr(this.postcondition);
        postcondition = this.removeDoubleSpaces(postcondition);
        let newPostcondition = precondition + " and not " + condition;
        newPostcondition = this.removeDoubleSpaces(newPostcondition);

        //console.log("SME VO WHILE")
        if (postcondition === newPostcondition) {
            let newPrecondition = "{ " + precondition + " and " + condition + " } ";
            //console.log(this.program.loopStatement);
            let program = this.traverseStatement(this.program.loopStatement);
            let result = newPrecondition + " " + program + " { " + precondition + " } ";
            result = this.removeDoubleSpaces(result)

            this.counter++;
            this.treeDraw["string" + this.counter] = this.removeDoubleSpaces(this.stringResult); //ocekovat este ale tu by to malo byt good
            this.treeDraw["rule" + this.counter] = 5;
            //console.log("VOLAME CALCULATE V JEDNODUCHOM WHILE")
            await this.calculateProblem(result)
        } else {
            //console.log("CONSEQ")
            let result = await this.ruleOfConsequence("both");
            return;
        }

    }

    async ruleOfConsequence(side) {
        //lavy variant staraPRE => novaPRE | novaPRE program staraPRE       PRECONDITION WEAKING
        //pravy variant staraPRE program novaPOST | novaPOST => staraPOST   POSTCONDITION STRENGHTENING

        if (side === "left") {
            let newPrecondition = this.makeWeakestprecondition(this.program, this.postcondition)
            // console.log("NOVA PREPOMIENKA")
            // console.log(newPrecondition)
            let implies = this.makeStringFromExpr(this.precondition) + " => " + newPrecondition
            let parenthesesImplies = `( ${this.makeStringFromExpr(this.precondition)} ) => ( ${newPrecondition} )`
            implies = this.removeDoubleSpaces(implies);
            let result = "{ " + newPrecondition + " } " + this.traverseStatement(this.program) + " { " + this.makeStringFromExpr(this.postcondition) + " } ";
            result = this.removeDoubleSpaces(result);

            this.counter++;
            this.treeDraw["string" + this.counter] = this.removeDoubleSpaces(this.stringResult);
            this.treeDraw["rule" + this.counter] = 6;
            this.treeDraw["left" + this.counter] = this.removeDoubleSpaces(parenthesesImplies);

            let temp = implies.split("=>")
            temp[0] = this.parseStringForBackend(temp[0])
            temp[1] = this.parseStringForBackend(temp[1])
            implies = temp.join(' => ')
            implies = this.removeDoubleSpaces(implies)
            // console.log("TO CO POSILAM")
            // console.log(implies)
            let z3Solver = await this.verify(implies);
            //console.log("z3 " + z3Solver)
            if (z3Solver === "unsat") {
                await this.calculateProblem(result)
            } else {
                this.treeDraw["z3" + this.counter] = "left-sat"  //dačo na ten sposob len to domysliet jak presne to bude fungovať
                await this.calculateProblem(result)
            }
            //console.log("CONSEQUENCE LEFT - RETURN")
            return;
        }
        else if (side === "both") {
            //console.log("CONSEQUENCE - BOTH")
            //console.log("invarianty")
            this.counter++;
            this.treeDraw["string" + this.counter] = this.removeDoubleSpaces(this.stringResult);
            this.treeDraw["rule" + this.counter] = 6
            let invarinat = this.invariant + " "
            invarinat = this.removeDoubleSpaces(invarinat)

            //kontrola či prepomienka nie je zároveň invariant
            if (invarinat !== this.removeDoubleSpaces(this.makeStringFromExpr(this.precondition))) {
                //console.log("invar ", invarinat)
                let impliesPre = "( " + this.makeStringFromExpr(this.precondition) + " ) => ( " + invarinat + ") "
                impliesPre = this.removeDoubleSpaces(impliesPre)
                let copy = impliesPre
                //console.log(impliesPre)

                let temp = impliesPre.split("=>")
                temp[0] = this.parseStringForBackend(temp[0])
                temp[1] = this.parseStringForBackend(temp[1])
                copy = temp.join(' => ')
                copy = this.removeDoubleSpaces(copy)
                //console.log(impliesPre)

                let z3Solver = await this.verify(copy);
                if (z3Solver === "unsat") {
                    //console.log("z3 " + z3Solver)
                } else {
                    this.treeDraw["z3" + this.counter] = "left-sat"
                }
                this.treeDraw["left" + this.counter] = impliesPre
            }
            let impliesPost = invarinat + " and not " + this.makeStringFromExpr(this.program.condition)
            impliesPost = this.removeDoubleSpaces(impliesPost)
            // console.log("TOTO HLADAM UKAZ MI")
            // console.log(impliesPost)

            //kontrola či postpodmienka nemá správny tvar
            if (impliesPost !== this.removeDoubleSpaces(this.makeStringFromExpr(this.postcondition))) {
                impliesPost = "( " + invarinat + " ) and not ( " + this.makeStringFromExpr(this.program.condition) + " ) => ( " + this.makeStringFromExpr(this.postcondition) + " ) "
                impliesPost = this.removeDoubleSpaces(impliesPost)
                let copy = impliesPost

                let temp = copy.split("=>")
                temp[0] = this.parseStringForBackend(temp[0])
                temp[1] = this.parseStringForBackend(temp[1])
                copy = temp.join(' => ')
                copy = this.removeDoubleSpaces(copy)
                //console.log(copy)

                let z3Solver = await this.verify(copy);
                if (z3Solver === "unsat") {
                    //console.log("z3 " + z3Solver)
                } else {
                    this.treeDraw["z3" + this.counter] = "right-sat"
                }
                this.treeDraw["right" + this.counter] = impliesPost
            }

            let result = "{ " + invarinat + " } " + this.removeDoubleSpaces(this.stringProgram) + " { " + invarinat + " and not " + this.makeStringFromExpr(this.program.condition) + " } ";
            result = this.removeDoubleSpaces(result);
            //console.log("VOLAME CALCULATE V CONSEQUENCE BOTH")
            await this.calculateProblem(result)
            return
        }


    }


    async chooseRule(program) {

        while (program.type === 'Parentheses') {
            program = program.expression
        }

        switch (program.type) {
            case "AssignStatement":
                //console.log("ASSIGN");
                return await this.assignRule();
            case "SkipStatement":
                return this.skipRule();
            case "SequenceStatement":
                //console.log("SEQUENCE");
                return this.sequenceRule(program.firstStatement, program.secondStatement);
            case "IfStatement":
                //console.log("IF");
                return this.conditionRule();
            case "WhileStatement":
                //console.log("WHILE");
                return this.loopRule();
            default:
                break;
        }
    }



    async calculateProblem(input, invariant = "") {
        if (invariant.length !== 0) {
            this.invariant = invariant
            //console.log("invariant co tu pride ", invariant)
            //console.log("save ", this.invariant)
        }
        // console.log("counter ", this.counter)
        this.chars = new antlr4.InputStream(input);
        this.lexer = new GrammarLexer(this.chars);
        this.tokens = new antlr4.CommonTokenStream(this.lexer);
        this.parser = new GrammarParser(this.tokens);
        let repeat = await this.parseWholeInput();

        if ("object" === typeof (repeat)) {
            if ("input2" in repeat && repeat.input2 !== null) {
                await this.calculateProblem(repeat.input1)
                await this.calculateProblem(repeat.input2)
            } else {
                await this.calculateProblem(repeat.input1)
            }
        }

        // console.log("TO CO VRACIAM")
        // console.log(this.treeDraw)
        //console.log("SME NA KONCI CALCULATE - VYCHADZAME VON")
        return (this.treeDraw);
    }

    async verify(exprToVerify) {
        const response = await fetch("http://localhost:8000/solve", {
        //const response = await fetch("http://147.232.205.139:8000/solve", {
            method: "POST",
            body: JSON.stringify({ userInput: exprToVerify }),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        const result = await response.json();
        return result.result
    }
}
