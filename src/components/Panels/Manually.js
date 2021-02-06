import React from 'react';
import ResultPanel from "./ResultPanel";
import ManuallyInputs from "./ManuallyInputs";

const Manually = ({printing, print, mode}) => {
    return (
        <div>
            {!printing && <ManuallyInputs print={print} mode={mode}/>}
            <ResultPanel printing={printing} mode={mode}/>
        </div>
    );
};

export default Manually;
