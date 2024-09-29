import GrammarVisitor from "./GrammarVisitor";

export default class MyVisitor extends GrammarVisitor {

    visitTerminal(ctx) {
        return ctx.getText();
    }

    visitAssignStatm(ctx) {
        let variable = ctx.VAR().getText();
        let expression = this.visit(ctx.arithmeticExpr());
        return { type: 'AssignStatement', variable, expression };
    }

    visitSkipStatm(ctx) {
        return { type: 'SkipStatement' };
    }

    visitSequenceStatm(ctx) {
        let firstStatement = this.visit(ctx.statement(0));
        let secondStatement = this.visit(ctx.statement(1));
        return { type: 'SequenceStatement', firstStatement, secondStatement };
    }

    visitIfStatm(ctx) {
        let condition = this.visit(ctx.boolExpr());
        let thenStatement = this.visit(ctx.statement(0));
        let elseStatement = this.visit(ctx.statement(1));
        return { type: 'IfStatement', condition, thenStatement, elseStatement };
    }

    visitWhileStatm(ctx) {
        let condition = this.visit(ctx.boolExpr());
        let loopStatement = this.visit(ctx.statement());
        return { type: 'WhileStatement', condition, loopStatement };
    }

    visitParenthesesStatm(ctx) {
        return { type: 'Parentheses', expression: this.visit(ctx.statement()) };
    }

    visitNumberExpr(ctx) {
        return parseInt(ctx.NUMBER().getText());
    }

    visitVarExpr(ctx) {
        return ctx.VAR().getText();
    }

    visitPlusMinusExpr(ctx) {
        let left = this.visit(ctx.arithmeticExpr(0));
        let right = this.visit(ctx.arithmeticExpr(1));
        let operator = ctx.op.text;
        return { type: 'ArithmeticExpression', operator, left, right };
    }

    visitMultDivExpr(ctx) {
        let left = this.visit(ctx.arithmeticExpr(0));
        let right = this.visit(ctx.arithmeticExpr(1));
        let operator = ctx.op.text;
        return { type: 'ArithmeticExpression', operator, left, right };
    }

    visitParenthesesExpr(ctx) {
        return { type: 'Parentheses', expression: this.visit(ctx.arithmeticExpr()) };
    }

    visitBooleanExpr(ctx) {
        if (ctx.TRUE()) {
            return true;
        } else if (ctx.FALSE()) {
            return false;
        }
    }

    visitEqualBExpr(ctx) {
        let left = this.visit(ctx.arithmeticExpr(0));
        let right = this.visit(ctx.arithmeticExpr(1));
        return { type: 'BinaryExpression', operator: '=', left, right };
    }

    visitCompareBExpr(ctx) {
        let left = this.visit(ctx.arithmeticExpr(0));
        let right = this.visit(ctx.arithmeticExpr(1));
        let operator = ctx.op.text;
        return { type: 'BinaryExpression', operator, left, right };
    }

    visitNotBExpr(ctx) {
        let operand = this.visit(ctx.boolExpr());
        return { type: 'UnaryExpression', operator: 'not', operand };
    }

    visitConjuctionBExpr(ctx) {
        let left = this.visit(ctx.boolExpr(0));
        let right = this.visit(ctx.boolExpr(1));
        return { type: 'AndExpression', operator: 'and', left, right };
    }

    visitDisjuctionBExpr(ctx) {
        let left = this.visit(ctx.boolExpr(0));
        let right = this.visit(ctx.boolExpr(1));
        return { type: 'OrExpression', operator: 'or', left, right };
    }

    visitParenthesesBExpr(ctx) {
        return { type: 'Parentheses', expression: this.visit(ctx.boolExpr()) };
    }
}

