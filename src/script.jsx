import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import EvidenceList from './EvidenceList';
import SuspectExperience from './SuspectExperience';

Modal.setAppElement('#game-container')


window.onload = () => {
    function App() {
        const [ currentIdx, setCurrentIdx ] = React.useState(0);
        const [ finalSuspectName, setFinalSuspectName ] = React.useState(null);
        const correctSuspect = finalSuspectName == 'stoat';
        const advanceIdx = (name) => {
            if(typeof name == 'string' && finalSuspectName != name)
                setFinalSuspectName(name);
            setCurrentIdx(currentIdx + 1);
        }
        React.useEffect(() => {
            if(currentIdx == 7) {
                var id = setTimeout(() => {
                    advanceIdx();
                }, 2000);
                return () => clearTimeout(id);
            }
        }, [ currentIdx ]);
        if(currentIdx == 0)
            return <div className="evidence-list">
                <center><h1>{document.title}</h1></center>
                The body of a woodpigeon was discovered in a copse near the woods.
                <p></p>
                No one witnessed anything, so it will be up to you to do some detective work and find who the murderer was.
                <p></p>
                Our CSI team has already visited the scene and collected some evidence. Click <b>Start</b> to have a look!
                <p></p>
                <center><button onClick={advanceIdx}>Start</button></center>
            </div>;
        if(currentIdx == 1)
            return <EvidenceList toNext={advanceIdx}/>;
        else if(currentIdx <= 5)
            return <SuspectExperience idx={currentIdx-2} toNext={advanceIdx}/>;
        else if(currentIdx == 6)
            return <div className="evidence-list">
                So, you've eliminated all the options and worked out that the {finalSuspectName} was responsible for the murder? Great work!
                <p></p>
                Click the button to send your findings to the court so they can go ahead with the trial.
                <p></p>
                <center><button onClick={advanceIdx}>Send report e-mail</button></center>
            </div>;
        else if(currentIdx == 7)
            return <div className="evidence-list">
                Sending e-mail...
            </div>;
        else
            return <div className="evidence-list">
                <h2>Re: {finalSuspectName.charAt(0).toUpperCase() + finalSuspectName.substr(1)} is responsible for the crime</h2>
                <p>
                    <img className="floated-suspect-image" src={`images/${finalSuspectName}.svg`}/>
                    {correctSuspect && "Yes, that was the right suspect! Thanks to all the evidence and conclusions you made, the stoat was found guilty at the trial."}
                    {!correctSuspect && "Hmm, that's not the animal we were looking to catch."}
                </p>
                <p>
                    {correctSuspect && "Nonetheless, we'll have to allow the stoat to get away with this crime, because animals like the woodpigeon are part of its diet."}
                    {!correctSuspect && `Given the evidence, I don't think that the ${finalSuspectName} would want to eat the woodpigeon!`}
                </p>
                <p>
                    {correctSuspect && "Great work! If we have any other cases that need solving, we'll be sure to contact you."}
                    {!correctSuspect && "You still did a good job, though. When we finally catch the murderer, your conclusions will definitely have helped us!"}
                </p>
                <center><button onClick={() => window.location.reload()}>Play again?</button></center>
            </div>;
    }
    ReactDOM.render(<App/>, document.getElementById('game-container'));
};