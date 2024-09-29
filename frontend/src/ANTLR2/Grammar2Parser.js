// Generated from Grammar2.g4 by ANTLR 4.13.1
// jshint ignore: start
import antlr4 from 'antlr4';
import Grammar2Listener from './Grammar2Listener.js';
import Grammar2Visitor from './Grammar2Visitor.js';

const serializedATN = [4,1,21,60,2,0,7,0,2,1,7,1,2,2,7,2,1,0,1,0,1,0,1,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,27,8,
1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,35,8,1,10,1,12,1,38,9,1,1,2,1,2,1,2,1,2,1,
2,1,2,1,2,3,2,47,8,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,55,8,2,10,2,12,2,58,9,2,
1,2,0,2,2,4,3,0,2,4,0,3,1,0,11,14,1,0,6,7,1,0,8,9,67,0,6,1,0,0,0,2,26,1,
0,0,0,4,46,1,0,0,0,6,7,3,2,1,0,7,8,5,0,0,1,8,1,1,0,0,0,9,10,6,1,-1,0,10,
27,5,4,0,0,11,27,5,5,0,0,12,13,3,4,2,0,13,14,5,10,0,0,14,15,3,4,2,0,15,27,
1,0,0,0,16,17,3,4,2,0,17,18,7,0,0,0,18,19,3,4,2,0,19,27,1,0,0,0,20,21,5,
3,0,0,21,27,3,2,1,4,22,23,5,17,0,0,23,24,3,2,1,0,24,25,5,18,0,0,25,27,1,
0,0,0,26,9,1,0,0,0,26,11,1,0,0,0,26,12,1,0,0,0,26,16,1,0,0,0,26,20,1,0,0,
0,26,22,1,0,0,0,27,36,1,0,0,0,28,29,10,3,0,0,29,30,5,1,0,0,30,35,3,2,1,4,
31,32,10,2,0,0,32,33,5,2,0,0,33,35,3,2,1,3,34,28,1,0,0,0,34,31,1,0,0,0,35,
38,1,0,0,0,36,34,1,0,0,0,36,37,1,0,0,0,37,3,1,0,0,0,38,36,1,0,0,0,39,40,
6,2,-1,0,40,47,5,19,0,0,41,47,5,20,0,0,42,43,5,17,0,0,43,44,3,4,2,0,44,45,
5,18,0,0,45,47,1,0,0,0,46,39,1,0,0,0,46,41,1,0,0,0,46,42,1,0,0,0,47,56,1,
0,0,0,48,49,10,3,0,0,49,50,7,1,0,0,50,55,3,4,2,4,51,52,10,2,0,0,52,53,7,
2,0,0,53,55,3,4,2,3,54,48,1,0,0,0,54,51,1,0,0,0,55,58,1,0,0,0,56,54,1,0,
0,0,56,57,1,0,0,0,57,5,1,0,0,0,58,56,1,0,0,0,6,26,34,36,46,54,56];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class Grammar2Parser extends antlr4.Parser {

    static grammarFileName = "Grammar2.g4";
    static literalNames = [ null, "'and'", "'or'", "'not'", "'true'", "'false'", 
                            "'+'", "'-'", "'*'", "'/'", "'='", "'>'", "'<'", 
                            "'>='", "'<='", "','", "';'", "'('", "')'" ];
    static symbolicNames = [ null, "AND", "OR", "NOT", "TRUE", "FALSE", 
                             "PLUS", "MINUS", "MULT", "DIV", "EQ", "MORETHAN", 
                             "LESSTHAN", "MOREEQ", "LESSEQ", "COMMA", "SEMI", 
                             "LPAREN", "RPAREN", "NUMBER", "VAR", "WS" ];
    static ruleNames = [ "condition", "boolExpr", "arithmeticExpr" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = Grammar2Parser.ruleNames;
        this.literalNames = Grammar2Parser.literalNames;
        this.symbolicNames = Grammar2Parser.symbolicNames;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 1:
    	    		return this.boolExpr_sempred(localctx, predIndex);
    	case 2:
    	    		return this.arithmeticExpr_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    boolExpr_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 3);
    		case 1:
    			return this.precpred(this._ctx, 2);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };

    arithmeticExpr_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 2:
    			return this.precpred(this._ctx, 3);
    		case 3:
    			return this.precpred(this._ctx, 2);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	condition() {
	    let localctx = new ConditionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, Grammar2Parser.RULE_condition);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 6;
	        this.boolExpr(0);
	        this.state = 7;
	        this.match(Grammar2Parser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	boolExpr(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new BoolExprContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 2;
	    this.enterRecursionRule(localctx, 2, Grammar2Parser.RULE_boolExpr, _p);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 26;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new BooleanExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 10;
	            this.match(Grammar2Parser.TRUE);
	            break;

	        case 2:
	            localctx = new BooleanExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 11;
	            this.match(Grammar2Parser.FALSE);
	            break;

	        case 3:
	            localctx = new EqualBExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 12;
	            this.arithmeticExpr(0);
	            this.state = 13;
	            this.match(Grammar2Parser.EQ);
	            this.state = 14;
	            this.arithmeticExpr(0);
	            break;

	        case 4:
	            localctx = new CompareBExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 16;
	            this.arithmeticExpr(0);
	            this.state = 17;
	            localctx.op = this._input.LT(1);
	            _la = this._input.LA(1);
	            if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 30720) !== 0))) {
	                localctx.op = this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 18;
	            this.arithmeticExpr(0);
	            break;

	        case 5:
	            localctx = new NotBExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 20;
	            this.match(Grammar2Parser.NOT);
	            this.state = 21;
	            this.boolExpr(4);
	            break;

	        case 6:
	            localctx = new ParenthesesBExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 22;
	            this.match(Grammar2Parser.LPAREN);
	            this.state = 23;
	            this.boolExpr(0);
	            this.state = 24;
	            this.match(Grammar2Parser.RPAREN);
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 36;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 34;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new ConjuctionBExprContext(this, new BoolExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, Grammar2Parser.RULE_boolExpr);
	                    this.state = 28;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 29;
	                    this.match(Grammar2Parser.AND);
	                    this.state = 30;
	                    this.boolExpr(4);
	                    break;

	                case 2:
	                    localctx = new DisjuctionBExprContext(this, new BoolExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, Grammar2Parser.RULE_boolExpr);
	                    this.state = 31;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 32;
	                    this.match(Grammar2Parser.OR);
	                    this.state = 33;
	                    this.boolExpr(3);
	                    break;

	                } 
	            }
	            this.state = 38;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,2,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}


	arithmeticExpr(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ArithmeticExprContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 4;
	    this.enterRecursionRule(localctx, 4, Grammar2Parser.RULE_arithmeticExpr, _p);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 46;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 19:
	            localctx = new NumberExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 40;
	            this.match(Grammar2Parser.NUMBER);
	            break;
	        case 20:
	            localctx = new VarExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 41;
	            this.match(Grammar2Parser.VAR);
	            break;
	        case 17:
	            localctx = new ParenthesesExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 42;
	            this.match(Grammar2Parser.LPAREN);
	            this.state = 43;
	            this.arithmeticExpr(0);
	            this.state = 44;
	            this.match(Grammar2Parser.RPAREN);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 56;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,5,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 54;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new PlusMinusExprContext(this, new ArithmeticExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, Grammar2Parser.RULE_arithmeticExpr);
	                    this.state = 48;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 49;
	                    localctx.op = this._input.LT(1);
	                    _la = this._input.LA(1);
	                    if(!(_la===6 || _la===7)) {
	                        localctx.op = this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 50;
	                    this.arithmeticExpr(4);
	                    break;

	                case 2:
	                    localctx = new MultDivExprContext(this, new ArithmeticExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, Grammar2Parser.RULE_arithmeticExpr);
	                    this.state = 51;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 52;
	                    localctx.op = this._input.LT(1);
	                    _la = this._input.LA(1);
	                    if(!(_la===8 || _la===9)) {
	                        localctx.op = this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 53;
	                    this.arithmeticExpr(3);
	                    break;

	                } 
	            }
	            this.state = 58;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,5,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}


}

Grammar2Parser.EOF = antlr4.Token.EOF;
Grammar2Parser.AND = 1;
Grammar2Parser.OR = 2;
Grammar2Parser.NOT = 3;
Grammar2Parser.TRUE = 4;
Grammar2Parser.FALSE = 5;
Grammar2Parser.PLUS = 6;
Grammar2Parser.MINUS = 7;
Grammar2Parser.MULT = 8;
Grammar2Parser.DIV = 9;
Grammar2Parser.EQ = 10;
Grammar2Parser.MORETHAN = 11;
Grammar2Parser.LESSTHAN = 12;
Grammar2Parser.MOREEQ = 13;
Grammar2Parser.LESSEQ = 14;
Grammar2Parser.COMMA = 15;
Grammar2Parser.SEMI = 16;
Grammar2Parser.LPAREN = 17;
Grammar2Parser.RPAREN = 18;
Grammar2Parser.NUMBER = 19;
Grammar2Parser.VAR = 20;
Grammar2Parser.WS = 21;

Grammar2Parser.RULE_condition = 0;
Grammar2Parser.RULE_boolExpr = 1;
Grammar2Parser.RULE_arithmeticExpr = 2;

class ConditionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = Grammar2Parser.RULE_condition;
    }

	boolExpr() {
	    return this.getTypedRuleContext(BoolExprContext,0);
	};

	EOF() {
	    return this.getToken(Grammar2Parser.EOF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.enterCondition(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.exitCondition(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof Grammar2Visitor ) {
	        return visitor.visitCondition(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class BoolExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = Grammar2Parser.RULE_boolExpr;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class EqualBExprContext extends BoolExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	arithmeticExpr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ArithmeticExprContext);
	    } else {
	        return this.getTypedRuleContext(ArithmeticExprContext,i);
	    }
	};

	EQ() {
	    return this.getToken(Grammar2Parser.EQ, 0);
	};

	enterRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.enterEqualBExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.exitEqualBExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof Grammar2Visitor ) {
	        return visitor.visitEqualBExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

Grammar2Parser.EqualBExprContext = EqualBExprContext;

class DisjuctionBExprContext extends BoolExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	boolExpr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(BoolExprContext);
	    } else {
	        return this.getTypedRuleContext(BoolExprContext,i);
	    }
	};

	OR() {
	    return this.getToken(Grammar2Parser.OR, 0);
	};

	enterRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.enterDisjuctionBExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.exitDisjuctionBExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof Grammar2Visitor ) {
	        return visitor.visitDisjuctionBExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

Grammar2Parser.DisjuctionBExprContext = DisjuctionBExprContext;

class CompareBExprContext extends BoolExprContext {

    constructor(parser, ctx) {
        super(parser);
        this.op = null;;
        super.copyFrom(ctx);
    }

	arithmeticExpr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ArithmeticExprContext);
	    } else {
	        return this.getTypedRuleContext(ArithmeticExprContext,i);
	    }
	};

	MORETHAN() {
	    return this.getToken(Grammar2Parser.MORETHAN, 0);
	};

	LESSTHAN() {
	    return this.getToken(Grammar2Parser.LESSTHAN, 0);
	};

	MOREEQ() {
	    return this.getToken(Grammar2Parser.MOREEQ, 0);
	};

	LESSEQ() {
	    return this.getToken(Grammar2Parser.LESSEQ, 0);
	};

	enterRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.enterCompareBExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.exitCompareBExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof Grammar2Visitor ) {
	        return visitor.visitCompareBExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

Grammar2Parser.CompareBExprContext = CompareBExprContext;

class BooleanExprContext extends BoolExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	TRUE() {
	    return this.getToken(Grammar2Parser.TRUE, 0);
	};

	FALSE() {
	    return this.getToken(Grammar2Parser.FALSE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.enterBooleanExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.exitBooleanExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof Grammar2Visitor ) {
	        return visitor.visitBooleanExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

Grammar2Parser.BooleanExprContext = BooleanExprContext;

class ConjuctionBExprContext extends BoolExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	boolExpr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(BoolExprContext);
	    } else {
	        return this.getTypedRuleContext(BoolExprContext,i);
	    }
	};

	AND() {
	    return this.getToken(Grammar2Parser.AND, 0);
	};

	enterRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.enterConjuctionBExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.exitConjuctionBExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof Grammar2Visitor ) {
	        return visitor.visitConjuctionBExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

Grammar2Parser.ConjuctionBExprContext = ConjuctionBExprContext;

class NotBExprContext extends BoolExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	NOT() {
	    return this.getToken(Grammar2Parser.NOT, 0);
	};

	boolExpr() {
	    return this.getTypedRuleContext(BoolExprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.enterNotBExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.exitNotBExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof Grammar2Visitor ) {
	        return visitor.visitNotBExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

Grammar2Parser.NotBExprContext = NotBExprContext;

class ParenthesesBExprContext extends BoolExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	LPAREN() {
	    return this.getToken(Grammar2Parser.LPAREN, 0);
	};

	boolExpr() {
	    return this.getTypedRuleContext(BoolExprContext,0);
	};

	RPAREN() {
	    return this.getToken(Grammar2Parser.RPAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.enterParenthesesBExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.exitParenthesesBExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof Grammar2Visitor ) {
	        return visitor.visitParenthesesBExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

Grammar2Parser.ParenthesesBExprContext = ParenthesesBExprContext;

class ArithmeticExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = Grammar2Parser.RULE_arithmeticExpr;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class VarExprContext extends ArithmeticExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	VAR() {
	    return this.getToken(Grammar2Parser.VAR, 0);
	};

	enterRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.enterVarExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.exitVarExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof Grammar2Visitor ) {
	        return visitor.visitVarExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

Grammar2Parser.VarExprContext = VarExprContext;

class NumberExprContext extends ArithmeticExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	NUMBER() {
	    return this.getToken(Grammar2Parser.NUMBER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.enterNumberExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.exitNumberExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof Grammar2Visitor ) {
	        return visitor.visitNumberExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

Grammar2Parser.NumberExprContext = NumberExprContext;

class PlusMinusExprContext extends ArithmeticExprContext {

    constructor(parser, ctx) {
        super(parser);
        this.op = null;;
        super.copyFrom(ctx);
    }

	arithmeticExpr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ArithmeticExprContext);
	    } else {
	        return this.getTypedRuleContext(ArithmeticExprContext,i);
	    }
	};

	PLUS() {
	    return this.getToken(Grammar2Parser.PLUS, 0);
	};

	MINUS() {
	    return this.getToken(Grammar2Parser.MINUS, 0);
	};

	enterRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.enterPlusMinusExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.exitPlusMinusExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof Grammar2Visitor ) {
	        return visitor.visitPlusMinusExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

Grammar2Parser.PlusMinusExprContext = PlusMinusExprContext;

class MultDivExprContext extends ArithmeticExprContext {

    constructor(parser, ctx) {
        super(parser);
        this.op = null;;
        super.copyFrom(ctx);
    }

	arithmeticExpr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ArithmeticExprContext);
	    } else {
	        return this.getTypedRuleContext(ArithmeticExprContext,i);
	    }
	};

	MULT() {
	    return this.getToken(Grammar2Parser.MULT, 0);
	};

	DIV() {
	    return this.getToken(Grammar2Parser.DIV, 0);
	};

	enterRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.enterMultDivExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.exitMultDivExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof Grammar2Visitor ) {
	        return visitor.visitMultDivExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

Grammar2Parser.MultDivExprContext = MultDivExprContext;

class ParenthesesExprContext extends ArithmeticExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	LPAREN() {
	    return this.getToken(Grammar2Parser.LPAREN, 0);
	};

	arithmeticExpr() {
	    return this.getTypedRuleContext(ArithmeticExprContext,0);
	};

	RPAREN() {
	    return this.getToken(Grammar2Parser.RPAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.enterParenthesesExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof Grammar2Listener ) {
	        listener.exitParenthesesExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof Grammar2Visitor ) {
	        return visitor.visitParenthesesExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

Grammar2Parser.ParenthesesExprContext = ParenthesesExprContext;


Grammar2Parser.ConditionContext = ConditionContext; 
Grammar2Parser.BoolExprContext = BoolExprContext; 
Grammar2Parser.ArithmeticExprContext = ArithmeticExprContext; 
