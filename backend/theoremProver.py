from z3 import *
import sys, logging

logging.basicConfig(level=logging.ERROR) 

try:
    expString = ' '
    for i in sys.argv:
        if (i != "theoremProver.py"):
            expString = expString + i + ' '

    dict = {}
    dictCount = 0
    for x in expString:
        if x.isalpha():
            qq = 'key' + str(dictCount)
            dictCount+=1    
            dict[qq] = Int(x)
            expString = expString.replace(' ' + x + ' ' , ' dict[qq] ')
            #print(expString)

    part = expString.split("=>")
    #print(part)

    s = Solver()
    s.add(Not(Implies(eval(part[0]), eval(part[1]))))
    print(s.check())

    sys.stdout.flush()
    
except Exception as e:
  logging.error(f"An error occurred: {e}")
