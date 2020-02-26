import SuspectList from './SuspectList';
import Suspect from './Suspect';

const InfoSegment = props => (<li>{props.children}</li>);
const SuspectExperience = props => {
    const [ suspects, setSuspects ] = React.useState([ 'squirrel', 'stoat', 'woodpecker', 'owl', 'badger' ]);
    const [ numReleased, setNumReleased ] = React.useState(0);
    const onReleaseSuspect = name => {
        const a = suspects.slice();
        const idx = a.indexOf(name);
        a[idx] = '!' + a[idx];
        setNumReleased(numReleased + 1);
        setSuspects(a);
        const filtered = a.filter(name => !name.startsWith("!"));
        props.toNext(filtered.length > 1 ? null : filtered[0]);
    };
    return <div className="game-top-align">
        <SuspectList>
            {suspects.map(suspect => {
                var key = suspect.startsWith("!") ? suspect.substr(1) : suspect;
                return <Suspect showFootprint={props.idx >= 3} key={key} name={suspect} imgName={key} onRelease={onReleaseSuspect}/>;
            })}
        </SuspectList>

        <div className="evidence-list">
            <p>We've gathered all of the suspects for questioning.</p>
            <p>Click on the <b className="fake-button">&lt;</b> button to release a suspect. Click on the <b className="fake-button">i</b> button to get more information about a suspect.</p>
            <p>Some clues are listed below; more will appear as we continue investigating.</p>
            <ul>
                {props.idx >= 0 && <InfoSegment>The body appears to be partially eaten. The murderer must not be a plant eater.</InfoSegment>}
                {props.idx >= 2 && <InfoSegment>The bite marks on the body show that the murderer's teeth are quite small.</InfoSegment>}
                {props.idx >= 3 && <>
                    <InfoSegment>A footprint was discovered under the body. This must be the killer's footprint!</InfoSegment>
                    <center><img className="discovered-footprint" src="images/stoatfootprint.png"/></center>
                </>}
            </ul>
            
        </div>
    </div>
};
export default SuspectExperience;