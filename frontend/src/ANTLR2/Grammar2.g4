// parser
grammar Grammar2;


condition:  boolExpr EOF;

boolExpr: TRUE														# booleanExpr
	| FALSE															# booleanExpr
	| arithmeticExpr '=' arithmeticExpr								# equalBExpr
	| arithmeticExpr op=( '>' | '<' | '>=' | '<=') arithmeticExpr   # compareBExpr
	| NOT boolExpr													# notBExpr
	| boolExpr AND boolExpr											# conjuctionBExpr
	| boolExpr OR boolExpr											# disjuctionBExpr
	| '(' boolExpr ')'												# parenthesesBExpr
	;

arithmeticExpr: NUMBER												# numberExpr
	| VAR															# varExpr
	| arithmeticExpr op=( PLUS | MINUS ) arithmeticExpr				# plusMinusExpr
	| arithmeticExpr op=( MULT | DIV ) arithmeticExpr				# multDivExpr
	| '(' arithmeticExpr ')'										# parenthesesExpr
	;

// lexer 

AND: 'and';
OR: 'or';
NOT: 'not';

TRUE: 'true';
FALSE: 'false';

PLUS: '+';
MINUS: '-';
MULT: '*';
DIV: '/';
EQ: '=';
MORETHAN: '>';
LESSTHAN: '<';
MOREEQ: '>=';
LESSEQ: '<=';

COMMA: ',';
SEMI: ';';
LPAREN: '(';
RPAREN: ')';

NUMBER: ('-')? ('0' | [1-9][0-9]*) ('.' [0-9]+)?;
VAR: [a-zA-Z_][a-zA-Z_0-9]*;
WS: [ \t\n\r\f]+ -> skip;