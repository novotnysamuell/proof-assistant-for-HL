import React, { useRef } from "react";
import rules from "./rules.png";
import rulesSk from "./rulesSk.png";
import Button from "./Button";
import polygon1 from "./Polygon.png";
import ExampleButton from "./ExampleButton";
import group from "./group-1.png";
import RightArrow from "./RightArrow.png"
import LeftArrow from "./leftArrow.png"
import Rules from "./MathJaxRules.jsx"

export const Popup = ({ closePopup, slovak }) => {
    const generalRef = useRef(null);
    const buttonsRef = useRef(null);
    const syntaxRef = useRef(null);
    const grammarRef = useRef(null);
    const rulesRef = useRef(null);

    const scrollToSection = (targetDivRef) => {
        if (targetDivRef.current) {
            targetDivRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <div className="popup-container">
            <div className="popup-body">
                <div className="popup-head">
                    {slovak ? <button className="textInHelpHead" onClick={() => scrollToSection(generalRef)} >Všeobecné</button> :
                        <button className="textInHelpHead" onClick={() => scrollToSection(generalRef)} >General</button>}
                    {slovak ? <button className="textInHelpHead" onClick={() => scrollToSection(buttonsRef)}>Tlačidlá</button> :
                        <button className="textInHelpHead" onClick={() => scrollToSection(buttonsRef)}>Buttons</button>}
                    <button className="textInHelpHead" onClick={() => scrollToSection(syntaxRef)}>Syntax</button>
                    {slovak ? <button className="textInHelpHead" onClick={() => scrollToSection(grammarRef)}>Gramatika</button> :
                        <button className="textInHelpHead" onClick={() => scrollToSection(grammarRef)}>Grammar</button>}
                    {slovak ? <button className="textInHelpHead" onClick={() => scrollToSection(rulesRef)}>Pravidlá</button> :
                        <button className="textInHelpHead" onClick={() => scrollToSection(rulesRef)}>Rules</button>}
                    <button onClick={closePopup} className="textInHelpHead" > X</button>
                </div>
                <div className="helper-context">
                    {slovak ? <h2 ref={generalRef} style={{ marginLeft: '1.5%', marginTop: '0%' }}>Všeobecné</h2> :
                        <h2 ref={generalRef} style={{ marginLeft: '1.5%', marginTop: '0%' }}>General</h2>}
                    <div style={{ marginLeft: '1%', marginBottom: '2%', textAlign: 'start' }}>
                        {slovak ? <p style={{ margin: '0%', marginLeft: '1%', marginBottom: '1%' }}>Táto webová aplikácia slúži ako učebná pomôcka pri štúdiu problematiky Axiomatickej sémantiky. Využíva <span style={{ fontWeight: '700' }}>MathJax </span> na vizualizovanie dôkazových stromov.
                            Ak máte zobrazený dôkaz, kliknutím pravého tlačidla na myši sa Vám zobrazia nastavenia MathJax-u. Ak kliknete na "Show Math As"→"TeX Commands" otvorí sa Vám vyskakovacie okno s dôkazovým stromom zapísanom v <span style={{ fontWeight: '700' }}>Latex syntaxi,</span> ktorý si viete priamo skopírovať.
                            Aby ste mohli použiť tento Latex zápis, musíte si pridať balík <span style={{ fontWeight: '700' }}>bussproofs</span> do Vášho Latex prostredia. </p> :
                            <p style={{ margin: '0%', marginLeft: '1%', marginBottom: '1%' }}>This web application provides assistance when learning Axiomatic semantics. It uses <span style={{ fontWeight: '700' }}>MathJax </span>for visualization of proofs.
                                When you have your proof shown, you can open MathJax options by right-clicking on your proof tree. If you click on "Show Math As"→"TeX Commands" a pop-up window will be open with proof tree written in <span style={{ fontWeight: '700' }}>Latex syntax</span> ,which you can also copy.
                                To be able to use this Latex syntax, you also need to include package <span style={{ fontWeight: '700' }}>bussproofs</span> in your Latex environment. </p>}
                        {slovak ? <p style={{ margin: '0%', marginLeft: '1%', marginBottom: '1%' }} > <span style={{ fontWeight: '700' }}>Poznámka: </span>Ak používate tlačidlo <span style={{ fontWeight: '700' }}>Uhádnuť pravidlo</span>, myslite na to, že vždy sa počíta najpravejšia vetva dôkazového stromu ako prvá, až kým nie je ukončená. </p>
                            : <p style={{ margin: '0%', marginLeft: '1%', marginBottom: '1%' }} > <span style={{ fontWeight: '700' }}>Note: </span>When using option <span style={{ fontWeight: '700' }}>Guess next rule</span>, keep in mind that the right side of the proof tree is always calculated first until it's completed. </p>}
                        {slovak ? <p style={{ margin: '0%', marginLeft: '1%', marginBottom: '1%' }} > <span style={{ fontWeight: '700' }}>Červená farba v dôkaze: </span>Ak vidíte implikáciu znázornenú červeným písmom, znamená to, že táto implikácia je nepravdivá; A teda tento dôkazový strom, nemôže ďalej pokračovať.</p>
                            : <p style={{ margin: '0%', marginLeft: '1%', marginBottom: '1%' }} > <span style={{ fontWeight: '700' }}>Red color in proof: </span>If you see an implication written in red color, it means that it's incorrect; thus, the proof tree cannot continue.</p>}
                    </div>
                    {slovak ? <h2 ref={buttonsRef} style={{ marginLeft: '1.5%', marginTop: '0%', marginBottom: '0%' }}>Tlačidlá</h2> :
                        <h2 ref={buttonsRef} style={{ marginLeft: '1.5%', marginTop: '0%', marginBottom: '0%' }}>Buttons</h2>}
                    <div style={{ display: 'flex', flexDirection: 'column', height: 'auto', marginTop: '2%', marginBottom: '2%', marginLeft: '1.5%' }}>
                        <div style={{ marginTop: '2%', marginBottom: '3%', display: 'flex', flexDirection: 'row', gap: '2rem' }}>
                            {slovak ? <Button theme="default orange" style={{ width: '12rem' }} >Vizualizovať<img src={polygon1} className="polygon" alt="" /></Button> :
                                <Button theme="default orange" >Visualize<img src={polygon1} className="polygon" alt="" /></Button>}
                            <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>→</p>
                            {slovak ? <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>Stlačte toto tlačidlo na zobrazenie dôkazu vami zadaného príkladu.</p>
                                : <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>Click this button to calculate problem you entered.</p>}
                        </div>
                        <div style={{ marginTop: '2%', marginBottom: '3%', display: 'flex', flexDirection: 'row', gap: '2rem' }}>
                            <ExampleButton slovak={slovak} />
                            <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>→</p>
                            {slovak ? <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>Stlačte toto tlačidlo pre zobrazenie rôznych príkladov pre Hoareove trojice.</p>
                                : <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>Click this button to show you various exapmles for Hoare triples.</p>}
                        </div>
                        <div style={{ marginTop: '2%', marginBottom: '3%', display: 'flex', flexDirection: 'row', gap: '1.4rem' }}>
                            {slovak ? <Button theme="default bsave" >Uložiť výsledok<img src={group} className="save" alt="" /></Button>
                                : <Button theme="default bsave" >Save Result<img src={group} className="save" alt="" /></Button>}
                            <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>→</p>
                            {slovak ? <p style={{ marginLeft: '3.5%', marginTop: '1%', marginBottom: '0%' }}>Stlačte toto tlačidlo pre uloženie výsledku v png formáte.</p>
                                : <p style={{ marginLeft: '3.5%', marginTop: '1%', marginBottom: '0%' }}>Click this button to save your result as png. For Latex syntax read General.</p>}
                        </div>
                        <div style={{ marginTop: '2%', marginBottom: '3%', display: 'flex', flexDirection: 'row', gap: '2rem' }}>
                            <div className='showTree' >
                                {slovak ? <button id="Steps" className='showTree-Buttons showTree-Buttons-clicked'>Krok za krokom</button> :
                                    <button id="Steps" className='showTree-Buttons showTree-Buttons-clicked'>Step by step</button>}
                                {slovak ? <button id="Whole" className='showTree-Buttons' >Celý dôkaz</button> :
                                    <button id="Whole" className='showTree-Buttons' >Whole proof</button>}
                            </div>
                            <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>→</p>
                            {slovak ? <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>Stlačte jedno z týchto tlačidiel na zobrazenie dôkazu krok za krokom alebo na zobrazenie celého dôkazového stromu.</p>
                                : <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>Click one of the buttons to show you step by step calculations or whole problem already calculated.</p>}
                        </div>
                        <div style={{ marginTop: '2%', marginBottom: '3%', display: 'flex', flexDirection: 'row', gap: '2.6rem' }}>
                            <div className="steping">
                                {slovak ? <Button theme="default" ><img src={LeftArrow} className="leftarrow" alt="" />Predošlý </Button> :
                                    <Button theme="default" ><img src={LeftArrow} className="leftarrow" alt="" />Previous </Button>}
                                {slovak ? <Button theme="default" >Ďalší<img src={RightArrow} className="rightarrow" alt="" /></Button> :
                                    <Button theme="default">Next<img src={RightArrow} className="rightarrow" alt="" /></Button>}
                            </div>
                            <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>→</p>
                            {slovak ? <p style={{ marginLeft: '1%', marginTop: '1%', marginBottom: '0%' }}>Stlačte jedno z týchto tlačidiel pre zobrazenie minulého alebo nasledujúceho kroku pri zobrazovaní dôkazoveho stromu v režime Krok za krokom.</p>
                                : <p style={{ marginLeft: '1%', marginTop: '1%', marginBottom: '0%' }}>Click one of the buttons to show you previous or next step when using Step by step method.</p>}
                        </div>
                        <div style={{ marginTop: '2%', marginBottom: '3%', display: 'flex', flexDirection: 'row', gap: '2rem' }}>
                            {slovak ? <Button theme="default guess" >Uhádnuť pravidlo</Button> :
                                <Button theme="default guess" >Guess next rule</Button>}
                            <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>→</p>
                            {slovak ? <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>Stlačte toto tlačidlo pre zobrazenie panelu s pravidlami. Následne ho môžete skúsiť aplikovať v dôkaze.</p>
                                : <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>Click this button to open bar for guessing next rule for calculating result.</p>}
                        </div>
                        <div style={{ marginTop: '2%', marginBottom: '3%', display: 'flex', flexDirection: 'row', gap: '2rem' }}>
                            <Rules slovak={slovak} openedHelper={true} />
                            <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>→</p>
                            {slovak ? <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>Stlačte toto tlačidlo, pre možnosť rýchleho zobrazenia pravidiel.</p>
                                : <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>Click this button to open popup window to check rules.</p>}
                        </div>
                    </div>
                    {slovak ? <h2 ref={syntaxRef} style={{ marginLeft: '1.5%', marginTop: '0%' }}>Syntax pre predikáty</h2> :
                        <h2 ref={syntaxRef} style={{ marginLeft: '1.5%', marginTop: '0%' }}>Syntax for predicates</h2>}
                    <p style={{ marginLeft: '2%', fontFamily: 'Roboto Mono, monospace', fontSsize: '16px', fontWeight: '500' }}>{'P ::= ⊤ | ⊥ | e > e | e < e | e ≤ e | e ≥ e | e = e | P1 ∧ P2 | P1 ∨ P2 | ¬P | (P)'}</p>
                    {slovak ? <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>Pre nasledujúce symboly použite tieto ekvivalenty:</p>
                        : <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>For folowing symbols use these instead:</p>}
                    <table>
                        <tr>
                            <th>Symbol</th>
                            {slovak ? <th>Použite</th> : <th>Use</th>}
                        </tr>
                        <tr>
                            <td>⊤</td>
                            <td>true</td>
                        </tr>
                        <tr>
                            <td>⊥</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>≤</td>
                            <td>{'<='}</td>
                        </tr>
                        <tr>
                            <td>≥</td>
                            <td>{'>='}</td>
                        </tr>
                        <tr>
                            <td>∧</td>
                            <td>and</td>
                        </tr>
                        <tr>
                            <td>∨</td>
                            <td>or</td>
                        </tr>
                        <tr>
                            <td>¬</td>
                            <td>not</td>
                        </tr>
                    </table>
                    {slovak ? <h2 ref={grammarRef} style={{ marginLeft: '1.5%', marginTop: '2%', marginBottom: '1%' }}>Gramatika</h2> :
                        <h2 ref={grammarRef} style={{ marginLeft: '1.5%', marginTop: '2%', marginBottom: '1%' }}>Grammar</h2>}
                    <p style={{ marginLeft: '2%', fontFamily: 'Roboto Mono, monospace', fontSsize: '16px', fontWeight: '500', marginBottom: '1%' }}>e ::= n | x | e + e | e - e | e * e</p>
                    <p style={{ marginLeft: '2%', fontFamily: 'Roboto Mono, monospace', fontSsize: '16px', marginBottom: '1%' }}>b ::= <span style={{ fontWeight: '700' }}>true</span> | <span style={{ fontWeight: '700' }}>false</span> {'| e = e | e > e | e < e | e ≤ e | e ≥ e | ¬ b | b ∧ b | b ∨ b | (b)'}</p>
                    <p style={{ marginLeft: '2%', fontFamily: 'Roboto Mono, monospace', fontSsize: '16px', marginBottom: '2%' }}>S ::= x := e | skip | S; S | if b then S else S | while b do S</p>
                    {slovak ? <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>n → číslo</p> :
                        <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>n → number</p>}
                    {slovak ? <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>x → premenná</p> :
                        <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>x → variable</p>}
                    {slovak ? <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>e → aritmetický výraz</p> :
                        <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>e → expression</p>}
                    {slovak ? <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>b → boolovský výraz</p> :
                        <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '0%' }}>b → boolean expression</p>}
                    {slovak ? <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '2%' }}>S → príkaz</p> :
                        <p style={{ marginLeft: '2%', marginTop: '1%', marginBottom: '2%' }}>S → instruction</p>}
                    {slovak ? <h2 ref={rulesRef} style={{ marginLeft: '1.5%' }}>Pravidlá</h2> :
                        <h2 ref={rulesRef} style={{ marginLeft: '1.5%' }}>Rules</h2>}
                    {slovak ? <img src={rulesSk} style={{ height: '600px' }} alt=""></img> :
                        <img src={rules} style={{ height: '600px' }} alt=""></img>}
                </div>
            </div>
        </div >
    );
};