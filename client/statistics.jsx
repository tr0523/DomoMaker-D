import { forEach } from 'underscore';

const helper = require('./helper.js');

const React = require('react');
const {useState, useEffect} = React;
const {createRoot} = require('react-dom/client');


const DomoStats = (props) => {
    const [domos, setDomos] = useState(props.domos);

    useEffect(() => {
        const loadDomosFromServer = async () => {
            const response = await fetch('/getDomos');
            const data = await response.json();
            setDomos(data.domos);
        };
        loadDomosFromServer();
    }, [props.reloadDomos]);

    const test = domos ?? "EMPTY";
    var domoLength = 0;
    if(test != "EMPTY"){
        domoLength = domos.length;
    }

    if(domoLength === 0){
        return(
            <div className="domoStats">
                <h3>You do not have any domos yet.</h3>
            </div>
        );
    }

    var plural = "s";
    if(domoLength === 1){
        plural = "";
    }

    console.log(domos);
    var youngestAge = Number.MAX_VALUE;
    domos.forEach(domo =>{
        if(domo.age < youngestAge){
            youngestAge = domo.age;
        }
    });
    
    var oldestAge = Number.MIN_VALUE;
    domos.forEach(domo =>{
        if(domo.age > oldestAge){
            oldestAge = domo.age;
        }
    });

    return(
        <div className="domoStats">
            <h3>You have {domoLength} domo{plural}.  Your youngest domo is {youngestAge} and your oldest domo is {oldestAge}.</h3>
        </div>
    );
};

const Stats = () => {
    const [reloadDomos, setReloadDomos] = useState(false);

    return (
        <div>
            <div id="domos">
                <DomoStats domos={[]} reloadDomos={reloadDomos} />
            </div>
        </div>
    );
};

const init = () => {

    const root = createRoot(document.getElementById('stats'));

    root.render(<Stats />);
};

window.onload = init;