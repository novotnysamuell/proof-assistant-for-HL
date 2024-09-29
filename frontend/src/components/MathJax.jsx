import { MathJax, MathJaxContext } from 'better-react-mathjax';


const configMathjax = {
    loader: { load: ["[tex]/bussproofs"] },
    tex: { packages: { "[+]": ["bussproofs"] } },

};


const Math = ({ content }) => {

    return (
        <div className="visualize-win" >
            <MathJaxContext config={configMathjax}>
                <MathJax inline dynamic >{content}</MathJax>
            </MathJaxContext>
        </div>
    );
}

export default Math;
