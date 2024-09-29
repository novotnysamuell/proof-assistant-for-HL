import "./App.css";
import Editor from "@monaco-editor/react";
import group from "./components/group-1.png";
import polygon1 from "./components/Polygon.png";
import React, { useState, useEffect, useRef } from "react";
import Antlr from "./components/AntlrClass.js";
import Button from "./components/Button.jsx";
import MathJax from "./components/MathJax.jsx";
import ExampleButton from "./components/ExampleButton.jsx";
import WrongInput from "./components/WrongInput.jsx";
import Invariant from "./components/Invariant.jsx";
import { Popup } from "./components/HelpButton.jsx";
import html2canvas from "html2canvas";
import RightArrow from "./components/RightArrow.png"
import LeftArrow from "./components/leftArrow.png"
import treeKresliar from "./components/CalculateProofTree.jsx"
import questionmark from "./components/questionmark.png"
import GuessRuleBar from "./components/GuessRuleBar.jsx";
import DropDown from "./components/DropButton.jsx";
import Rules from "./components/MathJaxRules.jsx"
import Alert from "./components/Alert.jsx";
import Language from "./components/Language.jsx";


const editorOptions = {
  autoIndent: "full",
  lineHeight: 30,
  matchBrackets: "always",
  fontSize: "72px",
  scrollBeyondLastLine: false,
};


function App() {
  const editorRef = useRef(null);
  const [contentMath, setContentMath] = useState("");
  const [displayOutput, setDisplayOutput] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false)
  const [isWrongInput, setWrongInput] = useState(false)
  const [retrievedValue, setRetrievedValue] = useState(false);
  const [whileCount, setWhileCount] = useState(0)
  const [invariantVal, setInvariantVal] = useState("")
  const [allInvariantsSet, setAllInvariantsSet] = useState(false)
  const [help, setHelp] = useState(false);
  const [countSteps, setCountSteps] = useState(1)
  const [parserResult, setparserResult] = useState('')
  const [parserCount, setParserCount] = useState(0)
  const [guessRule, setGuessRule] = useState(1)
  const [guessBar, setGuessBar] = useState(false)
  const [scroll, setScroll] = useState(false)
  const [firstViz, setFirstViz] = useState(false)
  const [proofDone, setProofDone] = useState(false)
  const [z3sat, setZ3sat] = useState(false)
  const [alert, setAlert] = useState(false)
  const [slovak, setSlovak] = useState(true)
  const [editorText, setEditorText] = useState(slovak ? "//Zadajte Hoareovu trojicu" : "//Enter Hoare Triple");
  const [editorOptions, setEditorOptions] = useState({
    autoIndent: "full",
    matchBrackets: "always",
    fontSize: "18px",
    lineHeight: "27px",
    scrollBeyondLastLine: false,
  })
  const targetDivRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      windowWidth < 720 ? setIsMobile(true) : setIsMobile(false)
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);


  function handleEditorValue(editor, monaco) {
    editorRef.current = editor;
  }

  const scrollToVisualizeWin = () => {
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (scroll) {
      scrollToVisualizeWin()
    }
  }, [scroll])



  async function getEditorValue() {
    setZ3sat(false)
    setProofDone(false)
    setAlert(false)
    setScroll(false)
    setRetrievedValue(false)
    setAllInvariantsSet(false)
    setWrongInput(false)
    setInvariantVal("")
    setCountSteps(1)
    let input = editorRef.current.getValue();
    const myParser = new Antlr(input);
    try {
      myParser.inputcheck()
      let whileCount = myParser.isWhileStatement()
      setWhileCount(whileCount)
      if (whileCount !== 0) {
        setAlert(true)
        setRetrievedValue(true)
      } else {
        await parser(input, myParser);
      }
    } catch (error) {
      //console.log(error)
      setWrongInput(error.msg)
      return
    }
  }

  function generateInvariant() {
    let arr = []
    for (let index = 0; index < whileCount; index++) {
      arr.push(<Invariant key={index} slovak={slovak} calculateProblem={calculateProblemWithInvariant} setInvariantVal={setInvariantVal} />)
    }
    return arr
  }

  async function parser(input, myParser) {
    let parserresult = await myParser.calculateProblem(input);
    setparserResult(parserresult)
    setParserCount(myParser.counter)
    setContentMath(treeKresliar(parserresult, 1, myParser.counter, setZ3sat));
    setDisplayOutput(true)
    setScroll(true)
    setFirstViz(true)
    if (firstViz) {
      steps(true)
    }
  }


  async function calculateProblemWithInvariant(invariant) {
    let input = editorRef.current.getValue();
    const myParser = new Antlr(input);
    let parserresult = await myParser.calculateProblem(input, invariant);
    setparserResult(parserresult)
    setParserCount(myParser.counter)
    setContentMath(treeKresliar(parserresult, 1, myParser.counter, setZ3sat));
    setDisplayOutput(true)
    setScroll(true)
    setFirstViz(true)
    if (firstViz) {
      steps(true)
    }
    scrollToVisualizeWin()
  }

  const exportAsImage = async () => {
    let el = document.getElementsByClassName("MathJax CtxtMenu_Attached_0")[0]
    el.style.width = el.scrollWidth + "px"
    el.style.height = el.scrollHeight + "px"
    el.style.paddingTop = "20px"
    el.style.paddingLeft = "20px"
    el.style.paddingRight = "20px"
    el.style.paddingBottom = "20px"
    let imageFileName = "proof"
    const canvas = await html2canvas(el, {
      ignoreElements: function (e) {
        if (e.tagName.toLowerCase() === "mjx-assistive-mml") return true
      }
    });
    const image = canvas.toDataURL("image/png", 1.0);
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = imageFileName;
    fakeLink.href = image;
    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);
    fakeLink.remove();
  };

  function steps(show = false) {
    let clicked = "showTree-Buttons showTree-Buttons-clicked"
    let def = "showTree-Buttons"
    setZ3sat(false)
    setProofDone(false)
    let el = document.getElementById("Steps")
    el.className = clicked
    el = document.getElementById("Whole")
    el.className = def
    el = document.getElementById("StepsCommands")
    el.style.display = 'flex'
    if (!show) {
      setCountSteps(1)
      setContentMath(treeKresliar(parserResult, 1, parserCount, setZ3sat))
    }
  }

  function whole() {
    let clicked = "showTree-Buttons showTree-Buttons-clicked"
    let def = "showTree-Buttons"
    let el = document.getElementById("Whole")
    el.className = clicked
    el = document.getElementById("Steps")
    el.className = def
    el = document.getElementById("StepsCommands")
    el.style.display = 'none'
    setGuessBar(false)
    setProofDone(false)
    setContentMath(treeKresliar(parserResult, parserCount + 1, parserCount, setZ3sat))
  }

  const nextStep = () => {
    let count = countSteps
    if (count + 1 === parserCount + 1) {
      setProofDone(true)
    }
    if (countSteps + 1 <= parserCount + 1) {
      setCountSteps(countSteps => (countSteps + 1))
      count++
    }
    setContentMath(treeKresliar(parserResult, count, parserCount, setZ3sat))
  }

  const previousStep = () => {
    setZ3sat(false)
    let count = countSteps
    setProofDone(false)
    if (countSteps - 1 >= 1) {
      setCountSteps(countSteps => (countSteps - 1))
      count--
    }
    setContentMath(treeKresliar(parserResult, count, parserCount, setZ3sat))
  }

  useEffect(() => {
    if (whileCount !== 0) {
      setAllInvariantsSet(true)
    }
  }, [invariantVal])

  useEffect(() => {
    nextStep()
  }, [guessRule])


  function showHideGuessBar() {
    guessBar ? setGuessBar(false) : setGuessBar(true)
  }

  useEffect(() => {
    if (editorRef.current !== null) {
      if (editorRef.current.getValue().includes("//")) {
        slovak ? setEditorText("//Zadajte Hoareovu trojicu") : setEditorText("//Enter Hoare Triple")
      }
    }
  }, [slovak])

  return (
    <div className="App">
      <div style={{ margin: '0%', height: '3.5rem', display: "flex", justifyContent: 'center' }}>
        {alert && <Alert slovak={slovak} />}
        <Language setSlovak={setSlovak} />
      </div>
      <div className="frame-6">
        {slovak ? <Button theme="default orange" style={{ width: '12rem' }} onClick={getEditorValue}>Vizualizovať<img src={polygon1} className="polygon" alt="" /></Button> :
          <Button theme="default orange" onClick={getEditorValue}>Visualize<img src={polygon1} className="polygon" alt="" /></Button>}
        <ExampleButton slovak={slovak} setEditorText={setEditorText} />
        <div>
          {slovak ? <Button theme="default helpsk" onClick={() => setHelp(true)}>Nápoveda<img src={questionmark} className="questionmark" alt="" /></Button> :
            <Button theme="default help" onClick={() => setHelp(true)}> Help <img src={questionmark} className="questionmark" alt="" /></Button>}
          {help ? <Popup slovak={slovak} closePopup={() => setHelp(false)} /> : null}
        </div>
        <DropDown handleclick={setEditorOptions} />
      </div>

      <div className="frame-7">
        <Editor
          options={editorOptions}
          language="apex"
          value={editorText}
          height={"400px"}
          width={"50vw"}
          onChange={(value) => setEditorText(value)}
          onMount={handleEditorValue}
        />
        {isWrongInput !== false && < WrongInput slovak={slovak} msg={isWrongInput} />}
        <div className="invariant-wrapper">
          {(retrievedValue !== false && slovak) && <p className="invariant-input" style={{ marginBottom: '4%' }}>Pre tento príklad je potrebné zadať invariant cyklu.</p>}
          {(retrievedValue !== false && !slovak) && <p className="invariant-input" style={{ marginBottom: '4%' }}>For this problem you also need to provide loop invariant.</p>}
          {retrievedValue !== false && generateInvariant()}
        </div>
      </div>
      <div ref={targetDivRef} id="target-div" style={{ overflow: 'hidden', width: '95vw', marginBottom: '5%' }}>
        {displayOutput && <div style={{ height: '18rem', marginLeft: '2%' }}>
          <div className="upper-options">
            <div className='showTree'>
              {slovak ? <button id="Steps" className='showTree-Buttons showTree-Buttons-clicked' onClick={() => steps(false)}>Krok za krokom</button> :
                <button id="Steps" className='showTree-Buttons showTree-Buttons-clicked' onClick={() => steps(false)}>Step by step</button>}
              {slovak ? <button id="Whole" className='showTree-Buttons' onClick={whole}>Celý dôkaz</button> :
                <button id="Whole" className='showTree-Buttons' onClick={whole}>Whole proof</button>}
            </div>
            {slovak ? <Button theme="default bsave" onClick={exportAsImage}>Uložiť výsledok<img src={group} className="save" alt="" /></Button>
              : <Button theme="default bsave" onClick={exportAsImage}>Save Result<img src={group} className="save" alt="" /></Button>}

          </div>
          <div id="StepsCommands" className="steping">
            {slovak ? <Button theme="default" onClick={() => previousStep()}><img src={LeftArrow} className="leftarrow" alt="" />Predošlý </Button> :
              <Button theme="default" onClick={() => previousStep()}><img src={LeftArrow} className="leftarrow" alt="" />Previous </Button>}
            {slovak ? <Button theme="default" onClick={() => nextStep()}>Ďalší<img src={RightArrow} className="rightarrow" alt="" /></Button> :
              <Button theme="default" onClick={() => nextStep()}>Next<img src={RightArrow} className="rightarrow" alt="" /></Button>}
            {slovak ? <Button theme="default guess" onClick={showHideGuessBar}>Uhádnuť pravidlo</Button> :
              <Button theme="default guess" onClick={showHideGuessBar}>Guess next rule</Button>}
            <Rules slovak={slovak} openedHelper={false} />
          </div>
          {guessBar && <GuessRuleBar slovak={slovak} obj={parserResult} counter={countSteps} setCountSteps={setGuessRule} parserCount={parserCount} />}
          {(z3sat && slovak) && <p className="wrong-input" style={{ fontWeight: '600', paddingLeft: '0.5%', marginBottom: '0%', marginBottom: '0%' }}> Implikácia, znázornená červenou farbou, hovorí o tom, že je nepravdivá. To znamená, že táto vetva stromu nemôže ďalej pokračovať a dôkaz je neúplný.</p>}
          {(z3sat && !slovak) && <p className="wrong-input" style={{ fontWeight: '600', paddingLeft: '0.5%', marginBottom: '0%', marginBottom: '0%' }}> Red implication indicates that the proof tree cannot be further extended. Therefore, the proof is incomplete.</p>}
          {(proofDone && slovak) && <p className='wrong-input' style={{ color: '#50ada6', fontWeight: '600', paddingLeft: '0.5%', marginBottom: '0%' }}>Príklad je vyriešený.</p>}
          {(proofDone && !slovak) && <p className='wrong-input' style={{ color: '#50ada6', fontWeight: '600', paddingLeft: '0.5%', marginBottom: '0%' }}>The problem is solved.</p>}
        </div>}

        {displayOutput && <MathJax content={contentMath} />}
      </div>

    </div>
  );
}


export default App;
