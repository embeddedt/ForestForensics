import Modal from 'react-modal';

var suspectInfos = {
    "badger": <ul>
        <li>worms</li>
        <li>insects</li>
        <li>bits of small animals</li>
        <li>plants</li>
    </ul>,
    "woodpecker": <ul>
        <li>insects</li>
        <li>seeds</li>
    </ul>,
    "squirrel": <ul>
        <li>nuts</li>
        <li>berries</li>
        <li>seeds</li>
        <li>fungi</li>
    </ul>,
    "stoat": <ul>
        <li>bits of small animals</li>
        <li>feathers</li>
        <li>birds' eggs</li>
    </ul>,
    "owl": <ul>
        <li>bits of small animals</li>
        <li>insects</li>
    </ul>,
};

const Suspect = props => {
    const [ showInfo, setShowInfo ] = React.useState(false);
    const [ confirmRelease, setConfirmRelease ] = React.useState(false);
    const closeModal = setShowInfo.bind(void 0, false);
    const cancelRelease = setConfirmRelease.bind(void 0, false);
    const containsSuspect = props.name.charAt(0) != '!';
    const onReleaseConfirmed = () => {
        setConfirmRelease(false);
        props.onRelease(props.name);
    };
    return <div className="suspect">
        <div className="mugshot-container">
            <img className={`suspect-image ${!containsSuspect ? "suspect-image-released" : ""}`} src={`images/${props.imgName}.svg`}/>
            <div className={`cell-bars ${!containsSuspect ? "cell-bars-released" : ""}`}></div>
            {(containsSuspect && props.showFootprint) && <img className="suspect-footprint-image" src={`images/${props.imgName}footprint.png`}/>}
        </div>
        <div className="suspect-buttons">
            <button title="Release suspect" disabled={!containsSuspect} className="suspect-release-button" onClick={setConfirmRelease.bind(void 0, true)}>&lt;</button>
            <button title="Suspect information" disabled={!containsSuspect} className="suspect-info-button" onClick={setShowInfo.bind(void 0, true)}>i</button>
        </div>
        <Modal isOpen={showInfo} onRequestClose={closeModal}>
            <h2>{props.name.charAt(0).toUpperCase() + props.name.substr(1)}s eat:</h2>
            {suspectInfos[props.name]}
            <br/>
            <button onClick={closeModal}>OK</button>
        </Modal>
        <Modal isOpen={confirmRelease} onRequestClose={cancelRelease}>
            <h2>Are you sure you want to release the {props.name}?</h2>
            <button onClick={onReleaseConfirmed}>Yes</button>&nbsp;<button onClick={cancelRelease}>No</button>
        </Modal>
    </div>;
};
export default Suspect;