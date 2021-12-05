import React from "react";
import Link from 'next/link'

// export default () => {
//     <div>
//         <Link href="/launchHome" passHref>Launches</Link>
//     </div>
// }
function About() {
    return <div><Link href="/launchHome" passHref>Click Here to check launch page</Link></div>
  }
  
  export default About