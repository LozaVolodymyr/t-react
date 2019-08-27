import React from "react";
import View from '../components/View'

const view = [`
// Returns a Promise of whether the setup is complete or not
   
   pphwebsdk.Setup.isSetupComplete()
       .then(function () {
           console.log('setup complete'); })
       .catch(function (err) {
           console.log(err);
               
           \*Starts the UI Flow to download, setup and 
           *test the Web Interface  */
               
           pphwebsdk.Setup.startUIFlow(function (err) {
           console.log('done with setup');
       });
   });
`]

function Setup() {
    return (
        <div className={'main'}>
            <div className={'box-content'}>
                <h1>Setting up PPH Web SDK</h1>
                <div>
                    This is a one time setup to install the supporting web interface app required for PPH Web SDK
            </div>
                <button>Setup PPH</button>
            </div>
            <div className={'sidebar-right'}>
                <View view={view} />
            </div>
        </div>
    )
}

export default Setup;

