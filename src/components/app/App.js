import Main from "../main/Main";
import Header from "../header/Header";
import {Context} from "../context/context";
import {useState} from "react";

function App() {
   const [headerVisible, isHeaderVisible] = useState(false)
   let header

   if(headerVisible) {
       header = <Header/>
   }  else {
       header = null
   }

   return(
       <div>
           <Context.Provider value={{isHeaderVisible}}>
               {header}
               <Main/>
           </Context.Provider>
       </div>
   )
}

export default App;
