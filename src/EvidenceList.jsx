const Evidence = (props) => {
    return <tr>
        <td>
            <img src={props.src} className="evidence-image"/>
        </td>
        <td>{props.info}</td>
    </tr>
}

const EvidenceList = props => {
    return <div className="evidence-list">
        <p>Let's start by looking at the evidence collected from the scene!</p>
        <table>
            <thead>
                <tr>
                    <th>Evidence</th>
                    <th>Connection</th>
                </tr>
            </thead>
            <tbody>
                <Evidence src="images/forest.svg" info="A woodpecker made this hole in a tree near the entrance to the copse."/>
                <Evidence src="images/groundhole.svg" info="A squirrel's den was discovered near the body."/>
                <Evidence src="images/fur.png" info="Fur tufts were found in the copse entrance."/>
                <Evidence src="images/droppings.png" info="Badger droppings were found surrounding the body."/>
                <Evidence src="images/owlpellet.png" info="An owl dropped this pellet nearby."/>
            </tbody>
        </table>
        <p></p>
        <center><button onClick={props.toNext}>Next</button></center>
    </div>;
};
export default EvidenceList;