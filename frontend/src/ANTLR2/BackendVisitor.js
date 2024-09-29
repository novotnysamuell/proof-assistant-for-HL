import Grammar2Visitor from './Grammar2Visitor';

export default class BackendVisitor extends Grammar2Visitor {

    // visitTerminal(ctx) {
    //     var result = ctx.getText();

    //     if (result == "<EOF>") {
    //         return;
    //     }

    //     return ctx.getText() + " ";
    // }


    // Visit a parse tree produced by GrammarParser#condition.
    visitCondition(ctx) {
        let ret = this.visitChildren(ctx)
        return ret.join(' ');
    }


    // Visit a parse tree produced by GrammarParser#varExpr.
    visitVarExpr(ctx) {
        return ctx.getText() + " ";
    }


    // Visit a parse tree produced by GrammarParser#numberExpr.
    visitNumberExpr(ctx) {
        return ctx.getText() + " ";
    }


    // Visit a parse tree produced by GrammarParser#plusMinusExpr.
    visitPlusMinusExpr(ctx) {
        return this.visit(ctx.arithmeticExpr(0)) + " " + ctx.op.text + " " + this.visit(ctx.arithmeticExpr(1)) + " ";
    }


    // Visit a parse tree produced by GrammarParser#multDivExpr.
    visitMultDivExpr(ctx) {
        return this.visit(ctx.arithmeticExpr(0)) + " " + ctx.op.text + " " + this.visit(ctx.arithmeticExpr(1)) + " ";
    }


    // Visit a parse tree produced by GrammarParser#parenthesesExpr.
    visitParenthesesExpr(ctx) {
        return '( ' + this.visit(ctx.arithmeticExpr()) + " " + ') ';
    }


    // Visit a parse tree produced by GrammarParser#equalBExpr.
    visitEqualBExpr(ctx) {
        return this.visit(ctx.arithmeticExpr(0)) + ' == ' + this.visit(ctx.arithmeticExpr(1)) + " ";
    }


    // Visit a parse tree produced by GrammarParser#compareBExpr.
    visitCompareBExpr(ctx) {
        return this.visit(ctx.arithmeticExpr(0)) + " " + ctx.op.text + " " + this.visit(ctx.arithmeticExpr(1)) + " ";
    }


    // Visit a parse tree produced by GrammarParser#booleanExpr.
    visitBooleanExpr(ctx) {
        let result = ctx.getText()
        if (result === "true") {
            result = "True"
        } else {
            result = "False"
        }
        return result + " ";
    }


    // Visit a parse tree produced by GrammarParser#conjuctionBExpr.
    visitConjuctionBExpr(ctx) {
        return "And ( " + this.visit(ctx.boolExpr(0)) + ' , ' + this.visit(ctx.boolExpr(1)) + " ) ";
    }

    visitDisjuctionBExpr(ctx) {
        return " Or ( " + this.visit(ctx.boolExpr(0)) + ' , ' + this.visit(ctx.boolExpr(1)) + " ) ";
    }


    // Visit a parse tree produced by GrammarParser#notBExpr.
    visitNotBExpr(ctx) {
        return ' Not( ' + this.visit(ctx.boolExpr()) + " ) ";
    }


    // Visit a parse tree produced by GrammarParser#parenthesesBExpr.
    visitParenthesesBExpr(ctx) {
        return '( ' + this.visit(ctx.boolExpr()) + ') ';
    }


}