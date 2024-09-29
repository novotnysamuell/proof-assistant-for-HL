import antlr4 from "antlr4";
import GrammarLexer from "../ANTLR2/Grammar2Lexer.js";
import GrammarParser from "../ANTLR2/Grammar2Parser.js";
import Visitor from "../ANTLR2/BackendVisitor.js";

export default class Parser {

    constructor(input) {
        this.chars = new antlr4.InputStream(input);
        this.lexer = new GrammarLexer(this.chars);
        this.tokens = new antlr4.CommonTokenStream(this.lexer);
        this.parser = new GrammarParser(this.tokens);
        this.parser.buildParseTrees = true;
        this.visitor = new Visitor();
    }

    parseStringForBackend() {
        let tree = this.parser.condition()
        let result = this.visitor.visit(tree);
        return result;
    };

    check() {
        this.wrongInputCheck()
        this.parser.condition()
        this.reset()
    }

    reset() {
        this.lexer.reset();
        const newTokens = new antlr4.CommonTokenStream(this.lexer);
        this.parser.setInputStream(newTokens);
    }

    wrongInputCheck() {
        this.parser.removeErrorListeners();
        this.parser.addErrorListener({
            syntaxError: (recognizer, offendingSymbol, line, column, msg, err) => {
                throw { msg }
            },
        });
    }


}